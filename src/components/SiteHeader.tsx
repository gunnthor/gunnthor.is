import Link from "next/link";
import { NavLink } from "@/components/NavLink";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header" style={{ viewTransitionName: "site-header" }}>
      <div className="wrap header-inner">
        <Link href="/" className="wordmark" aria-label={`${site.name}, home`}>
          <span className="wordmark-glyph" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => <i key={i} />)}
          </span>
          <span>
            {site.shortName}
            <span className="wordmark-rest"> Karl Rafnsson</span>
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav">
            <li><NavLink href="/projects">Projects</NavLink></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
            <li>
              <a href={site.links.github} className="nav-github" target="_blank" rel="noopener noreferrer">
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
