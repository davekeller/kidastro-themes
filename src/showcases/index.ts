import { lazy, type ComponentType } from "react";
import type { ThemeMeta } from "../themes/types";

type Showcase = ComponentType<{ theme: ThemeMeta }>;

// Showcase worlds are intentionally code-split. The gallery does not need to
// download twenty full-page compositions before somebody opens one.
const KidAstroShowcase = lazy(() => import("./KidAstroShowcase").then((m) => ({ default: m.KidAstroShowcase })));
const MinimalShowcase = lazy(() => import("./MinimalShowcase").then((m) => ({ default: m.MinimalShowcase })));
const EditorialShowcase = lazy(() => import("./EditorialShowcase").then((m) => ({ default: m.EditorialShowcase })));
const LuxeShowcase = lazy(() => import("./LuxeShowcase").then((m) => ({ default: m.LuxeShowcase })));
const BotanicalShowcase = lazy(() => import("./BotanicalShowcase").then((m) => ({ default: m.BotanicalShowcase })));
const BentoShowcase = lazy(() => import("./BentoShowcase").then((m) => ({ default: m.BentoShowcase })));
const LinearShowcase = lazy(() => import("./LinearShowcase").then((m) => ({ default: m.LinearShowcase })));
const AuroraShowcase = lazy(() => import("./AuroraShowcase").then((m) => ({ default: m.AuroraShowcase })));
const NeubrutalistShowcase = lazy(() => import("./NeubrutalistShowcase").then((m) => ({ default: m.NeubrutalistShowcase })));
const ClayShowcase = lazy(() => import("./ClayShowcase").then((m) => ({ default: m.ClayShowcase })));
const BroadsheetShowcase = lazy(() => import("./BroadsheetShowcase").then((m) => ({ default: m.BroadsheetShowcase })));
const Y2KShowcase = lazy(() => import("./Y2KShowcase").then((m) => ({ default: m.Y2KShowcase })));
const OrganicShowcase = lazy(() => import("./OrganicShowcase").then((m) => ({ default: m.OrganicShowcase })));
const SwissShowcase = lazy(() => import("./SwissShowcase").then((m) => ({ default: m.SwissShowcase })));
const SpecSheetShowcase = lazy(() => import("./SpecSheetShowcase").then((m) => ({ default: m.SpecSheetShowcase })));
const KineticShowcase = lazy(() => import("./KineticShowcase").then((m) => ({ default: m.KineticShowcase })));
const ConsoleShowcase = lazy(() => import("./ConsoleShowcase").then((m) => ({ default: m.ConsoleShowcase })));
const DocsShowcase = lazy(() => import("./DocsShowcase").then((m) => ({ default: m.DocsShowcase })));
const LiquidShowcase = lazy(() => import("./LiquidShowcase").then((m) => ({ default: m.LiquidShowcase })));
const NativeShowcase = lazy(() => import("./NativeShowcase").then((m) => ({ default: m.NativeShowcase })));

/**
 * Every active skin has its own page composition: same portable primitives,
 * different bones. ThemeShowcase remains the fallback for a future uncomposed
 * skin while it is being developed.
 */
export const customShowcases: Record<string, Showcase> = {
  kidastro: KidAstroShowcase,
  minimal: MinimalShowcase,
  editorial: EditorialShowcase,
  luxe: LuxeShowcase,
  botanical: BotanicalShowcase,
  bento: BentoShowcase,
  linear: LinearShowcase,
  aurora: AuroraShowcase,
  neubrutalist: NeubrutalistShowcase,
  clay: ClayShowcase,
  broadsheet: BroadsheetShowcase,
  y2k: Y2KShowcase,
  organic: OrganicShowcase,
  swiss: SwissShowcase,
  specsheet: SpecSheetShowcase,
  kinetic: KineticShowcase,
  console: ConsoleShowcase,
  docs: DocsShowcase,
  liquid: LiquidShowcase,
  native: NativeShowcase,
};
