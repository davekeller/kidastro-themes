import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import ThemePage from "./pages/ThemePage";
import MotionGallery from "./pages/MotionGallery";
import MotionPage from "./pages/MotionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/theme/:slug" element={<ThemePage />} />
      <Route path="/motion" element={<MotionGallery />} />
      <Route path="/motion/:slug" element={<MotionPage />} />
      <Route path="*" element={<Gallery />} />
    </Routes>
  );
}
