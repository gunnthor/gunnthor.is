import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { ProjectActions, Status } from "@/components/ProjectParts";
import { githubSyncedAt } from "@/content/github";
import { hasCasePage, projectNumber, projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const description = `A curated index of ${projects.length} projects by ${site.name}: ${projects.map((p) => p.title).join(", ")}. What each one is, what it is built with, and where to try it.`;

export const metadata: Metadata = pageMetadata({ title: "Projects", description, path: "/projects" });

const syncedDate = githubSyncedAt
  ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(githubSyncedAt))
  : null;

export default function ProjectsPage() {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>
        <header className="wrap page-head">
          <p className="label"><b>{String(projects.length).padStart(2, "0")}</b> Projects</p>
          <h1>Project index</h1>
          <p>
            Everything worth showing, in the order I would show it. This is a curated list, not a mirror of my GitHub
            account. Projects with case notes have their own page; the rest open up in place.
          </p>
        </header>

        <section className="wrap" aria-label="All projects">
          <ol className="ledger">
            {projects.map((project) => (
              <li key={project.slug} id={project.slug} className="ledger-row">
                <p className="meta">{projectNumber(project)}</p>
                <div>
                  <h2>
                    {hasCasePage(project) ? <Link href={`/projects/${project.slug}`}>{project.title}</Link> : project.title}
                  </h2>
                  <p className="ledger-tagline">{project.tagline}</p>
                  <ProjectActions project={project} />
                  {hasCasePage(project) ? null : (
                    <details>
                      <summary>More about {project.title}</summary>
                      <div>
                        <section>
                          <h3>The idea</h3>
                          <p>{project.summary}</p>
                        </section>
                        <section>
                          <h3>What I built</h3>
                          <p>{project.built}</p>
                        </section>
                        <section>
                          <h3>The interesting part</h3>
                          <p>{project.interesting}</p>
                        </section>
                      </div>
                    </details>
                  )}
                </div>
                <div className="ledger-cell">
                  <p className="meta">Kind</p>
                  <p>{project.kind}</p>
                  <p><Status project={project} /></p>
                </div>
                <div className="ledger-cell">
                  <p className="meta">Built with</p>
                  <p>{project.stack.join(", ")}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="archive">
            <h2>Looking for the rest?</h2>
            <div>
              <p>
                My other public repositories are older coursework and small experiments. They stay on GitHub, uncurated.
              </p>
              <p className="actions">
                <a href={site.links.github} className="action" target="_blank" rel="noopener noreferrer">
                  Browse GitHub <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
              {syncedDate ? <p className="meta">Repository dates on case pages are from GitHub as of {syncedDate}.</p> : null}
            </div>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}
