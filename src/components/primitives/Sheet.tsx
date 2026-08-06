import { useEffect, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Which edge it slides from. Bottom is the mobile default. */
  side?: "bottom" | "right";
  className?: string;
}

/* The edge-anchored sibling of Modal — bottom sheet on mobile, side drawer on
   wider layouts. Contained by the nearest positioned ancestor rather than the
   viewport, so it works inside DeviceFrame; Modal is viewport-fixed. */
export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  side = "bottom",
  className,
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-40 flex"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Sheet"}
    >
      <div className="absolute inset-0 bg-fg/40" onClick={onClose} />

      <div
        className={cn(
          "relative border-border bg-surface elev-2",
          side === "bottom"
            ? "mt-auto w-full rounded-t-xl border-t"
            : "ml-auto h-full w-72 max-w-[80%] rounded-l-xl border-l",
          className
        )}
      >
        {side === "bottom" && (
          <div className="flex justify-center pt-2.5" aria-hidden>
            <span className="h-1 w-9 rounded-full bg-muted/40" />
          </div>
        )}

        {title && (
          <div className="px-5 pb-2 pt-3">
            <h3 className="text-base font-semibold text-fg">{title}</h3>
          </div>
        )}

        <div className="px-5 py-3 text-sm text-muted">{children}</div>

        {footer && (
          <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
