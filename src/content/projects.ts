/**
 * The curated project index.
 *
 * This is the single source of truth for what the site says about each
 * project. GitHub contributes dates and a few facts through the committed
 * snapshot in github.json (see scripts/sync-github.ts), but ordering, framing,
 * emphasis and every sentence below are editorial decisions.
 *
 * See docs/adding-a-project.md before editing.
 *
 * DRAFT COPY: the prose is a proposal written from the repositories and
 * READMEs, and needs Gunnþór's approval before launch. Every `decisions` entry
 * names the README section it was checked against. Nothing here states an
 * outcome, a metric or a result that is not in the source.
 *
 * This file must stay free of imports so the sync script can load it with
 * plain Node.
 */

export type ProjectStatus = "Live" | "In progress";

/**
 * Where the project appears on the homepage.
 * - flagship: large plate with a screenshot, in the dark "Selected work" band.
 * - feature: half-width inset below the band.
 * - brief: a single text row.
 * - null: only in the project index.
 */
export type Placement = "flagship" | "feature" | "brief" | null;

export type Decision = {
  title: string;
  body: string;
  /** Where the claim can be checked, e.g. "README, Confidence levels". */
  source: string;
};

export type Project = {
  /** URL-safe id, used for /projects/[slug] and anchors. */
  slug: string;
  title: string;
  /** Repository or original name, when it differs from the title. */
  altTitle?: string;
  /** Short noun phrase: what kind of thing this is. */
  kind: string;
  /** One line: what this actually is. */
  tagline: string;
  /** The idea or the problem. */
  summary: string;
  /** What Gunnþór built. */
  built: string;
  /** What makes it interesting: the decision worth reading about. */
  interesting: string;
  /** One sentence pulled from `interesting`, used where space is tight. */
  insight: string;
  /** Main technologies, most significant first. */
  stack: string[];
  status: ProjectStatus;
  /** Optional qualifier shown beside the status. */
  statusNote?: string;
  /** Two to four short, checkable facts. */
  facts: { label: string; value: string }[];
  repo: string;
  live?: string;
  placement: Placement;
  /**
   * Verified technical decisions. A project gets its own case page at
   * /projects/[slug] only when this is present.
   */
  decisions?: Decision[];
  /** Set to false to keep this repository out of the GitHub metadata sync. */
  syncGithub?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sagas-of-blood-and-fire",
    title: "Sagas of Blood & Fire",
    altTitle: "IcelandHistoryMap",
    kind: "History map",
    tagline:
      "An interactive map of Iceland's historical battles and violent conflicts.",
    summary:
      "Iceland's conflicts are thoroughly documented and poorly presented: long prose, no geography, and no easy way to see that two events happened in the same valley two centuries apart.",
    built:
      "A map you move through rather than a page you scroll. Conflicts sit where they happened, a timeline runs underneath, and filters for era, type and confidence narrow it down. Detail opens only when you ask for it.",
    interesting:
      "It is built for someone with five minutes, not a semester. That constraint, friendly and fast history for the impatient, decided the interface: the map answers ‘where and roughly when’ immediately, and everything else stays folded away. It is also honest about what is uncertain, which matters when half the sources are sagas.",
    insight:
      "Every event carries a confidence level, and saga-era places that are uncertain are marked as approximate instead of presented as fact.",
    stack: ["React", "TypeScript", "Vite", "Leaflet"],
    status: "Live",
    facts: [
      { label: "Events", value: "53, from 875 to 1976" },
      { label: "Interface", value: "Map, timeline, filters" },
      { label: "Languages", value: "English and Icelandic" },
    ],
    repo: "https://github.com/gunnthor/IcelandHistoryMap",
    live: "https://map.gunnthor.is",
    placement: "flagship",
    decisions: [
      {
        title: "Confidence is part of the data",
        body: "Each event is tagged high, medium or low confidence, and the map can be filtered by it. When a saga-era location is uncertain, the closest known modern place stands in as a placeholder and the location name says so.",
        source: "README, Adding a new event; Confidence levels",
      },
      {
        title: "The data drives the interface",
        body: "The timeline range and the year sliders are derived from the events themselves, so adding an event never means editing a constant somewhere else.",
        source: "README, Adding a new event",
      },
      {
        title: "Every event has an address",
        body: "Selecting an event updates the URL hash, so any point on the map can be shared as a direct link. Markers and timeline events can be reached and opened with the keyboard.",
        source: "README, Keyboard shortcuts",
      },
    ],
  },
  {
    slug: "iceland-live",
    title: "Iceland Live",
    kind: "Live map",
    tagline:
      "A real-time map of earthquakes, volcanic systems and official warnings around Iceland.",
    summary:
      "Veðurstofan publishes everything needed to follow what the ground is doing, but spread across feeds and pages. A raw count also says very little: twenty earthquakes is an ordinary day in one place and a warning sign in another.",
    built:
      "The homepage is the application: a dark map of every recorded earthquake in the chosen window, with official warnings, volcanic systems, Reykjanes lava fields, radar interferograms, air quality, road cameras and IMO's dispersal simulations layered on top.",
    interesting:
      "It compares each region only with its own past, so activity is ranked by how unusual it is for that place rather than by raw volume. The written summary is generated deterministically from the data with no language model, and anything that is a model rather than a measurement says so before it shows a number.",
    insight:
      "Each region is compared only with its own past, so activity is ranked by how unusual it is there, not by raw count.",
    stack: ["Next.js", "TypeScript", "MapLibre", "Tailwind CSS"],
    status: "Live",
    facts: [
      { label: "Source", value: "Veðurstofa Íslands" },
      { label: "Windows", value: "1 hour to 30 days" },
      { label: "Summary", value: "Deterministic, no LLM" },
    ],
    repo: "https://github.com/gunnthor/iceland-live",
    live: "https://live.gunnthor.is",
    placement: "flagship",
    decisions: [
      {
        title: "CSV over GeoJSON, on purpose",
        body: "IMO's CSV carries two fields the GeoJSON leaves out: the review status of each event and the magnitude scale. Both are worth showing, so the map reads the CSV, and columns are matched by name rather than position.",
        source: "README, Data sources: Earthquakes",
      },
      {
        title: "A fixed depth is not a precise one",
        body: "Some depths are assigned by an operator and arrive with an uncertainty of exactly zero. They are shown as ‘10.0 km (fixed)’ with an explanation, instead of looking like the most precise readings on the map.",
        source: "README, Per-event uncertainties, and the units problem",
      },
      {
        title: "No clustering",
        body: "A 30-day window is about 2,800 points. One WebGL layer draws them without effort, and clustering would hide the very thing the map is for: the shape of a swarm. The app has four runtime dependencies in total.",
        source: "README, Stack",
      },
      {
        title: "A simulation is not a forecast",
        body: "IMO runs dispersal models for selected volcanoes several times a day, whether or not anything is happening. The panel says so before it lists anything, and every row shows the plume height as an assumption the model was given.",
        source: "README, Scientific integrity",
      },
      {
        title: "Arithmetic, not interpretation",
        body: "Regional observations state the numbers they came from and can show their own method. A test fails if any generated sentence contains predictive or hazard language such as ‘imminent’ or ‘evacuate’.",
        source: "README, Scientific integrity",
      },
    ],
  },
  {
    slug: "vindur",
    title: "Vindur",
    altTitle: "wind-reykjavik",
    kind: "Weather map",
    tagline:
      "Live wind over the Reykjavík capital region, drawn as particles and scored against real observations.",
    summary:
      "A 2 km forecast field animated as particles, with Veðurstofan weather stations laid on top. The animation is not the point. Seeing at a glance where the forecast and the actual measurements disagree is the point.",
    built:
      "A keyless map with no npm dependencies. The model grid comes from Open-Meteo's DMI Harmonie run, the station readings come straight from Veðurstofan, and a scrubber runs from 24 hours back to 48 hours ahead.",
    interesting:
      "It grades itself. An accuracy tab compares every station against the model interpolated to that station's exact coordinates, reporting bias, MAE and RMSE, including the rounds where the model is wrong. And a rule worth stating: scrub away from now and the station markers switch to model values and say so, because a stale reading should never be dressed up as a forecast.",
    insight:
      "It grades itself: every station is checked against the model at its exact coordinates, with bias, MAE and RMSE on show.",
    stack: ["JavaScript", "Leaflet", "Canvas", "Node"],
    status: "Live",
    facts: [
      { label: "Model", value: "DMI Harmonie, about 2 km" },
      { label: "Observations", value: "19 Veðurstofan stations" },
      { label: "Window", value: "24 h back, 48 h ahead" },
    ],
    repo: "https://github.com/gunnthor/wind-reykjavik",
    live: "https://wind-reykjavik.vercel.app",
    placement: "flagship",
    decisions: [
      {
        title: "A stale reading is not a forecast",
        body: "Observations only exist for the present. Scrub away from now and the station points switch to model values, and the interface says so.",
        source: "README, What's on screen",
      },
      {
        title: "Pressure was built, then removed",
        body: "Across a 60 km box, mean sea-level pressure varies by under 1 hPa, so the layer was a flat grey wash. It moved to the meteogram, where the trend is the whole point of a barometer.",
        source: "README, What's on screen",
      },
      {
        title: "Isotherms instead of a colour flood",
        body: "A fixed diverging temperature scale flooded the map, so temperature is carried by isotherms every 2 °C, with the freezing line picked out brighter.",
        source: "README, What's on screen",
      },
      {
        title: "A server for one missing header",
        body: "Veðurstofan's station feed sends no CORS header, so the browser cannot read it directly. A small Node server relays it and keeps the accuracy log.",
        source: "README, Observations: Veðurstofa Íslands",
      },
    ],
  },
  {
    slug: "nafnaval",
    title: "Nafnaval",
    kind: "Reference site",
    tagline:
      "Every name in the Icelandic name register, broken into the parts it is built from.",
    summary:
      "Icelandic names are compounds. Þórbjörg is Þór plus björg. That structure is the interesting part, and nothing online let you follow a single element from one name to the next.",
    built:
      "A static site covering the whole mannanafnaskrá: meaning, declension, categories, and how many people carry each name. Every element gets its own page, so you can start at a name and end up somewhere unexpected.",
    interesting:
      "Meaning resolves through a strict precedence chain: hand-written cited entries first, then a lexicon of roughly 215 Old Norse elements sourced to public-domain dictionaries, and only then AI-drafted text, which stays quarantined behind an óstaðfest badge and is never merged into the cited data. The model fills gaps; it does not get to launder itself into a source.",
    insight:
      "AI-drafted meanings are never merged into the cited data. They stay behind an óstaðfest (unconfirmed) badge.",
    stack: ["Astro", "TypeScript", "Static generation"],
    status: "Live",
    facts: [
      { label: "Pages", value: "About 6,000, prerendered" },
      { label: "Lexicon", value: "About 215 Old Norse elements" },
      { label: "Client JS", value: "One filtering island" },
    ],
    repo: "https://github.com/gunnthor/Nafnaval",
    live: "https://nafn.gunnthor.is",
    placement: "feature",
    decisions: [
      {
        title: "A strict order of trust",
        body: "Meaning comes from hand-written cited entries first, then a lexicon sourced to Zoëga (1910) and Cleasby-Vigfusson (1874), then AI drafts marked óstaðfest, and finally ‘not recorded’. Lower levels never overwrite higher ones.",
        source: "README, Hvernig merkingar verða til",
      },
      {
        title: "Tag the element, not the name",
        body: "A category added to an element such as þór applies to every name that contains it, so one decision reaches hundreds of pages.",
        source: "README, Hvernig merkingar verða til",
      },
      {
        title: "Builds never call the sources",
        body: "Bearer counts alone take about 11,000 requests to Þjóðskrá, so data is fetched deliberately and committed. Separate source tests check that upstream APIs still return the shapes the scripts expect, and treat a 429 as inconclusive rather than a failure.",
        source: "README, Skipanir; Heimildir og leyfi; Hýsing",
      },
    ],
  },
  {
    slug: "fasteign",
    title: "Fasteign",
    altTitle: "Fasteignir",
    kind: "Data explorer",
    tagline:
      "A map-first explorer of actual property sales in the Reykjavík capital region.",
    summary:
      "Property prices are usually discussed through asking prices and anecdotes. HMS publishes every registered purchase agreement, which is a far better answer to ‘what do homes here actually sell for’, if you can get at it.",
    built:
      "An Icelandic-language site with a postcode choropleth of the capital region, filters for period, type, size, rooms and build year, market charts, and an address lookup that estimates a value from comparable sales and shows every comparable and its weight.",
    interesting:
      "The simpler model won. A ridge hedonic regression was tested on a time-separated holdout against the comparable-sales baseline and lost clearly, so it stays out of the product. Ingestion keeps source hashes and audit reasons for every row, and the unit assumption in the source data is written down rather than quietly applied.",
    insight:
      "The simpler model won: a ridge regression lost to comparable sales on a time-separated holdout, so it stayed out of the product.",
    stack: ["Next.js", "TypeScript", "MapLibre", "Recharts"],
    status: "In progress",
    statusNote: "Not publicly launched",
    facts: [
      { label: "Source", value: "HMS purchase agreements" },
      // METHODOLOGY.md: "106,963 eligible Capital Region rows" in the current snapshot.
      { label: "Sales", value: "About 107,000 in the region" },
      { label: "Language", value: "Icelandic" },
    ],
    repo: "https://github.com/gunnthor/Fasteignir",
    placement: "feature",
    decisions: [
      {
        title: "The baseline beat the model",
        body: "On 5,281 paired predictions from a time-separated holdout, comparable sales beat a ridge hedonic regression: a median absolute percentage error of about 6.3% against 12.4%. The regression is not deployed, and the evaluation says plainly that one split is not a guarantee.",
        source: "README, Model experiment",
      },
      {
        title: "Small samples stay quiet",
        body: "No price is shown for fewer than five sales, and there is a warning under ten. Shared cards apply the same rule as the app.",
        source: "README, Available now",
      },
      {
        title: "Assumptions are written down",
        body: "The official field descriptions omit the monetary unit, so values are scaled by 1,000 based on the observed source scale. The assumption is stated, and it waits for confirmation from the data owner before public launch.",
        source: "README, Data and methodology",
      },
      {
        title: "Ingestion leaves an audit trail",
        body: "Every row keeps its source timestamp, hash, original fields and normalised audit reasons. A daily job tests, ingests and builds, and leaves the existing site untouched if any step fails.",
        source: "README, Data and methodology; Deploy and automatic refresh",
      },
    ],
  },
  {
    slug: "landlif",
    title: "Landlíf",
    altTitle: "Landsbyggðin lifi",
    kind: "Nonprofit website",
    tagline:
      "The website for an Icelandic nonprofit working to strengthen rural communities.",
    summary:
      "Landsbyggðin lifi is an association for the building up and strengthening of rural Iceland. It needed a public home the people running it could keep current themselves, rather than one that quietly goes stale the moment the developer moves on.",
    built:
      "An Icelandic-language site covering who they are and what they do, with news, photo galleries from events, and a way to get in touch. News and images are edited through a CMS, so the organisation publishes on its own schedule.",
    interesting:
      "It was built to be handed over. Content lives in Sanity so volunteers can post without touching code, and the repository now sits under the organisation's own GitHub account rather than mine. Success here looks like the site staying useful with no involvement from me at all.",
    insight:
      "Built to be handed over: volunteers publish through Sanity, and the code lives under the organisation's own GitHub account.",
    stack: ["Next.js", "TypeScript", "Sanity", "Vercel"],
    status: "Live",
    facts: [
      { label: "Built for", value: "A nonprofit association" },
      { label: "Language", value: "Icelandic" },
      { label: "Content", value: "Edited in Sanity" },
    ],
    repo: "https://github.com/LandsbyggdinLifi/landlif-website",
    live: "https://www.landlif.is",
    placement: "brief",
    syncGithub: false,
  },
  {
    slug: "spinpage",
    title: "SpinPage",
    kind: "Toy",
    tagline: "A theatrical spinning wheel and random picker.",
    summary:
      "Random pickers are usually joyless form controls. The drama is the point: a decision feels fairer when you watch it land.",
    built:
      "A canvas wheel with theatrical timing, sound, grab-and-flick spinning, and lists that persist between visits, so the same set of names is there tomorrow.",
    interesting:
      "The theatre never touches the odds. Every spin draws its winner before the wheel moves, and the stunts only change the route it takes to get there. Flick it by hand and you set the speed, never the result. All of it lives in one index.html with no framework and no build step.",
    insight:
      "The winner is drawn before the wheel moves. The stunts only change the route it takes to get there.",
    stack: ["JavaScript", "Canvas", "Web Audio"],
    status: "Live",
    facts: [
      { label: "Dependencies", value: "None" },
      { label: "Build step", value: "None" },
      { label: "Persistence", value: "Local, per browser" },
    ],
    repo: "https://github.com/gunnthor/SpinPage",
    live: "https://www.ruglad.com",
    placement: "brief",
  },
  {
    slug: "memeguessr",
    title: "MemeGuessr",
    kind: "Game",
    tagline: "A daily game about guessing when memes went viral.",
    summary:
      "Everyone recognises the meme. Almost nobody can place the year. That gap between instant recognition and total vagueness is the whole game.",
    built:
      "Five rounds a game: see the meme, drag a timeline to the month you think it broke, and score by how close you were. A daily mode gives everyone the same memes, and results share as a spoiler-free grid with their own preview card.",
    interesting:
      "It moves the guessing axis from space to time. Virality is a slope rather than a date, so scoring has to reward being roughly right: points fall off with a half-life of about 18 months instead of dropping to zero for a near miss.",
    insight:
      "Virality is a slope, not a date, so points fall off gradually instead of punishing a near miss.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Live",
    facts: [
      { label: "Format", value: "5 rounds, daily or random" },
      { label: "Scoring", value: "Up to 5,000 per round" },
      { label: "Sharing", value: "Grid plus preview card" },
    ],
    repo: "https://github.com/gunnthor/memeguessr",
    live: "https://www.memeguessr.com",
    placement: null,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectNumber(project: Project): string {
  return String(projects.indexOf(project) + 1).padStart(2, "0");
}

export function hasCasePage(project: Project): boolean {
  return Boolean(project.decisions?.length);
}

export const caseProjects = projects.filter(hasCasePage);

/** Slugs that have a case page, for links that must not 404. */
export type CaseSlug = "sagas-of-blood-and-fire" | "iceland-live" | "vindur" | "nafnaval" | "fasteign";

export function byPlacement(placement: Exclude<Placement, null>): Project[] {
  return projects.filter((project) => project.placement === placement);
}
