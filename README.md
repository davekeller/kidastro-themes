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

## Two axes

**Themes** control how things look. **Motion styles** control how they move.
`data-theme` and `data-motion` sit on the same wrapper and compose freely, so
`clay` + `springy` and `specsheet` + `mechanical` are both one attribute apart:

```html
<div data-theme="clay" data-motion="springy"> … </div>
```

Five motion styles — `precise` (the default), `springy`, `floaty`, `mechanical`,
`cinematic` — each a set of easing curves, a five-tier duration scale, and the
interaction values (`--lift`, `--press`, `--stagger`) that give a style its feel.
Values live in `[data-motion]` blocks in `src/index.css`; `src/motion/` holds the
registry.

Motion is **CSS-only and dependency-free**, on purpose. This library's value is
that its output is portable — a motion system made of variables and transitions
travels into a new project; one built on a JS animation library drags a runtime
along with it.

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

## Add a motion style

1. Add a `[data-motion="<slug>"]` block in `src/index.css` (copy an existing one).
2. Add an entry to the array in `src/motion/index.ts`.

Same deal. See [`CLAUDE.md`](CLAUDE.md) for which token names to keep identical.

## Project structure

```
src/
  components/
    primitives/   Button, Badge, Input, Card, Avatar, Switch
    sections/     Header, Hero, Features, Stats, Pricing, Testimonial, CTA, Footer, TokenPanel
    ThemeShowcase.tsx   the shared one-pager composition
    icons.tsx
  themes/         token metadata + registry (values live in index.css)
  motion/         motion metadata + registry (values live in index.css)
  pages/          Gallery (list view) + ThemePage (detail)
  lib/            helpers
  index.css       Tailwind entry + token architecture + all theme blocks
```

## Reuse a theme in a new project

Copy the theme's `[data-theme]` block from `src/index.css`, the motion style's
`[data-motion]` block, the `@theme inline` mapping, and whatever components you
need. Set `data-theme="<slug>" data-motion="<slug>"` on your root element and the
tokens take over.

Don't skip the `@theme inline` block: the `--default-transition-*` entries in it
are what make every `transition-*` utility resolve through the motion tokens. Leave
them out and components fall back to Tailwind's stock 150ms. See [`CLAUDE.md`](CLAUDE.md) for the
conventions AI tools should follow when building on top of a theme.

## Deploy

Static SPA — deploys to Vercel as-is (`vercel.json` handles client-side routing).
Build command `npm run build`, output `dist`.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router 7
