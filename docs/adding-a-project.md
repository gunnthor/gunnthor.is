# Adding or updating a project

Project content lives in [`src/content/projects.ts`](../src/content/projects.ts).
GitHub supplies only dates and a licence, through a committed snapshot. The
site is a curated selection, not a mirror of the account.

## The rules

1. **Never publish a repository without deciding to.** A new public repo does not
   belong here automatically. `npm run sync:github` lists uncurated repos so you
   can decide; it never adds them.
2. **Never state an outcome you cannot point at.** No user counts, no "increased
   X by Y", no testimonials. Every entry in `decisions` names the README section
   it came from, so it can be checked.
3. **Do not paste README text.** The README explains how to run the thing. This
   explains why it exists.
4. **A repository is not proof of a deployment.** Only set `live` for a URL you
   have opened and intend people to visit.

## Steps

1. Copy an existing entry in `projects.ts` and fill in every field (table below).
   Array order is the numbering and the index order.
2. Choose `placement`: `"flagship"` (large plate with a screenshot, keep it to
   three), `"feature"` (half-width inset, two), `"brief"` (text row) or `null`
   (index only).
3. Add `decisions` only when you have at least three verified ones. That is what
   gives a project its own page at `/projects/[slug]`.
4. Add a screenshot if the project is a flagship or feature (see below).
5. `npm run sync:github` to pick up the repository dates, then review the diff of
   `src/content/github.json`.
6. Run the checks: `npm run typecheck && npm run lint && npm run build`.

## Fields

| Field | What goes in it |
| ----- | --------------- |
| `slug` | URL-safe id, used for `/projects/[slug]` and `#anchors`. |
| `title`, `altTitle` | What you call it, and the repo name if different. |
| `kind` | Two words: "History map", "Reference site", "Toy". |
| `tagline` | One sentence: what the thing actually is. |
| `summary` | The idea or the problem. |
| `built` | What you built. Concrete nouns. |
| `interesting` | The decision worth reading about. |
| `insight` | One sentence from `interesting`, shown where space is tight. |
| `stack` | Main technologies, most significant first. Three or four. |
| `status`, `statusNote` | `Live` or `In progress`, plus an optional qualifier such as "Not publicly launched". |
| `facts` | Two or three short, checkable rows. Under about 30 characters each. |
| `repo`, `live` | GitHub URL (organisation repos work). Live URL only if it is public. |
| `placement` | See above. |
| `decisions` | `{ title, body, source }`. `source` is the README section. |
| `syncGithub` | `false` to keep a repo out of the metadata sync. |

## Screenshots

Screenshots live in `src/content/shots/` and are registered in
[`src/content/shots.ts`](../src/content/shots.ts) with alt text, capture date,
and any credit or note that was visible in the app.

- Capture at 1440 × 900 and 2× density. Save `name.webp` (resized to 2400 px wide,
  quality 80) and `name-detail.webp` (a square crop of the most distinctive part,
  1000 px), which narrow screens get instead.
- Keep map attribution: copy it into `credit` exactly as the app shows it.
- Do not publish screenshots that show third-party imagery (photos, memes) or
  projects that are not public. Use an illustration labelled as one instead,
  like `FasteignIllustration.tsx`.
- Recapture when the app changes visibly, and update `captured`.

## The GitHub snapshot

`scripts/sync-github.ts` reads the curated repo URLs, fetches their metadata and
writes `src/content/github.json`. It uses `GITHUB_TOKEN`, then the signed-in
`gh` CLI, then unauthenticated requests. A failed repo keeps its previous entry; a
rate limit stops the run without writing. Builds never call GitHub.

## Fonts

The Newsreader files in `src/app/_assets` are subset. A character outside
Latin-1 and common punctuation falls back to Georgia. To add one, start from
the Google Fonts Latin WOFF2 and rerun (with `pip install fonttools brotli`):

```sh
fonttools varLib.instancer Newsreader.woff2 wght=300:500 -o lim.ttf
pyftsubset lim.ttf --flavor=woff2 --layout-features='*' --output-file=Newsreader-Latin.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2013,U+2018-201E,U+2022,U+2026,U+2032-2033,U+2039-203A,U+20AC,U+2122,U+2190-2199,U+2212"
```

## Site-wide text

Headline, lede, About paragraphs, the three "habits", role line and social
links live in [`src/content/site.ts`](../src/content/site.ts). Each habit must
point at a documented project decision.

## The email address

`EMAIL` in `site.ts` stays `null` until the `gunnthor@gunnthor.is` mailbox
actually accepts mail. While it is null the site shows no email at all. See
[email-forwarding.md](email-forwarding.md).
