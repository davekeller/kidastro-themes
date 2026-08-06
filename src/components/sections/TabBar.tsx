import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TabBarItem {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: string;
}

export interface TabBarProps extends HTMLAttributes<HTMLElement> {
  items: TabBarItem[];
}

/** Bottom tab bar for the mobile shell. */
export function TabBar({ items, className, ...props }: TabBarProps) {
  return (
    <nav
      className={cn(
        "flex border-t border-border bg-surface px-1 pb-1 pt-1.5",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <span
          key={item.label}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "relative flex flex-1 cursor-pointer flex-col items-center gap-0.5 rounded-md py-1 transition-colors",
            item.active ? "text-primary" : "text-muted hover:text-fg"
          )}
        >
          {item.icon ?? (
            <span aria-hidden className="h-4 w-4 rounded-sm border border-current" />
          )}
          <span className="text-[10px] font-medium leading-none">{item.label}</span>
          {item.badge && (
            <span className="absolute right-1/2 top-0 -mr-3 rounded-full bg-danger px-1 text-[9px] font-bold leading-4 text-white">
              {item.badge}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
