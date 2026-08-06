import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface DocsNavSection {
  label: string;
  pages: { label: string; active?: boolean }[];
}

export interface DocsNavProps extends HTMLAttributes<HTMLElement> {
  sections: DocsNavSection[];
  /** Optional version pill above the tree, e.g. "v2.4". */
  version?: string;
}

/** Left-hand documentation tree — grouped page list with an active page. */
export function DocsNav({ sections, version, className, ...props }: DocsNavProps) {
  return (
    <nav
      aria-label="Documentation"
      className={cn("w-56 shrink-0 text-sm", className)}
      {...props}
    >
      {version && (
        <span className="mb-4 inline-flex items-center rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
          {version}
        </span>
      )}

      {sections.map((section, i) => (
        <div key={section.label} className={cn(i > 0 && "mt-6")}>
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            {section.label}
          </div>
          <ul className="space-y-px border-l border-border">
            {section.pages.map((page) => (
              <li key={page.label}>
                <span
                  aria-current={page.active ? "page" : undefined}
                  className={cn(
                    "-ml-px block cursor-pointer border-l-2 py-1 pl-3 transition-[color,border-color]",
                    page.active
                      ? "border-primary font-medium text-fg"
                      : "border-transparent text-muted hover:border-border hover:text-fg"
                  )}
                >
                  {page.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
