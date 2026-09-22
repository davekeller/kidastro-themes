import { cn } from "../../lib/cn";
import { applyPalette, useSkinState } from "../../lib/skin-state";
import type { PaletteSlug, SkinMeta } from "../../skins";

/* A palette previews itself: data-skin + data-palette on the pill rescope every
 * token inside it, so the dots show that palette's real primary/accent/fg on
 * its real bg — no color values duplicated into JS. */
export function PaletteDots({
  skin,
  palette,
  className,
}: {
  skin: string;
  palette: PaletteSlug;
  className?: string;
}) {
  return (
    <span
      data-skin={skin}
      data-palette={palette}
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 rounded-full border border-border bg-bg px-1 py-0.5",
        className
      )}
    >
      <span className="h-2 w-2 rounded-full bg-primary" />
      <span className="h-2 w-2 rounded-full bg-accent" />
      <span className="h-2 w-2 rounded-full bg-fg" />
    </span>
  );
}

/** Light / Dark / Fun for the given skin. Selection is app-wide: it paints
 *  <body> immediately and persists, so the whole shell follows. */
export function PaletteSwitcher({ skin, compact = false }: { skin: SkinMeta; compact?: boolean }) {
  const { palette } = useSkinState();

  return (
    <div
      role="radiogroup"
      aria-label="Palette"
      className={cn("flex gap-1", compact ? "flex-row" : "flex-col")}
    >
      {skin.palettes.map((p) => {
        const active = p.slug === palette;
        return (
          <button
            key={p.slug}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => applyPalette(p.slug)}
            className={cn(
              "press-scale flex items-center gap-2 rounded-md border text-left transition-colors",
              compact ? "px-1.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
              active
                ? "border-border bg-surface text-fg elev-1"
                : "border-transparent text-muted hover:bg-surface-2 hover:text-fg"
            )}
          >
            <PaletteDots skin={skin.slug} palette={p.slug} />
            {compact ? (
              <span className="sr-only">
                {p.slug} · {p.label}
              </span>
            ) : (
              <span className="min-w-0 truncate">
                <span className="capitalize">{p.slug}</span>
                <span className="text-muted"> · {p.label}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
