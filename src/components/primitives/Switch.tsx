import { useState } from "react";
import { cn } from "../../lib/cn";

export interface SwitchProps {
  defaultChecked?: boolean;
  label?: string;
  className?: string;
}

export function Switch({ defaultChecked = false, label, className }: SwitchProps) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          on ? "bg-primary" : "border border-border bg-surface-2"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
            on ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      {label ? <span className="text-sm text-fg">{label}</span> : null}
    </label>
  );
}
