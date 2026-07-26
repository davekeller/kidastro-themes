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

**Repo & deploy:** `github.com/davekeller/kidastro-themes`, deployed to GitHub
Pages via Actions (`.github/workflows/deploy.yml`): every push to `main`
typechecks, builds, and deploys. `scripts/spa-fallback.mjs` (postbuild) copies
index.html to 404.html + `theme/<slug>/index.html` so deep links work without
rewrites. Custom domain `ui.kidastro.com` (public/CNAME + Pages setting); DNS
is a CNAME record `ui → davekeller.github.io` at Hover. Enable Enforce-HTTPS
in Pages settings once the cert is issued after DNS propagates.

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

**Roadmap / what's next:**
1. Mobbin-informed themes with *structural* variety: same component library,
   but per-theme showcase layouts/feels (the plan's "hybrid" growth path).
   Style candidates to choose from are in `docs/style-candidates.md`.
   The Mobbin MCP is registered (`claude mcp add mobbin` → https://api.mobbin.com/mcp);
   needs a one-time OAuth by the owner.
2. Refine the `neon` and `editorial` tokens against real UI references.
3. Push to `github.com/davekeller/theme-lab` and deploy to Vercel.

**Start here:** Read `CLAUDE.md` and `README.md`, confirm you understand the token
model, then help me with: <state your task, e.g. "refine the neon theme" or "add a
'brutalist' theme">.
