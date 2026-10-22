# gunnthor.is

Personal portfolio for Gunnþór Karl Rafnsson. It is designed like a survey
sheet: warm paper, a serif typeface, one survey-red accent, real screenshots of
the projects, and a dot map of Iceland in the hero. The canonical domain is
`https://www.gunnthor.is`.

## Stack

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4 (mostly
  for its reset and a few utilities; the design lives in `globals.css`).
- Every route is prerendered, and the case pages use `generateStaticParams`.
  There are two tiny client components: `NavLink`, for `aria-current`, and
  `PlayOnce`, which keeps the hero animation from replaying.
- Newsreader and Geist Mono are self-hosted variable WOFF2 files, loaded with
  `next/font/local`. Their OFL licences sit beside them in `src/app/_assets`.
- There is no CMS, database, analytics or tracking. GitHub data comes from a
  committed snapshot, never from a live request.

## Commands

```sh
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run build && npm start
npm run sync:github  # refresh src/content/github.json, then review and commit
```

## Layout

- `src/app/page.tsx` is the homepage. It has these sections:
  - The hero and its map.
  - The flagship band.
  - More work.
  - About, with the habits that carry over from data work.
  - Contact.
- `src/app/projects/page.tsx` is the project index (the ledger).
- `src/app/projects/[slug]/page.tsx` holds the case pages, for projects with
  verified `decisions`.
- `src/components/HeroMap.tsx` and `src/lib/dot-map.ts` draw Iceland as a dot
  grid, built from Natural Earth (public domain) in `src/content/geo/`.
- `src/components/ProjectParts.tsx` contains the screenshot, status, facts and
  actions shared across pages.
- `src/content/projects.ts` holds the curated project content and is the single
  source of truth.
- `src/content/shots.ts` and `src/content/shots/` hold the screenshots and
  their captions.
- `src/content/site.ts` holds the headline, About text, habits, links and the
  email guard.
- `src/content/github.json` is the snapshot written by
  `scripts/sync-github.ts`.

## Docs

- [Design system](docs/portfolio-design-system.md): tokens, type, patterns and
  motion.
- [Redesign audit](docs/portfolio-redesign-audit.md): what changed and why.
- [Adding a project](docs/adding-a-project.md): content, screenshots and the
  GitHub sync.
- [Email forwarding](docs/email-forwarding.md).

## Content status

All prose is draft copy, and needs approval before launch. `EMAIL` stays `null`
until the mailbox works, so no mail link is rendered. Production builds reject
obvious placeholder addresses.
