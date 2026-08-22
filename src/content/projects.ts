/**
 * The curated project index.
 *
 * This is the single source of truth for everything shown on the site. It is
 * deliberately NOT generated from the GitHub API. Ordering, framing and
 * emphasis are editorial decisions, not repository metadata.
 *
 * See docs/adding-a-project.md before editing.
 *
 * DRAFT COPY: every `summary`, `built` and `interesting` line below is a
 * proposal written from the repositories and READMEs. Nothing here states an
 * outcome, a metric or a result that was not verifiable in the source.
 */

export type ProjectStatus = "Live" | "In progress" | "Archived";

export type Project = {
  /** URL-safe id. Used for anchors now, and for /projects/[slug] later. */
  slug: string;
  /** Display title. */
  title: string;
  /** Optional secondary title, e.g. the repository name. */
  altTitle?: string;
  /** One line: what this actually is. */
  tagline: string;
  /** The idea or the problem. */
  summary: string;
  /** What Gunnþór built. */
  built: string;
  /** What makes it interesting: the decision worth reading about. */
  interesting: string;
  /** Main technologies, most significant first. */
  stack: string[];
  status: ProjectStatus;
  /** Key/value rows rendered as a record block on the project plate. */
  facts: { label: string; value: string }[];
  repo: string;
  live?: string;
  /** Whether to feature on the homepage. */
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "nafnaval",
    title: "Nafnaval",
    tagline:
      "Every name in the Icelandic name register, broken into the parts it is built from.",
    summary:
      "Icelandic names are compounds. Þórbjörg is Þór plus björg. That structure is the interesting part, and nothing online let you follow a single element from one name to the next.",
    built:
      "A static site covering the whole mannanafnaskrá: meaning, declension, categories, and how many people carry each name. Every element gets its own page, so you can start at a name and end up somewhere unexpected.",
    interesting:
      "Meaning resolves through a strict precedence chain: hand-written cited entries first, then a lexicon of roughly 215 Old Norse elements sourced to public-domain dictionaries, and only then AI-drafted text, which stays quarantined behind an óstaðfest badge and is never merged into the cited data. The model fills gaps; it does not get to launder itself into a source.",
    stack: ["Astro", "TypeScript", "Static site generation"],
    status: "Live",
    facts: [
      { label: "Scale", value: "~6,000 prerendered pages" },
      { label: "Lexicon", value: "~215 Old Norse elements" },
      { label: "Sources", value: "island.is · Þjóðskrá · BÍN" },
      { label: "Client JS", value: "One filtering island" },
    ],
    repo: "https://github.com/gunnthor/Nafnaval",
    live: "https://nafnaval-ten.vercel.app",
    featured: true,
  },
  {
    slug: "sagas-of-blood-and-fire",
    title: "Sagas of Blood & Fire",
    altTitle: "IcelandHistoryMap",
    tagline:
      "An interactive map of Iceland's historical battles and violent conflicts.",
    summary:
      "Iceland's conflicts are thoroughly documented and poorly presented: long prose, no geography, and no easy way to see that two events happened in the same valley two centuries apart.",
    built:
      "A map you move through rather than a page you scroll. Conflicts sit where they actually happened, and the detail opens up only when you ask for it.",
    interesting:
      "It is built for someone with five minutes, not a semester. The editorial constraint, friendly and fast history for the impatient, decided the interface: the map answers 'where and roughly when' immediately, and everything else stays folded away.",
    stack: ["React", "TypeScript", "Vite", "Leaflet"],
    status: "Live",
    facts: [
      { label: "Surface", value: "Single full-bleed map" },
      { label: "Rendering", value: "Leaflet tiles + custom markers" },
      { label: "Audience", value: "Curious, not academic" },
    ],
    repo: "https://github.com/gunnthor/IcelandHistoryMap",
    live: "https://iceland-ruddy.vercel.app",
    featured: true,
  },
  {
    slug: "memeguessr",
    title: "MemeGuessr",
    tagline: "A daily GeoGuessr-style game about when memes went viral.",
    summary:
      "Everyone recognises the meme. Almost nobody can place the year. That gap between instant recognition and total vagueness is the whole game.",
    built:
      "One puzzle a day: see the meme, guess the moment it broke, get scored on how close you were, and share the result without spoiling it.",
    interesting:
      "It moves the guessing axis from space to time. The scoring has to reward being roughly right, because meme virality is a slope rather than a date, so the interesting design work is in how generously wrong answers are treated.",
    stack: ["Next.js", "TypeScript"],
    status: "Live",
    facts: [
      { label: "Format", value: "One round per day" },
      { label: "Loop", value: "Guess → score → share" },
      { label: "Axis", value: "Time, not place" },
      { label: "Domain", value: "memeguessr.com" },
    ],
    repo: "https://github.com/gunnthor/memeguessr",
    live: "https://www.memeguessr.com",
    featured: true,
  },
  {
    slug: "spinpage",
    title: "SpinPage",
    tagline: "A theatrical spinning wheel and random picker.",
    summary:
      "Random pickers are usually joyless form controls. The drama is the point: a decision feels fairer when you watch it land.",
    built:
      "A canvas wheel with weighted motion, sound, and lists that persist between visits, so the same set of names is there tomorrow.",
    interesting:
      "No framework and no build step. Vanilla JavaScript, Canvas and Web Audio, which keeps it a single page that loads instantly and will still run unchanged in ten years.",
    stack: ["Vanilla JavaScript", "Canvas", "Web Audio"],
    status: "Live",
    facts: [
      { label: "Dependencies", value: "None" },
      { label: "Build step", value: "None" },
      { label: "Persistence", value: "Local, per browser" },
      { label: "Domain", value: "ruglad.com" },
    ],
    repo: "https://github.com/gunnthor/SpinPage",
    live: "https://www.ruglad.com",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
