/**
 * Parsing and sampling for the easing values in src/motion — enough to draw a
 * curve, not a general CSS parser. Handles the three forms the motion styles
 * actually use: cubic-bezier(), linear, and steps().
 *
 * The race track deliberately does NOT use this. It drives real CSS transitions
 * so you're watching the browser's own interpolation; this module is for the
 * plots, where we need the shape as geometry.
 */

export type Easing =
  | { kind: "bezier"; x1: number; y1: number; x2: number; y2: number }
  | { kind: "linear" }
  | { kind: "steps"; count: number; position: "start" | "end" };

export function parseEasing(value: string): Easing {
  const v = value.trim();

  const bezier = /^cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/.exec(v);
  if (bezier) {
    return {
      kind: "bezier",
      x1: parseFloat(bezier[1]),
      y1: parseFloat(bezier[2]),
      x2: parseFloat(bezier[3]),
      y2: parseFloat(bezier[4]),
    };
  }

  const steps = /^steps\(\s*(\d+)\s*(?:,\s*(start|end)\s*)?\)$/.exec(v);
  if (steps) {
    return {
      kind: "steps",
      count: parseInt(steps[1], 10),
      position: (steps[2] as "start" | "end") ?? "end",
    };
  }

  // ease-in/ease-out/etc. all have bezier equivalents, but the registry only
  // ever emits explicit beziers, so anything left is linear.
  return { kind: "linear" };
}

/* Cubic bezier with implicit endpoints (0,0) and (1,1). */
const bez = (a: number, b: number, t: number) => {
  const u = 1 - t;
  return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
};

const bezDerivative = (a: number, b: number, t: number) => {
  const u = 1 - t;
  return 3 * u * u * a + 6 * u * t * (b - a) + 3 * t * t * (1 - b);
};

/**
 * Progress (0–1) for a given fraction of the duration (0–1).
 *
 * For a bezier this means solving Bx(s) = x for the curve parameter s, then
 * returning By(s) — x and s are not the same thing, which is the detail that
 * makes naive curve plots wrong. Newton-Raphson, with bisection as the fallback
 * because the overshooting curves (springy's y2 > 1) can have a derivative near
 * zero where Newton stalls.
 */
export function sampleEasing(easing: Easing, x: number): number {
  const t = Math.min(1, Math.max(0, x));

  if (easing.kind === "linear") return t;

  if (easing.kind === "steps") {
    const { count, position } = easing;
    const stepped = position === "start" ? Math.ceil(t * count) : Math.floor(t * count);
    return Math.min(1, Math.max(0, stepped / count));
  }

  const { x1, y1, x2, y2 } = easing;

  let s = t;
  for (let i = 0; i < 8; i++) {
    const err = bez(x1, x2, s) - t;
    if (Math.abs(err) < 1e-6) return bez(y1, y2, s);
    const d = bezDerivative(x1, x2, s);
    if (Math.abs(d) < 1e-6) break;
    s -= err / d;
  }

  let lo = 0;
  let hi = 1;
  s = t;
  for (let i = 0; i < 24; i++) {
    s = (lo + hi) / 2;
    const err = bez(x1, x2, s) - t;
    if (Math.abs(err) < 1e-6) break;
    if (err > 0) hi = s;
    else lo = s;
  }
  return bez(y1, y2, s);
}

/** Polyline points for an easing, in a unit box with y flipped for SVG. */
export function easingPath(easing: Easing, samples = 96): string {
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = i / samples;
    const y = sampleEasing(easing, x);
    pts.push(`${x.toFixed(4)},${(1 - y).toFixed(4)}`);
  }
  return pts.join(" ");
}

/**
 * How far the curve leaves the 0–1 band, in both directions.
 *
 * These are different things and shouldn't share a label: going past 1 is
 * overshoot (it arrives, then settles back), while dipping below 0 is anticipation
 * (it winds up before moving). Springy's exit curve does the second, not the first.
 */
export function extent(easing: Easing): { min: number; max: number } {
  let min = 0;
  let max = 1;
  for (let i = 0; i <= 96; i++) {
    const y = sampleEasing(easing, i / 96);
    if (y < min) min = y;
    if (y > max) max = y;
  }
  // Bezier control points can sit outside the sampled curve's own extent, and
  // the atlas draws them, so they have to be inside the box too.
  if (easing.kind === "bezier") {
    for (const y of [easing.y1, easing.y2]) {
      if (y < min) min = y;
      if (y > max) max = y;
    }
  }
  return { min, max };
}

export function overshoots(easing: Easing): boolean {
  return extent(easing).max > 1.0005;
}

export function anticipates(easing: Easing): boolean {
  return extent(easing).min < -0.0005;
}
