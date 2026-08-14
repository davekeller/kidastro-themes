# Theme catalog — current experiments

The lab currently holds twenty distinct UI skins. Twenty is a useful amount to
browse, not a quota or a promise that the list will never change. The project is
for experimenting deeply with a handful of visual worlds, then borrowing their
best ideas when building new apps.

Each skin has one canonical palette today and its own authored showcase
composition—none of the active twenty are simple recolors of the fallback page.
The theme registry also carries `bestFor`, `designRules`, and `avoid` guidance;
`/start` folds that guidance into the prompt it generates for an AI tool.

## Using the catalog

1. Start with the app you are trying to build, not with a desire to use every skin.
2. Pick one or two directions whose overall world fits the product.
3. Copy the full token system, or extract only the useful patterns—navigation,
   hierarchy, surface treatment, typography, data display, or interaction.
4. Bring discoveries back into the lab when they make a skin more coherent.

The Neubrutalist and Y2K / Retro-future skins are the quality benchmark because
their palettes, layouts, controls, typography, and small details all reinforce
the same idea. Other skins should feel equally complete in their own language,
not imitate those two aesthetically.

| Skin | Mode | Strongest use | Signature |
|---|---|---|---|
| Kid Astro | Dark | Creative products and portfolios | Deep navy, teal arcade signal, playful technical chrome |
| Clean / Minimal | Light | General product UI | Quiet keylines, compact spacing, precise blue action |
| Editorial / Warm | Light | Publishing and content | Warm paper, literary serif, rust and moss markers |
| Luxe / Noir | Dark | Luxury, fashion, hospitality | Charcoal, champagne, high-contrast serif |
| Organic / Botanical | Light | Wellness and sustainable brands | Sage paper, forest anchors, terracotta warmth |
| Bento / Grid | Light | Product storytelling | Asymmetric rounded tiles with one idea per tile |
| Dark / Product | Dark | Dev tools and B2B software | Near-black layers, indigo hairlines, compact details |
| Aurora / Mesh | Light | Fintech and growth SaaS | White UI floating through indigo/cyan atmosphere |
| Neubrutalist / Candy | Light | Creator tools and indie commerce | Black ink, candy fills, offset shadows, stickers |
| Clay / Soft 3D | Light | Learning and family apps | Puffy controls, cheerful progress, obvious tactility |
| Editorial / Broadsheet | Light | News and research | Masthead rules, columns, drop caps, dense hierarchy |
| Y2K / Retro-future | Light | Music, fashion, playful utilities | Sun-faded OS chrome, bevels, pixel metadata |
| Organic / Hand-drawn | Light | Personal and community products | Paper, squiggles, polaroids, pasted-up asymmetry |
| Swiss / Grid | Light | Studios and cultural institutions | Exposed grid, black grotesk, decisive signal red |
| Spec-sheet / Mono | Light | Hardware and technical catalogs | Instrument faceplates, reference IDs, dense mono data |
| Kinetic / Agency | Dark | Agencies and campaign work | Bold but bounded type, marquee rhythm, acid lime |
| Console / Dashboard | Dark | Operations and observability | Layered nav, live health, charts, deployment data |
| Docs / Knowledge base | Light | Documentation and help centers | Persistent navigation, readable prose, code and anchors |
| Liquid / Chrome | Dark | AI, media, spatial products | Wet specular edges, concentric radii, violet depth |
| Native / Mobile | Light | Mobile product prototypes | Grouped rows, large titles, tabs, and sheets |

## Retired in the curation

`neon`, `brutalist`, `terminal`, `candy`, `industrial`, and `deco` were early
token-only variations whose strongest ideas are better expressed by Kid Astro,
Dark / Product, Spec-sheet, Neubrutalist, Clay, Console, and Luxe. The older
`glass` skin was consolidated into the more dimensional Liquid / Chrome skin.

Nothing was lost from git history; the point of the cut is to make every choice
in the active gallery feel intentional and meaningfully different.
