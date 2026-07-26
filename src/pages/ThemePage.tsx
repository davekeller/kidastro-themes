import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getTheme, themes } from "../themes";
import { ThemeShowcase } from "../components/ThemeShowcase";
import { customShowcases } from "../showcases";
import { ArrowLeft, Check, ChevronDown, Copy } from "../components/icons";
import { themeTokensToCss } from "../lib/tokens";
import { cn } from "../lib/cn";

export default function ThemePage() {
  const { slug } = useParams();
  const theme = getTheme(slug);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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
    const css = themeTokensToCss(theme.slug, wrapperRef.current);
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      ref={wrapperRef}
      data-theme={theme.slug}
      className="min-h-screen bg-bg font-sans text-fg"
    >
      {/* Minimal top bar — the only chrome over the full themed page */}
      <div className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">All themes</span>
          </Link>

          <ThemeSwitcher current={theme.slug} />

          <div className="flex items-center gap-3">
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

      <Showcase theme={theme} />
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
