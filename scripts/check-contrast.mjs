#!/usr/bin/env node
/**
 * Contrast guard — every palette must clear WCAG AA.
 *
 * Reads each `[data-skin][data-palette]` block from src/index.css, checks that
 * it defines the whole palette contract (docs/skin-contract.md), and asserts
 * the pairs that actually carry meaning, all at ≥ 4.5:
 *   - --fg and --muted on --bg, --surface, and --surface-2   (text on surfaces)
 *   - each fill's -fg on that fill: primary, accent, success,
 *     warning, danger                                          (text on fills)
 *   - --success, --warning, --danger on --surface             (status set as
 *     text: a trend delta, a destructive menu item)
 * A palette that fails is not done. Palette values are hex so this can read them.
 *
 * Run: `npm run contrast`
 */
import { readFileSync } from "node:fs";

const AA = 4.5;
const css = readFileSync(new URL("../src/index.css", import.meta.url), "utf8");

function srgbToLin(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function luminance(hex) {
  const m = hex.replace("#", "");
  const n =
    m.length === 3
      ? m.split("").map((d) => parseInt(d + d, 16))
      : [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16));
  const [r, g, b] = n.map(srgbToLin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

// Pull every [data-skin="x"][data-palette="y"] { ... } block and its hex tokens.
const blockRe = /\[data-skin="([^"]+)"\]\[data-palette="([^"]+)"\]\s*\{([^}]*)\}/g;
const palettes = [];
for (const [, skin, palette, body] of css.matchAll(blockRe)) {
  const tokens = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    tokens[name] = value;
  }
  palettes.push({ skin, palette, tokens });
}

if (palettes.length === 0) {
  console.error("✗ contrast: no [data-skin][data-palette] blocks found");
  process.exit(1);
}

// The palette half of the contract. A missing token would otherwise inherit
// whatever an ancestor happens to set — and skip its pairs here silently.
const REQUIRED = [
  "bg",
  "surface",
  "surface-2",
  "fg",
  "muted",
  "border",
  "ring",
  "primary",
  "primary-fg",
  "accent",
  "accent-fg",
  "success",
  "success-fg",
  "warning",
  "warning-fg",
  "danger",
  "danger-fg",
  "shadow-ink",
  "scrim",
];

const PAIRS = [
  ["fg", "bg"],
  ["fg", "surface"],
  ["fg", "surface-2"],
  ["muted", "bg"],
  ["muted", "surface"],
  ["muted", "surface-2"],
  ["primary-fg", "primary"],
  ["accent-fg", "accent"],
  ["success-fg", "success"],
  ["warning-fg", "warning"],
  ["danger-fg", "danger"],
  ["success", "surface"],
  ["warning", "surface"],
  ["danger", "surface"],
];

const failures = [];
let checks = 0;
for (const { skin, palette, tokens } of palettes) {
  for (const name of REQUIRED) {
    if (!tokens[name]) failures.push(`  ${skin}/${palette}: missing --${name} (as a hex value)`);
  }
  for (const [fg, bg] of PAIRS) {
    if (!tokens[fg] || !tokens[bg]) continue;
    checks++;
    const ratio = contrast(tokens[fg], tokens[bg]);
    if (ratio < AA) {
      failures.push(
        `  ${skin}/${palette}: --${fg} (${tokens[fg]}) on --${bg} (${tokens[bg]}) = ${ratio.toFixed(2)}:1  (need ${AA})`,
      );
    }
  }
}

if (failures.length) {
  console.error(`✗ contrast: ${failures.length} problem(s)\n`);
  console.error(failures.join("\n"));
  console.error(
    `\nRaise contrast by choosing the readable *-fg (dark or light) or ` +
      `adjusting the fill — don't dull a brand color to pass.`,
  );
  process.exit(1);
}

console.log(
  `✓ contrast: AA clean (${palettes.length} palette(s), ${checks} pairs checked)`,
);
