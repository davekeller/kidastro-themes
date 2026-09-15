# The Trends Loop — keeping the library current

_Draft · 2026-09-14 · `docs/trends-loop.md`_

## Purpose

Keep the theme library ahead of where UI design is going by **systematically
sampling real design galleries, clustering what's there into named _style
trends_, and synthesizing original token-based skins** from those trends. The
unit of interest is a _style_ (e.g. "liquid glass," "editorial serif,"
"brutalist candy"), which usually shows up across several apps at once — not
any single UI. We reference trends; we never clone a specific product's screens
or ship its assets.

## The hard reality this design is built around

Mobbin and Dribbble are **login-walled, paid, bot-protected** sites, and from
the cloud Claude Code environment they are **blocked at the network proxy
(verified 2026-09-14: HTTPS CONNECT returns 403)**. A headless crawler is
therefore both impossible from here _and_ against those sites' terms. So the
loop is deliberately split:

- **Capture is human**, from Dave's own logged-in browser — the sites he pays
  for, used the way they're meant to be used.
- **Curation and synthesis are the machine's job** — the clustering,
  moodboarding, and original token work, which is where the leverage actually
  is.

This is the ethically clean and technically robust posture. No server ever
scrapes a paid, login-walled site.

## The loop, end to end

1. **Trigger — on demand.** Dave runs the loop ("run the trends loop", later a
   `/trends` skill). Not scheduled, so there's no recurring background cost.

2. **Capture — Dave (or a local session on his Mac).** In his logged-in Chrome,
   Dave saves screenshots of styles that catch his eye into
   `inspiration/inbox/`. A light filename convention carries context —
   `source__style-hunch__note.png` (e.g. `mobbin__liquid-glass__settings.png`) —
   or a `.txt`/`.json` sidecar for anything richer. Because his Mac holds the
   logged-in session, a **local** Claude Code session could later drive
   Playwright against his own Chrome profile to assist capture; that's an
   optional enhancement, gated on his ToS comfort, and explicitly _not_ done
   from the cloud environment.

3. **Ingest & cluster — the loop.** Reads the inbox, de-dupes, and clusters the
   references by visual style into named trends, each trend a set of N
   references with a short characterization (palette tendencies, type, shape,
   depth/texture, motion feel). Output: a structured `trends/<date>.json` plus a
   readable summary.

4. **Moodboard — the loop.** Assembles the clustered shots into a browsable
   board. Note: the Figma REST API is read-mostly and **cannot create image
   nodes** — writing to a Figma canvas needs a plugin. So **v1 is a generated
   contact-sheet** (a static HTML page / Artifact) grouped by trend that Dave
   can view and drag into Figma himself. **v2 (optional, later)** is a small
   Figma plugin that pulls the organized inbox onto a canvas; it needs a Figma
   token and a little plugin scaffolding — flagged as a Needs-you if pursued.

5. **Synthesize skins — the loop + Dave.** For a chosen trend, the loop drafts a
   **skin spec** — form tokens plus the three palettes (Light/Dark/Fun) —
   _inspired by_ the cluster: original values, contrast-checked, following the
   skin authoring contract in [themes-app-plan.md](themes-app-plan.md). Dave steers; approved specs
   get built into the library through the Phase-4 mechanics.

6. **Record.** Each run appends to `trends/HISTORY.md` — what trends were seen,
   what got built, what was skipped and why — the same dated-ledger discipline
   used for architecture reviews. The library's evolution stays legible.

## Sources (weighted, extensible)

Kept in a `trends/sources.md`, each with how it's sampled and its capture note:

- **Mobbin** — primary, paid, highest weight. Capture: human, logged in.
- **Dribbble** — Dave's account; trends / popular / recent. Capture: human.
- **Over time:** Godly, Land-book, SaaS Landing Page, Awwwards, Refero, and
  peers — pluggable, each added with its own sampling + capture note. Weighting
  favors Mobbin, then Dribbble, then the rest.

## Constraints & ethics — baked in, not optional

- **Reference, don't rip.** Cluster to _styles_; synthesize _original_ tokens.
  Never reproduce a specific app's UI, layout, or assets. Screenshots are
  private moodboard reference and are **not** shipped or committed as product.
- **ToS-clean capture.** Human, from paid/authorized logins; no automated
  scraping of login-walled sites, and never from a server.
- **Cost-clean.** On-demand only; no scheduled agent; capture rides Dave's
  existing subscriptions; Figma (if used) is free tier. The agent work runs on
  the Max subscription like any other session.

## Invocation & cadence

Run on call. A sensible rhythm is monthly, or whenever Dave feels the wind
shift. Formalized as a callable skill in Phase 5; until then it's a documented
manual procedure.

## What lives in the repo

```
inspiration/
  inbox/            # Dave drops screenshots here (gitignored — reference only)
trends/
  sources.md        # the weighted source list + capture notes
  <date>.json       # a run's clustered output
  HISTORY.md        # the dated ledger of runs, builds, and skips
```

`inspiration/inbox/` is **gitignored** — the raw reference material never ships;
only the synthesized, original skins and the trend ledger do.
