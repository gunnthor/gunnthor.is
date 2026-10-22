/**
 * Site-wide constants. Everything a visitor reads that is not project copy
 * lives here so it can be reviewed in one place.
 */

import { caseProjects, type CaseSlug } from "./projects";

/**
 * The intended public contact address.
 *
 * The mailbox does NOT exist yet. See docs/email-forwarding.md for how to set
 * it up. Until it accepts mail, the site deliberately shows no email at all
 * rather than a mailto: link that silently goes nowhere.
 *
 * To switch it on, once you have sent a test message and received it:
 *
 *   export const EMAIL: string | null = INTENDED_EMAIL;
 */
export const INTENDED_EMAIL = "gunnthor@gunnthor.is";

export const EMAIL: string | null = null;

/** Addresses that must never reach production, whatever else happens. */
const NEVER_SHIP = /example\.(invalid|com|org|net)$|YOUR-EMAIL-HERE|@localhost$/i;

if (
  process.env.VERCEL_ENV === "production" &&
  EMAIL !== null &&
  NEVER_SHIP.test(EMAIL)
) {
  throw new Error(
    `Refusing to build for production with a placeholder email address (${EMAIL}). ` +
      "Set a real, tested address in src/content/site.ts, or leave EMAIL as null.",
  );
}

export const site = {
  name: "Gunnþór Karl Rafnsson",
  shortName: "Gunnþór",
  url: "https://www.gunnthor.is",
  location: "Iceland",
  role: "Data migration · AI experiments · Software",
  /** DRAFT: hero headline. The tail keeps the claim honest about the non-data projects. */
  headline: "Maps and tools built on Iceland's public data,",
  headlineTail: "and a\u00a0few experiments.",
  /** DRAFT: hero supporting line. Generic on purpose: never name an employer or clients. */
  lede: "By day I work in data migration and integration. In my spare time I build things with public data, and use them as an excuse to experiment with AI.",
  about: [
    "I spend my working life moving data between systems that were never meant to talk to each other: reconciling shapes, chasing down the records that do not fit, and making sure nothing quietly disappears in transit.",
    "Outside that, I build small things properly. Most of what is here started as a question I could not answer by searching, so I built the thing that answers it. I like projects where the hard part is the data model rather than the framework, and I would rather ship something narrow and finished than broad and vague.",
  ],
  links: {
    github: "https://github.com/gunnthor",
    linkedin: "https://is.linkedin.com/in/gunnthor",
  },
  metaDescription:
    "Gunnþór Karl Rafnsson works in data migration and builds maps and tools from Iceland's public data: earthquakes, sagas, wind, names and house sales.",
} as const;

/**
 * Habits from migration work that show up in the projects. DRAFT copy.
 * Each one must point at a project decision documented in that project's
 * README (see `decisions` in projects.ts).
 */
export const habits: {
  title: string;
  body: string;
  evidence: { slug: CaseSlug; label: string }[];
}[] = [
  {
    title: "Say what was measured and what was modelled.",
    body: "Vindur switches its station markers to model values the moment you scrub away from now, and says so. Iceland Live states that its dispersal runs are simulations before it lists a single one.",
    evidence: [
      { slug: "vindur", label: "Vindur" },
      { slug: "iceland-live", label: "Iceland Live" },
    ],
  },
  {
    title: "Sources outrank models.",
    body: "In Nafnaval, cited dictionary entries always win. AI-drafted meanings fill the gaps behind an óstaðfest badge and are never merged into the cited data.",
    evidence: [{ slug: "nafnaval", label: "Nafnaval" }],
  },
  {
    title: "Keep the simpler model when it wins.",
    body: "Fasteign tested a ridge regression against plain comparable sales on a time-separated holdout. The regression lost, so it stayed out of the product.",
    evidence: [{ slug: "fasteign", label: "Fasteign" }],
  },
];

/* Fail the build if a habit links to a project without a case page, which
   would otherwise ship as a 404 because case routes are static. */
for (const { slug } of habits.flatMap((habit) => habit.evidence)) {
  if (!caseProjects.some((project) => project.slug === slug)) {
    throw new Error(`Habit evidence "${slug}" has no case page. Add decisions to it in projects.ts.`);
  }
}
