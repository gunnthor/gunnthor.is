import type { Metadata } from "next";
import { ProjectPlate } from "@/components/ProjectPlate";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated index of Gunnþór Karl Rafnsson's projects: Nafnaval, Landlíf, Sagas of Blood & Fire, MemeGuessr and SpinPage. What each one is, why it exists, and what it is built with.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects · ${site.shortName}`,
    description:
      "A curated index of Gunnþór Karl Rafnsson's projects. What each one is, why it exists, and what it is built with.",
    url: `${site.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-line/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionLabel marker="01">Index</SectionLabel>

          <h1 className="mt-6 max-w-3xl text-display leading-tight font-semibold tracking-[-0.02em] text-balance text-text">
            Everything worth showing, in the order I would show it.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            This is a curated list, not a mirror of my GitHub account. Each
            entry says what the thing is, what I actually built, and the one
            decision that made it interesting to work on.
          </p>
        </div>
      </section>

      <section aria-label="Project index">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-5">
            {projects.map((project, i) => (
              <ProjectPlate
                key={project.slug}
                project={project}
                index={i + 1}
                detail
              />
            ))}
          </div>

          <div className="mt-14 rounded-sm border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-text">
              Looking for the rest?
            </h2>
            <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted">
              Older experiments, half-finished ideas and coursework all live on
              GitHub. Nothing there is curated, which is rather the point.
            </p>
            <p className="mt-6">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-signal font-mono text-[0.75rem] tracking-[0.14em] uppercase"
              >
                Browse the full archive <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
