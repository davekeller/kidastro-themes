import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Check, Info, TriangleAlert } from "../icons";

type AlertVariant = "info" | "success" | "warning" | "danger";

const styles: Record<AlertVariant, string> = {
  info: "border-primary/30 bg-primary/8 text-fg",
  success: "border-success/30 bg-success/8 text-fg",
  warning: "border-warning/30 bg-warning/8 text-fg",
  danger: "border-danger/30 bg-danger/8 text-fg",
};

const iconColors: Record<AlertVariant, string> = {
  info: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const icons: Record<AlertVariant, typeof Info> = {
  info: Info,
  success: Check,
  warning: TriangleAlert,
  danger: TriangleAlert,
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title: string;
  children?: ReactNode;
}

export function Alert({ variant = "info", title, children, className, ...props }: AlertProps) {
  const IconEl = icons[variant];
  return (
    <div
      role="alert"
      className={cn("flex gap-3 rounded-lg border p-4", styles[variant], className)}
      {...props}
    >
      <IconEl size={18} className={cn("mt-0.5 shrink-0", iconColors[variant])} />
      <div>
        <p className="text-sm font-medium">{title}</p>
        {children ? <p className="mt-0.5 text-sm text-muted">{children}</p> : null}
      </div>
    </div>
  );
}
