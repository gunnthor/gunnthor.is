import Link from "next/link";
import { site, EMAIL } from "@/content/site";

const navLinkClass =
  "font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted transition-colors hover:text-signal focus-visible:text-signal";

export function SiteHeader() {
  return (
    <header className="border-b border-line/70">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-4 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-text transition-colors hover:text-signal"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 sm:gap-6">
            <li>
              <Link href="/projects" className={navLinkClass}>
                Projects
              </Link>
            </li>
            <li>
              <a
                href={site.links.github}
                className={navLinkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li className="hidden sm:block">
              <a
                href={site.links.linkedin}
                className={navLinkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            {EMAIL ? (
              <li className="hidden sm:block">
                <a href={`mailto:${EMAIL}`} className={navLinkClass}>
                  Email
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}
