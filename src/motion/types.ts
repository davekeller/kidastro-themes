export interface MotionMeta {
  /** URL slug and the value used for the data-motion attribute. */
  slug: string;
  /** Display name shown in the gallery and detail bar. */
  name: string;
  /** One-line description of the character. */
  description: string;
  /** Short tags shown on the gallery card. */
  tags: string[];
  /** Theme slugs this style was tuned against. Suggestions, not constraints —
      any motion style composes with any theme. */
  pairsWith: string[];
  /** The same values as the [data-motion] block in index.css, in JS form.
      Duplicated on purpose: CSS drives the component library, and the curve
      plots and spring bench need the numbers to draw with. index.css is the
      source of truth — if these drift, the CSS is right. */
  curves: {
    standard: string;
    entrance: string;
    exit: string;
    emphasis: string;
  };
  /** Milliseconds, tiers 1–5: micro, control, surface, overlay, scene. */
  durations: [number, number, number, number, number];
  /** Spring approximation of this style's character, for the spring bench. */
  spring: { stiffness: number; damping: number; mass: number };
}
