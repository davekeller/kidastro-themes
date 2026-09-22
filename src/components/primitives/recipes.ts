import { cn } from "../../lib/cn";

/* Class recipes: a primitive's styling as a plain string, for elements that
   can't be the primitive itself — a router <Link> that should look like a
   button, a native control that should read as a field. They live apart from
   the components so fast refresh keeps working on those files. */

export type ButtonVariant = "primary" | "accent" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center rounded-md font-medium transition-[background-color,color,opacity,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50";

/* Every filled variant sets its label in that fill's own -fg, so the label
   stays legible whatever a palette does with the fill. */
const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg hover:opacity-90",
  accent: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "bg-surface-2 text-fg hover:brightness-95",
  outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
  ghost: "bg-transparent text-fg hover:bg-surface-2",
  danger: "bg-danger text-danger-fg hover:opacity-90",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
): string {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

/** The one field recipe every text control shares. */
export const fieldClasses =
  "w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-shadow";
