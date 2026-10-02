import type { PaletteMeta, PaletteSlug, SkinMeta } from "./types";
import { PALETTE_SLUGS } from "./types";

export { PALETTE_SLUGS } from "./types";
export type { PaletteMeta, PaletteSlug, SkinMeta } from "./types";

/**
 * The skin registry — the single source of truth for the Themes list and the
 * /skin/:slug routes. A skin's token values live in src/index.css as one
 * [data-skin="<slug>"] form block plus three [data-skin][data-palette] color
 * blocks (contract: docs/skin-contract.md). To add a skin: write those four
 * blocks, add an entry here, and `npm run contrast` will check the palettes.
 *
 * The legacy single-axis themes in src/themes stay registered separately until
 * Phase 4 migrates the keepers across; the Themes list shows both.
 */
export const skins: SkinMeta[] = [
  {
    slug: "kidastro",
    name: "Kid Astro",
    description:
      "kidastro.com as a skin — deep-space navy, Bricolage Grotesque, a teal-and-yellow arcade signal, soft rim-lit depth. The house skin.",
    tags: ["Dark", "Portfolio", "Playful", "Custom layout"],
    palettes: [
      { slug: "light", label: "Daylight" },
      { slug: "dark", label: "Deep space" },
      { slug: "fun", label: "Arcade" },
    ],
    bestFor: [
      "Creative portfolios and personal sites",
      "Experimental products and creative tools",
      "Developer tools that are allowed a personality",
    ],
    rules: [
      "Deep layers, not flat black: surfaces float on the canvas with a rim-lit edge and a soft drop.",
      "Teal leads; yellow and pink turn up as small arcade signals — a status dot, a highlight, a glow.",
      "Balance round, friendly surfaces with crisp technical detail: mono labels, coordinates, readouts.",
      "Bricolage Grotesque for everything — heavy and tight for display, easygoing for body.",
    ],
    avoid: [
      "Large rainbow gradients. The color cycle belongs to thin lines and the icosahedron.",
      "Corporate blue-on-white defaults — even Daylight keeps the teal-and-yellow signal.",
      "Setting text in the signal colors. They're fills, rules, and dots; ink stays --fg.",
    ],
  },
  {
    slug: "neubrutalist",
    name: "Neubrutalist",
    description:
      "Gumroad energy — thick ink outlines, hard offset shadows, flat candy fills, springy motion. The reference skin.",
    tags: ["Loud", "Playful", "Custom layout"],
    palettes: [
      { slug: "light", label: "Paper" },
      { slug: "dark", label: "Blackout" },
      { slug: "fun", label: "Candy" },
    ],
    bestFor: [
      "Creator storefronts, launches, and pricing pages",
      "Marketing surfaces that are supposed to shout",
      "Anywhere flat-and-bold beats subtle-and-soft",
    ],
    rules: [
      "Every raised surface gets an ink border and a hard offset shadow — never a blur.",
      "Fills are flat. Primary and accent do the work; no gradients, no tints.",
      "Display type is black-weight, tight, and usually uppercase. Let it fill the width.",
      "Tilt or overlap a few elements so the page reads pasted-up, not templated.",
    ],
    avoid: [
      "Rounding past the skin's --radius — the form reads as clay, not brutalist.",
      "Pastel status colors. Status here is ink on a fill, same as everything else.",
      "Dropping the border when you drop the shadow; they travel together.",
    ],
  },
  {
    slug: "native",
    name: "Native Mobile",
    description:
      "A platform-minded mobile skin — grouped surfaces, restrained depth, generous touch geometry, and motion that settles quickly.",
    tags: ["Mobile", "App shell", "Product", "Custom layout"],
    palettes: [
      { slug: "light", label: "System light" },
      { slug: "dark", label: "Midnight" },
      { slug: "fun", label: "Orchid" },
    ],
    bestFor: [
      "Mobile products and companion apps",
      "Settings, activity, and account surfaces",
      "Touch-first prototypes that should feel immediately familiar",
    ],
    rules: [
      "Compose in phone-scale groups: a quiet canvas, raised grouped surfaces, and clear row dividers.",
      "Use generous touch targets and concise labels; hierarchy comes from grouping before decoration.",
      "Keep elevation soft and local. Sheets may float, but ordinary rows should stay nearly flat.",
      "Motion is short and settled with a slight native spring on emphasized transitions.",
    ],
    avoid: [
      "Desktop-density tables squeezed into a phone frame.",
      "Heavy shadows on every row — grouped surfaces should read as one object.",
      "Tiny controls or ornamental gestures with no obvious touch target.",
    ],
  },
  {
    slug: "liquid",
    name: "Liquid Chrome",
    description:
      "Specular translucency with wet edge light, concentric curves, slow floating motion, and layered surfaces that feel optically thick.",
    tags: ["Spatial", "Frosted", "Expressive", "Custom layout"],
    palettes: [
      { slug: "light", label: "Pearl" },
      { slug: "dark", label: "Deep indigo" },
      { slug: "fun", label: "Ultraviolet" },
    ],
    bestFor: [
      "Premium launches and spatial product stories",
      "Media, creative, and AI products with layered interfaces",
      "Small high-impact surfaces where depth can do real work",
    ],
    rules: [
      "Every raised surface gets a fine specular edge and a broad, low-contrast shadow.",
      "Nest radii concentrically so controls feel molded into their containers.",
      "Use translucency in layers, with enough solid contrast that content never turns foggy.",
      "Let one or two soft color fields create the atmosphere; keep the content geometry calm.",
    ],
    avoid: [
      "Blur without an edge highlight — it reads as haze instead of material.",
      "Stacking transparent text, controls, and panels until hierarchy disappears.",
      "Sharp rectangular inserts that break the concentric surface language.",
    ],
  },
  {
    slug: "docs",
    name: "Docs Knowledge Base",
    description:
      "A reading-first documentation skin — quiet navigation, precise anchors, crisp code surfaces, and typography built for long sessions.",
    tags: ["Docs", "Knowledge", "Technical", "Custom layout"],
    palettes: [
      { slug: "light", label: "Paper" },
      { slug: "dark", label: "Night shift" },
      { slug: "fun", label: "Highlighter" },
    ],
    bestFor: [
      "Developer documentation and API references",
      "Knowledge bases and product help centers",
      "Technical onboarding with prose, code, and callouts",
    ],
    rules: [
      "Reading owns the center; navigation and the table of contents stay quieter than the prose.",
      "Code, callouts, and anchors are first-class content rather than decorative interruptions.",
      "Use rules, spacing, and weight for hierarchy before reaching for colored text.",
      "Keep motion precise and brief so orientation is never traded for spectacle.",
    ],
    avoid: [
      "Marketing-scale display type inside documentation content.",
      "Low-contrast code blocks or syntax treatments that depend on color alone.",
      "Dense navigation trees without visible grouping or a clear current page.",
    ],
  },
  {
    slug: "console",
    name: "Console Dashboard",
    description:
      "An operations-focused product skin — dense but ordered, quietly elevated, mono where precision matters, and engineered for live status.",
    tags: ["Dashboard", "App shell", "Data", "Custom layout"],
    palettes: [
      { slug: "light", label: "Control room" },
      { slug: "dark", label: "Night ops" },
      { slug: "fun", label: "Phosphor" },
    ],
    bestFor: [
      "Infrastructure, observability, and deployment tools",
      "Data-heavy admin products and internal platforms",
      "Operational surfaces that must communicate state quickly",
    ],
    rules: [
      "Lead with state and trend: status, deltas, and time ranges should scan before decoration.",
      "Keep radii tight, elevation shallow, and spacing systematic so dense information stays composed.",
      "Use monospace for identifiers and measurements, not for every sentence.",
      "Reserve the brightest fills for live state, selection, and primary action.",
    ],
    avoid: [
      "Dashboard wallpaper — every chart or metric needs an operational question to answer.",
      "Large empty hero regions that push current system state below the fold.",
      "Making every panel equally loud; hierarchy still matters in a dense console.",
    ],
  },
  {
    slug: "kinetic",
    name: "Kinetic Agency",
    description:
      "An editorial studio skin — assertive display type, sharp pacing, marquee energy, and project-first composition without billboard-sized headings.",
    tags: ["Agency", "Editorial", "Motion", "Custom layout"],
    palettes: [
      { slug: "light", label: "Studio" },
      { slug: "dark", label: "After dark" },
      { slug: "fun", label: "Poster" },
    ],
    bestFor: [
      "Creative studios, agencies, and production companies",
      "Project indexes and portfolio case-study fronts",
      "Launches where typography and motion carry the identity",
    ],
    rules: [
      "Type sets the rhythm, but it must leave room for project information and calls to action.",
      "Alternate loud bands with quiet editorial sections so the page has tempo instead of constant volume.",
      "Use the signal color in decisive blocks, rules, and active states rather than on ordinary body copy.",
      "Motion should feel directed and cinematic: horizontal reveals, marquees, and deliberate stagger.",
    ],
    avoid: [
      "Viewport-swallowing headlines that turn the first screen into a single word.",
      "Animating every label; movement needs a hierarchy just like type does.",
      "Generic card grids that erase the skin's editorial pacing.",
    ],
  },
  {
    slug: "y2k",
    name: "Retro Future",
    description:
      "An optimistic desktop from the early web — beveled OS chrome, sun-faded media graphics, pixel metadata, and playful machine-like feedback.",
    tags: ["Retro", "Y2K", "Bevel", "Custom layout"],
    palettes: [
      { slug: "light", label: "Poolside" },
      { slug: "dark", label: "Night drive" },
      { slug: "fun", label: "Cyber pop" },
    ],
    bestFor: [
      "Music, media, and culture products",
      "Nostalgic campaigns and playful product launches",
      "Creative tools and microsites that benefit from a visible interface metaphor",
    ],
    rules: [
      "Build the page from little application windows: title bars, inset wells, hard controls, and visible system state.",
      "Pair heavyweight grotesk display type with pixel metadata; keep body copy readable and contemporary.",
      "Use bevels as structure, not garnish — every raised control needs a light edge and a shadow edge.",
      "Let tickers, timestamps, track counters, and tiny utility labels sell the machine before adding decoration.",
    ],
    avoid: [
      "Soft modern card shadows or glass blur; the material is molded plastic and desktop chrome.",
      "Pixel fonts for paragraphs. They are metadata, labels, and short bursts only.",
      "Nostalgia without hierarchy — novelty details should still support the task on screen.",
    ],
  },
];

/** What a first visit wears before any skin has been opened. */
export const DEFAULT_SKIN = "kidastro";
export const DEFAULT_PALETTE: PaletteSlug = "dark";

/** The app's own chrome — the rail and the Themes list — always wears this,
 *  whatever skin the content area is showing. */
export const HOUSE_SKIN = "kidastro";
export const HOUSE_PALETTE: PaletteSlug = "dark";

export function getSkin(slug?: string | null): SkinMeta | undefined {
  return skins.find((s) => s.slug === slug);
}

export function isPaletteSlug(value: unknown): value is PaletteSlug {
  return typeof value === "string" && (PALETTE_SLUGS as readonly string[]).includes(value);
}

export function getPalette(skin: SkinMeta, slug: PaletteSlug): PaletteMeta {
  return skin.palettes.find((p) => p.slug === slug) ?? skin.palettes[0];
}
