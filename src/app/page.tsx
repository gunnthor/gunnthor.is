import Link from "next/link";
import { DotField } from "@/components/DotField";
import { ProjectPlate } from "@/components/ProjectPlate";
import { SectionLabel } from "@/components/SectionLabel";
import { featuredProjects } from "@/content/projects";
import { EMAIL, site } from "@/content/site";

const COUNT_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
const featuredCount = COUNT_WORDS[featuredProjects.length] ?? String(featuredProjects.length);
const allLive = featuredProjects.length > 0 && featuredProjects.every((project) => project.status === "Live");

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <section className="hero" aria-labelledby="hero-heading">
        <div className="site-container">
          <div className="hero-eyebrow">
            <span className="eyebrow"><span className="signal-dot" /> Data · AI · Software</span>
            <span className="hero-location eyebrow">Based in Iceland <span aria-hidden="true">↗</span></span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <p className="hero-name">{site.name}</p>
              <h1 id="hero-heading" className="hero-title">Curious ideas.<br /><span>Working products.</span></h1>
              <p className="hero-statement">{site.statement}</p>
              <div className="hero-actions">
                <a href="#work" className="button-primary">Explore projects <span className="link-arrow" aria-hidden="true">↓</span></a>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-link">View GitHub <span className="link-arrow" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </div>
            <div className="hero-study" aria-hidden="true">
              <div className="study-top"><span>FIELD NOTES / 001</span><span>+</span></div>
              <DotField />
              <div className="study-bottom"><span>FROM COMPLEXITY</span><span>TO CLARITY ↗</span></div>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#work" className="scroll-cue"><span className="scroll-cue-arrow" aria-hidden="true">↓</span> A few things I&apos;ve put into the world</a>
            <span className="eyebrow hero-count">{String(featuredProjects.length).padStart(2, "0")} projects <span aria-hidden="true">/</span> Public source</span>
          </div>
        </div>
      </section>
      <section id="work" className="work-section" aria-labelledby="work-heading">
        <div className="site-container">
          <div className="section-intro" data-reveal>
            <div>
              <SectionLabel marker="01">Selected work</SectionLabel>
              <h2 id="work-heading" className="section-heading">Built out of curiosity.<br /><span>Made to be used.</span></h2>
            </div>
            <div className="section-intro-copy">
              <p>{featuredCount} things I built and finished. Most began as a question I could not answer by searching, so I built the thing that answers it.</p>
              <p className="work-status"><span className="signal-dot" />{allLive ? "All live. Public source." : "Explore the work. Read the code."}</p>
            </div>
          </div>
          <div className="project-list">{featuredProjects.map((project, i) => <ProjectPlate key={project.slug} project={project} index={i + 1} />)}</div>
          <div className="work-ending"><p>The thinking behind the things.</p><Link href="/projects" className="text-link">Read the full project index <span className="link-arrow" aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
      <section id="about" className="about-section" aria-labelledby="about-heading">
        <div className="site-container">
          <SectionLabel marker="02">About</SectionLabel>
          <div className="about-grid" data-reveal>
            <div className="about-heading-column">
              <h2 id="about-heading" className="section-heading">Messy in.<br /><span>Ordered out.</span></h2>
              <div className="about-profile"><span className="profile-mark" aria-hidden="true">G<span> / </span>K<span> / </span>R</span><p>{site.role}<br />Software development · Iceland</p></div>
            </div>
            <div className="about-copy">
              {site.about.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <div className="site-container" data-reveal>
          <SectionLabel marker="03">Contact</SectionLabel>
          <div className="contact-heading-row"><h2 id="contact-heading">Let&apos;s build<br /><span>something useful.</span></h2><span className="contact-arrow" aria-hidden="true">↗</span></div>
          <div className="contact-bottom">
            <p>Happy to talk about data work,<br className="desktop-break" /> or about any of the projects above.</p>
            <div className="contact-links">
              {EMAIL ? <a href={`mailto:${EMAIL}`} className="text-link">{EMAIL} <span className="link-arrow" aria-hidden="true">↗</span></a> : null}
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn <span className="link-arrow" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub <span className="link-arrow" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
