/**
 * The third axis. Where a theme is color and shape and a motion style is timing,
 * an interaction style is **structure**: what shape a disclosure takes, where
 * navigation lives, how an element signals it's interactive.
 *
 * That difference is why this axis can't live in CSS variables alone the way the
 * other two do. "Open in a drawer instead of a modal" isn't a value — it's a
 * different component. So these are flags a component branches on, delivered
 * through context, with a `data-interaction` attribute carrying the parts that
 * genuinely are CSS.
 */

/** What shape revealing more detail takes. */
export type Disclosure = "inline" | "modal" | "drawer" | "fullscreen";

/** Where navigation lives and how it behaves. */
export type Nav = "sticky" | "overlay" | "sidebar";

/** How an element signals it's interactive on hover. */
export type Affordance = "lift" | "underline" | "glow" | "cursor";

/** What happens to content as it enters the viewport. */
export type ScrollReveal = "none" | "fade" | "stagger";

export interface InteractionMeta {
  /** URL slug and the value used for the data-interaction attribute. */
  slug: string;
  name: string;
  description: string;
  tags: string[];
  /** Motion slugs this pairs naturally with. Suggestions, not constraints. */
  pairsWith: string[];

  disclosure: Disclosure;
  nav: Nav;
  affordance: Affordance;
  scrollReveal: ScrollReveal;
}
