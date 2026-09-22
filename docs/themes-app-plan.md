# kidastro-themes → themes.kidastro.com — plan of record

_Draft · 2026-09-14 · `docs/themes-app-plan.md`. Extends the original [plan.md](plan.md) ("Theme Lab") into its next phase; where they differ, this doc is the current intent._

## Context — why this change

Two repos grew up around the same idea and it's time to fold them into one:

- **kidastro-themes** (this repo) — a Vite 6 + React 19 + Tailwind 4 gallery of
  token-driven UI themes. It's the richer codebase: a motion axis, a
  proof-of-concept interaction axis, an easing lab, and per-theme showcase
  layouts. It already builds to a static `dist/` and is Vercel-ready.
- **daves-demos** — a Next.js interview playground built _from_ this repo's
  `codex/theme-library-curation` branch (the 20-skin curation, still unmerged
  here). It proved three things worth keeping: a **searchable picker of
  self-previewing miniature cards**, a **style guide** (type specimen, color
  tokens, drawn easing curves, interaction stage), and a clean left-rail shell.

The goal: one living thing — **Dave's personal library of the coolest UI
themes**, kept current against real design trends, standalone at
**themes.kidastro.com** on Vercel, still its own repo. daves-demos is retired
into it once this reaches parity.

Two shifts define the work:

1. **Themes become skins with palettes.** Today a theme is one skin + one
   canonical palette. The new model: a **skin** is a fully-composed look, and
   each skin ships **three palettes** — Light, Dark, and one Fun. A skin should
   feel like a real skin (the Neubrutalist one is the bar), not just a swap of
   font and color.
2. **The library stays fresh on purpose.** A repeatable, on-demand **Trends
   Loop** samples design galleries (Mobbin first, then Dribbble and others),
   clusters what it finds into named style trends, moodboards them, and drives
   original skin creation — never cloning a specific UI. See
   [trends-loop.md](trends-loop.md).

## Target end state

- A standalone Vite SPA at **themes.kidastro.com** (Vercel), this repo unchanged
  in ownership.
- **Skin × Palette** is the core model. Wrapper attributes `data-skin` and
  `data-palette`; every component styled from semantic tokens only, so any skin
  in any palette "just works." (This mirrors myguitarday's proven ADR-0011
  split of skin-form from color-version.)
- Information architecture:
  - **Themes** (top level) — a grid of skin thumbnails; each thumbnail is a
    miniature page rendered in the skin's default palette. Searchable/filterable.
  - **Theme detail** (`/skin/:slug` — not `/theme/`, which the legacy pages
    keep until Phase 4) — a **palette switcher** (Light/Dark/Fun)
    and a **view toggle: Page ⇄ Components**. _Page_ is a full page laid out in
    the skin; _Components_ is the component library in that same skin+palette.
    The skin/palette choice lives here, inside the theme, exactly as Dave
    described.
  - **Style guide** — type, color, and motion for the active skin+palette.
- A documented, on-call Trends Loop keeping the skin set current.

## Architecture decisions (recommended, with rationale)

**D1 — Keep Vite; port daves-demos _concepts_, not its Next code.**
kidastro-themes is already Vite + Tailwind 4 and builds a static bundle a
Vercel project serves as-is; a theme gallery has no server needs. Migrating to
Next would be a rewrite that buys nothing. So we lift the daves-demos _ideas_
(miniature picker, style guide, skin+palette model, nav) and re-implement them
as Vite React components — a small, mechanical port (drop `"use client"`, swap
`next/link`→React Router `Link`, `next/navigation`→router hooks, `next/font`→the
existing font loading).

**D2 — Skin + Palette is the token model.**
- **Skin (form)** owns: radius, border weight, elevation _geometry_, typeface,
  texture, and the skin's default **motion feel**.
- **Palette (color + mode)** owns: `bg`, `surface`, `surface-2`, `fg`, `muted`,
  `border`, the accents, status colors, and light/dark mode.
- Three palettes per skin, slugged `light` / `dark` / `fun`.
- Defined as `[data-skin="x"][data-palette="y"]` blocks in `src/index.css`;
  Tailwind v4 `@theme inline` maps them to utilities (unchanged approach). Token
  _names_ stay identical across every skin/palette — only values change.

**D3 — Motion ships _with_ the skin, not as a user-facing third axis (v1).**
The current repo exposes motion as its own axis with an easing lab. For the new
library, each skin declares a default motion feel and the app just uses it —
simpler mental model, fewer controls on the page. The easing lab and the motion
registry survive as _source material_ and can return as an advanced control
later. The interaction axis is parked as reference.

**D4 — Reconcile three theme sets into one curated skin list.**
main's pre-curation themes + showcases, the `codex/theme-library-curation`
20-skin set, and the daves-demos port are all _source material_, not things to
preserve wholesale. The new library is a deliberately curated set of skins that
each clear the "feels like a real skin" bar, each with three palettes. Dave
picks the keepers (he's said: the last-half favorites plus a handful of the
early ones, elevated).

**D5 — Retire daves-demos only after parity + a working loop.** Until then it
stays exactly as it is; nothing is deleted early.

## Component & showcase inventory

- **Shared, token-only component library** — consolidate this repo's existing
  `primitives/` + `sections/` with daves-demos's kit: buttons, inputs, selects,
  cards, badges, tabs, tables, nav/rail, modal/sheet, toast, forms, empty
  states, stat tiles, pricing, hero, footer. One set, referencing tokens only.
- **Per-skin "Page" showcase** — the full one-pager composition this repo
  already authors per theme is the ideal source for the _Page_ view.
- **"Components" view** — the same shared library rendered on a documentation
  page, in the active skin+palette.

## Deploy / infrastructure

- **New Vercel project** pointed at this repo: framework preset **Vite**, build
  `npm run build`, output `dist/`. A Vite SPA needs only SPA-rewrite config
  (`vercel.json` with a catch-all to `/index.html`) for client-side routing.
- **DNS:** `CNAME themes.kidastro.com → cname.vercel-dns.com` (Vercel supplies
  the exact target when the domain is added).
- **Fate of kidastro.com/themes:** today the portfolio repo's Pages workflow
  builds this repo and serves it at `kidastro.com/themes`. After cutover,
  either 301 that path to the subdomain or leave both during a transition —
  Dave's call (see Decisions).
- **CI stays cheap:** keep the existing typecheck + build workflow, add lint.
  **No browser in CI** — the Playwright verification sweep runs locally, the
  same cost-free posture used across Dave's repos. Vercel's own build is the
  only CI-ish spend and is free on Hobby.

## Cost (flag before adding anything that bills)

- **Vercel Hobby** — free for a static SPA on a personal subdomain. Only a
  concern if it ever needs Pro (commercial use / team). Below the ~$10 line
  today; noted so it's not a surprise.
- **No scheduled agents.** The Trends Loop is **on-demand only** (Dave calls
  it), so there's no recurring background-agent cost.
- **External paid deps are ones Dave already has:** Mobbin (paid), Dribbble
  (account). Figma, if used for moodboards later, is free tier.
- Nothing here reaches for a metered API key.

## Phased implementation — each phase ends: build → verify → PR → stop

**Phase 0 — Foundations.** Attach the repo with push access, branch, land these
docs, add a lint script + a token-only guard (grep for raw hex / `gray-N` /
`duration-N` in components). _Verify:_ `npm run typecheck && npm run build`
clean; docs merged.

**Phase 1 — Skin+Palette model.** Refactor the token architecture to
`data-skin` × `data-palette`; write the token contract; migrate **one** skin
(Neubrutalist — the reference) into the model with all three palettes.
_Verify:_ the skin renders correctly in Light/Dark/Fun; WCAG-AA contrast passes
for each palette; no flash-of-wrong-theme on load (blocking inline read in
`index.html` before paint).

**Phase 2 — Shell & IA.** Sidebar nav; Themes list with miniature thumbnails
(port the picker); Theme detail with palette switcher + Page/Components toggle;
Style guide (port from daves-demos). _Verify:_ local Playwright sweep — the one
migrated skin across all three palettes, desktop + 390px, zero console errors.

**Phase 3 — Component library page.** The consolidated token-only components on
the _Components_ view, driven by the active skin+palette. _Verify:_ every
component legible in that skin × all three palettes, both layouts.

**Phase 4 — Skin migration.** Bring the keeper skins across (Dave's shortlist),
each elevated to a real skin with three palettes and a Page showcase. _Verify:_
per-skin browser pass + contrast per palette; the thumbnail grid fills in.

**Phase 5 — Trends Loop v1.** Build the capture inbox → ingest → cluster →
moodboard → skin-spec handoff described in [trends-loop.md](trends-loop.md), as
a callable skill. _Verify:_ a dry run over sample screenshots produces a
clustered trend board and one proposed skin spec.

**Phase 6 — Cutover.** Create the Vercel project, wire DNS to
themes.kidastro.com, add SPA rewrites, decide the kidastro.com/themes redirect,
and retire daves-demos. _Verify:_ the subdomain serves the built app; routing,
DNS, and build are green.

**Phase 7 — Keep it fresh.** Run the loop on call; add skins/palettes as trends
move; log each run.

## Testing strategy (per phase, non-negotiable before a PR ships)

- `npm run typecheck`, `npm run lint`, `npm run build` — all clean.
- **Local Playwright sweep** — screenshots across a representative skin set × 3
  palettes, desktop + 390px, asserting zero console/page errors. This is the
  same browser-verification habit used to validate daves-demos; it stays local
  (free) rather than in CI.
- **Contrast check (WCAG AA)** for every palette — reuse the contrast-test
  pattern that already exists in this repo's lineage / myguitarday.
- **Token-only guard** — the Phase-0 grep, run in lint, keeps skins swappable.

## Decisions for Dave (surface now, refine as we go — none block starting)

1. **Framework:** keep **Vite** (recommended) vs migrate to Next. Recommendation
   is Vite for the reasons in D1.
2. **Palette names:** the three are **Light / Dark / Fun** — global names, or
   per-skin names (e.g. Neubrutalist's fun one = "Candy")? Recommend global
   slugs (`light`/`dark`/`fun`) with an optional per-skin display label.
3. **Motion:** ship-with-skin default (recommended, D3) vs keep the current
   user-facing motion axis + easing lab.
4. **kidastro.com/themes** after subdomain cutover: 301-redirect to the
   subdomain (recommended) vs keep both live.
5. **Keeper skins:** confirm the shortlist to migrate first — Dave said the
   last-half favorites plus a handful of the early ones; a proposed list will
   come with Phase 4 for him to edit.
