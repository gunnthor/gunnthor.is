/**
 * Site-wide constants. Everything a visitor reads that is not project copy
 * lives here so it can be reviewed in one place.
 */

/**
 * The intended public contact address.
 *
 * The mailbox does NOT exist yet — see docs/email-forwarding.md for how to set
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
  role: "Data migration · AI experiments",
  statement:
    "I work with data, explore AI, and turn curious ideas into working products.",
  about: [
    "I spend my working life moving data between systems that were never meant to talk to each other — reconciling shapes, chasing down the records that do not fit, and making sure nothing quietly disappears in transit.",
    "Outside that, I build small things properly. Most of what is here started as a question I could not answer by searching, so I built the thing that answers it. I like projects where the hard part is the data model rather than the framework, and I would rather ship something narrow and finished than broad and vague.",
  ],
  links: {
    github: "https://github.com/gunnthor",
    linkedin: "https://is.linkedin.com/in/gunnthor",
  },
  metaDescription:
    "Gunnþór Karl Rafnsson works with data, explores AI, and turns curious ideas into working products. Selected projects: Nafnaval, Sagas of Blood & Fire, MemeGuessr and SpinPage.",
} as const;
