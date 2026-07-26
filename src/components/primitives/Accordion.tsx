import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { ChevronDown } from "../icons";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultIndex?: number;
  className?: string;
}

export function Accordion({ items, defaultIndex, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultIndex ?? null);

  return (
    <div
      className={cn(
        "divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface",
        className
      )}
    >
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={item.title}>
            <button
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-fg transition-colors hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              {item.title}
              <ChevronDown
                size={16}
                className={cn(
                  "shrink-0 text-muted transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen ? (
              <div className="px-4 pb-4 text-sm text-muted">{item.content}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
