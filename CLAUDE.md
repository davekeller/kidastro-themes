# CLAUDE.md — conventions for AI tools working in this repo

This project is a gallery of UI themes. Its whole value is that components are
**token-driven and portable**. Follow these rules so themes stay swappable and
reusable.

## The golden rule

Style with **tokens only**. Never hardcode a hex color, font family, radius, or
shadow in a component. If you reach for `#fff`, `text-gray-500`, `rounded-[6px]`,
or a literal font — stop and use a token instead.

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

## Add a theme

1. Copy an existing `[data-theme="..."]` block in `src/index.css` and retune the tokens.
2. Add a matching entry (`slug`, `name`, `description`, `tags`) to `src/themes/index.ts`.

The gallery and `/theme/:slug` route pick it up automatically. Keep the token
**names** identical across themes — only the values change.

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
