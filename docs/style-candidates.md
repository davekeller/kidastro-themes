# Style candidates — next wave of themes

Curated popular UI styles for the next themes. Unlike the first eleven (which
differ mostly in tokens), each of these has a **layout signature** — the same
component library composed into a genuinely different page structure and feel.
Once styles are picked, we'll pull real screen references from Mobbin to nail
each one's layout patterns before building.

Pick any — they're ordered roughly by how popular/recognizable they are right now.

## Mobbin reference links (collected 2026-07-26, requires Mobbin login)

| Style | App | Mobbin link |
|---|---|---|
| 3. Aurora / mesh SaaS | Stripe (Web) | https://mobbin.com/apps/stripe-web-eb1841ea-0570-46eb-941f-a8e5299355b9/440663ee-4753-46d5-9e1f-da18626239df/screens |
| 4. Neubrutalism | Gumroad (Web) | https://mobbin.com/apps/gumroad-web-6c339505-21ed-447d-97f3-fb370fc87f27/02da1ada-e218-4ca4-aed0-15407a98f399/screens |
| 6. Glassmorphism / spatial | Luma (iOS) | https://mobbin.com/apps/luma-ios-bead4230-994f-47c2-9311-5049bf7bcace/3f5f743f-38ad-40d2-b8ed-9393d2dd4591/screens |
| 7. Claymorphism | Duolingo (Web) | https://mobbin.com/apps/duolingo-web-c8571c60-4f35-493c-8ab7-e1f3050e325f/d9c57c21-8cb3-42bd-adfa-839de415dba8/screens |
| 7. Claymorphism (alt) | Headspace (Web) | https://mobbin.com/apps/headspace-web-4f19322b-0573-4251-95ad-620741def1a6/1d7943f7-fafc-4416-8f7f-1a2124bf3cfd/screens |
| 8. Editorial broadsheet | Substack (Web) | https://mobbin.com/apps/substack-web-3c1dd931-1022-4a33-a776-c466d66c5f34/a942838d-55d6-4190-8b19-0aa5068b6663/screens |
| 9. Y2K / retro-futurism | Poolsuite FM (iOS) | https://mobbin.com/apps/poolsuite-fm-ios-e0d2288d-bd38-4c67-9ab1-0d79b76c0a44/5ff57f7c-1abb-4a86-b70c-085cd698044d/screens |
| 11. Organic hand-drawn | Notion (Web) | https://mobbin.com/apps/notion-web-33c9cc81-4dd5-46cd-8a0b-15d46b137668/17ff231d-68df-43ef-9952-f2a4d677318d/screens |

Not on Mobbin (browse directly): Swiss typographic → readymag.com/explore + swissted.com;
Spec-sheet mono → teenage.engineering; Kinetic type / agency → awwwards.com.
Arc Browser (glassmorphism) is desktop-only and not indexed on Mobbin.

---

## 1. Bento grid ✅ *built — theme `bento`*
- **Vibe:** Apple-keynote modernism. Dense, confident, product-led.
- **Layout signature:** The page *is* a grid of mixed-size rounded tiles.
  No linear hero→features→pricing flow — stats, features, testimonials all
  live as tiles in one asymmetric bento. Big numerals, tight captions.
- **References on Mobbin:** Apple product pages, Vercel, Raycast, Arc.

## 2. Linear-style dark product ✅ *built — theme `linear`*
- **Vibe:** Dev-tool precision. Quiet, engineered, premium dark.
- **Layout signature:** Narrow centered column, small dense type, feature
  *rows* (not cards) alternating text/screenshot, hairline gradient borders,
  glowing keylines, keyboard-shortcut chips. Everything feels 1px-perfect.
- **References:** Linear, Resend, Planetscale, Warp.

## 3. Aurora / gradient-mesh SaaS
- **Vibe:** Stripe-era optimism. Light, airy, trustworthy but colorful.
- **Layout signature:** Diagonal mesh-gradient hero bleeding behind floating
  UI screenshots, sections separated by soft color washes rather than borders,
  generous whitespace, angled section dividers.
- **References:** Stripe, Mercury, Ramp, Retool.

## 4. Neubrutalism (playful flavor)
- **Vibe:** Gumroad/Figma-community energy. Loud, sticker-like, fun.
  (Different from our stark `brutalist`: this one is *candy-colored* chaos.)
- **Layout signature:** Overlapping elements, rotated stickers/badges, thick
  black outlines on flat fills, hard offset shadows, marquee text strips,
  zig-zag section seams.
- **References:** Gumroad, Figma marketing, Poolsuite-adjacent indie tools.

## 5. Swiss / International typographic
- **Vibe:** Museum poster. Rigorous, intellectual, timeless.
- **Layout signature:** Exposed 12-column grid with visible rules, numbered
  sections (01–06), huge flush-left headlines, almost **no cards or shadows**
  — hierarchy comes purely from type scale and rule lines. Footnote-style meta.
- **References:** Studio/agency portfolios, ETH-style sites, Readymag showcases.

## 6. Glassmorphism / spatial
- **Vibe:** visionOS depth. Futuristic, layered, luminous.
- **Layout signature:** Frosted translucent panels floating at different
  depths over a vivid ambient background, overlapping z-layers, soft big-radius
  cards, glow accents. Nav floats as a glass pill.
- **References:** visionOS apps, macOS widgets, music/creative apps on Mobbin.

## 7. Claymorphism / soft 3D
- **Vibe:** Toy-like, friendly, bouncy. Duolingo-grade approachability.
- **Layout signature:** Puffy extruded surfaces (inner + outer shadows),
  chunky full-width buttons, mascot-scale illustration slots, stacked rounded
  sections like plush layers. Everything feels squeezable.
- **References:** Duolingo, Headspace, kids/fintech-lite apps.

## 8. Editorial broadsheet
- **Vibe:** NYT-meets-Substack. Literary, dense, human.
  (Deeper than our `editorial` theme: this changes the *layout*, not just serif tokens.)
- **Layout signature:** Multi-column article grid, drop caps, pull quotes
  breaking the column, bylines/datelines, ruled horizontal dividers, footer
  as a newspaper colophon. Hero is a headline stack, not a marketing hero.
- **References:** NYT apps, The Browser, Substack reader, Are.na.

## 9. Y2K / retro-futurism
- **Vibe:** Chrome, glitter, dial-up nostalgia — back in fashion.
- **Layout signature:** Center-stacked "desktop" with window-chrome panels
  (title bars, close buttons), pixel fonts for meta text, starburst badges,
  marquee tickers, bevel borders. Sections framed as OS windows.
- **References:** Poolsuite, indie music sites, fashion drops.

## 10. Brutalist utility / mono spec-sheet
- **Vibe:** Technical datasheet. Raw information design, zero decoration.
- **Layout signature:** Full-width data tables as the primary layout element,
  monospace everything, visible section IDs (A.1, A.2), dotted leader lines,
  index/table-of-contents navigation, no imagery at all.
- **References:** Teenage Engineering, SSENSE, spec-style portfolios.

## 11. Organic hand-drawn
- **Vibe:** Notion-meets-zine. Warm, personal, imperfect.
- **Layout signature:** Squiggly underlines and hand-drawn arrows connecting
  sections, tilted polaroid-style cards, doodle dividers, asymmetric margins
  that feel pasted-up rather than gridded.
- **References:** Notion marketing, Tally, indie newsletters.

## 12. Kinetic type / agency
- **Vibe:** Awwwards portfolio. Confident, showy, motion-first.
- **Layout signature:** Oversized display type as the primary visual (words
  fill the viewport), horizontal marquee strips, hover-reveal media, sticky
  scroll-pinned sections, footer as a giant contact headline.
- **References:** Agency sites, personal portfolios, fashion editorials.

---

## How these will be built (the hybrid model)

Per `plan.md` §4, themes that earn it get **per-theme composition**: the
component library stays shared, but a theme can ship its own showcase layout
(`src/showcases/<slug>.tsx`) instead of the default `ThemeShowcase`. Tokens
still drive all styling; the layout file only *arranges* shared components
(plus, where needed, theme-specific section variants that still obey the
token-only rule).
