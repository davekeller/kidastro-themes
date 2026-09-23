import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  body?: string;
  /** Usually one button — the thing that fills the panel. */
  action?: ReactNode;
}

/* What a panel says before it has anything in it. The dashed edge reads as
   "intentionally not filled in yet" in every skin. Ported from daves-demos. */
export function EmptyState({ title, body, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="mb-1 grid h-10 w-10 place-items-center rounded-lg border border-dashed border-border bg-surface-2 font-mono text-lg text-muted"
      >
        +
      </span>
      <p className="font-display text-lg font-semibold tracking-tight text-fg">{title}</p>
      {body && <p className="max-w-sm text-sm text-muted">{body}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
