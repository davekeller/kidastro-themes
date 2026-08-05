// GitHub Pages has no SPA rewrites, so give every route a real HTML file: copy
// the built index.html to theme/<slug>/ and motion/<slug>/ for each registered
// entry (proper 200s for deep links), plus 404.html as a catch-all fallback.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const index = join(dist, "index.html");

const slugsFrom = (relPath, label) => {
  const src = readFileSync(join(root, relPath), "utf8");
  const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (slugs.length === 0) throw new Error(`No ${label} slugs found in ${relPath}`);
  return slugs;
};

const write = (segments) => {
  const dir = join(dist, ...segments);
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, "index.html"));
};

const themes = slugsFrom("src/themes/index.ts", "theme");
const motions = slugsFrom("src/motion/index.ts", "motion");

copyFileSync(index, join(dist, "404.html"));
for (const slug of themes) write(["theme", slug]);
// The bare /motion index needs its own file too — it's a route, not just a prefix.
write(["motion"]);
for (const slug of motions) write(["motion", slug]);

console.log(
  `spa-fallback: 404.html + ${themes.length} theme routes (${themes.join(", ")})\n` +
    `              + /motion + ${motions.length} motion routes (${motions.join(", ")})`
);
