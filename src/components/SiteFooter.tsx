import { site, EMAIL } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <p>{site.name}<span className="footer-location"> / Iceland</span></p>
        <ul className="footer-links">
          <li><a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></li>
          <li><a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></li>
          {EMAIL ? <li><a href={`mailto:${EMAIL}`}>Email <span aria-hidden="true">↗</span></a></li> : null}
          <li><a href="#main">Back to top <span aria-hidden="true">↑</span></a></li>
        </ul>
      </div>
    </footer>
  );
}
