# Portfolio redesign audit

October 2026. An audit of the previous design (charcoal and amber, Space Grotesk
and JetBrains Mono, seven alternating project plates), written before the
redesign, with what was done about each finding.

Method: the source was read in full, and the live site was captured with
headless Chrome at 375, 768 and 1440 px. The page heights and type sizes below
come from those captures. Four review roles worked in parallel: creative
direction, UX, project research and motion. Their findings were combined here.
A fifth role, the independent reviewer, then challenged the chosen direction.

## What worked and was kept

- **The copy.** Specific, honest lines such as "the simpler model won" and "a
  stale reading should never be dressed up as a forecast" were the most
  memorable thing on the site. They now lead each project.
- **Curation as a principle.** The content model (idea, what was built, the
  interesting part, facts) was right. It was extended, not replaced.
- **The engineering basics.** Static rendering, self-hosted fonts, no tracking,
  the email guard, the skip link and reduced-motion support.

## Findings, by priority

| # | Finding | Impact | Cost | Resolution |
| - | ------- | ------ | ---- | ---------- |
| 1 | Seven identical plates, so the best work never led. The homepage was 7,068 px at 1440 and 8,614 px at 375, and 63 to 71% of it was plates. | High | M | Three tiers: flagship plates, feature insets and text rows. |
| 2 | Visitors never saw the real products. Every image was an abstract "visual study". | High | M | Real screenshots of the live sites, with honest captions. |
| 3 | `/` and `/projects` rendered the same plates. | High | M | `/projects` is now a scannable ledger. Five projects get case pages. |
| 4 | The strongest material (the "interesting" decisions) appeared only on `/projects`. | High | S | Each project shows its key decision. Case pages list verified decisions with sources. |
| 5 | The specialism was not in the hero. The h1 was a slogan, and the name sat in a `<p>`. | High | S | The h1 now contains the name and a specific headline. The lede names data migration. |
| 6 | Contact was hidden from the mobile nav. | High | S | Projects, About and Contact are visible at every width. |
| 7 | Generic identity: amber on charcoal, a stock font pairing, four two-line slogans, overuse of the accent. | Medium | M | The "Map Sheet" direction (see the design system). |
| 8 | Ninety text nodes under 11 px, some at 7 px. | Medium | S | 12 px minimum. QA now finds no text under 12 px at any width. |
| 9 | Decorative "instrument" labels and ↗ arrows on non-links. | Medium | S | Removed. Arrows appear only on links. |
| 10 | Stale metadata: the descriptions named the wrong projects. | Medium | S | Descriptions are now generated from the content. |
| 11 | Content errors found against the READMEs: MemeGuessr is five rounds per game, not one; Vindur has no npm dependencies, but Leaflet is loaded from a CDN; SpinPage's "ten years" claim was unverifiable. | Medium | S | Corrected in `projects.ts`. |
| 12 | No `aria-current`. The status and name were read before each project heading. Footer links had no new-tab hint. | Low | S | Fixed. |

## Content research summary

- 12 public repositories exist on the account. Seven are curated here, plus
  Landlíf, which is under the organisation's account.
- The rest are coursework and early experiments from 2015 to 2017, plus one
  utility. They are deliberately left on GitHub.
- All seven live URLs returned 200 when checked on 22 October 2026.
- **Fasteign:** fasteign.gunnthor.is responds, but its README says it has not
  launched. The site therefore shows it as "not publicly launched" and gives no
  live link until the owner decides.

## Decisions taken without asking

These are reversible, and all are listed in the final report:

- The headline and lede copy are drafts.
- Real screenshots of the owner's own live projects are used. Screenshots are
  not used where they would show third-party imagery: MemeGuessr shows meme
  images and Landlíf shows the organisation's photographs.
- MemeGuessr stays off the homepage, as in the previous commit.
