import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TooltipProps {
  content: string;
  children: ReactNode;
  className?: string;
}

/** CSS-only tooltip — shows on hover and keyboard focus. */
export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-fg px-2.5 py-1 text-xs font-medium text-bg opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
