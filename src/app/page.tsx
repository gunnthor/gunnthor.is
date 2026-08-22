import Link from "next/link";
import { DotField } from "@/components/DotField";
import { ProjectPlate } from "@/components/ProjectPlate";
import { SectionLabel } from "@/components/SectionLabel";
import { featuredProjects } from "@/content/projects";
import { EMAIL, site } from "@/content/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  description: site.statement,
  sameAs: [site.links.github, site.links.linkedin],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ---------------------------------------------------------- Hero */}
      <section className="border-b border-line/70">
        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
          <DotField />
        </div>

        <div className="mx-auto max-w-6xl px-5 pt-6 pb-16 sm:px-8 sm:pt-8 sm:pb-24">
          <p className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-signal">
            {site.role}
          </p>

          <h1 className="mt-5 max-w-4xl text-mega leading-[0.98] font-semibold tracking-[-0.03em] text-balance text-text">
            I work with data, explore AI, and turn curious ideas into working
            products.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            Five of them are below. Most began as a question I could not answer
            by searching, so I built the thing that answers it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="rounded-xs bg-signal px-6 py-3 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink transition-colors hover:bg-text"
            >
              Explore projects
            </Link>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xs border border-line-bright px-6 py-3 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-text transition-colors hover:border-signal hover:text-signal"
            >
              View GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Selected work */}
      <section
        aria-labelledby="work-heading"
        className="border-b border-line/70"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionLabel marker="01">Selected work</SectionLabel>

          <h2
            id="work-heading"
            className="mt-6 max-w-2xl text-display leading-tight font-semibold tracking-[-0.02em] text-text"
          >
            Five things I built and finished.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            All five are live. The code for every one is public.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <ProjectPlate
                key={project.slug}
                project={project}
                index={i + 1}
              />
            ))}
          </div>

          <p className="mt-10">
            <Link
              href="/projects"
              className="link-signal font-mono text-[0.75rem] tracking-[0.14em] uppercase"
            >
              Read the full index <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- About */}
      <section aria-labelledby="about-heading" className="border-b border-line/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionLabel marker="02">About</SectionLabel>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <h2
              id="about-heading"
              className="text-display leading-tight font-semibold tracking-[-0.02em] text-balance text-text"
            >
              Messy in, ordered out.
            </h2>

            <div className="max-w-prose space-y-5 text-[1.02rem] leading-relaxed text-muted">
              {site.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Contact */}
      <section aria-labelledby="contact-heading">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionLabel marker="03">Contact</SectionLabel>

          <h2
            id="contact-heading"
            className="mt-6 max-w-2xl text-display leading-tight font-semibold tracking-[-0.02em] text-text"
          >
            Get in touch.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Happy to talk about data work, or about any of the projects above.
          </p>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-10">
            {EMAIL ? (
              <a
                href={`mailto:${EMAIL}`}
                className="link-signal text-lg break-all sm:text-xl"
              >
                {EMAIL}
              </a>
            ) : null}
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-signal text-lg sm:text-xl"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-signal text-lg sm:text-xl"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
