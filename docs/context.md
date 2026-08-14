# kidastro-themes — project context

**What it is:** A personal UI inspiration and experimentation lab, served at
`kidastro.com/themes` and branded as an extension of `kidastro.com`. It currently
holds twenty portable skins. Each has one canonical palette, token-only
React/Tailwind components, a live showcase, and AI guidance (`bestFor`,
`designRules`, `avoid`). The owner uses it to find a visual direction and pull
useful ideas into prototypes, products, and interview case studies.

**Working intent:** The first major reference pass sampled roughly ten popular,
recognizable UI languages from Mobbin and the wider design web. Those references
are research material, not cloning targets and not a quota to maintain. Work on
a handful of promising skins at a time, using the Neubrutalist and Y2K /
Retro-future skins as benchmarks for what “complete” means: palette, type,
layout, components, and details should create one convincing world.

The count is not the product. Prefer deepening a distinctive experiment,
extracting reusable patterns, or merging/removing overlap over adding another
surface-level variation. A showcase is an inspiration specimen; a new app may
copy the whole skin or borrow only the parts that suit it.

**Current catalog:** See `docs/theme-catalog.md`. There are twenty active skins
today; that is a useful browsing constraint, not a permanent target. Seven
redundant early experiments were retired in the 2026-08 curation. Every active
skin has an authored composition in `src/showcases/`. The registry in
`src/themes/index.ts` is the source of truth.

**Three composable axes:**

- `data-theme` — the visual skin: color, type, shape, and elevation.
- `data-motion` — CSS-variable timing, easing, travel, lift, and press behavior.
- `data-interaction` — structural guidance for disclosure, navigation,
  affordance, and scroll reveal.

`/start` combines all three and generates ready-to-copy CSS plus a prompt that
includes the selected skin's visual style guide.

**Architecture:** Theme tokens live in `[data-theme="<slug>"]` blocks in
`src/index.css`. Tailwind v4's `@theme inline` maps them to semantic utilities:
`bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `bg-primary`, `border-border`,
`ring-ring`, `rounded-sm|md|lg|xl`, `font-display|sans|serif|mono`, and the
`elev-1|elev-2|glow` helpers. Components never hardcode a color, font, radius,
shadow, or timing value.

Themes can register a custom page composition in `src/showcases/index.ts`.
Those showcases may arrange the shared primitives differently, but remain
token-only. `ThemePage` falls back to the shared `ThemeShowcase` when a skin has
no custom composition.

**Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, React Router 7. No
runtime UI or animation dependency.

**Run:**

```bash
npm install
npm run dev        # http://localhost:5173/themes/
npm run typecheck
npm run build
```

**Deploy:** `davekeller/kidastro` owns the GitHub Pages workflow and stitches
this app into `/themes`. After changes merge here, run:

```bash
gh workflow run deploy.yml --repo davekeller/kidastro
```

Read `CLAUDE.md`, `README.md`, and `docs/theme-catalog.md` before editing.
