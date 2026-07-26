import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Served at kidastro.com/themes/ — the portfolio repo's Pages workflow builds
// this app and copies dist/ into its site output under /themes.
export default defineConfig({
  base: "/themes/",
  plugins: [react(), tailwindcss()],
});
