import Link from "next/link";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="wordmark" aria-label={`${site.name}, home`}>
          <span className="wordmark-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
          {site.shortName}<span className="wordmark-domain">.is</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            <li><Link href="/projects" className="nav-link">Projects</Link></li>
            <li><Link href="/#about" className="nav-link">About</Link></li>
            <li className="nav-contact"><Link href="/#contact" className="nav-link">Contact</Link></li>
            <li><a href={site.links.github} target="_blank" rel="noopener noreferrer" className="nav-link nav-github">GitHub <span className="link-arrow" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
