import { useCallback, useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ensureSkinState } from "../../lib/skin-state";
import { HOUSE_PALETTE, HOUSE_SKIN } from "../../skins";
import { HouseChrome, RailDrawer } from "./HouseRail";
import { TopBar } from "./TopBar";

/**
 * The app frame: the house rail on the left, always in Kid Astro, and the
 * content area beside it with its top bar. On a skin's pages the content area
 * wears the active skin × palette from <body>; everywhere else in the shell —
 * the Themes list — it wears the house skin, the same as the rail. Pages decide
 * their own container width: a skin's Page view wants the full column, the
 * lists want a measure.
 */
export function Shell() {
  // Before first paint: if index.html restored a pair we no longer know, fix it.
  useLayoutEffect(() => {
    ensureSkinState();
  }, []);

  const { pathname } = useLocation();
  const onSkin = pathname.startsWith("/skin/");
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="min-h-screen bg-bg font-sans text-fg">
      <HouseChrome />
      {menuOpen && <RailDrawer onClose={closeMenu} />}
      <div
        data-skin={onSkin ? undefined : HOUSE_SKIN}
        data-palette={onSkin ? undefined : HOUSE_PALETTE}
        className="min-h-screen bg-bg font-sans text-fg transition-[padding] md:pl-[var(--rail-w)]"
      >
        <TopBar onOpenMenu={() => setMenuOpen(true)} />
        <Outlet />
      </div>
    </div>
  );
}
