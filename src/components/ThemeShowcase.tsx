import type { ThemeMeta } from "../themes/types";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Stats } from "./sections/Stats";
import { Features } from "./sections/Features";
import { Pricing } from "./sections/Pricing";
import { Testimonial } from "./sections/Testimonial";
import { CTA } from "./sections/CTA";
import { ComponentLab } from "./sections/ComponentLab";
import { AppComponentLab } from "./sections/AppComponentLab";
import { TokenPanel } from "./sections/TokenPanel";
import { Footer } from "./sections/Footer";

/**
 * Generic fallback composition for a newly added theme. Every active skin has
 * an authored showcase in src/showcases; this keeps the add-theme path usable
 * before a custom composition is ready.
 */
export function ThemeShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Testimonial />
        <ComponentLab />
        <AppComponentLab />
        <CTA />
        <TokenPanel themeName={theme.name} />
      </main>
      <Footer />
    </>
  );
}
