import type { Project } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import "./project-plate.css";

type ProjectPlateProps = { project: Project; index: number; detail?: boolean };

export function ProjectPlate({ project, index, detail = false }: ProjectPlateProps) {
  const number = String(index).padStart(2, "0");
  const headingId = `project-${project.slug}`;
  const Heading = detail ? "h2" : "h3";
  return (
    <article aria-labelledby={headingId} className={`project-plate${index % 2 === 0 ? " project-plate--reverse" : ""}`} data-reveal>
      <div className="project-topline"><span className="project-number">{number}</span><span className="project-topline-name">{project.altTitle ?? project.title}</span><span className="project-status"><span className="signal-dot" />{project.status}</span></div>
      <div className="project-grid">
        <figure className="project-figure"><ProjectVisual slug={project.slug} /><figcaption><span>Visual study / {number}</span><span>{project.altTitle ?? project.title}</span></figcaption></figure>
        <div className="project-copy">
          <Heading id={headingId} className="project-title">{project.title}</Heading>
          <p className="project-tagline">{project.tagline}</p>
          <p className="project-summary">{project.summary}</p>
          <dl className="project-facts">{project.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
          <ul className="project-stack" aria-label="Technologies used">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <div className="project-actions">
            {project.live ? <a href={project.live} className="project-open" target="_blank" rel="noopener noreferrer">Open project <span className="link-arrow" aria-hidden="true">↗</span><span className="sr-only">: {project.title} (opens in a new tab)</span></a> : null}
            <a href={project.repo} className="text-link project-source" target="_blank" rel="noopener noreferrer">Source code <span className="link-arrow" aria-hidden="true">↗</span><span className="sr-only"> for {project.title} (opens in a new tab)</span></a>
          </div>
        </div>
      </div>
      {detail ? <div className="project-notes"><div><h3>What I built</h3><p>{project.built}</p></div><div><h3>The interesting part</h3><p>{project.interesting}</p></div></div> : null}
    </article>
  );
}
