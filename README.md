# gunnthor.is

Personal portfolio for Gunnþór Karl Rafnsson: a dark editorial design with six
curated projects, abstract visual studies, and an emphasis on typography.
Canonical domain: `https://www.gunnthor.is`.

## Stack

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4.
- Both `/` and `/projects` are statically prerendered Server Components.
- No custom client components, animation dependencies, CMS, analytics, or tracking.
- Space Grotesk and JetBrains Mono are bundled variable WOFF2 files, loaded with
  `next/font/local`. Builds and visitors do not request Google Fonts. The Latin
  subsets include Icelandic characters. OFL licenses are beside the fonts.

## Commands

```sh
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
npm start
```

## Layout

- `src/app/page.tsx`: introduction, selected work, About, and Contact.
- `src/app/projects/page.tsx`: complete project index with implementation notes.
- `src/app/globals.css`: palette, layout, typography, responsive rules, and motion.
- `src/components/ProjectPlate.tsx` and `project-plate.css`: alternating project features.
- `src/components/ProjectVisual.tsx` and `project-visuals.css`: decorative SVG studies.
- `src/components/DotField.tsx`: deterministic server-rendered hero graphic.
- `src/content/projects.ts`: project copy, stacks, status, facts, and destinations.
- `src/content/site.ts`: name, statement, About copy, social links, and email setting.
- `src/app/_assets`: bundled fonts and licenses, including the TTF for the social image.
- `src/app/opengraph-image.tsx`, `icon.svg`, `sitemap.ts`, `robots.ts`: sharing and discovery.

## Design and motion

Charcoal, warm off-white, and a restrained amber accent (`#e8aa65`). Large
headlines, thin rules, numbered sections, and alternating project compositions
replace the former card grid. On mobile, each visual leads into its project text.

The project graphics are **visual studies**, labelled as such; they are not
screenshots, live data, or claims about results. SVGs are decorative and hidden
from assistive technology. All actual project information is rendered as HTML.

Entrance animations and scroll-driven reveals use CSS. Browsers without view
timelines show content normally. `prefers-reduced-motion` disables all animation,
transitions, and smooth scrolling. The sticky header and links remain keyboard
accessible, with a skip link and visible focus outlines.

## Content and launch

See [adding a project](docs/adding-a-project.md) for content maintenance.
The source descriptions are retained; review draft copy before publishing.
Before launch, confirm live project destinations and review the preview.

`EMAIL` remains `null`, so no unconfigured mail link is rendered. Only enable the
intended address after a test message arrives; see
[email forwarding](docs/email-forwarding.md). Production rejects obvious placeholders.
