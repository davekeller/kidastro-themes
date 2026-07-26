import { useId, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TabItem {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultIndex?: number;
  className?: string;
}

export function Tabs({ tabs, defaultIndex = 0, className }: TabsProps) {
  const [active, setActive] = useState(defaultIndex);
  const id = useId();

  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex gap-1 rounded-lg border border-border bg-surface-2 p-1"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              i === active
                ? "bg-surface text-fg elev-1"
                : "text-muted hover:text-fg"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          className="pt-4 text-sm text-muted"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
