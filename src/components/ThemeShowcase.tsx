import type { ThemeMeta } from "../themes/types";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Stats } from "./sections/Stats";
import { Features } from "./sections/Features";
import { Pricing } from "./sections/Pricing";
import { Testimonial } from "./sections/Testimonial";
import { CTA } from "./sections/CTA";
import { ComponentLab } from "./sections/ComponentLab";
import { TokenPanel } from "./sections/TokenPanel";
import { Footer } from "./sections/Footer";

/**
 * The themed one-pager. This composition is shared across every theme —
 * only the tokens (via the data-theme wrapper in ThemePage) change how it looks.
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
        <CTA />
        <TokenPanel themeName={theme.name} />
      </main>
      <Footer />
    </>
  );
}
