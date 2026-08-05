import { useRef, useState } from "react";
import { useInteraction } from "../../interaction";
import { cn } from "../../lib/cn";

/**
 * How an element says "I'm interactive". Three of the four are pure CSS and ride
 * the `data-interaction` attribute; `cursor` needs pointer tracking, which is the
 * other reason this axis has a JS half.
 */

const CARDS = [
  { title: "Deployments", body: "12 services, 3 regions." },
  { title: "Observability", body: "Traces, logs, metrics." },
  { title: "Secrets", body: "Rotated every 30 days." },
];

export function AffordanceDemo() {
  const { affordance } = useInteraction();
  const stageRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="rounded-lg border border-border bg-surface p-5 elev-1">
      <h3 className="text-sm font-semibold text-fg">Hover affordance</h3>
      <p className="mt-0.5 text-xs text-muted">
        This style signals interactivity with{" "}
        <span className="font-mono text-primary">{affordance}</span>.
      </p>

      <div
        ref={stageRef}
        className="relative mt-4 grid gap-3 sm:grid-cols-3"
        onPointerMove={(e) => {
          if (affordance !== "cursor") return;
          const r = stageRef.current!.getBoundingClientRect();
          setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onPointerLeave={() => setCursor(null)}
      >
        {/* A follower blob, drawn behind the cards. Only this branch needs JS. */}
        {affordance === "cursor" && cursor && (
          <span
            aria-hidden
            className="pointer-events-none absolute z-0 h-24 w-24 rounded-full bg-primary/25 blur-2xl transition-transform dur-2 ease-standard"
            style={{ left: cursor.x - 48, top: cursor.y - 48 }}
          />
        )}

        {CARDS.map((c) => (
          <div
            key={c.title}
            className={cn(
              "group relative z-10 cursor-pointer rounded-lg border border-border bg-surface p-4 transition-[transform,box-shadow,border-color] dur-2 ease-standard",
              // hover-lift already applies translateY(var(--lift)), and --lift is
              // itself negative — writing the transform by hand here double-negated.
              affordance === "lift" && "hover-lift hover:elev-2",
              affordance === "glow" && "hover:border-primary hover:glow",
              affordance === "cursor" && "hover:border-primary/60 bg-surface/80 backdrop-blur"
            )}
          >
            <p
              className={cn(
                "text-sm font-semibold text-fg",
                affordance === "underline" &&
                  "underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] dur-2 ease-standard group-hover:decoration-primary"
              )}
            >
              {c.title}
            </p>
            <p className="mt-1 text-xs text-muted">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
