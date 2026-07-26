// GitHub Pages has no SPA rewrites, so give every route a real HTML file:
// copy the built index.html to theme/<slug>/index.html for each registered
// theme (proper 200s for deep links), plus 404.html as a catch-all fallback.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const index = join(dist, "index.html");

const registry = readFileSync(join(root, "src/themes/index.ts"), "utf8");
const slugs = [...registry.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
if (slugs.length === 0) throw new Error("No theme slugs found in src/themes/index.ts");

copyFileSync(index, join(dist, "404.html"));
for (const slug of slugs) {
  const dir = join(dist, "theme", slug);
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, "index.html"));
}
console.log(`spa-fallback: 404.html + ${slugs.length} theme routes (${slugs.join(", ")})`);
