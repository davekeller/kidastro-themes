import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

/* Inline SVG charts so a dashboard theme has something to show without
   pulling a charting dependency into a library whose whole point is being
   copy-pasteable. Bars and the area fill use currentColor, so the parent sets
   the series color with a token class (text-primary, text-accent, …) and the
   chart tracks the active theme. */

export interface ChartCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  /** Optional value shown large beside the title. */
  value?: string;
  caption?: string;
  /** Normalized series, any length. Values are scaled to the tallest point. */
  data: number[];
  variant?: "bars" | "area";
  /** Token class picking the series color, e.g. "text-primary". */
  seriesClassName?: string;
}

export function ChartCard({
  title,
  value,
  caption,
  data,
  variant = "area",
  seriesClassName = "text-primary",
  className,
  ...props
}: ChartCardProps) {
  const max = Math.max(...data, 1);
  const w = 100;
  const h = 36;

  // A single-point series has no span to divide across, which would make the
  // step Infinity and collapse the path.
  const step = data.length > 1 ? w / (data.length - 1) : w;
  const points = data.map((d, i) => [i * step, h - (d / max) * h] as const);
  const line = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

  return (
    <div
      className={cn("rounded-lg border border-border bg-surface p-4 elev-1", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-fg">{title}</div>
          {caption && <div className="mt-0.5 text-xs text-muted">{caption}</div>}
        </div>
        {value && (
          <div className="font-display text-xl font-bold tracking-tight text-fg">
            {value}
          </div>
        )}
      </div>

      <div className={cn("mt-4", seriesClassName)}>
        {variant === "bars" ? (
          <div className="flex h-16 items-end gap-1">
            {data.map((d, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-current"
                style={{ height: `${Math.max((d / max) * 100, 3)}%` }}
              />
            ))}
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="none"
            className="h-16 w-full"
            aria-hidden
          >
            <polygon points={`0,${h} ${line} ${w},${h}`} fill="currentColor" opacity="0.14" />
            <polyline
              points={line}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
