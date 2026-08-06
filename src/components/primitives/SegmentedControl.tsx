import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface SegmentedControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}

/** iOS-style segmented picker. Single-select, exactly one always active. */
export function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex rounded-lg border border-border bg-surface-2 p-0.5",
        className
      )}
      {...props}
    >
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o)}
            className={cn(
              "cursor-pointer rounded-md font-medium transition-[background-color,color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
              active ? "bg-surface text-fg elev-1" : "text-muted hover:text-fg"
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
