# CLAUDE.md — conventions for AI tools working in this repo

This project is a gallery of UI themes. Its whole value is that components are
**token-driven and portable**. Follow these rules so themes stay swappable and
reusable.

## Product intent

This is an inspiration and experimentation lab, not a theme-counting exercise.
The original research sampled roughly ten popular UI languages from Mobbin and
the wider design web, but those are references rather than cloning targets.

Work deeply on a handful of promising skins at a time. The Neubrutalist and Y2K
/ Retro-future showcases are the benchmark for completeness: palette, type,
layout, components, and small details reinforce one coherent world. Other skins
should reach that level in their own visual language.

Prefer refining, merging, or retiring overlapping experiments over adding a
surface-level variation. A skin succeeds when it contains ideas worth pulling
into a new app; the showcase is an inspiration specimen, not a page every app
must copy whole.

## The golden rule

Style with **tokens only**. Never hardcode a hex color, font family, radius,
shadow, **or timing** in a component. If you reach for `#fff`, `text-gray-500`,
`rounded-[6px]`, `duration-300`, `ease-out`, `hover:-translate-y-1`, or a literal
font — stop and use a token instead.

There are **three axes**, all on the same wrapper, all composing freely:
`data-theme` controls how things look, `data-motion` how they move, and
`data-interaction` how they're structured. The first two are pure tokens; the
third is structural and works differently — see below.

## Token utilities (all track the active theme)

- **Surfaces:** `bg-bg`, `bg-surface`, `bg-surface-2`
- **Text:** `text-fg`, `text-muted`
- **Brand:** `bg-primary` / `text-primary-fg`, `bg-accent` / `text-accent-fg`
- **Status:** `bg-success`, `bg-warning`, `bg-danger`
- **Lines & focus:** `border-border`, `ring-ring`
- **Radius:** `rounded-sm | rounded-md | rounded-lg | rounded-xl` (scale from each theme's base `--radius`)
- **Type:** `font-display` (headings), `font-sans`, `font-serif`, `font-mono`
- **Elevation:** `elev-1`, `elev-2`, `glow` (helper classes in `index.css`)
- **Opacity mixes are fine:** e.g. `bg-primary/12`, `bg-surface-2/40`.

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

## Add a theme

Add one only when it opens a genuinely useful visual lane that the current
catalog does not already cover.

1. Copy an existing `[data-theme="..."]` block in `src/index.css` and retune the tokens.
2. Add a matching entry (`slug`, `name`, `description`, `tags`, `bestFor`,
   `designRules`, `avoid`) to `src/themes/index.ts`.

Each theme is one coherent **skin with one canonical palette**. Do not add a
second palette inside the same theme block yet; palette variants will become a
separate axis when the library is ready for them.

The gallery and `/theme/:slug` route pick it up automatically. Keep the token
**names** identical across themes — only the values change.

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

Themes are tokens-first, and every active skin should have its own authored page
composition. The generic `ThemeShowcase` is only a temporary fallback while a
new experiment is being developed:

1. Create `src/showcases/<Name>Showcase.tsx` accepting `{ theme: ThemeMeta }`.
   It only *arranges* shared components — styling still comes from tokens.
2. Register it in `src/showcases/index.ts` under the theme's slug.

`/theme/:slug` renders the custom showcase when one is registered, else the
shared `ThemeShowcase`. Include `TokenPanel` so every theme page keeps doubling
as token documentation. Examples: `bento`, `linear`.

## Add a component

- Primitives go in `src/components/primitives`, page sections in `src/components/sections`.
- Accept `className` and spread rest props; compose classes with `cn()` from `src/lib/cn.ts`.
- Token-only styling. Test it visually under all themes before considering it done.

## Reuse in a new prototype

To bootstrap a new app from a theme: copy that theme's `[data-theme]` block, the
`@theme inline` mapping from `index.css`, and the components you need. Set
`data-theme="<slug>"` on the root element.

## Shipping changes

Work on a branch and open a PR — don't push to `main` directly. After a PR
merges, the live site at kidastro.com/themes only refreshes when the portfolio
repo redeploys:

```bash
gh workflow run deploy.yml --repo davekeller/kidastro
```

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
```
