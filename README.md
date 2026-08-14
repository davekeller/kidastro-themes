# kidastro-themes

A personal UI inspiration lab with 20 active, hand-tuned skins — an extension of the
[kidastro.com](https://kidastro.com) brand, sharing its space chrome (starfield,
aurora, drifting color bar, floating icosahedron, astro helmet) and Bricolage
Grotesque type. Each skin currently has one canonical palette, a live component
showcase with its own page composition, and concise guidance for AI tools:
best-fit surfaces, defining rules, and visual choices to avoid.

The original reference set sampled roughly ten of the most recognizable UI
languages from Mobbin and the wider design web. That research is a starting
point, not a checklist or a set of products to clone. The real purpose is to
experiment deeply with a handful of visual worlds, understand why they work,
and pull useful colors, type, layout, components, and interaction ideas into new
apps.

When starting a prototype or case study, point an AI tool at a skin, copy the
whole system, or borrow only the ideas that fit. Every skin is plain, portable
**React + Tailwind**.

## How to use the lab

- Browse for a direction when a new app still feels visually undefined.
- Treat each showcase as an inspiration specimen, not a required page template.
- Copy a complete skin when it fits, or extract one strong idea: a palette,
  navigation pattern, card treatment, type system, or data display.
- Refine a few promising skins deeply. Merge or retire overlapping experiments
  rather than growing the catalog for its own sake.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run typecheck
```

## Three axes

**Themes** control how things look. **Motion styles** control how they move.
**Interaction styles** describe structural choices such as disclosure and
navigation. All three sit on the same wrapper and compose freely:

```html
<div data-theme="clay" data-motion="springy" data-interaction="focused"> … </div>
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
2. Add an entry to the array in `src/themes/index.ts`, including its `bestFor`,
   `designRules`, and `avoid` guidance.

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
    ThemeShowcase.tsx   fallback while a new skin's composition is being developed
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
