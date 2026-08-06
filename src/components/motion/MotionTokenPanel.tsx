import { useState } from "react";
import type { MotionMeta } from "../../motion/types";
import { Badge, Button } from "../primitives";
import { motionTokensToCss } from "../../lib/tokens";

/**
 * The handoff. Mirrors sections/TokenPanel: the page doubles as documentation,
 * and one button gives you the block to paste into a new project.
 *
 * Values are read from the live DOM rather than the registry, so what you copy
 * is what the page is actually running — the same approach themeTokensToCss
 * takes, and the reason the registry can't silently drift into the clipboard.
 */

const GROUPS: { label: string; names: string[] }[] = [
  {
    label: "Easing",
    names: ["--curve-standard", "--curve-entrance", "--curve-exit", "--curve-emphasis"],
  },
  { label: "Duration", names: ["--dur-1", "--dur-2", "--dur-3", "--dur-4", "--dur-5"] },
  { label: "Travel", names: ["--travel-sm", "--travel-md", "--travel-lg"] },
  { label: "Interaction", names: ["--lift", "--press", "--stagger"] },
];

export function MotionTokenPanel({ motion }: { motion: MotionMeta }) {
  const [copied, setCopied] = useState(false);
  const [resolved, setResolved] = useState<Record<string, string>>({});

  const capture = (el: HTMLDivElement | null) => {
    if (!el || Object.keys(resolved).length) return;
    const cs = getComputedStyle(el);
    const next: Record<string, string> = {};
    for (const g of GROUPS) {
      for (const n of g.names) next[n] = cs.getPropertyValue(n).trim();
    }
    setResolved(next);
  };

  const copy = async (el: HTMLElement) => {
    await navigator.clipboard.writeText(motionTokensToCss(motion.slug, el));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section ref={capture} className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="mb-4">
          Motion tokens
        </Badge>
        <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          The {motion.name} system
        </h2>
        <p className="mt-3 text-muted">
          Every transition on this page resolves through these. Copy the block,
          drop it in a project, set <code className="font-mono text-sm">data-motion</code>{" "}
          and the feel comes with it.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {GROUPS.map((group) => (
          <div key={group.label} className="rounded-lg border border-border bg-surface p-5 elev-1">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {group.label}
            </h3>
            <dl className="mt-3 space-y-1.5">
              {group.names.map((name) => (
                <div key={name} className="flex items-baseline justify-between gap-3">
                  <dt className="shrink-0 font-mono text-xs text-fg">{name}</dt>
                  <dd className="truncate font-mono text-xs text-muted" title={resolved[name]}>
                    {resolved[name] || "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={(e) => copy(e.currentTarget)}
          variant={copied ? "secondary" : "primary"}
        >
          {copied ? "Copied to clipboard" : `Copy the ${motion.name} block`}
        </Button>
      </div>
    </section>
  );
}
