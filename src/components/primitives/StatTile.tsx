import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Trend = "up" | "down" | "flat";

const trendStyles: Record<Trend, string> = {
  up: "text-success",
  down: "text-danger",
  flat: "text-muted",
};

const arrows: Record<Trend, string> = {
  up: "↑",
  down: "↓",
  flat: "→",
};

export interface StatTileProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  /** Optional delta shown beside the value, e.g. "12.4%". */
  delta?: string;
  trend?: Trend;
  /** Small caption under the value — period, comparison, footnote. */
  caption?: string;
}

/** A single KPI. The atom the dashboard stat row is built from. */
export function StatTile({
  label,
  value,
  delta,
  trend = "flat",
  caption,
  className,
  ...props
}: StatTileProps) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-surface p-4 elev-1", className)}
      {...props}
    >
      <div className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold tracking-tight text-fg">
          {value}
        </span>
        {delta && (
          <span className={cn("text-sm font-medium", trendStyles[trend])}>
            {arrows[trend]} {delta}
          </span>
        )}
      </div>
      {caption && <div className="mt-1 text-xs text-muted">{caption}</div>}
    </div>
  );
}
