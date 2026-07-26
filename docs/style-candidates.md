# Style candidates — next wave of themes

Curated popular UI styles for the next themes. Unlike the first eleven (which
differ mostly in tokens), each of these has a **layout signature** — the same
component library composed into a genuinely different page structure and feel.
Once styles are picked, we'll pull real screen references from Mobbin to nail
each one's layout patterns before building.

Pick any — they're ordered roughly by how popular/recognizable they are right now.

---

## 1. Bento grid
- **Vibe:** Apple-keynote modernism. Dense, confident, product-led.
- **Layout signature:** The page *is* a grid of mixed-size rounded tiles.
  No linear hero→features→pricing flow — stats, features, testimonials all
  live as tiles in one asymmetric bento. Big numerals, tight captions.
- **References on Mobbin:** Apple product pages, Vercel, Raycast, Arc.

## 2. Linear-style dark product
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
