import { useMemo, useState } from "react";
import type { MotionMeta } from "../../motion/types";
import { simulateSpring, springPath, type SpringConfig } from "../../lib/spring";
import { Button } from "../primitives";

/**
 * Springs get their own instrument because they aren't beziers: no fixed
 * duration, and the interesting properties (overshoot, settle time) fall out of
 * the physics rather than being authored.
 *
 * The trace is a real integration, and the demo object is driven by a CSS
 * transition whose duration comes from the computed settle time — an honest
 * approximation, since CSS has no spring primitive. That's stated on the page
 * rather than glossed.
 */

const SLIDERS = [
  { key: "stiffness" as const, label: "Stiffness", min: 20, max: 900, step: 10, hint: "how hard it pulls" },
  { key: "damping" as const, label: "Damping", min: 2, max: 80, step: 1, hint: "how much it resists" },
  { key: "mass" as const, label: "Mass", min: 0.2, max: 4, step: 0.1, hint: "how much inertia" },
];

export function SpringBench({ motion }: { motion: MotionMeta }) {
  const [config, setConfig] = useState<SpringConfig>(motion.spring);
  const [toggled, setToggled] = useState(false);

  const trace = useMemo(() => simulateSpring(config), [config]);

  // The plot has to fit whatever the spring does, including a big overshoot.
  const yMax = Math.max(1.05, trace.peak + 0.08);
  const yMin = Math.min(0, ...trace.samples.map((s) => s.value)) - 0.05;
  const path = springPath(trace, yMin, yMax);
  const targetY = 1 - (1 - yMin) / (yMax - yMin);

  const reset = () => setConfig(motion.spring);
  const isPreset =
    config.stiffness === motion.spring.stiffness &&
    config.damping === motion.spring.damping &&
    config.mass === motion.spring.mass;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="font-display text-2xl font-bold tracking-tight text-fg">Spring bench</h2>
      <p className="mt-2 max-w-2xl text-muted">
        {motion.name}&rsquo;s spring approximation, and room to tune it. Springs have
        no duration — you get a settle time instead, and it changes as you drag.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* Trace */}
        <div className="rounded-lg border border-border bg-surface p-5 elev-1">
          <div className="aspect-[2/1] w-full">
            <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
              {/* Target line — crossing it is overshoot. */}
              <line
                x1="0"
                y1={targetY}
                x2="1"
                y2={targetY}
                stroke="currentColor"
                strokeWidth="0.004"
                strokeDasharray="0.02"
                className="text-border"
              />
              <polyline
                points={path}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="font-mono text-lg font-bold text-fg">
                {trace.settleTime.toFixed(2)}s
              </div>
              <div className="text-[11px] uppercase tracking-wide text-muted">settle</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-fg">
                {trace.overshootPct.toFixed(0)}%
              </div>
              <div className="text-[11px] uppercase tracking-wide text-muted">overshoot</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-fg">
                {(config.damping / (2 * Math.sqrt(config.stiffness * config.mass))).toFixed(2)}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-muted">damping ratio</div>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-muted">
            A damping ratio below 1 overshoots, 1 is critical, above 1 crawls in
            without ever crossing the line.
          </p>
        </div>

        {/* Controls + demo */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-surface p-5 elev-1">
            {SLIDERS.map((s) => (
              <label key={s.key} className="mb-4 block last:mb-0">
                <span className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-fg">{s.label}</span>
                  <span className="font-mono text-xs text-muted">
                    {config[s.key]}
                  </span>
                </span>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={config[s.key]}
                  onChange={(e) =>
                    setConfig((c) => ({ ...c, [s.key]: parseFloat(e.target.value) }))
                  }
                  className="mt-1.5 w-full accent-primary"
                />
                <span className="text-[11px] text-muted">{s.hint}</span>
              </label>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={reset}
              disabled={isPreset}
              className="mt-1 w-full"
            >
              {isPreset ? `${motion.name} preset` : `Reset to ${motion.name}`}
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-surface p-5 elev-1">
            <div className="relative h-12 rounded-md border border-border bg-surface-2">
              <span
                className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-accent"
                style={{
                  left: "0.5rem",
                  transitionProperty: "transform",
                  transitionDuration: `${trace.settleTime * 1000}ms`,
                  // CSS has no spring, so the demo borrows the settle time and
                  // the style's emphasis curve. Called out below rather than
                  // pretended otherwise.
                  transitionTimingFunction: motion.curves.emphasis,
                  transform: toggled ? "translateX(calc(100% + 5.5rem))" : "translateX(0)",
                }}
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setToggled((v) => !v)}
              className="mt-3 w-full"
            >
              Send it
            </Button>
            <p className="mt-2 text-[11px] leading-snug text-muted">
              CSS has no spring primitive, so this borrows the computed settle time
              and the emphasis curve. The trace on the left is the real physics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
