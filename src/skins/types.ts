/** The three palettes every skin ships, in display order. Slugs are global —
 *  a skin gives each one its own display label (Neubrutalist's fun palette is
 *  "Candy") but the attribute value is always one of these. */
export const PALETTE_SLUGS = ["light", "dark", "fun"] as const;
export type PaletteSlug = (typeof PALETTE_SLUGS)[number];

export interface PaletteMeta {
  slug: PaletteSlug;
  /** Per-skin display name, shown next to the global slug. */
  label: string;
}

export interface SkinMeta {
  /** URL slug and the value used for the data-skin attribute. */
  slug: string;
  name: string;
  /** One-line description of the form — what stays constant across palettes. */
  description: string;
  tags: string[];
  /** Always three, in PALETTE_SLUGS order; the token blocks live in index.css. */
  palettes: readonly PaletteMeta[];
  /** Product surfaces this skin is especially good at. */
  bestFor: string[];
  /** The small set of visual rules that make the skin recognizable. */
  rules: string[];
  /** Common choices that dilute or fight the skin. */
  avoid: string[];
}
