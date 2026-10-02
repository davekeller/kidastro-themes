import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useResolvedTokens, useSkinState } from "../../lib/skin-state";
import { skinTokensToCss } from "../../lib/tokens";
import { useDismiss } from "../../lib/use-dismiss";
import { useThemeFilters } from "../../lib/use-theme-filters";
import { getPalette, getSkin, skins, type SkinMeta } from "../../skins";
import { SKIN_VIEWS } from "../../skins/views";
import {
  Braces,
  Check,
  ChevronDown,
  Copy,
  Menu,
  Search,
  SlidersHorizontal,
  X,
} from "../icons";
import { buttonClasses, fieldClasses, SegmentedControl } from "../primitives";
import { PaletteDots, PaletteSwitcher } from "./PaletteSwitcher";

/* The content area's own navigation. It sits inside the skin, so it wears
 * whatever the page wears. On Themes it carries search + filtering; on a skin
 * it carries the switcher, Page · Components · Style guide views, palette,
 * and live tokens. */

const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** /skin/:slug, /skin/:slug/components, /skin/:slug/guide → skin + view. */
function useSkinRoute() {
  const { pathname } = useLocation();
  const m = pathname.match(/^\/skin\/([^/]+)(\/components|\/guide)?\/?$/);
  const skin = m ? getSkin(m[1]) : undefined;
  const view = SKIN_VIEWS.find((v) => v.path === (m?.[2] ?? "")) ?? SKIN_VIEWS[0];
  return { pathname, skin, view };
}

/** Page · Components · Style guide as a segmented control. `short` swaps in the
 *  phone labels so the row fits beside the palette at 390px. */
function ViewSwitch({
  skin,
  view,
  short = false,
}: {
  skin: SkinMeta;
  view: (typeof SKIN_VIEWS)[number];
  short?: boolean;
}) {
  const navigate = useNavigate();
  const labelOf = (v: (typeof SKIN_VIEWS)[number]) => (short ? v.short : v.label);
  return (
    <SegmentedControl
      aria-label="View"
      size="sm"
      options={SKIN_VIEWS.map(labelOf)}
      value={labelOf(view)}
      onChange={(label) => {
        const next = SKIN_VIEWS.find((v) => labelOf(v) === label) ?? SKIN_VIEWS[0];
        navigate(`/skin/${skin.slug}${next.path}`);
      }}
      className="whitespace-nowrap"
    />
  );
}

export function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pathname, skin, view } = useSkinRoute();
  const themeFilters = useThemeFilters();
  const onThemesHome = pathname === "/";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur">
      <div className="flex h-14 items-center gap-2 px-3 sm:gap-3 sm:px-5">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg md:hidden",
            focusRing
          )}
        >
          <Menu size={20} />
        </button>

        {skin ? (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <SkinSwitcher skin={skin} viewPath={view.path} />
            <div className="hidden shrink-0 lg:block">
              <ViewSwitch skin={skin} view={view} />
            </div>
          </div>
        ) : onThemesHome ? (
          <ThemesToolbar filters={themeFilters} />
        ) : (
          <div className="min-w-0 flex-1">
            <span className="font-display font-semibold tracking-tight text-fg">Themes</span>
          </div>
        )}

        {skin && (
          <div className="hidden shrink-0 items-center lg:flex">
            <PaletteSwitcher skin={skin} compact showActiveLabel />
          </div>
        )}
        {skin && <TokensMenu skin={skin} />}
      </div>

      {skin && (
        <div className="flex items-center justify-between gap-2 px-3 pb-2.5 sm:px-5 lg:hidden">
          <div className="sm:hidden">
            <ViewSwitch skin={skin} view={view} short />
          </div>
          <div className="hidden sm:block">
            <ViewSwitch skin={skin} view={view} />
          </div>
          <PaletteSwitcher skin={skin} compact />
        </div>
      )}

      {onThemesHome && themeFilters.tags.length > 0 && (
        <ActiveThemeFilters filters={themeFilters} />
      )}
    </header>
  );
}

type ThemeFilters = ReturnType<typeof useThemeFilters>;

function ThemesToolbar({ filters }: { filters: ThemeFilters }) {
  return (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <span className="hidden shrink-0 font-display font-semibold tracking-tight text-fg sm:inline">
          Themes
        </span>
        <label className="relative min-w-0 flex-1 sm:max-w-sm">
          <span className="sr-only">Search themes</span>
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => filters.setQuery(event.target.value)}
            placeholder="Search themes…"
            className={cn("h-10 pl-9", fieldClasses)}
          />
        </label>
      </div>

      {filters.active && (
        <span className="hidden shrink-0 text-xs text-muted md:inline" aria-hidden>
          {filters.shown} of {filters.total}
        </span>
      )}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {filters.active
          ? `${filters.shown} of ${filters.total} themes shown`
          : `${filters.total} themes shown`}
      </span>
      <ThemeFilterMenu filters={filters} />
    </>
  );
}

function ThemeFilterMenu({ filters }: { filters: ThemeFilters }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close, triggerRef);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      const selected = ref.current?.querySelector<HTMLButtonElement>(
        'button[data-filter-option][aria-pressed="true"]'
      );
      const first = ref.current?.querySelector<HTMLButtonElement>(
        "button[data-filter-option]"
      );
      (selected ?? first)?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="theme-filter-panel"
        aria-label={
          filters.tags.length > 0
            ? `Filters, ${filters.tags.length} selected`
            : "Filters"
        }
        onClick={() => setOpen((value) => !value)}
        className={buttonClasses(
          filters.tags.length > 0 ? "secondary" : "outline",
          "md",
          "px-2.5 sm:px-3"
        )}
      >
        <SlidersHorizontal size={16} />
        <span className="hidden sm:inline">Filters</span>
        {filters.tags.length > 0 && (
          <span className="grid min-w-5 place-items-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] leading-none text-primary-fg">
            {filters.tags.length}
          </span>
        )}
        <ChevronDown
          size={13}
          className={cn("hidden text-muted transition-transform sm:block", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          id="theme-filter-panel"
          role="dialog"
          aria-label="Filter themes"
          className="absolute top-full right-0 z-40 mt-2 flex max-h-[calc(100dvh-4.5rem)] w-[min(30rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-surface elev-2"
        >
          <div className="flex items-start justify-between gap-4 border-b border-border p-4">
            <div>
              <p className="font-display text-base font-semibold tracking-tight text-fg">
                Filter by style
              </p>
              <p className="mt-0.5 text-xs text-muted">Matches any selected tag.</p>
            </div>
            {filters.tags.length > 0 && (
              <button
                type="button"
                onClick={filters.clearTags}
                className={cn(
                  "shrink-0 rounded-sm px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg",
                  focusRing
                )}
              >
                Clear all
              </button>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {filters.options.map((option) => {
                const selected = filters.tags.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    data-filter-option
                    aria-pressed={selected}
                    onClick={() => filters.toggleTag(option)}
                    className={cn(
                      "flex min-w-0 items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-xs font-medium transition-[background-color,color,border-color] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selected
                        ? "border-primary bg-primary text-primary-fg"
                        : "border-border bg-bg text-muted hover:bg-surface-2 hover:text-fg"
                    )}
                  >
                    <span className="truncate">{option}</span>
                    {selected && <Check size={13} className="shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border px-4 py-3 text-xs text-muted">
            {filters.shown} of {filters.total} themes
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveThemeFilters({ filters }: { filters: ThemeFilters }) {
  return (
    <div className="flex items-center gap-2 px-3 pb-2.5 sm:px-5">
      <span className="hidden shrink-0 font-mono text-[10px] tracking-widest text-muted uppercase sm:inline">
        Active
      </span>
      <div aria-label="Active theme filters" className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
        {filters.tags.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-label={`Remove ${tag} filter`}
            onClick={() => filters.removeTag(tag)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full border border-primary bg-primary px-2.5 py-1 text-xs font-medium text-primary-fg",
              focusRing
            )}
          >
            {tag}
            <X size={12} />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={filters.clearTags}
        className={cn(
          "shrink-0 rounded-sm px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg",
          focusRing
        )}
      >
        Clear
      </button>
    </div>
  );
}

/** The first control in the bar: its colors and name, opening onto every skin.
 *  Picking one keeps you on the same view. */
function SkinSwitcher({ skin, viewPath }: { skin: SkinMeta; viewPath: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);
  const { palette } = useSkinState();
  const navigate = useNavigate();

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 max-w-full items-center gap-2 rounded-sm px-1 font-medium text-fg transition-colors hover:text-primary",
          focusRing
        )}
      >
        <PaletteDots skin={skin.slug} palette={palette} />
        <span className="truncate">{skin.name}</span>
        <ChevronDown
          size={14}
          className={cn("shrink-0 text-muted transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Skins"
          className="absolute top-full left-0 z-40 mt-2 w-72 max-w-[calc(100vw-1.5rem)] rounded-lg border border-border bg-surface p-1 elev-2"
        >
          {skins.map((s) => {
            const current = s.slug === skin.slug;
            return (
              <button
                key={s.slug}
                type="button"
                role="menuitemradio"
                aria-checked={current}
                onClick={() => {
                  close();
                  navigate(`/skin/${s.slug}${viewPath}`);
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-surface-2 focus:outline-none focus-visible:bg-surface-2",
                  current && "bg-surface-2"
                )}
              >
                <PaletteDots skin={s.slug} palette={palette} className="mt-1" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-fg">{s.name}</span>
                  <span className="mt-0.5 line-clamp-2 block text-xs text-muted">{s.description}</span>
                </span>
                {current && <Check size={14} className="mt-1 shrink-0 text-fg" />}
              </button>
            );
          })}
          <Link
            to="/"
            onClick={close}
            className="mt-1 block border-t border-border px-3 pt-2.5 pb-2 text-sm text-muted transition-colors hover:text-fg focus:outline-none focus-visible:underline"
          >
            All themes →
          </Link>
        </div>
      )}
    </div>
  );
}

const COLOR_TOKENS = [
  "--bg",
  "--surface",
  "--surface-2",
  "--fg",
  "--muted",
  "--border",
  "--primary",
  "--accent",
  "--success",
  "--warning",
  "--danger",
  "--ring",
] as const;

const FORM_TOKENS = [
  "--radius",
  "--font-display",
  "--font-sans",
  "--font-mono",
  "--dur-2",
  "--curve-standard",
] as const;

const familyName = (stack: string) => stack.split(",")[0]?.replace(/["']/g, "").trim() || "—";

/** The skin × palette on screen, as values: the palette's colors, the skin's
 *  form, and a copy of both blocks ready to paste into a new app. */
function TokensMenu({ skin }: { skin: SkinMeta }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);
  const { palette } = useSkinState();
  const paletteMeta = getPalette(skin, palette);
  const colors = useResolvedTokens(COLOR_TOKENS);
  const form = useResolvedTokens(FORM_TOKENS);

  const copy = async () => {
    if (!ref.current) return;
    await navigator.clipboard.writeText(skinTokensToCss(skin.slug, palette, ref.current));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Tokens"
        onClick={() => setOpen((v) => !v)}
        className={buttonClasses("outline", "sm", "px-2.5")}
      >
        <Braces size={15} />
        <span className="hidden sm:inline">Tokens</span>
        <ChevronDown
          size={13}
          className={cn("hidden text-muted transition-transform sm:block", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={`${skin.name} tokens`}
          className="absolute top-full right-0 z-40 mt-2 w-[min(23rem,calc(100vw-1.5rem))] rounded-lg border border-border bg-surface p-4 elev-2"
        >
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-base font-semibold tracking-tight text-fg">
              {skin.name} · {paletteMeta.label}
            </p>
            <span className="font-mono text-[11px] text-muted">{palette}</span>
          </div>
          <code className="mt-1 block truncate font-mono text-[11px] text-muted">
            data-skin="{skin.slug}" data-palette="{palette}"
          </code>

          <p className="mt-4 font-mono text-[11px] tracking-widest text-muted uppercase">
            Color · from the palette
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {COLOR_TOKENS.map((name) => (
              <li key={name} className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden
                  className="size-4 shrink-0 rounded-sm border border-border"
                  style={{ background: `var(${name})` }}
                />
                <span className="min-w-0 truncate font-mono text-[11px] text-muted">
                  {name.slice(2)}
                </span>
                <span className="ml-auto font-mono text-[11px] text-fg">{colors[name]}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-mono text-[11px] tracking-widest text-muted uppercase">
            Form · from the skin
          </p>
          <dl className="mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 font-mono text-[11px]">
            <dt className="text-muted">radius</dt>
            <dd className="truncate text-fg">{form["--radius"]}</dd>
            <dt className="text-muted">display</dt>
            <dd className="truncate text-fg">{familyName(form["--font-display"])}</dd>
            <dt className="text-muted">sans</dt>
            <dd className="truncate text-fg">{familyName(form["--font-sans"])}</dd>
            <dt className="text-muted">mono</dt>
            <dd className="truncate text-fg">{familyName(form["--font-mono"])}</dd>
            <dt className="text-muted">motion</dt>
            <dd className="truncate text-fg">
              {form["--dur-2"]} · {form["--curve-standard"]}
            </dd>
          </dl>

          <div className="mt-4 flex gap-2">
            <button type="button" onClick={copy} className={buttonClasses("primary", "sm", "flex-1")}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy CSS"}
            </button>
            <Link
              to={`/skin/${skin.slug}/guide`}
              onClick={close}
              className={buttonClasses("outline", "sm", "flex-1")}
            >
              Style guide
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
