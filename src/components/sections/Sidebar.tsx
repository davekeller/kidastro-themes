import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SidebarItem {
  label: string;
  /** Rendered as-is before the label — a glyph, initial, or small svg. */
  icon?: ReactNode;
  active?: boolean;
  /** Optional trailing count or status pill text. */
  badge?: string;
}

export interface SidebarGroup {
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Product or workspace name at the top. */
  title: string;
  groups: SidebarGroup[];
  /** Optional footer slot — account row, version, upgrade nudge. */
  footer?: ReactNode;
}

/** Fixed-width app navigation rail. The spine of the dashboard layout. */
export function Sidebar({ title, groups, footer, className, ...props }: SidebarProps) {
  return (
    <nav
      className={cn(
        "flex w-60 shrink-0 flex-col border-r border-border bg-surface",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <span className="h-5 w-5 rounded-md bg-primary" aria-hidden />
        <span className="font-display text-sm font-bold tracking-tight text-fg">
          {title}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {groups.map((group, gi) => (
          <div key={group.label ?? gi} className={cn(gi > 0 && "mt-5")}>
            {group.label && (
              <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {group.label}
              </div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  <span
                    aria-current={item.active ? "page" : undefined}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-[background-color,color]",
                      item.active
                        ? "bg-primary/12 font-medium text-fg"
                        : "text-muted hover:bg-surface-2 hover:text-fg"
                    )}
                  >
                    {item.icon && (
                      <span className={cn("shrink-0", item.active && "text-primary")}>
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {footer && <div className="border-t border-border p-3">{footer}</div>}
    </nav>
  );
}
