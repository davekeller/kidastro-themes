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
