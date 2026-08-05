import { useEffect, useRef, useState } from "react";
import { useInteraction } from "../../interaction";
import { Button } from "../primitives";
import { cn } from "../../lib/cn";

/**
 * What content does as it enters view. Uses a real IntersectionObserver against a
 * scrollable stage rather than faking it on a timer, so the behavior is the one
 * you'd actually ship.
 *
 * `none` is a real choice, not an absence: dense, working surfaces are worse when
 * content animates in every time you scroll past it.
 */

const ROWS = ["Requests", "Latency", "Error rate", "Build minutes", "Cache hits", "Egress"];

export function ScrollRevealDemo() {
  const { scrollReveal } = useInteraction();
  const stageRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [key, setKey] = useState(0);

  useEffect(() => {
    setSeen(new Set());
    if (scrollReveal === "none") return;
    const stage = stageRef.current;
    if (!stage) return;

    const io = new IntersectionObserver(
      (entries) => {
        setSeen((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            if (e.isIntersecting) next.add(Number((e.target as HTMLElement).dataset.i));
          }
          return next;
        });
      },
      { root: stage, threshold: 0.5 }
    );

    stage.querySelectorAll("[data-i]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scrollReveal, key]);

  const hidden = (i: number) => scrollReveal !== "none" && !seen.has(i);

  return (
    <div className="rounded-lg border border-border bg-surface p-5 elev-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-fg">Scroll reveal</h3>
          <p className="mt-0.5 text-xs text-muted">
            This style reveals on scroll with{" "}
            <span className="font-mono text-primary">{scrollReveal}</span>. Scroll
            the panel.
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            stageRef.current?.scrollTo({ top: 0 });
            setKey((k) => k + 1);
          }}
        >
          Reset
        </Button>
      </div>

      <div
        ref={stageRef}
        key={key}
        className="mt-4 h-48 overflow-y-auto rounded-md border border-border bg-bg p-3"
      >
        {/* Spacer so the first rows start below the fold and actually get revealed. */}
        <div className="h-20 text-center text-[11px] text-muted">↓ scroll</div>
        <div className="space-y-2">
          {ROWS.map((r, i) => (
            <div
              key={r}
              data-i={i}
              className={cn(
                "rounded-md border border-border bg-surface px-3 py-2 text-xs text-fg",
                scrollReveal !== "none" && "transition-[opacity,transform] dur-3 ease-entrance"
              )}
              style={{
                opacity: hidden(i) ? 0 : 1,
                transform: hidden(i) ? "translateY(var(--travel-md))" : "translateY(0)",
                // Stagger only earns its keep when items arrive together; on a
                // plain fade it would just look like lag.
                transitionDelay:
                  scrollReveal === "stagger" ? `calc(var(--stagger) * ${i % 3})` : "0ms",
              }}
            >
              {r}
            </div>
          ))}
        </div>
        <div className="h-16" />
      </div>
    </div>
  );
}
