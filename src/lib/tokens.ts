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
