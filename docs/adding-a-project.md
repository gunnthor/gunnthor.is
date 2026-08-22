# Adding or updating a project

All project content lives in one file: [`src/content/projects.ts`](../src/content/projects.ts).
Nothing is fetched from the GitHub API at build time or at runtime. The site is a
curated selection, not a mirror of the account — ordering and emphasis are
editorial decisions.

## The rules

1. **Never publish a repository without deciding to.** A new public repo does not
   belong here automatically.
2. **Never state an outcome you cannot point at.** No user counts, no "increased
   X by Y", no testimonials. If a number is not in the README, the repo, or your
   own records, leave it out.
3. **Do not paste README text.** The README explains how to run the thing. This
   explains why it exists.
4. **Check the live link still works** before shipping a change.

## Steps

1. Open `src/content/projects.ts` and copy an existing entry.
2. Fill in every field (see the table below).
3. Put it in the position you want it read. Array order is display order, on the
   homepage and on `/projects`.
4. Set `featured: true` to show it on the homepage. Four is a comfortable maximum;
   past that the homepage stops being a selection.
5. Run the checks:

   ```sh
   npm run typecheck && npm run lint && npm run build
   ```

## Fields

| Field         | What goes in it                                                                 |
| ------------- | ------------------------------------------------------------------------------- |
| `slug`        | URL-safe id. Used for heading anchors now, and `/projects/[slug]` later.         |
| `title`       | What you call it.                                                                |
| `altTitle`    | Optional. The repository name, when it differs from the title.                   |
| `tagline`     | One sentence: what the thing actually is. No throat-clearing.                    |
| `summary`     | The idea or the problem. Why did this need to exist?                             |
| `built`       | What you built. Concrete nouns.                                                  |
| `interesting` | The one decision worth reading about — a constraint, a tradeoff, a rule.         |
| `stack`       | Main technologies, most significant first. Three or four, not everything.        |
| `status`      | `Live`, `In progress` or `Archived`.                                             |
| `facts`       | 3–4 key/value rows. Short values — they render as a single-line spec sheet.      |
| `repo`        | GitHub URL.                                                                      |
| `live`        | Live URL. Omit the field entirely if there is not one; the card adapts.          |
| `featured`    | `true` to show on the homepage.                                                  |

### Writing `facts`

These render right-aligned in a mono column, one per line. Keep values under about
30 characters or they will wrap and lose the spec-sheet look. Prefer concrete,
checkable things:

```ts
facts: [
  { label: "Scale",     value: "~6,000 prerendered pages" },
  { label: "Sources",   value: "island.is · Þjóðskrá · BÍN" },
  { label: "Client JS", value: "One filtering island" },
],
```

Avoid vague labels like "Impact" or "Result" — that is where invented metrics
creep in.

## Removing a project

Delete the entry. Nothing else references it by slug, so nothing breaks.

## Changing site-wide text

Intro statement, about paragraphs, role line, and the social links live in
[`src/content/site.ts`](../src/content/site.ts).

## The email address

`src/content/site.ts` exports `EMAIL`. It is `null` until the
`gunnthor@gunnthor.is` mailbox actually accepts mail, and while it is null the
site shows no email at all rather than a `mailto:` that goes nowhere. See
[email-forwarding.md](email-forwarding.md).
