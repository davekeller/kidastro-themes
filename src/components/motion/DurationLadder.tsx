import type { MotionMeta } from "../../motion/types";

/**
 * The five duration tiers as bars at true relative scale, labeled with what
 * each is for. Makes the system legible rather than just present — the gap
 * between tier 1 and tier 5 is the style's whole dynamic range.
 */

const TIERS = [
  { n: 1, name: "Micro", use: "hover, focus ring, color change" },
  { n: 2, name: "Control", use: "button, switch, chip" },
  { n: 3, name: "Surface", use: "dropdown, tooltip, accordion" },
  { n: 4, name: "Overlay", use: "modal, drawer, sheet" },
  { n: 5, name: "Scene", use: "page or section reveal" },
];

export function DurationLadder({ motion }: { motion: MotionMeta }) {
  const max = Math.max(...motion.durations, 1);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="font-display text-2xl font-bold tracking-tight text-fg">Duration ladder</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Five tiers, drawn to scale against each other. Pick by what&rsquo;s moving,
        not by how long you want it to take.
      </p>

      <div className="mt-8 space-y-3 rounded-lg border border-border bg-surface p-5 elev-1">
        {TIERS.map((tier, i) => {
          const ms = motion.durations[i];
          const pct = (ms / max) * 100;
          return (
            <div key={tier.n} className="flex items-center gap-4">
              <div className="w-32 shrink-0">
                <div className="text-sm font-medium text-fg">
                  <span className="font-mono text-xs text-muted">dur-{tier.n}</span> {tier.name}
                </div>
                <div className="truncate text-[11px] text-muted" title={tier.use}>
                  {tier.use}
                </div>
              </div>
              <div className="h-6 flex-1 rounded-md bg-surface-2">
                <div
                  className="h-full rounded-md bg-primary"
                  // A 0ms tier still needs a visible sliver, or "no animation
                  // at all" reads as a rendering bug instead of a decision.
                  style={{ width: `${Math.max(pct, 1.5)}%` }}
                />
              </div>
              <div className="w-16 shrink-0 text-right font-mono text-xs text-muted">
                {ms}ms
              </div>
            </div>
          );
        })}
      </div>

      {motion.durations[0] === 0 && (
        <p className="mt-3 text-xs text-muted">
          This style sets <code className="font-mono">dur-1</code> to 0ms on purpose:
          micro-interactions don&rsquo;t animate here, they just change.
        </p>
      )}
    </section>
  );
}
