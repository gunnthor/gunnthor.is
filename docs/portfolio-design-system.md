# Design system: "Map Sheet"

The site is set like a survey sheet: warm paper, black ink, a graticule, a
legend, and one survey-red accent. Most of the projects are maps or Icelandic
public data, so the cartographic language is the subject itself, not a
costume. The tokens live in `src/app/globals.css` under `:root`.

## Why this direction

Two concepts were compared:

- **A: Map Sheet.** Light, serif, cartographic.
- **B: Manifest.** Dark graphite, condensed sans, a records table that snaps
  into alignment.

A won on originality, readability, suitability for map work and mobile
adaptability. B was closer to the old dark developer look, and its hover
previews do nothing on touch screens.

The independent review changed the plan in several ways:

- Dark screenshots are grouped into one deliberate ink band.
- The hero has no invented markers.
- The headline is scoped so it does not over-claim.
- There are two motion systems instead of three.
- Every caption carries a capture date and the required credits.

## Colour

| Token | Hex | Use | Contrast |
| ----- | --- | --- | -------- |
| `--paper` | `#f2f0e9` | Page background | n/a |
| `--sheet` | `#faf9f5` | Raised surfaces, illustration ground | n/a |
| `--ink` | `#16181b` | Text, rules that carry meaning, buttons | 16:1 on paper |
| `--muted` | `#5a5e63` | Secondary text and meta | 5.8:1 on paper |
| `--rule` | `#c9c6bc` | Decorative hairlines only | 1.6:1, never a state |
| `--rule-strong` | `#85827a` | UI boundaries, underlines | 3.3:1 on paper |
| `--accent` | `#b8321a` | One CTA, numbering, focus ring, hover | 5.2:1 on paper |
| `--night` | `#16181b` | The flagship band | n/a |
| `--night-text` | `#eceae3` | Text on night | 14:1 |
| `--night-muted` | `#a3a6a8` | Meta on night | 7:1 |
| `--night-accent` | `#f0603a` | Accent on night | 5.4:1 |

The accent is rationed. It marks the primary CTA, section numbers, "The
decision" labels, the current nav item and focus. Live status uses a small
green dot, never green text.

## Typography

- **Newsreader** (OFL, variable `opsz` 6 to 72, trimmed to `wght` 300 to 500).
  Used for display and reading type. Optical sizing is automatic, so 90 px
  headlines get the display cut and 18 px body text gets the text cut. The
  quieter half of a headline is set in muted roman.
- **Geist Mono** (OFL, `wght` 400 to 600). Used for meta, labels, facts, nav
  and buttons, uppercase with 0.06em tracking, never below 12 px.
- Both are self-hosted subsets: Latin-1 plus typographic punctuation, which
  covers þ ð æ ö á é í ó ú ý. The serif is 116 KB and the mono 23 KB, both
  preloaded.
- There is no italic. It added 127 KB to the critical path for two
  half-headlines; dropping it took mobile Lighthouse performance on the home
  page from 88 to 94.
- Newsreader has a Times New Roman metric fallback to limit layout shift.
- Refer to the subsetting commands in the "Fonts" section of
  `docs/adding-a-project.md` if a new character is needed.

| Token | Size | Use |
| ----- | ---- | --- |
| `--text-hero` | 2.6 to 5.75 rem | h1, contact heading |
| `--text-display` | 2.2 to 4.4 rem | Section and page headings |
| `--text-title` | 1.9 to 3.1 rem | Flagship titles |
| `--text-heading` | 1.45 to 1.95 rem | Inset and ledger titles |
| `--text-lede` | 1.18 to 1.45 rem | Taglines, ledes |
| `--text-body` | 1.125 rem | Body, 1.6 line height |
| `--text-meta` | 0.75 rem | Mono meta |

Display type uses weight 340 to 360 and -0.02 to -0.025em tracking. Measure is
capped at about 34 to 40em.

## Space and grid

- The container is `min(100% - 2 × gutter, 1320px)`, with a gutter of
  `clamp(20px, 4.5vw, 56px)`.
- Section padding is `clamp(64px, 8.5vw, 128px)`.
- Desktop compositions use a 12-column grid with a 32 px column gap.
  Breakpoints are content-driven: 480, 640, 720, 840, 900 and 960 px.
- All interactive targets are at least 44 px tall. Tested widths are 320, 375,
  430, 768, 1024 and 1440, with no horizontal overflow at any of them.

## Surfaces and patterns

- **Rules, not cards.** Sections are separated by ink or hairline rules, and
  there are no rounded cards or shadows.
- **Screenshots.**
  - Light screenshots sit on an ink mat (`.shot--matted`), so they never merge
    into the page.
  - Dark screenshots live in the night band.
  - The aspect ratio is fixed at 16:10, and narrow screens get a square,
    art-directed crop through `<picture>`.
  - Every caption gives the kind of image, the host, the capture date, and any
    note or credit.
- **Flagship plate.** Uses three layouts in sequence: wide, side and flipped
  side. Content order is title, meta, tagline, "The decision", facts, actions.
- **Feature inset.** Half width, matted image, meta, title, tagline, insight,
  actions.
- **Brief row.** Number, title and tagline, kind and stack, actions.
- **Facts.** A `dl` with mono labels and serif values, between hairlines.
- **Ledger.** The project index. Rows without a case page expand in place with
  `<details>`.

## Links and buttons

- `.btn` is a solid accent block (ink in its quiet variant, paper on night),
  with mono uppercase text at 13 px and a 50 px height.
- `.action` is a mono uppercase text action. Its arrow says where it goes: ↗
  means external and opens a new tab (also announced to screen readers), → is
  internal and ↓ jumps within the page.
- `.link` is an inline serif link with a 1px underline that turns accent on
  hover.

## Motion

| Token | Value |
| ----- | ----- |
| `--dur-fast` | 160 ms, colour feedback |
| `--dur-base` | 240 ms, arrows, small transforms |
| `--dur-slow` | 420 ms, shared image transition |
| `--ease-out` | `cubic-bezier(.22, 1, .36, 1)`, arrivals |
| `--ease-standard` | `cubic-bezier(.4, 0, .2, 1)` |
| `--ease-in` | `cubic-bezier(.4, 0, 1, 1)`, exits |

There are only two motion systems:

1. **Hero map, "count to coast".** Each row of dots starts packed to the
   left, as a histogram of land by latitude. It then slides to its true
   position.
   - Rows go 760 ms each with `--ease-out`, starting 24 ms apart.
   - The coastline fades in last, and the whole sequence ends at about 1.9 s.
   - It plays once per visit (`PlayOnce`) and only animates `transform`.
   - The resting state is the finished map, so reduced motion, printing and
     browsers without animation see the map directly.
2. **Route transitions** using React `<ViewTransition>`, with no config
   needed in Next 16.
   - Pages crossfade: 140 ms out, 280 ms in, with an 8 px rise.
   - A screenshot morphs from its homepage plate into its case page.
   - The header is excluded from the transition so it stays still.
   - Under reduced motion every duration is 0.

Rejected after review: a crosshair cursor, text scrambles, pulsing live dots,
scroll-jacking, parallax, and scroll-reveal fades, which made content look
disabled in captures and on fast flings.

## Accessibility

- One h1 per page, with a logical heading order. The hero h1 contains the
  name.
- The focus ring is a 2 px accent outline with a 4 px offset, and switches to
  the night accent inside the band.
- Decorative SVG is `aria-hidden`. The hero map's facts are in a visible
  `figcaption`. The Fasteign illustration is `role="img"` with a label.
- Every screenshot has descriptive alt text.
- `forced-colors` and print styles are included.
