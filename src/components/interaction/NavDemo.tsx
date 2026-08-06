import { useState } from "react";
import { useInteraction } from "../../interaction";
import { Button } from "../primitives";
import { cn } from "../../lib/cn";

/**
 * Navigation, restructured three ways. Same links, same labels — the layout and
 * the reveal mechanism are what change.
 *
 * Scoped to a bordered stage rather than the real page chrome, so you can see all
 * three without the demo hijacking the page you're reading.
 */

const LINKS = ["Overview", "Features", "Pricing", "Docs"];

export function NavDemo() {
  const { nav } = useInteraction();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-surface p-5 elev-1">
      <h3 className="text-sm font-semibold text-fg">Navigation</h3>
      <p className="mt-0.5 text-xs text-muted">
        This style puts nav <span className="font-mono text-primary">{nav}</span>.
      </p>

      <div className="relative mt-4 h-56 overflow-hidden rounded-md border border-border bg-bg">
        {nav === "sticky" && (
          <>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/90 px-3 py-2 backdrop-blur">
              <span className="text-xs font-bold text-fg">Northwind</span>
              <nav className="flex gap-3">
                {LINKS.map((l) => (
                  <span key={l} className="cursor-pointer text-[11px] text-muted transition-colors hover:text-fg">
                    {l}
                  </span>
                ))}
              </nav>
            </div>
            <div className="space-y-2 p-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 rounded bg-surface-2" />
              ))}
            </div>
          </>
        )}

        {nav === "overlay" && (
          <>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-xs font-bold text-fg">Northwind</span>
              <Button size="sm" variant="ghost" onClick={() => setOpen((v) => !v)}>
                <span className="text-[11px]">{open ? "Close" : "Menu"}</span>
              </Button>
            </div>
            <div className="space-y-2 p-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 rounded bg-surface-2" />
              ))}
            </div>
            <div
              className={cn(
                "absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-bg/95 backdrop-blur transition-opacity dur-4 ease-entrance",
                open ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              {LINKS.map((l, i) => (
                <span
                  key={l}
                  className="cursor-pointer font-display text-lg font-bold text-fg transition-transform dur-3 ease-entrance"
                  style={{
                    transitionDelay: `calc(var(--stagger) * ${i})`,
                    transform: open ? "translateY(0)" : "translateY(var(--travel-md))",
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </>
        )}

        {nav === "sidebar" && (
          <div className="flex h-full">
            <nav className="w-28 shrink-0 border-r border-border bg-surface p-2">
              <span className="block px-1 pb-2 text-[10px] font-bold uppercase tracking-wide text-muted">
                Northwind
              </span>
              {LINKS.map((l, i) => (
                <span
                  key={l}
                  className={cn(
                    "block cursor-pointer rounded px-1.5 py-1 text-[11px] transition-colors",
                    i === 0 ? "bg-primary/12 font-medium text-fg" : "text-muted hover:text-fg"
                  )}
                >
                  {l}
                </span>
              ))}
            </nav>
            <div className="flex-1 space-y-2 p-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 rounded bg-surface-2" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
