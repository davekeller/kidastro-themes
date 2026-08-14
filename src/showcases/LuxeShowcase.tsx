import type { ThemeMeta } from "../themes/types";
import { Badge, Button } from "../components/primitives";
import { ArrowRight, Star } from "../components/icons";
import { TokenPanel } from "../components/sections/TokenPanel";

/** Luxe Noir is a cinematic hospitality/commerce skin: symmetrical framing,
 * restrained champagne lines, and sculptural product moments on charcoal. */
export function LuxeShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 py-5">
          <button className="justify-self-start text-xs uppercase tracking-[0.24em] text-muted">Menu</button>
          <a href="#" className="justify-self-center whitespace-nowrap font-display text-xl font-semibold tracking-[0.08em] text-primary sm:text-2xl">MAISON VIII</a>
          <button className="justify-self-end text-xs uppercase tracking-[0.24em] text-muted">Reserve</button>
        </div>
      </header>

      <main>
        <section className="relative mx-auto max-w-7xl px-6 py-10 sm:py-14">
          <div className="relative min-h-[650px] overflow-hidden border border-border bg-surface">
            <div className="absolute inset-5 border border-primary/25" aria-hidden />
            <div className="absolute left-1/2 top-0 h-full border-l border-primary/20" aria-hidden />
            <div className="absolute left-1/2 top-[15%] h-[70%] w-[44%] -translate-x-1/2 rounded-full border border-primary/30" aria-hidden />
            <div className="absolute left-1/2 top-[22%] h-[56%] w-[32%] -translate-x-1/2 rounded-full bg-primary/6" aria-hidden />

            <div className="relative z-10 flex min-h-[650px] flex-col items-center justify-between px-6 py-12 text-center">
              <div className="flex w-full items-center justify-between text-[10px] uppercase tracking-[0.26em] text-muted">
                <span>Paris · Kyoto</span><span>Collection 08</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-primary">Private residence · Rue de Varenne</p>
                <h1 className="mt-6 font-display text-6xl font-medium leading-[0.88] tracking-[-0.035em] sm:text-8xl lg:text-9xl">
                  The art of<br /><span className="italic text-primary">arrival.</span>
                </h1>
                <p className="mx-auto mt-8 max-w-md font-serif text-lg leading-relaxed text-muted">
                  Eight rooms. A hidden garden. Service that appears precisely when
                  it should and disappears just as gracefully.
                </p>
                <Button size="lg" className="mt-8">Discover Maison VIII <ArrowRight size={15} /></Button>
              </div>
              <div className="flex w-full items-center justify-center text-[10px] uppercase tracking-[0.26em] text-muted sm:justify-between">
                <span className="hidden sm:inline">48.8566° N</span><span>Scroll to enter</span><span className="hidden sm:inline">2.3522° E</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.28em] text-primary">The residence</p>
            <h2 className="mt-5 font-display text-5xl font-medium leading-[0.96] tracking-tight">Intimacy, elevated to an art form.</h2>
            <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-muted">
              A former private hôtel particulier restored through stone, oak,
              silk, and shadow. Every room is singular; every ritual is personal.
            </p>
            <a href="#" className="mt-8 inline-flex items-center gap-3 border-b border-primary pb-1 text-xs uppercase tracking-[0.22em] text-primary">Explore the house <ArrowRight size={13} /></a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="relative min-h-96 overflow-hidden bg-surface-2">
              <div className="absolute bottom-0 left-[18%] h-[72%] w-[64%] rounded-t-full border border-primary/25 bg-bg/30" />
              <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-widest text-muted">Salon · No. 03</p>
            </div>
            <div className="relative mt-12 min-h-96 overflow-hidden border border-border bg-surface">
              <div className="absolute left-1/2 top-[18%] h-[54%] w-[44%] -translate-x-1/2 rounded-full bg-primary/12" />
              <div className="absolute left-1/2 top-[34%] h-[30%] w-[70%] -translate-x-1/2 border-y border-primary/25" />
              <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-widest text-muted">Jardin · Dusk</p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-7xl divide-y divide-border px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              ['01', 'Sleep', 'Hand-finished linens, quiet stone, and a room tuned to your preferred light.'],
              ['02', 'Dine', 'A private table that follows the season rather than a fixed menu.'],
              ['03', 'Restore', 'Bathing rituals, botanical oils, and the rare luxury of unmeasured time.'],
            ].map(([number, title, body]) => (
              <article key={number} className="py-12 md:px-9 first:pl-0 last:pr-0">
                <span className="font-display text-3xl italic text-primary">{number}</span>
                <h3 className="mt-12 font-display text-3xl font-medium">{title}</h3>
                <p className="mt-4 font-serif leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-center">
            <div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center rounded-full border border-primary/30">
              <div className="grid h-2/3 w-2/3 place-items-center rounded-full border border-primary/20 bg-primary/5">
                <Star size={24} className="text-primary" />
              </div>
              <Badge variant="outline" className="absolute bottom-[12%]">Edition of 80</Badge>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-primary">Maison objects · No. 01</p>
              <h2 className="mt-5 font-display text-5xl font-medium leading-none tracking-tight">The scent of the house, held in glass.</h2>
              <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-muted">Cedar, black tea, iris, and rain on warm stone. Hand-poured in Grasse and available only from the maison.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg">Acquire · $240</Button>
                <span className="text-xs uppercase tracking-widest text-muted">50 ml · Eau de parfum</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-primary/30 bg-primary/6">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Reservations</p>
            <h2 className="mt-5 font-display text-5xl font-medium tracking-tight sm:text-6xl">Your room is waiting.</h2>
            <p className="mx-auto mt-5 max-w-md font-serif text-lg text-muted">Eight rooms, released one season at a time.</p>
            <Button size="lg" className="mt-8">Request a stay</Button>
          </div>
        </section>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-10 text-[10px] uppercase tracking-[0.24em] text-muted">
          <span>Maison VIII · Paris</span><span>{theme.name} · quiet luxury</span>
        </div>
      </footer>
    </>
  );
}
