# kidastro-themes

A personal gallery of hand-tuned UI themes — an extension of the
[kidastro.com](https://kidastro.com) brand, sharing its space chrome (starfield,
aurora, drifting color bar, floating icosahedron, astro helmet) and Bricolage
Grotesque type. The front page lists every theme; click one to open a full-page, marketing-style showcase of the component library rendered in that theme.

The point: when starting a new prototype or an interview case study, point your AI tools (Cursor, Claude Code, Antigravity) at a theme and start building with the styling already in place — every theme is plain, portable **React + Tailwind**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run typecheck
```

## How theming works

Two clean layers:

1. **Tokens** — each theme is a set of semantic CSS variables scoped by a
   `[data-theme="<slug>"]` block in [`src/index.css`](src/index.css)
   (color, type, radius, shadow). Tailwind v4's `@theme inline` maps those
   variables into utilities, so `bg-bg`, `text-fg`, `bg-primary`,
   `border-border`, `rounded-lg`, and `font-display` all resolve to the active
   theme.
2. **Components** — one shared library in [`src/components`](src/components)
   that references **tokens only** (never a hardcoded hex/font/radius). That's
   what lets a single component look right in every theme.

Switching a theme = changing the `data-theme` attribute on a wrapper. Nothing
else re-renders — only the variables change.

## Add a theme

1. Add a `[data-theme="<slug>"]` block in `src/index.css` (copy an existing one and retune the tokens).
2. Add an entry to the array in `src/themes/index.ts`.

That's it — the gallery and routes pick it up automatically.

## Project structure

```
src/
  components/
    primitives/   Button, Badge, Input, Card, Avatar, Switch
    sections/     Header, Hero, Features, Stats, Pricing, Testimonial, CTA, Footer, TokenPanel
    ThemeShowcase.tsx   the shared one-pager composition
    icons.tsx
  themes/         token metadata + registry (values live in index.css)
  pages/          Gallery (list view) + ThemePage (detail)
  lib/            helpers
  index.css       Tailwind entry + token architecture + all theme blocks
```

## Reuse a theme in a new project

Copy the theme's `[data-theme]` block from `src/index.css`, the `@theme inline`
mapping, and whatever components you need. Set `data-theme="<slug>"` on your root
element and the tokens take over. See [`CLAUDE.md`](CLAUDE.md) for the
conventions AI tools should follow when building on top of a theme.

## Deploy

Static SPA — deploys to Vercel as-is (`vercel.json` handles client-side routing).
Build command `npm run build`, output `dist`.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router 7
