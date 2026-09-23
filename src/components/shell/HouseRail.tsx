import { useEffect, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { setRailExpanded, useRailExpanded } from "../../lib/rail-state";
import { useSkinState } from "../../lib/skin-state";
import { useMediaQuery } from "../../lib/use-media-query";
import { HOUSE_PALETTE, HOUSE_SKIN, skins } from "../../skins";
import { Images, LayoutGrid, PanelLeft, Play, Pointer, Spline, X } from "../icons";
import { PaletteDots } from "./PaletteSwitcher";

/* The house chrome: the library's own navigation, always in Kid Astro whatever
 * the content area is wearing — each piece sets data-skin/data-palette on
 * itself, and the nearest ancestor wins. The rail is collapsed to icons by
 * default (labels come up as tips) and remembers being expanded; at phone
 * width it leaves the page and opens as a drawer from the top bar. */

const LEGACY = [
  { to: "/gallery", label: "Gallery", icon: Images },
  { to: "/motion", label: "Motion", icon: Spline },
  { to: "/interaction", label: "Interaction", icon: Pointer },
  { to: "/start", label: "Start", icon: Play },
];

const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** The label a collapsed item shows on hover or focus. Visual only — the
 *  item carries the same text as its accessible name. */
function RailTip({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 -translate-y-1/2 rounded-md bg-fg px-2.5 py-1 text-xs font-medium whitespace-nowrap text-bg opacity-0 transition-opacity dur-1 ease-entrance group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {children}
    </span>
  );
}

function itemClasses(active: boolean, expanded: boolean) {
  return cn(
    "group relative flex h-10 shrink-0 items-center gap-3 rounded-md text-sm whitespace-nowrap transition-colors",
    focusRing,
    expanded ? "px-2.5" : "justify-center",
    active
      ? "bg-primary/12 font-medium text-fg before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-primary"
      : "text-muted hover:bg-surface-2 hover:text-fg"
  );
}

function RailItem({
  to,
  end,
  label,
  icon,
  expanded,
  onNavigate,
}: {
  to: string;
  end?: boolean;
  label: string;
  icon: ReactNode;
  expanded: boolean;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      aria-label={expanded ? undefined : label}
      className={({ isActive }) => itemClasses(isActive, expanded)}
    >
      <span className="grid min-w-6 shrink-0 place-items-center">{icon}</span>
      {expanded ? <span className="min-w-0 truncate">{label}</span> : <RailTip>{label}</RailTip>}
    </NavLink>
  );
}

function RailSection({ expanded, children }: { expanded: boolean; children: ReactNode }) {
  return expanded ? (
    <p className="shrink-0 px-2.5 pt-4 pb-1 font-mono text-[11px] tracking-widest text-muted uppercase">
      {children}
    </p>
  ) : (
    <span aria-hidden className="mx-3 my-2.5 block h-px shrink-0 bg-border" />
  );
}

/** Brand, Themes, the skins, and the legacy pages — shared by the rail and the drawer. */
function RailContents({
  expanded,
  onNavigate,
  onClose,
}: {
  expanded: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  const { palette } = useSkinState();

  return (
    <div className="flex min-h-0 flex-1 flex-col px-2 pt-3">
      <div className={cn("flex items-center gap-2", expanded ? "justify-between" : "justify-center")}>
        <Link
          to="/"
          onClick={onNavigate}
          aria-label="kidastro themes — all themes"
          className={cn("flex h-10 min-w-0 items-center gap-2.5 rounded-md px-2", focusRing)}
        >
          <img
            src={`${import.meta.env.BASE_URL}icon.svg`}
            alt=""
            width={22}
            height={22}
            className="shrink-0"
          />
          {expanded && (
            <span className="truncate font-display text-sm font-semibold tracking-tight">
              kidastro <span className="text-muted">/</span> themes
            </span>
          )}
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg",
              focusRing
            )}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav aria-label="Library" className="mt-3 flex min-h-0 flex-1 flex-col gap-0.5">
        <RailItem
          to="/"
          end
          label="Themes"
          icon={<LayoutGrid size={18} />}
          expanded={expanded}
          onNavigate={onNavigate}
        />
        <RailSection expanded={expanded}>Skins</RailSection>
        {skins.map((s) => (
          <RailItem
            key={s.slug}
            to={`/skin/${s.slug}`}
            label={s.name}
            icon={<PaletteDots skin={s.slug} palette={palette} />}
            expanded={expanded}
            onNavigate={onNavigate}
          />
        ))}
        <div className="mt-auto" />
        <RailSection expanded={expanded}>Legacy</RailSection>
        {LEGACY.map(({ to, label, icon: Icon }) => (
          <RailItem
            key={to}
            to={to}
            label={label}
            icon={<Icon size={18} />}
            expanded={expanded}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </div>
  );
}

/** The fixed rail (md and up) plus the portfolio's drifting color line across
 *  the top of the viewport. Rendered by every frame, legacy pages included.
 *  Expanding is a desktop preference: below lg the rail stays compact (index.css
 *  holds --rail-w to match) and the toggle steps aside. */
export function HouseChrome() {
  const saved = useRailExpanded();
  const wide = useMediaQuery("(min-width: 64rem)");
  const expanded = saved && wide;

  return (
    <>
      <div
        data-skin={HOUSE_SKIN}
        data-palette={HOUSE_PALETTE}
        aria-hidden
        className="color-bar pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
      />
      <aside
        data-skin={HOUSE_SKIN}
        data-palette={HOUSE_PALETTE}
        aria-label="Sidebar"
        className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail-w)] flex-col border-r border-border bg-surface pb-3 font-sans text-fg transition-[width] md:flex lg:pb-0"
      >
        <RailContents expanded={expanded} />
        <div className="hidden shrink-0 px-2 pt-2 pb-3 lg:block">
          <button
            type="button"
            onClick={() => setRailExpanded(!expanded)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={expanded}
            className={cn(
              "group relative flex h-10 w-full items-center gap-3 rounded-md text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg",
              focusRing,
              expanded ? "px-2.5" : "justify-center"
            )}
          >
            <span className="grid min-w-6 shrink-0 place-items-center">
              <PanelLeft size={18} />
            </span>
            {expanded ? <span>Collapse</span> : <RailTip>Expand</RailTip>}
          </button>
        </div>
      </aside>
    </>
  );
}

/** The rail as a drawer, for phone widths where it has no room to stay. */
export function RailDrawer({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      data-skin={HOUSE_SKIN}
      data-palette={HOUSE_PALETTE}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 md:hidden"
    >
      <div className="absolute inset-0 bg-scrim" onClick={onClose} />
      <div className="relative flex h-full w-64 max-w-[85%] flex-col border-r border-border bg-surface pb-3 font-sans text-fg elev-2">
        <RailContents expanded onNavigate={onClose} onClose={onClose} />
      </div>
    </div>
  );
}
