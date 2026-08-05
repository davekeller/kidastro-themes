import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface DeviceFrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Status-bar clock. */
  time?: string;
  /** Hides the status bar for screens that own the full canvas. */
  bare?: boolean;
}

/* A phone viewport for mobile-shell themes. `relative` so a Sheet anchors to
   the device rather than the page, and `overflow-hidden` so screen content
   clips to the rounded bezel.

   Deliberate exception to the token-only rule: the bezel's size and radius are
   fixed rather than derived from --radius. This is hardware geometry, not the
   theme's shape language — a phone is the same shape whatever design system is
   running on it, and tracking --radius would hand the brutalist theme a
   square "phone". Everything inside the frame is still fully tokenized. */
export function DeviceFrame({
  children,
  time = "9:41",
  bare,
  className,
  ...props
}: DeviceFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-[600px] w-[300px] flex-col overflow-hidden rounded-[2rem] border-4 border-border bg-bg elev-2",
        className
      )}
      {...props}
    >
      {!bare && (
        <div className="flex shrink-0 items-center justify-between px-5 pb-1 pt-2.5 text-[10px] font-semibold text-fg">
          <span>{time}</span>
          <span className="flex items-center gap-1" aria-hidden>
            <span className="h-2 w-3.5 rounded-sm border border-current" />
            <span className="h-2 w-2 rounded-full border border-current" />
          </span>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
