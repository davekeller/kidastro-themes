import { useEffect, useLayoutEffect } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { ComponentsView } from "../components/skin/ComponentsView";
import { StyleGuideView } from "../components/skin/StyleGuideView";
import { ThemeShowcase } from "../components/ThemeShowcase";
import { applyPalette, applySkin, useSkinState } from "../lib/skin-state";
import { customShowcases } from "../showcases";
import { getPalette, getSkin, isPaletteSlug, type SkinMeta } from "../skins";
import type { SkinView } from "../skins/views";

/**
 * Theme detail. The path names the skin and the view; the palette is app
 * state (it lives on <body>, see lib/skin-state). Opening /skin/:slug makes
 * that skin the active one, so the content area wears what you're looking at,
 * and `?palette=dark` is a deep link that gets consumed into state and then
 * dropped so the URL stays clean. The skin's name, the views, the palette, and
 * the tokens all live in the shell's top bar; this page is only the view.
 */
export default function SkinPage({ view }: { view: SkinView }) {
  const { slug } = useParams();
  const skin = getSkin(slug);
  const [params, setParams] = useSearchParams();
  const { palette } = useSkinState();

  // Path → state, before paint so the top bar and the page never disagree.
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

  const paletteMeta = getPalette(skin, palette);

  return (
    <>
      {view === "page" && <PageView skin={skin} />}
      {view === "components" && <ComponentsView skin={skin} />}
      {view === "guide" && <StyleGuideView skin={skin} palette={paletteMeta} />}
    </>
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
