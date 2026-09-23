import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type Tone = "neutral" | "success" | "warning" | "danger";

const dots: Record<Tone, string> = {
  neutral: "bg-muted",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

/* Status as a colored dot beside muted text, rather than colored text on a
   tinted fill: the dot only has to be visible, so status colors can stay
   saturated while the label leans on --muted, which every palette keeps AA.
   Ported from daves-demos, where it carried twenty themes. */
export function StatusPill({ tone = "neutral", className, children, ...props }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted",
        className
      )}
      {...props}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dots[tone])} />
      {children}
    </span>
  );
}
