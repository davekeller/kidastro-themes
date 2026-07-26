import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import ThemePage from "./pages/ThemePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/theme/:slug" element={<ThemePage />} />
      <Route path="*" element={<Gallery />} />
    </Routes>
  );
}
