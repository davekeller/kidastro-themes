# CLAUDE.md — conventions for AI tools working in this repo

This project is a gallery of UI themes. Its whole value is that components are
**token-driven and portable**. Follow these rules so themes stay swappable and
reusable.

## The golden rule

Style with **tokens only**. Never hardcode a hex color, font family, radius,
shadow, **or timing** in a component. If you reach for `#fff`, `text-gray-500`,
`rounded-[6px]`, `duration-300`, `ease-out`, `hover:-translate-y-1`, or a literal
font — stop and use a token instead.

## The model: skin × palette

A theme is a **skin** wearing a **palette** — two attributes on one wrapper:

- `data-skin` is the **form**: radius, elevation *geometry*, type, and the
  skin's baked-in motion feel.
- `data-palette` is the **color**, one of `light` / `dark` / `fun`. Every skin
  ships all three. It owns every color token plus `--shadow-ink`, the ink the
  skin's shadows are drawn in — that split is what lets one hard offset shadow
  read on paper and on charcoal.

Contract and how-to: [docs/skin-contract.md](docs/skin-contract.md). Every
palette is checked for WCAG AA by `npm run contrast`.

**The active pair lives on `<body>`** (`src/lib/skin-state.ts`) and a skin's
pages wear it: `index.html` restores the saved pair before first paint (a
`/skin/<slug>` deep link wins over the saved skin), `applySkin` /
`applyPalette` change it, `useSkinState()` reads it. Body rather than `<html>`
because `:root` and `[data-skin]` tie on specificity and the `:root` defaults
come later in `index.css` — a skin on `<html>` would lose its form tokens.
Anything that needs its *own* skin (a thumbnail, a swatch) sets the attributes
on itself; the nearest ancestor wins. That's also how the app's own chrome stays
put: the house rail and the Themes list set the **house skin** — Kid Astro ·
Deep space, `HOUSE_SKIN` / `HOUSE_PALETTE` in `src/skins` — on themselves, so
only a skin's content area turns into that skin. Kid Astro is also the default
pair for a first visit.

**App structure** — `/` is the Themes list; `/skin/:slug` is a skin's Page view,
`/skin/:slug/components` its component library, `/skin/:slug/guide` its style
guide, all inside the shell (`src/components/shell`). The shell is the house
rail (`HouseRail.tsx`: Themes, the skins, the legacy pages — collapsed to icons
by default, expandable from lg up, a drawer at phone width) beside the content
area, whose sticky top bar (`TopBar.tsx`) carries the breadcrumb with a skin
switcher, the Page · Components · Style guide views, the palette, and a Tokens
panel. Opening a skin makes it the active one.

**Legacy, until Phase 4:** the pre-migration single-axis system still exists —
`data-theme` (look), `data-motion` (feel), `data-interaction` (structure) — and
drives `/gallery`, `/theme/:slug`, `/motion`, `/interaction`, and `/start`, each
wrapped in a `LegacyFrame` that restores the `:root` defaults and keeps the
house rail beside them. The keepers get rebuilt as skins; the rest go. Don't add
new legacy themes.

## Token utilities (all track the active theme)

- **Surfaces:** `bg-bg`, `bg-surface`, `bg-surface-2`
- **Text:** `text-fg`, `text-muted`
- **Brand:** `bg-primary` / `text-primary-fg`, `bg-accent` / `text-accent-fg`
- **Status:** `bg-success` / `text-success-fg`, `bg-warning` / `text-warning-fg`, `bg-danger` / `text-danger-fg`
- **Lines & focus:** `border-border`, `ring-ring`
- **Overlays:** `bg-scrim` — the dimming layer behind a modal or sheet. Palette-owned, alpha included, so it dims on paper and on charcoal alike (never `bg-fg/40`, which lightens a dark palette).
- **Radius:** `rounded-sm | rounded-md | rounded-lg | rounded-xl` (scale from each theme's base `--radius`)
- **Type:** `font-display` (headings), `font-sans`, `font-serif`, `font-mono`
- **Elevation:** `elev-1`, `elev-2`, `glow` (helper classes in `index.css`)
- **Opacity mixes are fine:** e.g. `bg-primary/12`, `bg-surface-2/40`.

**Every fill has its ink.** Text on a colored fill takes that fill's `-fg`
(`bg-danger text-danger-fg`), never `text-white` — a palette is free to make a
fill pale, and the guard fails literal white/black for that reason.

**Fills are not ink.** `--primary` and `--accent` are fill colors: a light
palette's pale pink primary is a fine button and an unreadable heading. Don't
set text in them (`text-primary`). Text goes in `text-fg` / `text-muted`, or in
the fill's own `-fg` when it sits on the fill, and "active" is marked with a
rule, a bar, or a fill rather than colored words. Status colors are the one
exception — they're contrast-checked on `--surface`, so a trend delta or a
destructive menu item may be set in them.

## Motion utilities (all track the active motion style)

- **Duration:** `dur-1` … `dur-5` — micro / control / surface / overlay / scene.
  Helper classes, because Tailwind v4 has no `--duration-*` theme namespace.
- **Easing:** `ease-standard`, `ease-entrance`, `ease-exit`, `ease-emphasis`.
  Real Tailwind utilities — `--ease-*` *is* a v4 namespace.
- **Interaction:** `hover-lift` (rises by the style's `--lift`), `press-scale`
  (compresses to `--press`).
- **Raw vars** when you need a value rather than a class: `--dur-1…5`,
  `--curve-standard|entrance|exit|emphasis`, `--travel-sm|md|lg`, `--lift`,
  `--press`, `--stagger`.

**You usually don't need any of these.** Every Tailwind `transition-*` utility
resolves through `--default-transition-duration` and
`--default-transition-timing-function`, which `@theme inline` points at the motion
tokens. So a plain `transition-colors` is already motion-aware. Reach for an
explicit `dur-*` or `ease-*` only when the semantics differ from the default —
a tooltip that should feel instant, an overlay that should feel slow.

Conversely: **writing `duration-300` opts that element out of the system**, since
it overrides the default. That's the one thing to avoid.

## Add a skin

1. In `src/index.css`, under "SKIN × PALETTE", write one `[data-skin="<slug>"]`
   form block and three `[data-skin="<slug>"][data-palette="light|dark|fun"]`
   color blocks. Copy Kid Astro's or Neubrutalist's and retune — every palette
   also sets `color-scheme` and a `--scrim`.
2. Add an entry to `src/skins/index.ts` — slug, name, description, tags, the
   three palettes' display labels, and the `bestFor` / `rules` / `avoid` lines
   the style guide shows.
3. Optionally register a Page composition in `src/showcases/index.ts` under the
   same slug (see the hybrid model below); otherwise the shared one-pager renders.
4. `npm run contrast` must pass for all three palettes.

The Themes list, the `/skin/:slug` routes, and the deep-link fallback pick it up
automatically. Keep the token **names** identical across skins — only the values
change.

(Adding a `[data-theme]` block is the legacy path and is closed — migrate a
theme into a skin instead.)

## The third axis (proof of concept)

`data-interaction` is a **structural** axis: it decides what a component renders,
not how it's styled — disclosure shape, where nav lives, hover affordance, scroll
reveal. That's why it ships as React context (`useInteraction()` from
`src/interaction`) plus a `data-interaction` attribute for the CSS-shaped parts,
rather than variables alone.

**Scope today:** four demo components in `src/components/interaction/` branch on
the flags. The wider library is *not* interaction-aware. Making it so is a much
bigger job than motion was — motion could ride Tailwind's transition defaults,
and structure has nothing equivalent to ride. Treat this axis as validated in
principle, not finished.

To add an interaction style: add an entry to `src/interaction/index.tsx`. If it
needs a new facet, add it to `types.ts` and teach the demo components to branch.

## Add a motion style

1. Copy an existing `[data-motion="..."]` block in `src/index.css` and retune the
   curves, durations, and interaction values.
2. Add a matching entry to `src/motion/index.ts` — including `curves`, `durations`,
   and `spring`, which the instruments on `/motion` need in JS form.

Same rule as themes: keep the token **names** identical, change only the values.

**`src/index.css` is the source of truth.** The numbers in `src/motion/index.ts`
are duplicated so the curve plots and spring bench have something to draw with; if
the two ever disagree, the CSS is right.

## Add a custom showcase layout (the hybrid model)

Themes are tokens-first, but a theme can earn its own page composition:

1. Create `src/showcases/<Name>Showcase.tsx` accepting `{ theme: ThemeMeta }`.
   It only *arranges* shared components — styling still comes from tokens.
2. Register it in `src/showcases/index.ts` under the theme's slug.

`/theme/:slug` renders the custom showcase when one is registered, else the
shared `ThemeShowcase`. Include `TokenPanel` so every theme page keeps doubling
as token documentation. Examples: `bento`, `linear`.

## Add a component

- Primitives go in `src/components/primitives`, page sections in `src/components/sections`.
- Accept `className` and spread rest props; compose classes with `cn()` from `src/lib/cn.ts`.
- Token-only styling. `cn()` only joins, it doesn't merge — don't give a
  component a default `bg-*` that callers override, or stylesheet order picks
  the winner. Let the caller name the fill.
- When something that isn't the component needs its look (a router link styled
  as a button, a native control that should read as a field), use a class
  recipe from `primitives/recipes.ts` (`buttonClasses`, `fieldClasses`) rather
  than copying the classes.
- Add it to the catalogue in `src/components/skin/ComponentsView.tsx` so it
  renders on every skin's Components view, then check it there in all three
  palettes before considering it done.

## Reuse in a new prototype

To bootstrap a new app from a skin: the **Copy tokens** button on a skin's page
hands you its form block and the palette you're looking at, ready to paste.
Take the `@theme inline` mapping from `index.css` and the components you need,
and set `data-skin="<slug>" data-palette="<light|dark|fun>"` on the root
element.

## Shipping changes

Work on a branch and open a PR — don't push to `main` directly.

The app has two homes from one build (`vite.config.ts` picks the base path):

- **themes.kidastro.com** — a Vercel project on this repo. Every push to
  `main` deploys; every PR gets a preview URL. `vercel.json` carries the SPA
  rewrite. Nothing to trigger by hand.
- **kidastro.com/themes** — the portfolio repo's Pages workflow builds this
  repo and serves `dist/` under `/themes`. It only refreshes when that repo
  redeploys:

  ```bash
  gh workflow run deploy.yml --repo davekeller/kidastro
  ```

## Checks (all run in CI, and `npm run check` runs them in order)

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run guard      # token-only guard — the golden rule, enforced
npm run contrast   # WCAG-AA contrast on every [data-skin][data-palette]
npm run build      # production build
npm run check      # all of the above, in order
```

`npm run guard` (`scripts/check-tokens.mjs`) fails if a component, page, or
showcase hardcodes a color (including `text-white` / `bg-black`), palette
shade, radius, duration, or easing instead of a token. `npm run contrast` also
fails a palette that leaves out any token of the contract. For a genuine non-token literal, add a `guard-allow: <reason>`
comment on the line (or `guard-allow-file: <reason>` for a file that *displays*
code samples) — sparingly, with a reason.

## Commands

```bash
npm run dev        # dev server
npm run preview    # preview the production build
```
