import type { ComponentType } from "react";
import type { ThemeMeta } from "../themes/types";
import { BentoShowcase } from "./BentoShowcase";
import { LinearShowcase } from "./LinearShowcase";
import { AuroraShowcase } from "./AuroraShowcase";
import { NeubrutalistShowcase } from "./NeubrutalistShowcase";
import { GlassShowcase } from "./GlassShowcase";
import { ClayShowcase } from "./ClayShowcase";
import { BroadsheetShowcase } from "./BroadsheetShowcase";
import { Y2KShowcase } from "./Y2KShowcase";
import { OrganicShowcase } from "./OrganicShowcase";
import { SwissShowcase } from "./SwissShowcase";
import { SpecSheetShowcase } from "./SpecSheetShowcase";
import { KineticShowcase } from "./KineticShowcase";

/**
 * The hybrid model: themes are tokens-first, but a theme can earn its own
 * page composition. Register a component here and /theme/:slug renders it
 * instead of the shared ThemeShowcase — same primitives, different bones.
 * Tokens still do all the styling; a showcase only *arranges* components.
 */
export const customShowcases: Record<string, ComponentType<{ theme: ThemeMeta }>> = {
  bento: BentoShowcase,
  linear: LinearShowcase,
  aurora: AuroraShowcase,
  neubrutalist: NeubrutalistShowcase,
  glass: GlassShowcase,
  clay: ClayShowcase,
  broadsheet: BroadsheetShowcase,
  y2k: Y2KShowcase,
  organic: OrganicShowcase,
  swiss: SwissShowcase,
  specsheet: SpecSheetShowcase,
  kinetic: KineticShowcase,
};
