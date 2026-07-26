/** Shared helpers for the ambient canvas layers (Starfield, NorthernLights,
 *  AstroHedron): read the active theme's five palette tokens off an element. */

export type RGB = { r: number; g: number; b: number };

/** Palette tokens in the portfolio's cycle order. */
export const PALETTE_TOKENS = [
  "--accent",
  "--primary",
  "--danger",
  "--warning",
  "--success",
] as const;

export function parseColor(raw: string): RGB {
  const s = raw.trim();
  const hex = s.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  const rgb = s.match(/rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/);
  if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3] };
  return { r: 255, g: 255, b: 255 };
}

export function readPalette(el: Element): RGB[] {
  const styles = getComputedStyle(el);
  return PALETTE_TOKENS.map((t) => parseColor(styles.getPropertyValue(t)));
}
