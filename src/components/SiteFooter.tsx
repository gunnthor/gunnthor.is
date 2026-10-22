import { EMAIL, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p className="colophon">
          {site.name}, {site.location}. Set in Newsreader and Geist Mono. Coastline from Natural Earth. Screenshots
          are of the live projects. No analytics, no cookies.
        </p>
        <ul className="footer-links">
          <li>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          {EMAIL ? <li><a href={`mailto:${EMAIL}`}>Email</a></li> : null}
        </ul>
      </div>
    </footer>
  );
}
