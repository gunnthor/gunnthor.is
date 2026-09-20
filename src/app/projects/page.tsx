import type { Metadata } from "next";
import { ProjectPlate } from "@/components/ProjectPlate";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated index of Gunnþór Karl Rafnsson's projects: Sagas of Blood & Fire, Landlíf, Nafnaval, SpinPage, Vindur and MemeGuessr. What each one is, why it exists, and what it is built with.",
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
      <section className="index-hero">
        <div className="site-container">
          <SectionLabel marker="01">Index</SectionLabel>

          <h1>
            Everything worth showing, in the order I would show it.
          </h1>

          <p>
            This is a curated list, not a mirror of my GitHub account. Each
            entry says what the thing is, what I actually built, and the one
            decision that made it interesting to work on.
          </p>
        </div>
      </section>

      <section aria-label="Project index">
        <div className="site-container">
          <div className="project-list">
            {projects.map((project, i) => (
              <ProjectPlate
                key={project.slug}
                project={project}
                index={i + 1}
                detail
              />
            ))}
          </div>

          <div className="index-archive">
            <h2>
              Looking for the rest?
            </h2>
            <div><p>
              Older experiments, half-finished ideas and coursework all live on
              GitHub. Nothing there is curated, which is rather the point.
            </p>
            <p>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Browse the full archive <span className="link-arrow" aria-hidden="true">↗</span>
              </a>
            </p></div>
          </div>
        </div>
      </section>
    </>
  );
}
