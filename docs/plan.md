# Theme Lab — Project Plan

*Working name: **Theme Lab** (repo `theme-lab`). Alternates: Themebook, Palette, Skins, Facets — easy to rename before we push.*

---

## 1. What this is

A personal website that holds a growing collection of ~10 hand-tuned UI themes. The front page is a **gallery** of theme cards. Click one and you drop into a **full-page, themed one-pager** — a marketing-style layout that shows off the whole component library rendered in that theme. A minimal top bar lets you jump back to the gallery or hop to another theme.

It does two jobs:

1. **A prototyping launchpad.** When you're spinning up a new idea, you point Cursor / Claude Code / Antigravity at a theme page. The component library and design tokens are already there, so you skip the "set up a design system" step and start building.
2. **An interview / case-study asset.** When you need a styled surface for a case study, you grab a theme that fits the story instead of designing chrome from scratch.

The through-line: **every theme produces portable React + Tailwind components you can lift straight into a real project.**

---

## 2. Requirements (from your brief)

- Gallery / list view on the front page with all themes.
- Click a theme → full-page themed view.
- Minimal top navigation: a back/close button to return to the gallery (plus, ideally, a way to hop between themes).
- Each theme page is a one-pager that showcases a variety of components — and the set keeps growing.
- Start with ~3 refined themes, then build the navigation shell, then scale toward ~10.
- Themes are personalized and meant to be **refined over time**, not shipped once.
- Output is React + Tailwind, structured so AI tools can reuse it.

---

## 3. Key decisions

| Decision | Choice | Status |
|---|---|---|
| GitHub account / repo | **@davekeller** → `theme-lab` | ✅ Confirmed |
| Stack (shell) | **Vite + React + TypeScript + Tailwind** | 🟡 Proposed (my rec — override anytime) |
| Routing | React Router (`/` gallery, `/theme/:slug`) | 🟡 Proposed |
| Theme architecture | **Shared components + design tokens** (grows into hybrid) | 🟡 Proposed |
| Hosting | **Vercel** (auto-deploy from the repo) | 🟡 Proposed |
| First 3 themes | Clean/Minimal · Dark/Neon · Editorial/Warm | 🟡 Proposed (max aesthetic spread) |

The 🟡 items are my recommended defaults so we can move — say the word and I'll swap any of them. Section 9 lists what's still genuinely open.

---

## 4. How theming works (the architecture)

This is the core of the project, so it's worth getting right up front.

**Two layers, cleanly separated:**

**a) Token layer — what makes a theme a theme.**
Each theme is a set of **design tokens** expressed as CSS custom properties, scoped by a `data-theme` attribute on a wrapper element:

```css
[data-theme="minimal"] {
  --color-bg: #ffffff;
  --color-fg: #111827;
  --color-primary: #2563eb;
  --radius: 0.5rem;
  --font-sans: "Inter", system-ui, sans-serif;
  /* ...shadows, borders, spacing rhythm, etc. */
}
[data-theme="neon"] { /* a totally different set */ }
```

Tailwind (v4's CSS-first `@theme`) maps utility classes to those variables, so `bg-bg`, `text-fg`, `bg-primary`, `rounded` all resolve to whatever the active theme defines. Switching a theme = switching the `data-theme` value. Nothing else re-renders logic; only the variables change.

**Token categories we'll standardize:**

- **Color** — bg, surface, elevated surface, foreground, muted foreground, primary, accent, border, and status (success/warning/danger).
- **Typography** — font families (sans / serif / mono), a type scale, weights, letter-spacing.
- **Shape** — radius scale, border widths.
- **Depth** — shadow / elevation ramp.
- **Rhythm** — spacing scale and layout density.
- **Motion** — default transition timing/easing.

**b) Component layer — shared, token-driven, portable.**
One library of presentational React components (Button, Card, Input, Nav, Hero, etc.). Rule: components reference **tokens only** (via Tailwind classes bound to the CSS variables) — never a hardcoded hex, radius, or font. That's what lets a single component look right in all ten themes.

**Theme registry.** A `src/themes/` folder holds one entry per theme: metadata (slug, name, description, tags, a couple of preview swatches) plus its token set. A central `themes.ts` array is the single source of truth — it drives both the gallery grid and the routes, so adding a theme is "drop in a file, done."

**Growth path — tokens now, hybrid later.** We start tokens-only because it's the fastest way to refine and reskin. The day a theme wants something bespoke (a brutalist button that ignores the shared radius, say), we allow a **per-theme component override** without re-architecting anything. That's the "hybrid" model, reached only when a theme actually needs it — so we never pay for complexity we're not using.

**Why this serves the AI-reuse goal.** Because a theme is just *tokens + plain components reading those tokens*, an AI tool pointed at a theme page can copy the token file and the components and scaffold a new app immediately — no framework-specific wiring to untangle. We'll add a per-theme "copy tokens" action and a short README so the handoff is one click.

---

## 5. Component library scope

Each theme page is a one-pager that composes these. We phase the set so v1 is achievable fast and the library grows with the themes.

**v1 — core (built in Phase 1):**

- **Primitives:** Button (variants + sizes), Input / Textarea / Select, Checkbox / Radio / Switch, Badge / Tag, Avatar.
- **Sections:** Top nav / header, Hero, Feature grid (cards), Stats band, Pricing table, Testimonial / quote, CTA band, Footer.
- **Spec panel:** a typography specimen + a token/color swatch panel — so each theme page **doubles as living design-token documentation**.

**v2 — expansion (Phase 4, as themes scale):**

- Tabs, Accordion, Modal / Dialog, Toast, Tooltip, Dropdown menu, Table, Breadcrumb, Pagination, Progress / Skeleton, Alert / Banner.

**Open question:** hand-build the primitives, or start from **shadcn/ui**? shadcn's Radix + CSS-variable token model maps almost exactly onto this architecture and would save real time on the fiddly primitives (accessibility, focus states) — worth considering. Flagged in Section 9.

---

## 6. Site structure & UX

- **`/` — Gallery.** A responsive grid of theme cards. Each card previews the theme (palette chips, a headline in the theme's display font, name + one-line description + tags). This is your list view.
- **`/theme/:slug` — Full themed one-pager.** Renders the whole component library under that theme's `data-theme`. A slim **fixed top bar** carries: `← Gallery` (back/close), the theme name, a **theme switcher** to jump straight to another theme, and a **Copy tokens** action.
- **Niceties:** ←/→ keyboard nav between themes; a toggle to reveal the token/spec panel; deep-linkable theme URLs (good for dropping a specific theme into an interview).

---

## 7. Phased implementation plan

Durations are rough (solo, iterative). Each phase ends with something you can actually use.

### Phase 0 — Foundations & repo
- Grant a working folder → scaffold the Cowork workspace (CLAUDE.md / MEMORY.md).
- Create the GitHub repo under **@davekeller** (`theme-lab`), init, first commit.
- Scaffold Vite + React + TS + Tailwind v4 + React Router; ESLint/Prettier; base folder structure.
- (Optional now) connect Vercel for auto-deploy.
- **You get:** a running empty app and a live repo.

### Phase 1 — Theme engine + first reference theme
- Build the token system (CSS variables + Tailwind `@theme`, `data-theme` switching, theme registry, provider).
- Build the v1 core component set — all token-driven — using **Clean/Minimal** as the reference theme that proves the system.
- Assemble the themed one-pager that composes every component.
- Add just enough plumbing to work against: a `/theme/:slug` route and a bare theme switcher (dev-facing — the polished gallery comes later).
- **You get:** one polished, complete theme page. The architecture is validated.

### Phase 2 — Themes 2 & 3 + refine (your "first three" milestone)
- Add **Dark/Neon** and **Editorial/Warm**. These are deliberately far apart (dark canvas + glow vs. serif + paper) to **stress-test the token layer** — wherever a token is missing, we add it to the schema.
- Refine all three until they feel personal.
- **You get:** 3 distinct, polished themes proving the system spans a wide aesthetic range. This is the "refine the first three first" milestone you called out — and it comes *before* the real navigation build.

### Phase 3 — Gallery + navigation shell
- Home gallery grid with theme cards; the minimal top bar (back/close), full theme switcher, keyboard nav, deep-linkable theme URLs.
- Built now — with 3 real themes in hand — so the gallery is designed against actual content, ready to scale toward ~10.
- **You get:** click from gallery into a theme and back — the full shell works.

### Phase 4 — Scale to ~10 + polish
- Add the remaining themes (mostly a token file each, plus overrides where a theme earns them).
- Ship the v2 component set; add Copy-tokens / export; polish the gallery; finalize deploy.
- **You get:** the full gallery, live and documented.

### Phase 5 — Refinement loop & reuse (ongoing)
- Treat it as a living library. Every prototype or interview reuses a theme and feeds fixes back in.
- Optional: a tiny snippet/CLI to copy a theme into a fresh repo so "new prototype from this theme" is one command.

---

## 8. Proposed repo structure

```
theme-lab/
├─ src/
│  ├─ components/        # shared, token-driven components
│  │  ├─ primitives/     # Button, Input, Badge, ...
│  │  └─ sections/       # Hero, Pricing, Footer, ...
│  ├─ themes/            # one file per theme (tokens + metadata)
│  │  ├─ minimal.ts
│  │  ├─ neon.ts
│  │  └─ index.ts        # the registry
│  ├─ pages/             # Gallery, ThemePage
│  ├─ layout/            # top bar, theme provider, switcher
│  ├─ styles/            # tailwind entry, @theme, token bindings
│  └─ lib/               # helpers (copy tokens, keyboard nav)
├─ docs/
│  └─ plan.md            # this document
├─ README.md
└─ CLAUDE.md             # instructions so AI tools reuse themes correctly
```

---

## 9. Still open (your call — I'll default if you don't)

1. **Stack** — defaulting to Vite + React + Tailwind. (Next.js if you want this to grow into a broader personal site.)
2. **Theme model** — defaulting to tokens-first, hybrid-when-needed.
3. **Hosting** — defaulting to Vercel. (GitHub Pages or local-only are fine too.)
4. **First 3 themes** — defaulting to Clean/Minimal, Dark/Neon, Editorial/Warm for maximum spread. (Swap in Bold/Brutalist or others anytime.)
5. **Primitives** — hand-build vs. start from shadcn/ui.
6. **Repo name** — `theme-lab` unless you prefer another.

---

## 10. Immediate next steps

1. You confirm (or tweak) the 🟡 defaults above.
2. You grant a folder for the project, and confirm I can create `theme-lab` under **@davekeller**.
3. I run **Phase 0** — scaffold the repo, push the first commit, wire up the app skeleton.
4. We go straight into **Phase 1** — the theme engine and your first refined theme.
