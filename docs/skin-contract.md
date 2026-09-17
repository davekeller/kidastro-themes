# The skin × palette contract

_2026-09-17 · the token model introduced in Phase 1 (see [themes-app-plan.md](themes-app-plan.md))._

A theme is a **skin** wearing a **palette**. Two attributes on one wrapper,
composing freely — the same shape as the motion/interaction axes already here,
and the same split myguitarday's ADR-0011 proved:

```html
<div data-skin="neubrutalist" data-palette="dark"> … </div>
```

Components never change: they still style from semantic tokens only
(`bg-bg`, `text-fg`, `border-border`, `rounded-lg`, `elev-1`, …). The
`@theme inline` block maps those utilities to the CSS variables below, and the
variables resolve from the nearest `data-skin` / `data-palette` ancestor. So a
skin in any palette "just works," and the token guard (`npm run guard`) keeps it
that way.

## What the skin owns (form + motion)

Set on `[data-skin="<slug>"]`. Everything that makes the skin recognizable
regardless of color, plus its baked-in motion feel (motion is not a separate
user axis — see the plan's D3):

- **Shape:** `--radius`
- **Elevation geometry:** `--elev-1`, `--elev-2`, `--elev-glow` — written in
  terms of `var(--shadow-ink)` so the *offset/blur* is the skin's and the
  *color* is the palette's.
- **Type:** `--font-sans`, `--font-serif`, `--font-mono`, `--font-display`
- **Motion:** `--curve-standard|entrance|exit|emphasis`, `--dur-1…5`,
  `--travel-sm|md|lg`, `--lift`, `--press`, `--stagger`

## What the palette owns (color + mode)

Set on `[data-skin="<slug>"][data-palette="<light|dark|fun>"]`. Only color, and
whether the palette reads light or dark is simply carried by these values —
there is no `.dark` class:

- **Surfaces:** `--bg`, `--surface`, `--surface-2`
- **Ink:** `--fg`, `--muted`
- **Lines & focus:** `--border`, `--ring`
- **Brand:** `--primary`, `--primary-fg`, `--accent`, `--accent-fg`
- **Status:** `--success`, `--warning`, `--danger`
- **Shadow color:** `--shadow-ink` (feeds the skin's elevation geometry)

## The three palettes

Every skin ships exactly three, by these slugs:

- **`light`** — the daylight reading.
- **`dark`** — the low-light reading.
- **`fun`** — the loud, saturated, characterful one.

Display labels can differ per skin (e.g. Neubrutalist's fun palette shows as
"Candy") but the slugs are always `light` / `dark` / `fun`.

## Contrast is a check, not a hope

`npm run contrast` reads every `[data-skin][data-palette]` block and asserts
WCAG AA: `--fg` and `--muted` on `--bg` and on `--surface`, and each
`*-fg` on its fill. A palette that fails is not done. Keep fills saturated by
choosing the readable `*-fg` (dark or light) per palette rather than dulling
the color.

## Adding a skin

1. Add a `[data-skin="<slug>"]` form block and three
   `[data-skin="<slug>"][data-palette="light|dark|fun"]` color blocks in
   `src/index.css`. Keep token **names** identical; only values change.
2. Register it in the skin registry (Phase 2) with its display name and per-skin
   palette labels.
3. `npm run check && npm run contrast`, then eyeball all three palettes.

Neubrutalist is the reference implementation — copy its block shape.

## Transition note

The legacy single-axis `[data-theme]` / `[data-motion]` blocks still live in
`index.css` and drive the current gallery. They come out in Phase 4 as each
skin is migrated to this model; until then the two coexist and no element
carries both.
