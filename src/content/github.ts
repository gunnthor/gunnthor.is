import snapshot from "./github.json";
import type { Project } from "./projects";

/**
 * Read-only access to the committed GitHub snapshot. Refresh it with
 * `npm run sync:github`; nothing here touches the network.
 */

export type RepoMeta = {
  fullName: string;
  language: string | null;
  createdAt: string;
  pushedAt: string;
  archived: boolean;
  license: string | null;
};

const repos: Record<string, RepoMeta> = snapshot.repos;

export const githubSyncedAt: string | null = snapshot.syncedAt;

export function repoMeta(project: Project): RepoMeta | undefined {
  const match = /^https:\/\/github\.com\/([^/]+\/[^/#?]+)/.exec(project.repo);
  return match?.[1] ? repos[match[1]] : undefined;
}
