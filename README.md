# gunnthor.is

Personal portfolio for Gunnþór Karl Rafnsson. Static, text-led, dark.

Production domain (not yet deployed): `https://www.gunnthor.is`

## Stack

- **Next.js 16** (App Router) — every route is statically prerendered
- **React 19**
- **TypeScript 5.9**, strict, with `noUncheckedIndexedAccess`
- **Tailwind CSS 4** — theme tokens defined in `src/app/globals.css`
- **next/font** — Space Grotesk + JetBrains Mono, self-hosted at build time
  (`latin-ext` subset included; the Icelandic glyphs þ ð æ ö require it)

No CMS, no database, no analytics, no tracking, and no client components — the
site ships zero `"use client"` files.

## Commands

```sh
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # production build
npm start          # serve the production build
```

## Layout

```
src/
  app/
    layout.tsx            root layout, fonts, metadata
    page.tsx              homepage: hero, selected work, about, contact
    projects/page.tsx     curated project index
    opengraph-image.tsx   1200x630 social preview, rendered at build time
    globals.css           design tokens + the dot-field animation
    icon.svg              favicon
    sitemap.ts robots.ts
    _assets/              TTF used only by the OG image generator (OFL)
  components/             SiteHeader, SiteFooter, ProjectPlate, SectionLabel, DotField
  content/
    projects.ts           ALL project copy — the single source of truth
    site.ts               name, links, statement, about, email
  lib/rng.ts              seeded PRNG for the dot field
docs/
  adding-a-project.md     how to add or edit a project
```

## Design notes

Direction is "Data Lab": near-black canvas, technical grotesk with monospace
metadata, and exactly one accent (`--color-signal`, amber `#ff9e3d`) rationed to
links on hover, focus rings, section markers and status dots.

The hero dot field is the "data in motion" motif — dots arrive scattered and
settle into an ordered grid, a few still lit. It is pure CSS with server-rendered
offsets from a seeded PRNG (so server and client markup match), and it is
completely still under `prefers-reduced-motion: reduce`, where the resolved grid
is the default state.

Every foreground/background pair in the palette meets WCAG AA (4.5:1).

## Content

Do not add projects by editing components. See
[`docs/adding-a-project.md`](docs/adding-a-project.md).

## Before launch

- [ ] Approve all draft copy in `src/content/projects.ts` and `src/content/site.ts`
- [ ] Set up `gunnthor@gunnthor.is` and switch `EMAIL` on — see
      [`docs/email-forwarding.md`](docs/email-forwarding.md)
- [ ] Confirm every `live` URL still resolves

## Contact email

`src/content/site.ts` exports `EMAIL`, currently `null`. While it is null the
site renders no email anywhere — no dead `mailto:` link. The intended address is
`gunnthor@gunnthor.is`; switch it on only after a test message actually arrives.
A production build refuses to run if `EMAIL` is set to an obvious placeholder.
