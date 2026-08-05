/**
 * A tiny spring integrator, so the spring bench can show overshoot and settle
 * time. Springs aren't beziers — they have no fixed duration, which is exactly
 * why they deserve their own instrument rather than a slot in the curve atlas.
 *
 * Semi-implicit Euler at a fixed step. Not the analytic solution, but it's the
 * same method the popular animation libraries use, so the shapes match what
 * you'd get in practice.
 */

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface SpringSample {
  /** Seconds. */
  t: number;
  /** Position, where 0 is the start and 1 the target. */
  value: number;
}

const DT = 1 / 240; // fixed step, finer than a frame so stiff springs stay stable

export interface SpringTrace {
  samples: SpringSample[];
  /** Seconds until it stays within `threshold` of the target. */
  settleTime: number;
  /** Peak value reached; > 1 means it overshot. */
  peak: number;
  /** How far past the target it went, as a percentage. 0 when critically damped. */
  overshootPct: number;
}

export function simulateSpring(
  { stiffness, damping, mass }: SpringConfig,
  { maxT = 6, threshold = 0.001 }: { maxT?: number; threshold?: number } = {}
): SpringTrace {
  let x = 0;
  let v = 0;
  const samples: SpringSample[] = [{ t: 0, value: 0 }];
  let peak = 0;
  let settleTime = maxT;
  let settledSince: number | null = null;

  for (let t = DT; t <= maxT; t += DT) {
    const springForce = stiffness * (1 - x);
    const dampingForce = -damping * v;
    const a = (springForce + dampingForce) / Math.max(mass, 0.01);
    v += a * DT;
    x += v * DT;

    // Sample at ~120Hz for plotting; the integration runs finer than that.
    if (samples.length === 0 || t - samples[samples.length - 1].t >= 1 / 120) {
      samples.push({ t, value: x });
    }
    if (x > peak) peak = x;

    // Settled means it stayed inside the threshold, not merely passed through
    // it — an underdamped spring crosses the target on the way to overshooting.
    const near = Math.abs(1 - x) < threshold && Math.abs(v) < threshold;
    if (near) {
      if (settledSince === null) settledSince = t;
      if (t - settledSince > 0.05) {
        settleTime = settledSince;
        samples.push({ t, value: x });
        break;
      }
    } else {
      settledSince = null;
    }
  }

  return {
    samples,
    settleTime,
    peak,
    overshootPct: Math.max(0, (peak - 1) * 100),
  };
}

/** Polyline points for a trace, normalized into a unit box with y flipped. */
export function springPath(trace: SpringTrace, yMin: number, yMax: number): string {
  const span = trace.samples[trace.samples.length - 1]?.t || 1;
  const range = yMax - yMin || 1;
  return trace.samples
    .map((s) => {
      const x = s.t / span;
      const y = (s.value - yMin) / range;
      return `${x.toFixed(4)},${(1 - y).toFixed(4)}`;
    })
    .join(" ");
}
