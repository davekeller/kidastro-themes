import { cn } from "../../lib/cn";
import { Check, Info, TriangleAlert, X } from "../icons";

type ToastVariant = "info" | "success" | "warning" | "danger";

const icons: Record<ToastVariant, typeof Info> = {
  info: Info,
  success: Check,
  warning: TriangleAlert,
  danger: TriangleAlert,
};

const iconColors: Record<ToastVariant, string> = {
  info: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  description?: string;
  onDismiss?: () => void;
  className?: string;
}

export function Toast({
  variant = "info",
  title,
  description,
  onDismiss,
  className,
}: ToastProps) {
  const IconEl = icons[variant];
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-border bg-surface p-4 elev-2",
        className
      )}
    >
      <IconEl size={18} className={cn("mt-0.5 shrink-0", iconColors[variant])} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-fg">{title}</p>
        {description ? (
          <p className="mt-0.5 text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {onDismiss ? (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="rounded-md p-0.5 text-muted transition-colors hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X size={14} />
        </button>
      ) : null}
    </div>
  );
}
