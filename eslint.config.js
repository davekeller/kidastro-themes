import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

// Standard Vite + React + TypeScript flat config. The bespoke, repo-specific
// rule (tokens only) lives in scripts/check-tokens.mjs, run as `npm run guard`.
export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // The motion/interaction demos legitimately kick off an animation from an
      // effect (RaceTrack, ScrollRevealDemo). That's animation setup, not the
      // cascading-render smell this rule targets, so it's a visible warning
      // rather than a hard error — revisit per-component if one ever thrashes.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Node scripts run outside the browser.
  {
    files: ["scripts/**/*.{mjs,js}"],
    languageOptions: { globals: globals.node },
  },
);
