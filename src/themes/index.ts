import type { ThemeMeta } from "./types";

/**
 * The theme registry — the single source of truth for the gallery and routes.
 * Each theme's actual token values live in src/index.css under a
 * [data-theme="<slug>"] block. To add a theme: add a token block in index.css
 * and an entry here. That's it.
 */
export const themes: ThemeMeta[] = [
  {
    slug: "kidastro",
    name: "Kid Astro",
    description:
      "The portfolio theme — deep-space navy, Bricolage Grotesque, and an arcade palette.",
    tags: ["Dark", "Portfolio", "Playful"],
  },
  {
    slug: "minimal",
    name: "Clean / Minimal",
    description:
      "Neutral palette, tight spacing, subtle borders. A calm product/SaaS baseline.",
    tags: ["Neutral", "Product", "SaaS"],
  },
  {
    slug: "neon",
    name: "Dark / Neon",
    description:
      "Dark canvas with cyan and magenta glow. Techy, high-energy, mono display type.",
    tags: ["Dark", "Techy", "Glow"],
  },
  {
    slug: "editorial",
    name: "Editorial / Warm",
    description:
      "Paper tones, warm ink, and a serif display face. Magazine-style and human.",
    tags: ["Serif", "Editorial", "Warm"],
  },
  {
    slug: "brutalist",
    name: "Bold / Brutalist",
    description:
      "Raw paper, pure black ink, zero radius, hard offset shadows. Loud and unapologetic.",
    tags: ["Raw", "High-contrast", "Mono"],
  },
  {
    slug: "terminal",
    name: "Retro / Terminal",
    description:
      "Phosphor green on near-black with an amber accent. Everything set in mono.",
    tags: ["Dark", "CRT", "Mono"],
  },
  {
    slug: "luxe",
    name: "Luxe / Noir",
    description:
      "Near-black canvas, champagne gold, and a garamond display. Quiet luxury.",
    tags: ["Dark", "Luxury", "Serif"],
  },
  {
    slug: "candy",
    name: "Soft / Candy",
    description:
      "Cream, bubblegum, and mint with huge radii and rounded type. Pure play.",
    tags: ["Playful", "Pastel", "Rounded"],
  },
  {
    slug: "botanical",
    name: "Organic / Botanical",
    description:
      "Sage paper, forest green, and terracotta with a bookish serif. Calm and natural.",
    tags: ["Natural", "Calm", "Green"],
  },
  {
    slug: "industrial",
    name: "Industrial / Utility",
    description:
      "Graphite, safety orange, and condensed capitals. Built, not decorated.",
    tags: ["Dark", "Utilitarian", "Bold"],
  },
  {
    slug: "deco",
    name: "Deco / Emerald",
    description:
      "Ivory, deep emerald, and antique gold under a Cinzel display. Gatsby-grade elegance.",
    tags: ["Geometric", "Gold", "Elegant"],
  },
  {
    slug: "bento",
    name: "Bento / Grid",
    description:
      "Keynote-modern: the whole page is one asymmetric grid of rounded tiles. Custom layout.",
    tags: ["Bento", "Modern", "Custom layout"],
  },
  {
    slug: "linear",
    name: "Product / Dark",
    description:
      "Dev-tool precision — dense centered column, feature rows, hairline glows, keyboard chips. Custom layout.",
    tags: ["Dark", "Dev-tool", "Custom layout"],
  },
  {
    slug: "aurora",
    name: "Aurora / Mesh",
    description:
      "Stripe-era optimism: indigo-to-cyan gradient mesh, angled section seams, floating product cards.",
    tags: ["Light", "SaaS", "Custom layout"],
  },
  {
    slug: "neubrutalist",
    name: "Neubrutalist / Candy",
    description:
      "Gumroad energy — hot pink, thick ink outlines, hard offset shadows, rotated stickers, marquee.",
    tags: ["Loud", "Playful", "Custom layout"],
  },
  {
    slug: "glass",
    name: "Glass / Spatial",
    description:
      "visionOS depth: frosted translucent panels floating at different depths over an ambient aurora.",
    tags: ["Dark", "Frosted", "Custom layout"],
  },
  {
    slug: "clay",
    name: "Clay / Soft 3D",
    description:
      "Duolingo-grade friendliness — puffy extruded surfaces, chunky buttons, a stepped lesson path.",
    tags: ["Playful", "3D", "Custom layout"],
  },
  {
    slug: "broadsheet",
    name: "Editorial / Broadsheet",
    description:
      "Substack meets newsprint: masthead rules, multi-column article grid, drop caps, pull quotes.",
    tags: ["Serif", "Print", "Custom layout"],
  },
  {
    slug: "y2k",
    name: "Y2K / Retro-future",
    description:
      "Poolsuite nostalgia — sun-bleached cream, chrome bevels, OS-window panels, pixel meta type.",
    tags: ["Retro", "Bevel", "Custom layout"],
  },
  {
    slug: "organic",
    name: "Organic / Hand-drawn",
    description:
      "Notion-meets-zine: warm paper, squiggle underlines, tilted polaroid cards, pasted-up margins.",
    tags: ["Warm", "Hand-drawn", "Custom layout"],
  },
  {
    slug: "swiss",
    name: "Swiss / Grid",
    description:
      "International Typographic Style — exposed 12-column grid, numbered sections, rules instead of cards.",
    tags: ["Grid", "Typographic", "Custom layout"],
  },
  {
    slug: "specsheet",
    name: "Spec-sheet / Mono",
    description:
      "Technical datasheet: monospace throughout, dotted leader lines, section IDs, tables as layout.",
    tags: ["Mono", "Technical", "Custom layout"],
  },
  {
    slug: "kinetic",
    name: "Kinetic / Agency",
    description:
      "Awwwards energy — viewport-filling display type, marquees, scroll-pinned scenes, acid lime on black.",
    tags: ["Dark", "Editorial", "Custom layout"],
  },
  {
    slug: "console",
    name: "Console / Dashboard",
    description:
      "The app behind the login — sidebar rail, KPI row, charts, and a data table. Dark and engineered.",
    tags: ["Dark", "Dashboard", "App shell", "Custom layout"],
  },
  {
    slug: "docs",
    name: "Docs / Knowledge base",
    description:
      "Three-column documentation: nav tree, prose with anchors, and an on-this-page rail. Code everywhere.",
    tags: ["Light", "Docs", "Mono", "Custom layout"],
  },
  {
    slug: "liquid",
    name: "Liquid / Chrome",
    description:
      "Specular translucency — wet edge highlights, concentric radii, iridescent violet over deep indigo.",
    tags: ["Dark", "Frosted", "Spatial", "Custom layout"],
  },
  {
    slug: "native",
    name: "Native / Mobile",
    description:
      "A phone: grouped list rows, segmented controls, a bottom tab bar, and a sheet. iOS-flavored.",
    tags: ["Light", "Mobile", "App shell", "Custom layout"],
  },
];

export function getTheme(slug?: string): ThemeMeta | undefined {
  return themes.find((t) => t.slug === slug);
}

export type { ThemeMeta };
