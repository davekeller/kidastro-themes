import type { ThemeMeta } from "../themes/types";
import { Button } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight } from "../components/icons";

/**
 * Custom showcase for the `kinetic` theme (ref: Awwwards agency portfolios).
 * Layout signature: display type *is* the layout — words fill the viewport,
 * marquee strips run edge to edge, project rows reveal detail on hover, a
 * scroll-pinned scene holds while content passes, and the footer is one giant
 * contact headline.
 */

const PROJECTS = [
  { n: "01", name: "Meridian", disc: "Brand + Site", year: "2026" },
  { n: "02", name: "Halide", disc: "Product Film", year: "2025" },
  { n: "03", name: "Föhn", disc: "Identity", year: "2025" },
  { n: "04", name: "Verlag Nord", disc: "Editorial", year: "2024" },
  { n: "05", name: "Cobalt", disc: "Campaign", year: "2024" },
];

const MARQUEE = "BRAND ✳ DIGITAL ✳ FILM ✳ TYPE ✳ MOTION ✳ ";

export function KineticShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      {/* Sticky micro-nav */}
      <header className="sticky top-14 z-30 border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm uppercase tracking-widest">
          <span className="font-display font-bold">Northwind</span>
          <nav className="hidden gap-6 md:flex">
            {["Work", "Studio", "Contact"].map((l) => (
              <a key={l} href="#" className="text-muted transition-colors hover:text-fg">
                {l}
              </a>
            ))}
          </nav>
          <span className="text-muted">Est. 2014</span>
        </div>
      </header>

      <main>
        {/* Viewport-filling type stack. Sized so the longest word still fits
            the measure — the page must never scroll sideways. */}
        <section className="mx-auto max-w-7xl overflow-hidden px-6 pb-10 pt-16">
          <h1 className="font-display text-[13vw] font-extrabold uppercase leading-[0.82] tracking-[-0.04em]">
            <span className="block">We make</span>
            <span className="block text-primary">brands</span>
            <span className="block text-right">move.</span>
          </h1>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
            <p className="max-w-sm text-lg leading-relaxed text-muted">
              An independent studio working across identity, motion, and the
              web. Small by design, loud by output.
            </p>
            <Button size="lg" className="font-semibold uppercase">
              See the work <ArrowRight size={16} />
            </Button>
          </div>
        </section>

        {/* Marquee strip */}
        <div className="overflow-hidden border-y border-border bg-primary py-3">
          <div className="marquee-track whitespace-nowrap font-display text-2xl font-extrabold uppercase tracking-tight text-primary-fg">
            <span>{MARQUEE.repeat(4)}</span>
            <span aria-hidden>{MARQUEE.repeat(4)}</span>
          </div>
        </div>

        {/* Scroll-pinned scene: the left column holds while rows pass */}
        {/* grid-cols-1 is explicit: an implicit `auto` track sizes to its
            widest child's min-content, which pushed the page sideways on
            phones. minmax(0,1fr) lets the display type wrap instead. */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm uppercase tracking-widest text-primary">Approach</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight">
              Strategy
              <br />
              first,
              <br />
              always
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">
              This column is pinned while the list scrolls past it — a scene, not
              a section. Pure CSS, no scroll library.
            </p>
          </div>
          <div>
            {[
              ["Positioning", "Where you sit, who you're for, and what you refuse to be."],
              ["Identity", "A system, not a logo. Type, color, motion, and voice as one kit."],
              ["Motion", "Everything moves the same way, so the brand feels like one thing."],
              ["Build", "We ship it ourselves. Handoff is where brands go to die."],
            ].map(([title, body], i) => (
              <div key={title} className="border-t border-border py-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm tabular-nums text-muted">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight">
                    {title}
                  </h3>
                </div>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hover-reveal project index */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <p className="text-sm uppercase tracking-widest text-primary">
              Selected work
            </p>
            <div className="mt-6">
              {PROJECTS.map((p) => (
                <a
                  key={p.n}
                  href="#"
                  className="group flex items-baseline gap-3 border-t border-border py-6 transition-colors hover:bg-surface sm:gap-6"
                >
                  <span className="font-display text-sm tabular-nums text-muted">
                    {p.n}
                  </span>
                  {/* min-w-0 + a smaller mobile step: at 375px the display size
                      plus the year and arrow otherwise exceed the viewport. */}
                  <span className="min-w-0 flex-1 font-display text-2xl font-extrabold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-3 sm:text-4xl md:text-5xl">
                    {p.name}
                  </span>
                  {/* Revealed on hover */}
                  <span className="hidden text-sm uppercase tracking-widest text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
                    {p.disc}
                  </span>
                  <span className="font-mono text-sm tabular-nums text-muted">
                    {p.year}
                  </span>
                  <ArrowRight
                    size={20}
                    className="shrink-0 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Numbers band */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
            {[
              ["12", "years"],
              ["48", "brands"],
              ["9", "awards"],
              ["4", "people"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="font-display text-6xl font-extrabold tracking-tight text-primary">
                  {val}
                </p>
                <p className="mt-1 text-sm uppercase tracking-widest text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <TokenPanel themeName={theme.name} />

      {/* Footer as a giant contact headline */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20">
          <p className="text-sm uppercase tracking-widest text-primary">
            New business
          </p>
          <a
            href="#"
            className="group mt-4 block font-display text-[11vw] font-extrabold uppercase leading-[0.85] tracking-[-0.03em] transition-colors hover:text-primary"
          >
            Say
            <br />
            hello
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-6">
              →
            </span>
          </a>
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm uppercase tracking-widest text-muted">
            <span>hello@northwind.studio</span>
            <span>Zürich · Lisbon</span>
            <span>{theme.name} — tokens only</span>
          </div>
        </div>
      </footer>
    </>
  );
}
