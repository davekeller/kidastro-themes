import { useState } from "react";
import type { MotionMeta } from "../../motion/types";
import {
  anticipates,
  easingPath,
  extent,
  overshoots,
  parseEasing,
  sampleEasing,
} from "../../lib/easing";
import { cn } from "../../lib/cn";

/**
 * One plot per easing in the active motion style, drawn from the actual curve
 * geometry. Hovering scrubs a dot along the curve so you can see where the
 * motion spends its time — the flat stretches are where it's slow.
 */

const LABELS: Record<keyof MotionMeta["curves"], { title: string; use: string }> = {
  standard: { title: "Standard", use: "The workhorse. Anything without a reason to differ." },
  entrance: { title: "Entrance", use: "Things arriving. Decelerates into place." },
  exit: { title: "Exit", use: "Things leaving. Accelerates away." },
  emphasis: { title: "Emphasis", use: "State changes worth noticing." },
};

const ORDER: (keyof MotionMeta["curves"])[] = ["standard", "entrance", "exit", "emphasis"];

function Plot({
  value,
  scrub,
}: {
  value: string;
  scrub: number | null;
}) {
  const easing = parseEasing(value);
  const points = easingPath(easing);

  /* The viewBox is fitted to the curve's real extent rather than a guessed pad:
     springy's entrance has y2 = 1.7, so a fixed padding either clips the peak or
     wastes space on the curves that stay inside the box. Symmetric vertical
     margin keeps the unit square centered so plots stay visually comparable. */
  const { min, max } = extent(easing);
  const margin = Math.max(max - 1, 0 - min, 0) + 0.08;
  const vbY = -margin;
  const vbH = 1 + margin * 2;
  const vb = `${-0.08} ${vbY} ${1.16} ${vbH}`;

  /* Every stroke uses non-scaling-stroke, so widths are in screen pixels and
     stay even under the non-uniform viewBox. Radii are still user units, so
     they scale with the box — kept small deliberately. */
  const r = 0.022 * vbH;

  const dotY = scrub === null ? null : 1 - sampleEasing(easing, scrub);

  return (
    <svg viewBox={vb} preserveAspectRatio="none" className="h-full w-full" aria-hidden>
      <g vectorEffect="non-scaling-stroke">
        {/* Unit box — the 0→1 band. Anything outside it leaves the band. */}
        <rect
          x="0" y="0" width="1" height="1"
          fill="none" stroke="currentColor" strokeWidth="1"
          className="text-border" vectorEffect="non-scaling-stroke"
        />
        <line
          x1="0" y1="1" x2="1" y2="0"
          stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"
          className="text-border" vectorEffect="non-scaling-stroke"
        />

        {easing.kind === "bezier" && (
          <g className="text-muted" opacity="0.45">
            <line
              x1="0" y1="1" x2={easing.x1} y2={1 - easing.y1}
              stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke"
            />
            <line
              x1="1" y1="0" x2={easing.x2} y2={1 - easing.y2}
              stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke"
            />
            <ellipse cx={easing.x1} cy={1 - easing.y1} rx={r * 0.6} ry={r} fill="currentColor" />
            <ellipse cx={easing.x2} cy={1 - easing.y2} rx={r * 0.6} ry={r} fill="currentColor" />
          </g>
        )}

        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
          vectorEffect="non-scaling-stroke"
        />

        {dotY !== null && scrub !== null && (
          <>
            <line
              x1={scrub} y1={vbY} x2={scrub} y2={vbY + vbH}
              stroke="currentColor" strokeWidth="1"
              className="text-primary" opacity="0.35" vectorEffect="non-scaling-stroke"
            />
            <ellipse
              cx={scrub} cy={dotY} rx={r * 0.9} ry={r * 1.5}
              fill="currentColor" className="text-accent"
            />
          </>
        )}
      </g>
    </svg>
  );
}

export function CurveAtlas({ motion }: { motion: MotionMeta }) {
  const [scrub, setScrub] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1400);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="font-display text-2xl font-bold tracking-tight text-fg">Curve atlas</h2>
      <p className="mt-2 max-w-2xl text-muted">
        The four easings in this style. The dashed diagonal is linear — distance
        from it is how much the curve is shaping the motion. Hover a plot to scrub.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ORDER.map((key) => {
          const value = motion.curves[key];
          const meta = LABELS[key];
          const easing = parseEasing(value);
          return (
            <div key={key} className="rounded-lg border border-border bg-surface p-4 elev-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-fg">{meta.title}</h3>
                {/* Two different behaviors, two different labels: past 1 is
                    overshoot, below 0 is a wind-up before moving. */}
                {overshoots(easing) && (
                  <span className="shrink-0 rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                    overshoots
                  </span>
                )}
                {!overshoots(easing) && anticipates(easing) && (
                  <span className="shrink-0 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                    anticipates
                  </span>
                )}
              </div>
              <p className="mt-1 min-h-[2.5rem] text-xs leading-snug text-muted">{meta.use}</p>

              <div
                className="mt-3 aspect-square w-full cursor-crosshair"
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setScrub(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
                }}
                onPointerLeave={() => setScrub(null)}
              >
                <Plot value={value} scrub={scrub} />
              </div>

              <button
                type="button"
                onClick={() => copy(key, value)}
                title={value}
                className={cn(
                  "mt-3 block w-full truncate rounded-md border border-border bg-surface-2 px-2 py-1.5 text-left font-mono text-[10px] transition-colors hover:border-ring",
                  copied === key ? "text-success" : "text-muted"
                )}
              >
                {copied === key ? "copied" : value}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
