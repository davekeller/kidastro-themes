import { Fragment } from "react";
import { cn } from "../../lib/cn";
import { ChevronRight } from "../icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.label}>
              <li>
                {last || !item.href ? (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={cn(last ? "font-medium text-fg" : "text-muted")}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!last ? (
                <ChevronRight size={14} className="shrink-0 text-muted/60" aria-hidden />
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
