import Link from "next/link";
import { getImageProps } from "next/image";
import { ViewTransition } from "react";
import { hasCasePage, type Project } from "@/content/projects";
import { illustrations, shots } from "@/content/shots";

const NBSP = String.fromCharCode(160);
const captureDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function Status({ project }: { project: Project }) {
  return (
    <span className={`status ${project.status === "Live" ? "status--live" : "status--progress"}`}>
      {project.status}
      {project.statusNote ? `, ${project.statusNote.toLowerCase()}` : null}
    </span>
  );
}

export function Facts({ project }: { project: Project }) {
  return (
    <dl className="facts">
      {project.facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function External({ href, label, project }: { href: string; label: string; project: Project }) {
  return (
    <a href={href} className="action" target="_blank" rel="noopener noreferrer">
      {label} <span aria-hidden="true">↗</span>
      <span className="sr-only">: {project.title} (opens in a new tab)</span>
    </a>
  );
}

/** Primary destinations for a project, in order of usefulness. */
export function ProjectActions({ project, caseLink = true }: { project: Project; caseLink?: boolean }) {
  return (
    <div className="actions">
      {project.live ? <External href={project.live} label="Live site" project={project} /> : null}
      {caseLink && hasCasePage(project) ? (
        <Link href={`/projects/${project.slug}`} className="action action--next">
          Case notes <span aria-hidden="true">→</span>
          <span className="sr-only">: {project.title}</span>
        </Link>
      ) : null}
      <External href={project.repo} label="Source" project={project} />
    </div>
  );
}

type ShotProps = {
  project: Project;
  /** `sizes` for the wide image. Narrow screens always get the square crop. */
  sizes: string;
  matted?: boolean;
  /** Link the image to the case page. */
  linked?: boolean;
  eager?: boolean;
};

/**
 * A real screenshot with an honest caption, or an illustration where no
 * screenshot can be published. The same ViewTransition name is used on the
 * homepage and the case page, so the image carries across navigation.
 */
export function ProjectShot({ project, sizes, matted = false, linked = false, eager = false }: ShotProps) {
  const shot = shots[project.slug];
  const illustration = illustrations[project.slug];
  const href = linked && hasCasePage(project) ? `/projects/${project.slug}` : undefined;

  let media: React.ReactNode;
  let caption: React.ReactNode[];
  if (shot) {
    const {
      props: { srcSet: narrowSrcSet },
    } = getImageProps({ src: shot.detail, alt: "", sizes: "100vw" });
    const { props } = getImageProps({
      src: shot.wide,
      alt: shot.alt,
      sizes,
      loading: eager ? "eager" : "lazy",
      fetchPriority: eager ? "high" : undefined,
    });
    media = (
      <picture>
        <source media="(max-width: 640px)" srcSet={narrowSrcSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img {...props} />
      </picture>
    );
    caption = [
      "Screenshot",
      project.live ? new URL(project.live).host : null,
      // Non-breaking spaces keep the date on one line.
      captureDate.format(new Date(shot.captured)).replaceAll(" ", NBSP),
      shot.note,
      shot.credit,
    ];
  } else if (illustration) {
    media = <illustration.Component />;
    caption = illustration.caption;
  } else {
    return null;
  }

  const frame = href ? (
    <Link href={href} className="shot-frame" tabIndex={-1}>
      {media}
    </Link>
  ) : (
    <div className="shot-frame">{media}</div>
  );

  return (
    <figure className={`shot${matted ? " shot--matted" : ""}`}>
      <ViewTransition name={`shot-${project.slug}`} share="shot">
        {frame}
      </ViewTransition>
      <figcaption>
        {caption.filter(Boolean).map((part) => (
          <span key={String(part)}>{part}</span>
        ))}
      </figcaption>
    </figure>
  );
}
