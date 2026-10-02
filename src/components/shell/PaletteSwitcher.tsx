import { cn } from "../../lib/cn";
import { applyPalette, useSkinState } from "../../lib/skin-state";
import type { PaletteSlug, SkinMeta } from "../../skins";
import { barCellClasses } from "./bar-cell";

/* A palette previews itself: data-skin + data-palette on the swatch rescope
 * every token inside it, so it shows that palette's real primary/accent/fg on
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

/** The top bar's larger, square-cut swatch — the same self-scoping trick as
 *  PaletteDots, sized to read as a cell's content rather than a badge. */
export function PaletteSwatch({
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
      className={cn("inline-flex shrink-0 gap-px border border-border bg-bg p-0.5", className)}
    >
      <span className="size-3 bg-primary" />
      <span className="size-3 bg-accent" />
      <span className="size-3 bg-fg" />
    </span>
  );
}

/** Light / Dark / Fun for the given skin, as a run of top-bar cells. Selection
 *  is app-wide: it paints <body> immediately and persists, so every skin page
 *  follows. The chosen cell takes a fill and a rule along its foot. */
export function PaletteSwitcher({ skin, className }: { skin: SkinMeta; className?: string }) {
  const { palette } = useSkinState();

  return (
    <div
      role="radiogroup"
      aria-label="Palette"
      className={cn("flex items-stretch divide-x divide-border", className)}
    >
      {skin.palettes.map((p) => {
        const active = p.slug === palette;
        return (
          <button
            key={p.slug}
            type="button"
            role="radio"
            aria-checked={active}
            title={p.label}
            onClick={() => applyPalette(p.slug)}
            className={cn(barCellClasses(active), "flex-1 lg:flex-none")}
          >
            <PaletteSwatch skin={skin.slug} palette={p.slug} />
            <span className="hidden capitalize sm:inline">{p.slug}</span>
            <span className="sr-only">
              <span className="sm:hidden">{p.slug}</span> · {p.label}
            </span>
            {active && <CellRule />}
          </button>
        );
      })}
    </div>
  );
}

/** The selected cell's mark: a rule along its foot, not a pill. */
export function CellRule() {
  return <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-fg" />;
}
