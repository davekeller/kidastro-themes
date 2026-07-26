import type { ComponentType } from "react";
import type { ThemeMeta } from "../themes/types";
import { BentoShowcase } from "./BentoShowcase";
import { LinearShowcase } from "./LinearShowcase";

/**
 * The hybrid model: themes are tokens-first, but a theme can earn its own
 * page composition. Register a component here and /theme/:slug renders it
 * instead of the shared ThemeShowcase — same primitives, different bones.
 * Tokens still do all the styling; a showcase only *arranges* components.
 */
export const customShowcases: Record<string, ComponentType<{ theme: ThemeMeta }>> = {
  bento: BentoShowcase,
  linear: LinearShowcase,
};
