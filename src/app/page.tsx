import Link from "next/link";
import { ViewTransition } from "react";
import { HeroMap } from "@/components/HeroMap";
import { Facts, ProjectActions, ProjectShot, Status } from "@/components/ProjectParts";
import { byPlacement, hasCasePage, projectNumber, projects, type Project } from "@/content/projects";
import { EMAIL, habits, site } from "@/content/site";

const flagships = byPlacement("flagship");
const features = byPlacement("feature");
const briefs = byPlacement("brief");
const onHome = [...flagships, ...features, ...briefs];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  description: site.metaDescription,
  sameAs: [site.links.github, site.links.linkedin],
};

/* Three layouts so the flagships read as a sequence, not a grid of cards. */
const plateLayouts = ["plate--wide", "plate--side", "plate--side plate--flip"];

function ProjectTitle({ project, className }: { project: Project; className?: string }) {
  return (
    <h3 id={`p-${project.slug}`} className={className}>
      {hasCasePage(project) ? <Link href={`/projects/${project.slug}`}>{project.title}</Link> : project.title}
    </h3>
  );
}

function Plate({ project, layout }: { project: Project; layout: string }) {
  return (
    <article className={`plate ${layout}`} aria-labelledby={`p-${project.slug}`}>
      <ProjectShot
        project={project}
        linked
        sizes={layout === "plate--wide" ? "(min-width: 1400px) 1320px, (min-width: 641px) 92vw, 100vw" : "(min-width: 1400px) 870px, (min-width: 960px) 62vw, (min-width: 641px) 92vw, 100vw"}
      />
      <div className="plate-copy">
        <ProjectTitle project={project} className="plate-title" />
        <p className="meta">
          <span>{projectNumber(project)}</span>
          <span>{project.kind}</span>
          <Status project={project} />
        </p>
        <p className="plate-tagline">{project.tagline}</p>
        <p className="plate-insight">
          <strong>The decision</strong>
          {project.insight}
        </p>
        <Facts project={project} />
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

function Inset({ project }: { project: Project }) {
  return (
    <article className="inset" aria-labelledby={`p-${project.slug}`}>
      <ProjectShot project={project} matted linked sizes="(min-width: 1400px) 630px, (min-width: 840px) 46vw, 100vw" />
      <p className="meta">
        <span>{projectNumber(project)}</span>
        <span>{project.kind}</span>
        <Status project={project} />
      </p>
      <ProjectTitle project={project} />
      <p className="inset-tagline">{project.tagline}</p>
      <p className="inset-insight">{project.insight}</p>
      <ProjectActions project={project} />
    </article>
  );
}

function Brief({ project }: { project: Project }) {
  return (
    <article className="brief" aria-labelledby={`p-${project.slug}`}>
      <p className="meta">{projectNumber(project)}</p>
      <div>
        <ProjectTitle project={project} />
        <p>{project.tagline}</p>
      </div>
      <p className="meta">
        {project.kind} · {project.stack.slice(0, 2).join(", ")}
      </p>
      <ProjectActions project={project} />
    </article>
  );
}

export default function HomePage() {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

        <section className="hero" aria-labelledby="hero-heading">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <h1 id="hero-heading">
                  <span className="hero-name meta">{site.name}</span>
                  <span className="sr-only">: </span>
                  <span className="hero-headline">
                    {site.headline} <span className="hero-tail">{site.headlineTail}</span>
                  </span>
                </h1>
                <p className="hero-lede">{site.lede}</p>
                <div className="actions">
                  <a href="#work" className="btn">
                    Explore projects <span aria-hidden="true">↓</span>
                  </a>
                  <a href={site.links.github} className="action" target="_blank" rel="noopener noreferrer">
                    View GitHub <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
              <HeroMap />
            </div>

            <nav className="hero-index" aria-label="Projects on this page">
              <ol>
                {onHome.map((project) => (
                  <li key={project.slug}>
                    <a href={`#p-${project.slug}`}>
                      <span className="meta">{projectNumber(project)}</span>{" "}
                      <span className="hero-index-title">{project.title}</span>{" "}
                      <span className="meta hero-index-kind">{project.kind}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>

        <section id="work" className="band" aria-labelledby="work-heading">
          <div className="wrap">
            <div className="band-head">
              <div>
                <p className="label"><b>01</b> Selected work</p>
                <h2 id="work-heading">Three live maps, three kinds of evidence.</h2>
              </div>
              <p>
                A thousand years of recorded conflict, a live earthquake catalogue, and a wind forecast checked
                against real stations. Each one is built around a decision about what its data can honestly say.
              </p>
            </div>
            <div className="plates">
              {flagships.map((project, i) => (
                <Plate key={project.slug} project={project} layout={plateLayouts[i % plateLayouts.length]!} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="more-heading">
          <div className="wrap">
            <p className="label"><b>02</b> More work</p>
            <h2 id="more-heading" className="sr-only">More work</h2>
            <div className="insets">
              {features.map((project) => (
                <Inset key={project.slug} project={project} />
              ))}
            </div>
            <div className="briefs">
              {briefs.map((project) => (
                <Brief key={project.slug} project={project} />
              ))}
            </div>
            <p className="more-link">
              <Link href="/projects" className="action action--next">
                All {projects.length} projects in the index <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-heading">
          <div className="wrap">
            <p className="label"><b>03</b> About</p>
            <div className="about-grid">
              <div>
                <h2 id="about-heading">Messy in, ordered out.</h2>
                <p className="meta about-role">{site.role}</p>
              </div>
              <div className="about-copy">
                {site.about.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="habits">
              <h3 className="habits-title">Habits from migration work that show up in the projects</h3>
              <ol>
                {habits.map((habit) => (
                  <li key={habit.title} className="habit">
                    <h4>{habit.title}</h4>
                    <p>{habit.body}</p>
                    <p className="evidence">
                      {habit.evidence.map((item) => (
                        <Link key={item.slug} href={`/projects/${item.slug}`} className="action action--next">
                          {item.label} <span aria-hidden="true">→</span>
                          <span className="sr-only"> case notes</span>
                        </Link>
                      ))}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-heading">
          <div className="wrap">
            <p className="label"><b>04</b> Contact</p>
            <h2 id="contact-heading">
              Happy to talk about data work, <span className="contact-tail">or any of these projects.</span>
            </h2>
            <div className="contact-row">
              <p className="meta">
                <span>{site.location}</span>
                <span>UTC+0 all year</span>
              </p>
              <div className="contact-links">
                {EMAIL ? (
                  <a href={`mailto:${EMAIL}`}>
                    {EMAIL} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}
