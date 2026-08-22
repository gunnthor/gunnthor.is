import { site, EMAIL } from "@/content/site";

const footerLinkClass =
  "font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted transition-colors hover:text-signal";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-faint">
          {site.name}
        </p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <li>
            <a
              href={site.links.github}
              className={footerLinkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={site.links.linkedin}
              className={footerLinkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          {EMAIL ? (
            <li>
              <a href={`mailto:${EMAIL}`} className={footerLinkClass}>
                Email
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </footer>
  );
}
