/**
 * The full token schema — kept in sync with the [data-theme] blocks in
 * src/index.css. Order here is the order tokens appear in the copied CSS.
 */
export const tokenNames = [
  "--bg",
  "--surface",
  "--surface-2",
  "--fg",
  "--muted",
  "--border",
  "--ring",
  "--primary",
  "--primary-fg",
  "--accent",
  "--accent-fg",
  "--success",
  "--warning",
  "--danger",
  "--radius",
  "--font-sans",
  "--font-serif",
  "--font-mono",
  "--font-display",
  "--elev-1",
  "--elev-2",
  "--elev-glow",
] as const;

/**
 * Build a ready-to-paste `[data-theme="<slug>"] { ... }` CSS block from the
 * tokens currently resolved on `el` (an element inside the themed wrapper).
 */
export function themeTokensToCss(slug: string, el: Element): string {
  const styles = getComputedStyle(el);
  const lines = tokenNames
    .map((name) => {
      const value = styles.getPropertyValue(name).trim();
      return value ? `  ${name}: ${value};` : null;
    })
    .filter(Boolean);
  return `[data-theme="${slug}"] {\n${lines.join("\n")}\n}\n`;
}

/* ------------------- skin × palette (the new model) ------------------- */

/** What a skin's form block owns — kept in sync with docs/skin-contract.md. */
export const skinFormTokenNames = [
  "--radius",
  "--font-sans",
  "--font-serif",
  "--font-mono",
  "--font-display",
  "--elev-1",
  "--elev-2",
  "--elev-glow",
  "--curve-standard",
  "--curve-entrance",
  "--curve-exit",
  "--curve-emphasis",
  "--dur-1",
  "--dur-2",
  "--dur-3",
  "--dur-4",
  "--dur-5",
  "--travel-sm",
  "--travel-md",
  "--travel-lg",
  "--lift",
  "--press",
  "--stagger",
] as const;

/** What a palette block owns: every color, plus the ink the skin's shadows use. */
export const paletteTokenNames = [
  "--bg",
  "--surface",
  "--surface-2",
  "--fg",
  "--muted",
  "--border",
  "--ring",
  "--primary",
  "--primary-fg",
  "--accent",
  "--accent-fg",
  "--success",
  "--warning",
  "--danger",
  "--shadow-ink",
] as const;

/**
 * Build a ready-to-paste pair of blocks — the skin's form block and the one
 * palette currently showing — from the tokens resolved on `el`.
 *
 * Computed custom properties come back with var() already substituted, so the
 * elevation lines would read `4px 4px 0 #0a0a0a` and lose the split the
 * contract is built on. Putting `var(--shadow-ink)` back is what makes the
 * copied skin wear its other two palettes correctly.
 */
export function skinTokensToCss(skin: string, palette: string, el: Element): string {
  const styles = getComputedStyle(el);
  const read = (name: string) => styles.getPropertyValue(name).trim();
  const ink = read("--shadow-ink");

  const form = skinFormTokenNames
    .map((name) => {
      let value = read(name);
      if (!value) return null;
      if (ink && name.startsWith("--elev-")) value = value.split(ink).join("var(--shadow-ink)");
      return `  ${name}: ${value};`;
    })
    .filter(Boolean);
  const colors = paletteTokenNames
    .map((name) => {
      const value = read(name);
      return value ? `  ${name}: ${value};` : null;
    })
    .filter(Boolean);

  return [
    `[data-skin="${skin}"] {`,
    ...form,
    `}`,
    ``,
    `[data-skin="${skin}"][data-palette="${palette}"] {`,
    ...colors,
    `}`,
    ``,
  ].join("\n");
}

/**
 * The motion half of the schema — kept in sync with the [data-motion] blocks in
 * src/index.css.
 */
export const motionTokenNames = [
  "--curve-standard",
  "--curve-entrance",
  "--curve-exit",
  "--curve-emphasis",
  "--dur-1",
  "--dur-2",
  "--dur-3",
  "--dur-4",
  "--dur-5",
  "--travel-sm",
  "--travel-md",
  "--travel-lg",
  "--lift",
  "--press",
  "--stagger",
] as const;

/**
 * Build a ready-to-paste `[data-motion="<slug>"] { ... }` block from the tokens
 * currently resolved on `el`.
 *
 * Includes the two --default-transition-* lines as a trailing comment, because
 * they live in @theme inline rather than the motion block — and without them a
 * copied style silently does nothing to existing `transition-*` utilities, which
 * is the single easiest way to be confused by this system.
 */
export function motionTokensToCss(slug: string, el: Element): string {
  const styles = getComputedStyle(el);
  const lines = motionTokenNames
    .map((name) => {
      const value = styles.getPropertyValue(name).trim();
      return value ? `  ${name}: ${value};` : null;
    })
    .filter(Boolean);

  return [
    `[data-motion="${slug}"] {`,
    ...lines,
    `}`,
    ``,
    `/* Also needed once, in your @theme inline block — this is what makes every`,
    `   Tailwind transition-* utility resolve through the tokens above: */`,
    `/* --ease-standard: var(--curve-standard);`,
    `   --ease-entrance: var(--curve-entrance);`,
    `   --ease-exit: var(--curve-exit);`,
    `   --ease-emphasis: var(--curve-emphasis);`,
    `   --default-transition-duration: var(--dur-2);`,
    `   --default-transition-timing-function: var(--curve-standard); */`,
    ``,
  ].join("\n");
}
