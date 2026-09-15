#!/usr/bin/env node
/**
 * Token-only guard — the machine half of this repo's golden rule.
 *
 * The whole value of the library is that components are token-driven and
 * portable: a component must never hardcode a color, a Tailwind palette shade,
 * a raw radius, a duration, or a literal easing. Theme/motion *values* live in
 * `src/index.css` and the registries; components only ever reference tokens.
 *
 * This scans the presentational layer (components, pages, showcases) for raw
 * values and fails if it finds any. Two escape hatches, each needing a reason:
 *   - `guard-allow` on a line skips that line (a device's physical corner).
 *   - `guard-allow-file` anywhere skips the whole file — for a file whose job
 *     is to *display* code (a component that renders a [data-theme] snippet),
 *     where literal token values are content, not styling.
 * Prefer neither: reword teaching copy to not quote a live class, and use
 * tokens everywhere real styling happens.
 *
 * Run: `npm run guard`
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIRS = ["src/components", "src/pages", "src/showcases"];
const EXTS = [".tsx", ".ts"];
const ALLOW = "guard-allow";

const RULES = [
  {
    name: "raw hex color",
    // 6- or 8-digit hex only, so issue numbers like "#128" and the like don't trip it.
    re: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6})\b/,
    hint: "use a color token (bg-*/text-*/border-* or a --token in index.css)",
  },
  {
    name: "Tailwind palette shade",
    re: /\b(?:text|bg|border|ring|fill|stroke|from|via|to|divide|outline|decoration|caret|accent)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|[1-9]00|950)\b/,
    hint: "use a semantic token (bg-surface, text-muted, border-border, …)",
  },
  {
    name: "hardcoded duration",
    re: /\bduration-\[?[0-9]/,
    hint: "let motion tokens drive it (transition-*), or use dur-1…5",
  },
  {
    name: "literal easing",
    re: /\bease-(?:in-out|in|out|linear)\b/,
    hint: "use ease-standard / ease-entrance / ease-exit / ease-emphasis",
  },
  {
    name: "arbitrary radius",
    re: /\brounded-\[/,
    hint: "use rounded-sm|md|lg|xl (scales from the theme --radius)",
  },
  {
    name: "hardcoded hover lift",
    re: /\bhover:-?translate-y/,
    hint: "use the hover-lift helper (tracks the motion style's --lift)",
  },
];

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTS.some((e) => full.endsWith(e))) out.push(full);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
const violations = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  if (source.includes(`${ALLOW}-file`)) continue;
  const lines = source.split("\n");
  lines.forEach((line, i) => {
    if (line.includes(ALLOW)) return;
    for (const rule of RULES) {
      const m = rule.re.exec(line);
      if (m) {
        violations.push({
          file: relative(ROOT, file),
          line: i + 1,
          rule: rule.name,
          match: m[0],
          hint: rule.hint,
        });
      }
    }
  });
}

if (violations.length === 0) {
  console.log(`✓ token guard: clean (${files.length} files scanned)`);
  process.exit(0);
}

console.error(`✗ token guard: ${violations.length} violation(s)\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ${v.rule} → "${v.match}"`);
  console.error(`      ${v.hint}`);
}
console.error(
  `\nEach is a hardcoded value in a component. Use a token, or add a ` +
    `"${ALLOW}: <reason>" comment on the line if it is a genuine exception.`,
);
process.exit(1);
