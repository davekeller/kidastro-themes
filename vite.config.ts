import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Two homes, one build:
//   - themes.kidastro.com — the Vercel project, served at the root. Vercel
//     sets VERCEL=1 in every build, so nothing needs configuring there.
//   - kidastro.com/themes — the portfolio repo's Pages workflow builds this
//     app and copies dist/ into its site output under /themes.
// The router reads the same value back through import.meta.env.BASE_URL.
const base = process.env.VERCEL ? "/" : "/themes/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
