import { useCallback, useEffect, useRef, useState } from "react";
import { motionStyles } from "../../motion";
import type { MotionMeta } from "../../motion/types";
import { Button, SegmentedControl } from "../primitives";
import { cn } from "../../lib/cn";

/**
 * The comparison strip. One lane per easing (or per motion style in compare
 * mode), all triggered on the same tick, so the difference is visible rather
 * than described.
 *
 * Driven by real CSS transitions rather than the sampler in lib/easing — the
 * point of this instrument is what the browser actually does. The lane sets
 * transition-timing-function inline and the dot's transform is toggled; slow-mo
 * multiplies the duration.
 */

type Mode = "curves" | "styles";
type Travel = "short" | "long";

const SPEEDS = ["1×", "0.5×", "0.25×"] as const;
const SPEED_FACTOR: Record<(typeof SPEEDS)[number], number> = {
  "1×": 1,
  "0.5×": 2,
  "0.25×": 4,
};

const CURVE_KEYS: (keyof MotionMeta["curves"])[] = ["standard", "entrance", "exit", "emphasis"];

interface Lane {
  label: string;
  easing: string;
  durationMs: number;
}

function Track({ lane, running, factor }: { lane: Lane; running: boolean; factor: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 shrink-0 truncate text-xs font-medium text-muted" title={lane.label}>
        {lane.label}
      </div>
      <div className="relative h-8 flex-1 rounded-md border border-border bg-surface-2">
        {/* Start and finish marks, so a lane that overshoots visibly passes the line. */}
        <span aria-hidden className="absolute inset-y-1 left-1 w-px bg-border" />
        <span aria-hidden className="absolute inset-y-1 right-1 w-px bg-border" />
        <span
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: "0.25rem",
            transitionProperty: "transform",
            transitionTimingFunction: lane.easing,
            transitionDuration: `${lane.durationMs * factor}ms`,
            transform: running ? "translateX(var(--race-distance))" : "translateX(0)",
          }}
        />
      </div>
      <div className="w-14 shrink-0 text-right font-mono text-[10px] text-muted">
        {Math.round(lane.durationMs * factor)}ms
      </div>
    </div>
  );
}

export function RaceTrack({ motion }: { motion: MotionMeta }) {
  const [mode, setMode] = useState<Mode>("curves");
  const [travel, setTravel] = useState<Travel>("long");
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>("1×");
  const [loop, setLoop] = useState(true);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  const factor = SPEED_FACTOR[speed];

  const lanes: Lane[] =
    mode === "curves"
      ? CURVE_KEYS.map((k) => ({
          label: k,
          easing: motion.curves[k],
          durationMs: motion.durations[2],
        }))
      : motionStyles.map((m) => ({
          label: m.name,
          easing: m.curves.standard,
          // Compare mode uses each style's own duration — the timing is as much
          // of the difference as the curve, and normalizing it would hide half
          // of what makes these styles distinct.
          durationMs: m.durations[2],
        }));

  const longest = Math.max(...lanes.map((l) => l.durationMs)) * factor;

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = useCallback(() => {
    clear();
    setRunning(false);
    // One frame at zero before starting, or the transition has nothing to
    // interpolate from and the dots teleport.
    timers.current.push(window.setTimeout(() => setRunning(true), 50));
    timers.current.push(window.setTimeout(() => setRunning(false), longest + 700));
  }, [longest]);

  useEffect(() => {
    run();
    if (!loop) return;
    const id = window.setInterval(run, longest * 2 + 1400);
    return () => {
      window.clearInterval(id);
      clear();
    };
  }, [run, loop, longest]);

  useEffect(() => clear, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="font-display text-2xl font-bold tracking-tight text-fg">Race track</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Every lane starts on the same tick. Watch where they separate — that gap
        is the whole difference between one motion style and another.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <SegmentedControl
          options={["curves", "styles"]}
          value={mode}
          onChange={(v) => setMode(v as Mode)}
          size="sm"
        />
        <SegmentedControl
          options={["short", "long"]}
          value={travel}
          onChange={(v) => setTravel(v as Travel)}
          size="sm"
        />
        <SegmentedControl
          options={[...SPEEDS]}
          value={speed}
          onChange={(v) => setSpeed(v as (typeof SPEEDS)[number])}
          size="sm"
        />
        <Button size="sm" variant="outline" onClick={run}>
          Replay
        </Button>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
            className="accent-primary"
          />
          Loop
        </label>
      </div>

      <div
        className={cn(
          "mt-6 space-y-2.5 rounded-lg border border-border bg-surface p-5 elev-1",
          mode === "styles" && "[&_.w-24]:w-28"
        )}
        style={
          {
            // Distance lives on the container so every lane travels the same
            // span, and the token means "long" tracks the motion style too.
            "--race-distance": travel === "long" ? "calc(100% - 3rem)" : "6rem",
          } as React.CSSProperties
        }
      >
        {lanes.map((lane) => (
          <Track key={lane.label} lane={lane} running={running} factor={factor} />
        ))}
      </div>

      {mode === "styles" && (
        <p className="mt-3 text-xs text-muted">
          Each lane runs at its own style&rsquo;s surface duration — the timing is as
          much of the character as the curve.
        </p>
      )}
    </section>
  );
}
