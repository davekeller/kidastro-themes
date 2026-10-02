import { useState } from "react";
import { cn } from "../../lib/cn";
import { ChevronLeft, ChevronRight } from "../icons";

export interface PaginationProps {
  pageCount: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  pageCount,
  defaultPage = 1,
  onChange,
  className,
}: PaginationProps) {
  const [page, setPage] = useState(defaultPage);

  const go = (p: number) => {
    const next = Math.min(pageCount, Math.max(1, p));
    setPage(next);
    onChange?.(next);
  };

  const itemClass =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40";

  const pageButton = (p: number, key: string) => (
    <button
      key={key}
      aria-current={p === page ? "page" : undefined}
      onClick={() => go(p)}
      className={cn(
        itemClass,
        p === page ? "bg-primary text-primary-fg" : "text-fg hover:bg-surface-2"
      )}
    >
      {p}
    </button>
  );

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => go(page - 1)}
        className={cn(itemClass, "text-muted hover:bg-surface-2 hover:text-fg")}
      >
        <ChevronLeft size={16} />
      </button>
      {/* Phones keep the current page plus the two endpoints; the complete
          run returns at sm, where it has room. */}
      <span className="contents sm:hidden">
        {pageButton(1, "mobile-first")}
        {page > 2 && (
          <span aria-hidden className="inline-flex h-9 min-w-5 items-center justify-center text-muted">
            …
          </span>
        )}
        {page > 1 && page < pageCount && pageButton(page, "mobile-current")}
        {page < pageCount - 1 && (
          <span aria-hidden className="inline-flex h-9 min-w-5 items-center justify-center text-muted">
            …
          </span>
        )}
        {pageCount > 1 && pageButton(pageCount, "mobile-last")}
      </span>
      <span className="hidden sm:contents">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) =>
          pageButton(p, `desktop-${p}`)
        )}
      </span>
      <button
        aria-label="Next page"
        disabled={page === pageCount}
        onClick={() => go(page + 1)}
        className={cn(itemClass, "text-muted hover:bg-surface-2 hover:text-fg")}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
