import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

// onToggle is omitted from the DOM props: React already defines it as a
// ToggleEventHandler, and ours takes the option string instead.
export interface FilterChipsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
  options: string[];
  /** Currently active options. */
  selected: string[];
  onToggle: (option: string) => void;
  /** Optional leading "All" chip that clears the selection. */
  onClear?: () => void;
  clearLabel?: string;
}

/** A row of toggleable filter chips. Multi-select — callers decide semantics. */
export function FilterChips({
  options,
  selected,
  onToggle,
  onClear,
  clearLabel = "All",
  className,
  ...props
}: FilterChipsProps) {
  const chip = (active: boolean) =>
    cn(
      "inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-medium transition-[background-color,color,border-color] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      active
        ? "border-primary bg-primary text-primary-fg"
        : "border-border bg-surface text-muted hover:bg-surface-2 hover:text-fg"
    );

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-pressed={selected.length === 0}
          className={chip(selected.length === 0)}
        >
          {clearLabel}
        </button>
      )}
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            aria-pressed={active}
            className={chip(active)}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
