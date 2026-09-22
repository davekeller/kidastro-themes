import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Check, Copy } from "../components/icons";
import { SegmentedControl } from "../components/primitives";
import { PaletteSwitcher } from "../components/shell/PaletteSwitcher";
import { ComponentsView } from "../components/skin/ComponentsView";
import { StyleGuideView } from "../components/skin/StyleGuideView";
import { ThemeShowcase } from "../components/ThemeShowcase";
import { applyPalette, applySkin, useSkinState } from "../lib/skin-state";
import { skinTokensToCss } from "../lib/tokens";
import { customShowcases } from "../showcases";
import { getPalette, getSkin, isPaletteSlug, type SkinMeta } from "../skins";

export type SkinView = "page" | "components" | "guide";

const VIEWS: { key: SkinView; label: string; path: string }[] = [
  { key: "page", label: "Page", path: "" },
  { key: "components", label: "Components", path: "/components" },
  { key: "guide", label: "Style guide", path: "/guide" },
];

/**
 * Theme detail. The path names the skin and the view; the palette is app
 * state (it lives on <body>, see lib/skin-state). Opening /skin/:slug makes
 * that skin the active one, so the whole shell wears what you're looking at,
 * and `?palette=dark` is a deep link that gets consumed into state and then
 * dropped so the URL stays clean.
 */
export default function SkinPage({ view }: { view: SkinView }) {
  const { slug } = useParams();
  const skin = getSkin(slug);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { palette } = useSkinState();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Path → state, before paint so the rail and the page never disagree.
  useLayoutEffect(() => {
    if (skin) applySkin(skin.slug);
  }, [skin]);

  useLayoutEffect(() => {
    const p = params.get("palette");
    if (p === null) return;
    if (isPaletteSlug(p)) applyPalette(p);
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("palette");
        return next;
      },
      { replace: true }
    );
  }, [params, setParams]);

  useEffect(() => {
    if (skin) document.title = `${skin.name} — kidastro-themes`;
    return () => {
      document.title = "kidastro-themes";
    };
  }, [skin]);

  if (!skin) return <Navigate to="/" replace />;

  const current = VIEWS.find((v) => v.key === view) ?? VIEWS[0];
  const paletteMeta = getPalette(skin, palette);

  const copyTokens = async () => {
    if (!wrapperRef.current) return;
    await navigator.clipboard.writeText(skinTokensToCss(skin.slug, palette, wrapperRef.current));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div ref={wrapperRef}>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-xs tracking-widest text-muted uppercase">Skin</p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">{skin.name}</h1>
              <p className="mt-1 max-w-2xl text-sm text-muted">{skin.description}</p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <SegmentedControl
                aria-label="View"
                size="sm"
                options={VIEWS.map((v) => v.label)}
                value={current.label}
                onChange={(label) => {
                  const next = VIEWS.find((v) => v.label === label) ?? VIEWS[0];
                  navigate(`/skin/${skin.slug}${next.path}`);
                }}
              />
              <div className="flex flex-wrap items-center gap-3">
                <PaletteSwitcher skin={skin} compact />
                <button
                  type="button"
                  onClick={copyTokens}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy tokens"}
                </button>
              </div>
            </div>
          </div>
          <p className="mt-4 font-mono text-xs text-muted">
            data-skin="{skin.slug}" data-palette="{palette}"
            <span> · {paletteMeta.label}</span>
          </p>
        </div>
      </header>

      {view === "page" && <PageView skin={skin} />}
      {view === "components" && <ComponentsView skin={skin} />}
      {view === "guide" && <StyleGuideView skin={skin} palette={paletteMeta} />}
    </div>
  );
}

/** The skin's own page composition, full-bleed, under the active palette. A
 *  skin with a registered custom showcase renders it; anything else shares
 *  the default one-pager — the hybrid model the legacy /theme pages used. */
function PageView({ skin }: { skin: SkinMeta }) {
  const Showcase = customShowcases[skin.slug] ?? ThemeShowcase;
  return (
    <div className="bg-bg">
      <Showcase theme={skin} />
    </div>
  );
}
