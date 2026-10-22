import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Facts, ProjectActions, ProjectShot, Status } from "@/components/ProjectParts";
import { githubSyncedAt, repoMeta } from "@/content/github";
import { caseProjects, getProject, hasCasePage, projectNumber } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseProjects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: `${project.tagline} ${project.insight}`,
    path: `/projects/${project.slug}`,
    image: `/projects/${project.slug}/opengraph-image`,
  });
}

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function CasePage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project || !hasCasePage(project)) notFound();

  const index = caseProjects.indexOf(project);
  const previous = caseProjects[(index - 1 + caseProjects.length) % caseProjects.length]!;
  const next = caseProjects[(index + 1) % caseProjects.length]!;
  const repo = repoMeta(project);

  return (
    <ViewTransition enter="page" exit="page" default="none">
      <article>
        <header className="wrap case-head">
          <nav aria-label="Breadcrumb" className="crumbs meta">
            <Link href="/projects">Project index</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
          <h1>{project.title}</h1>
          <p className="meta meta-row">
            <span>{projectNumber(project)}</span>
            <span>{project.kind}</span>
            <Status project={project} />
            {project.altTitle ? <span>Also known as {project.altTitle}</span> : null}
          </p>
          <p className="lede">{project.tagline}</p>
          <ProjectActions project={project} caseLink={false} />
        </header>

        <div className="wrap">
          <ProjectShot project={project} eager sizes="(min-width: 1400px) 1320px, (min-width: 641px) 92vw, 100vw" />
        </div>

        <div className="wrap case-body">
          <div className="prose">
            <h2>The idea</h2>
            <p className="first">{project.summary}</p>
            <h2>What I built</h2>
            <p>{project.built}</p>
            <h2>The interesting part</h2>
            <p>{project.interesting}</p>

            <section className="decisions" aria-labelledby="decisions-heading">
              <h2 id="decisions-heading" className="decisions-title">Decisions</h2>
              {project.decisions!.map((decision) => (
                <div key={decision.title} className="decision">
                  <h3>{decision.title}</h3>
                  <p>{decision.body}</p>
                  <p className="meta">Source: {decision.source}</p>
                </div>
              ))}
            </section>
          </div>

          <aside className="case-aside" aria-label="Project details">
            <section>
              <h2 className="meta">At a glance</h2>
              <Facts project={project} />
            </section>
            <section>
              <h2 className="meta">Built with</h2>
              <ul className="stack-list">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </section>
            {repo ? (
              <section>
                <h2 className="meta">Repository</h2>
                <dl className="facts">
                  <div>
                    <dt>Name</dt>
                    <dd>
                      <a href={project.repo} className="link" target="_blank" rel="noopener noreferrer">
                        {repo.fullName}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>Created</dt>
                    <dd>{monthYear.format(new Date(repo.createdAt))}</dd>
                  </div>
                  <div>
                    <dt>Last push</dt>
                    <dd>{monthYear.format(new Date(repo.pushedAt))}</dd>
                  </div>
                  {repo.license ? (
                    <div>
                      <dt>Licence</dt>
                      <dd>{repo.license}</dd>
                    </div>
                  ) : null}
                </dl>
                {githubSyncedAt ? <p className="meta synced">From GitHub, as of {fullDate.format(new Date(githubSyncedAt))}</p> : null}
              </section>
            ) : null}
          </aside>
        </div>

        <nav className="wrap case-nav" aria-label="More case notes">
          <Link href={`/projects/${previous.slug}`}>
            <span className="meta">Previous</span>
            <span>{previous.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`}>
            <span className="meta">Next</span>
            <span>{next.title}</span>
          </Link>
        </nav>
      </article>
    </ViewTransition>
  );
}
