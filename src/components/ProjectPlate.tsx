import type { Project } from "@/content/projects";

type ProjectPlateProps = {
  project: Project;
  /** 1-based position, rendered as the record number. */
  index: number;
  /** Show the fuller "what I built / why it is interesting" breakdown. */
  detail?: boolean;
};

const externalLinkClass =
  "link-signal font-mono text-[0.72rem] tracking-[0.12em] uppercase";

export function ProjectPlate({
  project,
  index,
  detail = false,
}: ProjectPlateProps) {
  const number = String(index).padStart(2, "0");
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="plate rounded-sm border border-line bg-surface p-6 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <span className="plate-index font-mono text-xs tracking-[0.2em] text-faint">
          {number}
        </span>
        <span className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-muted">
          <span
            aria-hidden="true"
            className="inline-block size-1.5 rounded-full bg-signal"
          />
          {project.status}
        </span>
      </div>

      <header className="pt-6">
        <h3
          id={headingId}
          className="text-2xl leading-tight font-semibold tracking-tight text-text sm:text-3xl"
        >
          {project.title}
        </h3>
        {project.altTitle ? (
          <p className="pt-1 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-faint">
            {project.altTitle}
          </p>
        ) : null}
        <p className="max-w-prose pt-3 text-base leading-relaxed text-muted">
          {project.tagline}
        </p>
      </header>

      <div className="max-w-prose space-y-4 pt-5 text-[0.95rem] leading-relaxed text-muted">
        <p>{project.summary}</p>
        {detail ? (
          <>
            <p>
              <span className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-faint">
                Built{" "}
              </span>
              {project.built}
            </p>
            <p>
              <span className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-faint">
                Notable{" "}
              </span>
              {project.interesting}
            </p>
          </>
        ) : null}
      </div>

      <dl className="mt-7 grid max-w-xl gap-y-2.5 border-t border-line pt-5">
        {project.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-baseline justify-between gap-6 font-mono text-[0.72rem]"
          >
            <dt className="shrink-0 tracking-[0.12em] uppercase text-faint">
              {fact.label}
            </dt>
            <dd className="text-right text-muted">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-xs border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.06em] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
        {project.live ? (
          <a
            href={project.live}
            className={externalLinkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open live <span aria-hidden="true">↗</span>
            <span className="sr-only">— {project.title}, opens in a new tab</span>
          </a>
        ) : null}
        <a
          href={project.repo}
          className={externalLinkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source <span aria-hidden="true">↗</span>
          <span className="sr-only">
            code for {project.title}, opens in a new tab
          </span>
        </a>
      </div>
    </article>
  );
}
