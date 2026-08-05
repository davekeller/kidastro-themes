import { useState, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface CodeTab {
  label: string;
  /** Raw code. Rendered as plain text — no highlighter dependency. */
  code: string;
}

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** One entry renders as a plain block; several render as tabs. */
  tabs: CodeTab[];
  /** Optional filename shown in the header when there's a single tab. */
  filename?: string;
}

/* Deliberately unhighlighted. A syntax highlighter is a dependency and a
   color scheme of its own, and this library's rule is that color comes from
   tokens — a highlighter would be the one component that ignores the theme. */
export function CodeBlock({ tabs, filename, className, ...props }: CodeBlockProps) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];
  const showTabs = tabs.length > 1;

  return (
    <div
      className={cn("overflow-hidden rounded-lg border border-border bg-surface", className)}
      {...props}
    >
      {(showTabs || filename) && (
        <div className="flex items-center gap-1 border-b border-border bg-surface-2 px-2">
          {showTabs ? (
            tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setActive(i)}
                aria-selected={i === active}
                role="tab"
                className={cn(
                  "cursor-pointer border-b-2 px-2.5 py-2 font-mono text-xs transition-colors",
                  i === active
                    ? "border-primary text-fg"
                    : "border-transparent text-muted hover:text-fg"
                )}
              >
                {t.label}
              </button>
            ))
          ) : (
            <span className="px-1 py-2 font-mono text-xs text-muted">{filename}</span>
          )}
        </div>
      )}

      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-fg">
        <code>{current.code}</code>
      </pre>
    </div>
  );
}
