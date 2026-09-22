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

export const DEFAULT_SKIN = "neubrutalist";
export const DEFAULT_PALETTE: PaletteSlug = "light";

export function getSkin(slug?: string | null): SkinMeta | undefined {
  return skins.find((s) => s.slug === slug);
}

export function isPaletteSlug(value: unknown): value is PaletteSlug {
  return typeof value === "string" && (PALETTE_SLUGS as readonly string[]).includes(value);
}

export function getPalette(skin: SkinMeta, slug: PaletteSlug): PaletteMeta {
  return skin.palettes.find((p) => p.slug === slug) ?? skin.palettes[0];
}
