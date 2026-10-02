import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
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
} from "../icons";
import { buttonClasses, fieldClasses } from "../primitives";
import { barCellClasses } from "./bar-cell";
import { CellRule, PaletteSwatch, PaletteSwitcher } from "./PaletteSwitcher";

/* The content area's own navigation. It sits inside the skin, so it wears
 * whatever the page wears. On Themes it carries the title, search, and one
 * multi-select tag filter; on a skin it carries the switcher, Page ·
 * Components · Style guide views, palette, and live tokens. Every control is
 * its own full-height cell, ruled off from the next, so the bar reads as a
 * grid; a selected cell takes a fill and a rule along its foot. One row from
 * lg up; below that the views and palette take a second row. */

const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** /skin/:slug, /skin/:slug/components, /skin/:slug/guide → skin + view. */
function useSkinRoute() {
  const { pathname } = useLocation();
  const m = pathname.match(/^\/skin\/([^/]+)(\/components|\/guide)?\/?$/);
  const skin = m ? getSkin(m[1]) : undefined;
  const view = SKIN_VIEWS.find((v) => v.path === (m?.[2] ?? "")) ?? SKIN_VIEWS[0];
  return { pathname, skin, view };
}

/** Page · Components · Style guide as a run of cells. They're links — each
 *  view is its own URL. `short` swaps in the phone labels so the second row
 *  fits beside the palette at 390px. */
function ViewSwitch({
  skin,
  view,
  className,
}: {
  skin: SkinMeta;
  view: (typeof SKIN_VIEWS)[number];
  className?: string;
}) {
  return (
    <nav aria-label="View" className={cn("flex items-stretch divide-x divide-border", className)}>
      {SKIN_VIEWS.map((v) => {
        const current = v.key === view.key;
        return (
          <Link
            key={v.key}
            to={`/skin/${skin.slug}${v.path}`}
            aria-current={current ? "page" : undefined}
            className={cn(barCellClasses(current), "flex-1 lg:flex-none")}
          >
            <span className="sm:hidden">{v.short}</span>
            <span className="hidden sm:inline">{v.label}</span>
            {current && <CellRule />}
          </Link>
        );
      })}
    </nav>
  );
}

export function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pathname, skin, view } = useSkinRoute();
  const themeFilters = useThemeFilters();
  const onThemesHome = pathname === "/";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur">
      <div className="flex h-14 items-stretch divide-x divide-border">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className={cn(barCellClasses(), "md:hidden")}
        >
          <Menu size={20} />
        </button>

        {skin ? (
          <>
            <SkinSwitcher skin={skin} viewPath={view.path} />
            <ViewSwitch skin={skin} view={view} className="hidden lg:flex" />
            {/* The open middle of the grid. */}
            <div aria-hidden className="min-w-0 flex-1" />
            <PaletteSwitcher skin={skin} className="hidden lg:flex" />
            <TokensMenu skin={skin} />
          </>
        ) : onThemesHome ? (
          <ThemesToolbar filters={themeFilters} />
        ) : (
          <div className="flex min-w-0 flex-1 items-center px-3 sm:px-5">
            <span className="font-display font-semibold tracking-tight text-fg">Themes</span>
          </div>
        )}
      </div>

      {skin && (
        <div className="flex h-11 items-stretch divide-x divide-border border-t border-border lg:hidden">
          <ViewSwitch skin={skin} view={view} className="flex-[3]" />
          <PaletteSwitcher skin={skin} className="flex-[2]" />
        </div>
      )}
    </header>
  );
}

type ThemeFilters = ReturnType<typeof useThemeFilters>;

function ThemesToolbar({ filters }: { filters: ThemeFilters }) {
  return (
    <>
      <div className="hidden shrink-0 items-center px-5 sm:flex">
        <span className="font-display font-semibold tracking-tight text-fg">Themes</span>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
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
        {filters.active && (
          <span className="ml-auto hidden shrink-0 text-xs text-muted md:inline" aria-hidden>
            {filters.shown} of {filters.total}
          </span>
        )}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {filters.active
            ? `${filters.shown} of ${filters.total} themes shown`
            : `${filters.total} themes shown`}
        </span>
      </div>
      <ThemeFilterMenu filters={filters} />
    </>
  );
}

/** One dropdown for every style tag: tick as many as you like, and a theme
 *  shows when it carries any of them. The count rides on the trigger. */
function ThemeFilterMenu({ filters }: { filters: ThemeFilters }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close, triggerRef);
  const count = filters.tags.length;

  // Opening lands on the first ticked tag, else the first tag.
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      const items = optionButtons(ref.current);
      (items.find((b) => b.getAttribute("aria-checked") === "true") ?? items[0])?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const onMenuKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = optionButtons(ref.current);
    const at = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === "ArrowDown" ? at + 1 : at - 1;
    items[(next + items.length) % items.length]?.focus();
  };

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={count > 0 ? `Filter, ${count} selected` : "Filter"}
        onClick={() => setOpen((value) => !value)}
        className={barCellClasses(open)}
      >
        <SlidersHorizontal size={16} />
        <span className="hidden sm:inline">Filter</span>
        {count > 0 && (
          <span className="grid min-w-5 place-items-center bg-primary px-1.5 py-0.5 text-[11px] leading-none text-primary-fg">
            {count}
          </span>
        )}
        <ChevronDown
          size={13}
          className={cn("hidden text-muted transition-transform sm:block", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Filter themes by tag"
          onKeyDown={onMenuKey}
          className="absolute top-full right-0 z-40 mt-px flex max-h-[calc(100dvh-4.5rem)] w-64 max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-lg border border-border bg-surface elev-2"
        >
          <div className="flex items-center justify-between gap-2 border-b border-border py-1.5 pr-1.5 pl-3">
            <span className="text-xs text-muted">Matches any ticked tag</span>
            <button
              type="button"
              onClick={filters.clearTags}
              disabled={count === 0}
              className={cn(
                "rounded-sm px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg disabled:invisible",
                focusRing
              )}
            >
              Clear
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-1">
            {filters.options.map((option) => {
              const checked = filters.tags.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={checked}
                  data-filter-option
                  onClick={() => filters.toggleTag(option)}
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm text-fg transition-colors hover:bg-surface-2 focus:outline-none focus-visible:bg-surface-2"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-4 shrink-0 place-items-center border",
                      checked ? "border-primary bg-primary text-primary-fg" : "border-border bg-bg"
                    )}
                  >
                    {checked && <Check size={12} />}
                  </span>
                  <span className="truncate">{option}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function optionButtons(root: HTMLElement | null) {
  return [...(root?.querySelectorAll<HTMLButtonElement>("button[data-filter-option]") ?? [])];
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
    <div ref={ref} className="relative flex min-w-0 shrink">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          barCellClasses(open),
          "min-w-0 shrink justify-start gap-2.5 text-fg sm:px-5"
        )}
      >
        <PaletteSwatch skin={skin.slug} palette={palette} />
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
          className="absolute top-full left-0 z-40 mt-px w-72 max-w-[calc(100vw-1.5rem)] rounded-lg border border-border bg-surface p-1 elev-2"
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
                <PaletteSwatch skin={s.slug} palette={palette} className="mt-1" />
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
        className={barCellClasses(open)}
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
          className="absolute top-full right-0 z-40 mt-px w-[min(23rem,calc(100vw-1.5rem))] rounded-lg border border-border bg-surface p-4 elev-2"
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
