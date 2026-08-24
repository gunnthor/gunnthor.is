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
      { label: "Domain", value: "map.gunnthor.is" },
    ],
    repo: "https://github.com/gunnthor/IcelandHistoryMap",
    live: "https://map.gunnthor.is",
    featured: true,
  },
  {
    slug: "landlif",
    title: "Landlíf",
    altTitle: "Landsbyggðin lifi",
    tagline:
      "The website for an Icelandic nonprofit working to strengthen rural communities.",
    summary:
      "Landsbyggðin lifi is an association for the building up and strengthening of rural Iceland. It needed a public home the people running it could keep current themselves, rather than one that quietly goes stale the moment the developer moves on.",
    built:
      "An Icelandic-language site covering who they are and what they do, with news, photo galleries from events, and a way to get in touch. News and images are edited through a CMS, so the organisation publishes on its own schedule.",
    interesting:
      "It was built to be handed over. Content lives in Sanity so volunteers can post without touching code, and the repository now sits under the organisation's own GitHub account rather than mine. Success here looks like the site staying useful with no involvement from me at all.",
    stack: ["Next.js", "TypeScript", "Sanity", "Vercel"],
    status: "Live",
    facts: [
      { label: "Built for", value: "A nonprofit association" },
      { label: "Language", value: "Icelandic" },
      { label: "Content", value: "Edited in Sanity" },
      { label: "Domain", value: "landlif.is" },
    ],
    repo: "https://github.com/LandsbyggdinLifi/landlif-website",
    live: "https://www.landlif.is",
    featured: true,
  },
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
      { label: "Domain", value: "nafn.gunnthor.is" },
    ],
    repo: "https://github.com/gunnthor/Nafnaval",
    live: "https://nafn.gunnthor.is",
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
  {
    slug: "vindur",
    title: "Vindur",
    altTitle: "Wind over Reykjavík",
    tagline:
      "Live wind over the Reykjavík capital region, drawn as particles and scored against real observations.",
    summary:
      "A 2 km forecast field animated as particles moving through it, with 19 Veðurstofan weather stations laid on top. The animation is not the point. Seeing at a glance where the forecast and the actual measurements disagree is the point.",
    built:
      "A keyless, dependency-free map. The model grid comes from Open-Meteo's DMI Harmonie run, the station readings come straight from Veðurstofan, and a small Node server exists mainly because the observation feed sends no CORS header. A scrubber runs from 24 hours back to 48 hours ahead.",
    interesting:
      "It grades itself. An accuracy tab compares every station against the model interpolated to that station's exact coordinates, reporting bias, MAE and RMSE, including the rounds where the model is wrong. There is also a rule worth stating: scrub away from now and the station markers switch to model values and say so, because a stale reading should never be dressed up as a forecast.",
    stack: ["Vanilla JavaScript", "Leaflet", "Canvas", "Node"],
    status: "Live",
    facts: [
      { label: "Model", value: "DMI Harmonie, ~2 km" },
      { label: "Observations", value: "19 Veðurstofan stations" },
      { label: "Window", value: "24 h back, 48 h ahead" },
      { label: "Dependencies", value: "None" },
    ],
    repo: "https://github.com/gunnthor/wind-reykjavik",
    live: "https://wind-reykjavik.vercel.app",
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
];

export const featuredProjects = projects.filter((p) => p.featured);
