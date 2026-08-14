import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getTheme, themes } from "../themes";
import { DEFAULT_MOTION, getMotion, motionStyles } from "../motion";
import { ThemeShowcase } from "../components/ThemeShowcase";
import { customShowcases } from "../showcases";
import { Check, ChevronDown, Copy } from "../components/icons";
import { motionTokensToCss, themeTokensToCss } from "../lib/tokens";
import { cn } from "../lib/cn";

export default function ThemePage() {
  const { slug } = useParams();
  const theme = getTheme(slug);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  /* Motion rides in the query string rather than the path: the theme is what
     this page is *about*, and the motion style is a lens over it. That also
     makes a pairing a shareable URL — /theme/clay?motion=springy. */
  const [params, setParams] = useSearchParams();
  const motionSlug = getMotion(params.get("motion") ?? "")?.slug ?? DEFAULT_MOTION;

  // Functional updater so a batched update can't clobber other query params.
  const setMotion = (next: string) => {
    setParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        // The default stays out of the URL so the common case has a clean link.
        if (next === DEFAULT_MOTION) p.delete("motion");
        else p.set("motion", next);
        return p;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    if (theme) document.title = `${theme.name} — kidastro-themes`;
    return () => {
      document.title = "kidastro-themes";
    };
  }, [theme]);

  // ←/→ hop between themes (skipped while typing in a form field)
  useEffect(() => {
    if (!theme) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const target = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const index = themes.findIndex((t) => t.slug === theme.slug);
      const delta = e.key === "ArrowLeft" ? -1 : 1;
      const next = themes[(index + delta + themes.length) % themes.length];
      navigate(`/theme/${next.slug}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [theme, navigate]);

  if (!theme) return <Navigate to="/" replace />;

  // Hybrid model: a theme with a registered custom composition renders it;
  // everything else shares the default one-pager.
  const Showcase = customShowcases[theme.slug] ?? ThemeShowcase;

  const copyTokens = async () => {
    if (!wrapperRef.current) return;
    // Include the motion block whenever a non-default style is showing.
    // Copying only theme tokens off a page that's visibly running `springy`
    // would hand over something that doesn't match what you were looking at.
    const css =
      motionSlug === DEFAULT_MOTION
        ? themeTokensToCss(theme.slug, wrapperRef.current)
        : `${themeTokensToCss(theme.slug, wrapperRef.current)}\n${motionTokensToCss(
            motionSlug,
            wrapperRef.current
          )}`;
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      ref={wrapperRef}
      data-theme={theme.slug}
      data-motion={motionSlug}
      className="min-h-screen bg-bg font-sans text-fg"
    >
      {/* Minimal top bar — the only chrome over the full themed page */}
      <div className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-6">
          {/* Top-left breadcrumb cluster, same pattern as the portfolio's
              sub-pages: site icon + `kidastro / themes / <page>` trail. */}
          <div className="flex min-w-0 items-center gap-2.5">
            <Link
              to="/"
              aria-label="Back to all themes"
              className="shrink-0 opacity-80 transition-opacity hover:opacity-100"
            >
              <img
                src={`${import.meta.env.BASE_URL}icon.svg`}
                alt=""
                width={28}
                height={28}
              />
            </Link>
            <nav aria-label="Breadcrumb" className="hidden text-sm font-medium md:block">
              <ol className="flex items-center gap-2">
                <li>
                  <a
                    href="https://kidastro.com"
                    className="text-muted transition-colors hover:text-fg"
                  >
                    kidastro
                  </a>
                </li>
                <li aria-hidden="true" className="text-muted/40">
                  /
                </li>
                <li>
                  <Link to="/" className="text-muted transition-colors hover:text-fg">
                    themes
                  </Link>
                </li>
                <li aria-hidden="true" className="text-muted/40">
                  /
                </li>
                <li aria-current="page" className="truncate text-fg">
                  {theme.name}
                </li>
              </ol>
            </nav>
          </div>

          <ThemeSwitcher current={theme.slug} />

          <div className="flex items-center gap-3">
            {/* The second axis. Same components, same tokens — only the feel
                changes, and the URL carries it. */}
            <label className="hidden items-center gap-1.5 text-xs text-muted md:flex">
              <span>motion</span>
              <select
                value={motionSlug}
                onChange={(e) => setMotion(e.target.value)}
                aria-label="Motion style"
                className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {motionStyles.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              onClick={copyTokens}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copied ? (
                <Check size={13} className="text-success" />
              ) : (
                <Copy size={13} />
              )}
              {copied ? "Copied" : "Copy tokens"}
            </button>
            <span className="hidden font-mono text-xs text-muted lg:block">
              data-theme="{theme.slug}"
            </span>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid min-h-[45vh] place-items-center bg-bg text-sm text-muted" aria-busy="true">
            Loading {theme.name}…
          </div>
        }
      >
        <Showcase theme={theme} />
      </Suspense>
    </div>
  );
}

/** Dropdown to hop straight to another theme. ←/→ keys work too. */
function ThemeSwitcher({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = getTheme(current);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {active?.name}
        <ChevronDown
          size={14}
          className={cn("text-muted transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div
          role="listbox"
          className="absolute left-1/2 top-full z-50 mt-1 max-h-80 w-64 -translate-x-1/2 overflow-y-auto rounded-lg border border-border bg-surface py-1 elev-2"
        >
          {themes.map((t) => (
            <Link
              key={t.slug}
              role="option"
              aria-selected={t.slug === current}
              to={`/theme/${t.slug}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors hover:bg-surface-2",
                t.slug === current ? "font-medium text-fg" : "text-muted"
              )}
            >
              {t.name}
              {/* Palette preview chips in each theme's own tokens */}
              <span data-theme={t.slug} className="flex shrink-0 gap-1">
                <span className="h-3 w-3 rounded-full border border-border bg-bg" />
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="h-3 w-3 rounded-full bg-accent" />
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
