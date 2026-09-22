import { cn } from "../../lib/cn";

/* An abstract miniature of a page, on the skin's own canvas — the daves-demos
 * picker's trick. Deliberately not real copy: bars stand in for text, so what
 * you read is the surface treatment — canvas, raised card, inset well, rule
 * weight, radius, elevation, ink — instead of the words. Scope comes from
 * data-skin/data-palette on an ancestor, so one miniature per palette shows
 * the same form in three colorways. */
export function SkinMiniature({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block w-full overflow-hidden rounded-lg bg-bg p-2", className)}
    >
      <span className="flex h-24 gap-2 rounded-lg border border-border bg-surface p-2 elev-1">
        {/* the rail: one primary row, then two resting ones */}
        <span className="flex w-1/5 shrink-0 flex-col gap-1.5 pt-0.5">
          <span className="block h-2 rounded-full bg-primary" />
          <span className="block h-1.5 rounded-full bg-fg/25" />
          <span className="block h-1.5 w-2/3 rounded-full bg-fg/25" />
        </span>
        {/* the page: a heading row, then an inset well with a playhead */}
        <span className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
          <span className="flex items-center gap-1.5">
            <span className="block h-2 w-6 rounded-full bg-accent" />
            <span className="block h-2 w-1/2 rounded-full bg-fg/45" />
          </span>
          <span className="relative block flex-1 rounded-md bg-surface-2 p-1.5">
            <span className="block h-1 w-full rounded-full bg-fg/55" />
            <span className="mt-1.5 block h-1 w-4/5 rounded-full bg-fg/40" />
            <span className="mt-1.5 block h-1 w-11/12 rounded-full bg-fg/55" />
            <span className="absolute inset-y-1.5 left-[44%] w-[2px] rounded-full bg-primary" />
          </span>
        </span>
      </span>
    </span>
  );
}
