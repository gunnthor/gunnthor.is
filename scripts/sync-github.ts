/**
 * Refreshes src/content/github.json from the GitHub API.
 *
 *   npm run sync:github
 *
 * Run it by hand, review the diff, and commit the snapshot. The site only ever
 * reads the committed file: builds and visitors never call GitHub, so an
 * outage or a rate limit can never break a deploy.
 *
 * - Only repositories curated in src/content/projects.ts are synced, including
 *   ones under organisations. Set `syncGithub: false` to skip one.
 * - A failed request keeps that repository's previous entry.
 * - A rate-limit response stops the run without writing anything.
 * - Public repositories on the account that are not curated are listed as
 *   candidates in the terminal. They are never published automatically.
 *
 * Uses GITHUB_TOKEN when set, then `gh auth token` when the GitHub CLI is
 * signed in, and otherwise makes unauthenticated requests (60 per hour).
 */

import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { projects } from "../src/content/projects.ts";

const ACCOUNT = "gunnthor";
const SNAPSHOT = new URL("../src/content/github.json", import.meta.url);

type RepoMeta = {
  fullName: string;
  language: string | null;
  createdAt: string;
  pushedAt: string;
  archived: boolean;
  license: string | null;
};

type Snapshot = { syncedAt: string | null; repos: Record<string, RepoMeta> };

type ApiRepo = {
  full_name: string;
  language: string | null;
  created_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  homepage: string | null;
  license: { spdx_id: string } | null;
};

class RateLimited extends Error {}

function token(): string | undefined {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim() || undefined;
  } catch {
    return undefined;
  }
}

const auth = token();

async function api<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "gunnthor.is-sync",
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
    },
  });
  if ((response.status === 403 || response.status === 429) && response.headers.get("x-ratelimit-remaining") === "0") {
    throw new RateLimited(`GitHub rate limit reached on ${path}`);
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} on ${path}`);
  return (await response.json()) as T;
}

function repoName(url: string): string | null {
  const match = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)/.exec(url);
  return match ? `${match[1]}/${match[2]}` : null;
}

async function main() {
  const previous: Snapshot = JSON.parse(await readFile(SNAPSHOT, "utf8").catch(() => '{"syncedAt":null,"repos":{}}'));
  const repos: Record<string, RepoMeta> = {};
  let failures = 0;

  for (const project of projects) {
    if (project.syncGithub === false) continue;
    const name = repoName(project.repo);
    if (!name) {
      console.warn(`skip ${project.slug}: not a GitHub URL`);
      continue;
    }
    try {
      const repo = await api<ApiRepo>(`/repos/${name}`);
      repos[name] = {
        fullName: repo.full_name,
        language: repo.language,
        createdAt: repo.created_at,
        pushedAt: repo.pushed_at,
        archived: repo.archived,
        license: repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION" ? repo.license.spdx_id : null,
      };
      if (repo.homepage && project.live && new URL(repo.homepage).host !== new URL(project.live).host) {
        console.info(`note ${project.slug}: GitHub homepage is ${repo.homepage}, the site links ${project.live}`);
      }
      if (repo.archived && project.status === "Live") {
        console.warn(`check ${project.slug}: archived on GitHub but marked Live`);
      }
    } catch (error) {
      if (error instanceof RateLimited) throw error;
      failures += 1;
      const kept = previous.repos[name];
      if (kept) repos[name] = kept;
      console.warn(`keep ${name}: ${(error as Error).message}${kept ? " (previous entry kept)" : ""}`);
    }
  }

  const curated = new Set(Object.keys(repos).map((name) => name.toLowerCase()));
  try {
    const owned = await api<ApiRepo[]>(`/users/${ACCOUNT}/repos?per_page=100&type=owner`);
    const candidates = owned.filter((repo) => !repo.fork && !curated.has(repo.full_name.toLowerCase()));
    if (candidates.length) {
      console.info("\nPublic repositories that are not on the site (curate in projects.ts if any deserve it):");
      for (const repo of candidates) console.info(`  ${repo.full_name}  pushed ${repo.pushed_at.slice(0, 10)}${repo.archived ? "  archived" : ""}`);
    }
  } catch (error) {
    if (error instanceof RateLimited) throw error;
    console.warn(`Could not list candidates: ${(error as Error).message}`);
  }

  const snapshot: Snapshot = { syncedAt: new Date().toISOString(), repos };
  await writeFile(SNAPSHOT, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.info(`\nWrote ${Object.keys(repos).length} repositories to src/content/github.json${failures ? ` (${failures} kept from the previous snapshot)` : ""}.`);
}

main().catch((error: unknown) => {
  console.error(`${(error as Error).message}. Nothing was written; the previous snapshot is unchanged.`);
  process.exit(1);
});
