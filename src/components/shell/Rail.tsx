import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useSkinState } from "../../lib/skin-state";
import { getSkin, skins } from "../../skins";
import { PaletteSwitcher } from "./PaletteSwitcher";

/* The rail, daves-demos-shaped: Themes at the top, then the active skin's three
 * views, then the palette, with the pre-migration pages pinned at the foot.
 * One component, two layouts — base classes are the phone strip, lg: variants
 * turn it into the fixed full-height rail. */

const LEGACY = [
  { to: "/gallery", label: "Gallery" },
  { to: "/motion", label: "Motion" },
  { to: "/interaction", label: "Interaction" },
  { to: "/start", label: "Start" },
];

function itemClasses(active: boolean) {
  return cn(
    "relative flex min-h-9 items-center truncate rounded-md px-3 text-sm whitespace-nowrap transition-colors",
    active
      ? "bg-primary/12 font-medium text-fg before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-primary"
      : "text-muted hover:bg-surface-2 hover:text-fg"
  );
}

function stripClasses(active: boolean) {
  return cn(
    "flex min-h-9 items-center justify-center rounded-md px-1 text-center text-xs font-medium whitespace-nowrap transition-colors",
    active ? "bg-primary/12 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg"
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 pt-5 pb-1.5 font-mono text-xs tracking-widest text-muted uppercase">
      {children}
    </div>
  );
}

export function Rail() {
  const { skin: activeSlug } = useSkinState();
  const skin = getSkin(activeSlug) ?? skins[0];

  const views = [
    { to: `/skin/${skin.slug}`, label: "Page", short: "Page", end: true },
    { to: `/skin/${skin.slug}/components`, label: "Components", short: "Parts", end: false },
    { to: `/skin/${skin.slug}/guide`, label: "Style guide", short: "Guide", end: false },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface lg:fixed lg:inset-y-0 lg:left-0 lg:w-60 lg:border-r lg:border-b-0">
      <div className="flex min-w-0 flex-col px-3 py-2 lg:h-full lg:py-4">
        <div className="flex items-center justify-between gap-3 lg:block">
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-md px-2 py-1.5 lg:mb-2"
          >
            <img
              src={`${import.meta.env.BASE_URL}icon.svg`}
              alt=""
              width={22}
              height={22}
              className="shrink-0"
            />
            <span className="block truncate font-display text-sm font-semibold tracking-tight">
              kidastro <span className="text-muted">/</span> themes
            </span>
          </Link>
          <div className="shrink-0 lg:hidden">
            <PaletteSwitcher skin={skin} compact />
          </div>
        </div>

        {/* Phone strip — its own row so the labels stay legible at 390px. */}
        <nav aria-label="Primary" className="mt-2 grid grid-cols-4 gap-1 lg:hidden">
          <NavLink to="/" end className={({ isActive }) => stripClasses(isActive)}>
            Themes
          </NavLink>
          {views.map((v) => (
            <NavLink
              key={v.to}
              to={v.to}
              end={v.end}
              className={({ isActive }) => stripClasses(isActive)}
            >
              {v.short}
            </NavLink>
          ))}
        </nav>

        {/* Rail proper */}
        <nav aria-label="Primary" className="hidden min-h-0 flex-1 lg:flex lg:flex-col">
          <NavLink to="/" end className={({ isActive }) => itemClasses(isActive)}>
            Themes
          </NavLink>

          <SectionLabel>{skin.name}</SectionLabel>
          <ul className="space-y-0.5">
            {views.map((v) => (
              <li key={v.to}>
                <NavLink
                  to={v.to}
                  end={v.end}
                  className={({ isActive }) => itemClasses(isActive)}
                >
                  {v.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <SectionLabel>Palette</SectionLabel>
          <PaletteSwitcher skin={skin} />

          <div className="mt-auto pt-3">
            <div aria-hidden className="h-px bg-border" />
            <SectionLabel>Legacy</SectionLabel>
            <ul className="space-y-0.5">
              {LEGACY.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={({ isActive }) => itemClasses(isActive)}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
