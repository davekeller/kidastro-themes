import { Outlet, Route, Routes } from "react-router-dom";
import { HouseChrome } from "./components/shell/HouseRail";
import { Shell } from "./components/shell/Shell";
import Themes from "./pages/Themes";
import SkinPage from "./pages/SkinPage";
import Gallery from "./pages/Gallery";
import ThemePage from "./pages/ThemePage";
import MotionGallery from "./pages/MotionGallery";
import MotionPage from "./pages/MotionPage";
import Start from "./pages/Start";
import InteractionGallery from "./pages/InteractionGallery";
import InteractionPage from "./pages/InteractionPage";

/* The pre-migration pages carry their own chrome and set data-theme on their
 * own wrappers; anything in them that still leaned on the :root defaults
 * needs those back now that <body> wears the active skin. This frame restores
 * exactly the tokens they were designed against, and keeps the house rail
 * beside them so the library is one click away from every page. Comes out in
 * Phase 4. */
function LegacyFrame() {
  return (
    <>
      <HouseChrome />
      <div data-theme="minimal" data-motion="precise" className="md:pl-[var(--rail-w)]">
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Themes />} />
        <Route path="/skin/:slug" element={<SkinPage view="page" />} />
        <Route path="/skin/:slug/components" element={<SkinPage view="components" />} />
        <Route path="/skin/:slug/guide" element={<SkinPage view="guide" />} />
        <Route path="*" element={<Themes />} />
      </Route>

      <Route element={<LegacyFrame />}>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/theme/:slug" element={<ThemePage />} />
        <Route path="/motion" element={<MotionGallery />} />
        <Route path="/motion/:slug" element={<MotionPage />} />
        <Route path="/interaction" element={<InteractionGallery />} />
        <Route path="/interaction/:slug" element={<InteractionPage />} />
        <Route path="/start" element={<Start />} />
      </Route>
    </Routes>
  );
}
