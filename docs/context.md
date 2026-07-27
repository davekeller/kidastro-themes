# kidastro-themes — project context

**What it is:** My personal website — a gallery of ~10 hand-tuned UI themes,
branded **kidastro-themes** as an extension of my portfolio (kidastro.com). The
gallery chrome reuses the portfolio's space elements: starfield, northern
lights, drifting color bar, a floating wireframe icosahedron over the title,
and the /games astro helmet as the footer sign-off (all dependency-free canvas
ports in `src/components/`, colored via theme tokens). The
front page lists themes; clicking one opens a full-page, marketing-style
one-pager showing the whole component library rendered in that theme. Purpose:
point AI tools (Cursor, Claude Code) at a theme to bootstrap prototypes and
interview case studies with the styling already in place. Every theme is
portable React + Tailwind.

**Status:** v2 is built and verified (production build + typecheck pass): 11
themes, the v2 interactive component set (Tabs, Accordion, Modal, Toast, Tooltip,
Dropdown, Table, Alert, Progress, Skeleton, Breadcrumb, Pagination) demoed in a
"Component lab" section, and a polished shell (theme-switcher dropdown, ←/→
keyboard nav, Copy-tokens button). The app chrome (gallery) uses the `kidastro`
theme, matched to the owner's portfolio site (`/Users/dk/Git/kidastro`).

**Repo & deploy:** `github.com/davekeller/kidastro-themes`, served at
**kidastro.com/themes**. GitHub Pages allows one site per domain, so the
portfolio repo (`davekeller/kidastro`) owns the deploy: its Pages workflow
checks out this repo, builds it (Vite `base: "/themes/"`, router
`basename="/themes"`), and copies `dist/` into the site output at `/themes`.
This repo's own workflow is CI-only (typecheck + build). After pushing changes
here, trigger the portfolio deploy:
`gh workflow run deploy.yml --repo davekeller/kidastro`.
`scripts/spa-fallback.mjs` (postbuild) copies index.html to
`theme/<slug>/index.html` per theme so deep links work without rewrites.
Local dev serves at `http://localhost:5173/themes/`.

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router 7.

**Run:**
```
npm install
npm run dev        # http://localhost:5173
npm run build
npm run typecheck
```

**Architecture (the important part):**
- Two layers: (1) design *tokens* — each theme is a set of semantic CSS variables
  in a `[data-theme="<slug>"]` block in `src/index.css`; (2) *components* that
  style with tokens only.
- Tailwind v4 `@theme inline` maps tokens to utilities: `bg-bg`, `bg-surface`,
  `bg-surface-2`, `text-fg`, `text-muted`, `bg-primary`/`text-primary-fg`,
  `bg-accent`/`text-accent-fg`, `bg-success|warning|danger`, `border-border`,
  `ring-ring`, `rounded-sm|md|lg|xl`, `font-display|sans|serif|mono`, and
  `elev-1|elev-2|glow` helper classes.
- Switching a theme = changing `data-theme` on a wrapper element.
- **Golden rule: never hardcode a hex/font/radius/shadow in a component — tokens only.**

**Themes so far:** `kidastro` (Kid Astro — the portfolio theme, also the app
chrome), `minimal` (Clean/Minimal), `neon` (Dark/Neon), `editorial`
(Editorial/Warm), `brutalist` (Bold/Brutalist), `terminal` (Retro/Terminal),
`luxe` (Luxe/Noir), `candy` (Soft/Candy), `botanical` (Organic/Botanical),
`industrial` (Industrial/Utility), `deco` (Deco/Emerald).

**File map:**
```
src/
  index.css              Tailwind entry + @theme mapping + all [data-theme] blocks
  themes/index.ts        theme registry (slug / name / description / tags)
  components/
    primitives/          Button, Badge, Input, Card, Avatar, Switch
    sections/            Header, Hero, Features, Stats, Pricing, Testimonial, CTA, Footer, TokenPanel
    ThemeShowcase.tsx    the shared one-pager composition
  pages/                 Gallery (list view /) + ThemePage (detail /theme/:slug)
```
Also read `CLAUDE.md` (conventions) and `README.md` in the repo root before editing.

**Add a theme:** copy a `[data-theme]` block in `src/index.css`, retune the
tokens, and add an entry to `src/themes/index.ts`. Keep token *names* identical
across themes — only the values change.

**Hybrid model (live):** themes are tokens-first, but a theme can register its
own page composition in `src/showcases/index.ts` — `/theme/:slug` renders it
instead of the shared `ThemeShowcase`. Nine themes now ship custom layouts:
`bento`, `linear`, `aurora`, `neubrutalist`, `glass`, `clay`, `broadsheet`,
`y2k`, `organic` — each modeled on a Mobbin reference recorded in
`docs/style-candidates.md`.

**Roadmap / what's next:**
1. Remaining style candidates in `docs/style-candidates.md`: Swiss typographic
   (#5), brutalist spec-sheet (#10), kinetic type (#12) — the three with no
   Mobbin entry. The Mobbin MCP is registered
   (`claude mcp add mobbin` → https://api.mobbin.com/mcp) but still needs a
   one-time OAuth by the owner before screens can be pulled programmatically.
2. Refine the `neon` and `editorial` tokens against real UI references.

**Start here:** Read `CLAUDE.md` and `README.md`, confirm you understand the token
model, then help me with: <state your task, e.g. "refine the neon theme" or "add a
'brutalist' theme">.
