import { cn } from "../../lib/cn";

/** A top-bar cell: full height, square, divided from its neighbours by the
 *  container's rules. `active` fills it (the selected view or palette, or an
 *  open menu's trigger). */
export function barCellClasses(active = false) {
  return cn(
    "relative flex h-full shrink-0 items-center justify-center gap-2 px-3 text-sm font-medium whitespace-nowrap transition-colors sm:px-4",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
    active ? "bg-surface text-fg" : "text-muted hover:bg-surface-2 hover:text-fg"
  );
}
