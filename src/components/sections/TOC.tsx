import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface TOCEntry {
  label: string;
  /** 2 = h2 (flush), 3 = h3 (indented). */
  level?: 2 | 3;
  active?: boolean;
}

export interface TOCProps extends HTMLAttributes<HTMLElement> {
  entries: TOCEntry[];
  title?: string;
}

/** The "on this page" rail that makes a docs layout read as documentation. */
export function TOC({ entries, title = "On this page", className, ...props }: TOCProps) {
  return (
    <nav
      aria-label={title}
      className={cn("w-48 shrink-0 text-sm", className)}
      {...props}
    >
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
        {title}
      </div>
      <ul className="space-y-1.5">
        {entries.map((e) => (
          <li key={e.label} className={cn(e.level === 3 && "pl-3")}>
            <span
              aria-current={e.active ? "true" : undefined}
              className={cn(
                "block cursor-pointer leading-snug transition-colors",
                e.active ? "font-medium text-primary" : "text-muted hover:text-fg"
              )}
            >
              {e.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
