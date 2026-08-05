import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ListRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  /** Secondary line under the label. */
  detail?: string;
  /** Leading slot — avatar, icon, checkbox. */
  leading?: ReactNode;
  /** Trailing slot. Ignored when `chevron` is set. */
  trailing?: ReactNode;
  /** Renders a disclosure chevron in the trailing slot. */
  chevron?: boolean;
}

/** A settings/inbox style row. The unit mobile list screens are built from. */
export function ListRow({
  label,
  detail,
  leading,
  trailing,
  chevron,
  className,
  ...props
}: ListRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-2",
        className
      )}
      {...props}
    >
      {leading && <span className="shrink-0 text-muted">{leading}</span>}

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-fg">{label}</span>
        {detail && <span className="mt-0.5 block truncate text-xs text-muted">{detail}</span>}
      </span>

      {chevron ? (
        <span aria-hidden className="shrink-0 text-muted">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="M6 3.5 L10.5 8 L6 12.5" />
          </svg>
        </span>
      ) : (
        trailing && <span className="shrink-0 text-sm text-muted">{trailing}</span>
      )}
    </div>
  );
}
