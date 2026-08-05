import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface AppTopBarProps extends HTMLAttributes<HTMLElement> {
  /** Page title, or a breadcrumb element. */
  heading: ReactNode;
  /** Placeholder text for the (non-functional) search field. */
  searchPlaceholder?: string;
  /** Keyboard hint rendered in the search field, e.g. "⌘K". */
  shortcut?: string;
  /** Right-hand slot — buttons, avatar, anything. */
  actions?: ReactNode;
}

/** The app shell's header row: page heading, search, actions. */
export function AppTopBar({
  heading,
  searchPlaceholder = "Search…",
  shortcut = "⌘K",
  actions,
  className,
  ...props
}: AppTopBarProps) {
  return (
    <header
      className={cn(
        "flex h-14 items-center gap-4 border-b border-border bg-surface px-4",
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1 truncate font-display text-sm font-semibold text-fg">
        {heading}
      </div>

      <div className="hidden items-center gap-2 rounded-md border border-border bg-bg px-2.5 py-1.5 sm:flex">
        <span aria-hidden className="text-muted">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="h-3.5 w-3.5"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 L14 14" />
          </svg>
        </span>
        <span className="text-xs text-muted">{searchPlaceholder}</span>
        <kbd className="rounded border border-border bg-surface-2 px-1 font-mono text-[10px] text-muted">
          {shortcut}
        </kbd>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
