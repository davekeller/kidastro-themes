import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title: ReactNode;
  /** One-paragraph lede under the title. */
  sub?: ReactNode;
  /** Right-hand slot — actions, filters, a status pill. Wraps under the text
   *  on narrow screens. */
  children?: ReactNode;
}

/** The top of a page: eyebrow, title, lede, and an actions slot. Carries no
 *  outer margin — spacing belongs to the page. Ported from daves-demos. */
export function PageHeader({ eyebrow, title, sub, children, className, ...props }: PageHeaderProps) {
  return (
    <header
      className={cn("flex flex-wrap items-end justify-between gap-5", className)}
      {...props}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-2 font-mono text-xs tracking-widest text-muted uppercase">{eyebrow}</p>
        )}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        {sub && <p className="mt-3 max-w-2xl leading-7 text-muted">{sub}</p>}
      </div>
      {children}
    </header>
  );
}
