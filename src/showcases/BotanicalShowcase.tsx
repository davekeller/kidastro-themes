import type { ThemeMeta } from "../themes/types";
import { Badge, Button, Progress } from "../components/primitives";
import { ArrowRight, Check, Sparkle } from "../components/icons";
import { TokenPanel } from "../components/sections/TokenPanel";

/** Botanical is a cultivated wellness/food skin: bookish type, leaf-like
 * geometry, earthy product cards, and a gentle seasonal rhythm. */
export function BotanicalShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <header className="border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-2xl font-semibold tracking-tight text-primary">Common Ground</a>
          <nav className="hidden gap-7 text-sm text-muted md:flex">
            {['Garden', 'Kitchen', 'Journal', 'Our growers'].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-primary">{item}</a>
            ))}
          </nav>
          <Button size="sm" variant="outline">Shop the harvest</Button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 overflow-hidden px-6 py-16 lg:grid-cols-2">
          <div>
            <Badge variant="outline">Harvest 04 · Late summer</Badge>
            <h1 className="mt-6 max-w-xl font-display text-6xl font-semibold leading-[0.92] tracking-[-0.035em] sm:text-7xl">
              Good things grow at their own pace.
            </h1>
            <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-muted">
              Seasonal pantry goods, useful garden tools, and field notes from the
              people tending the soil behind them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">Explore the harvest <ArrowRight size={15} /></Button>
              <Button size="lg" variant="ghost">Meet the growers</Button>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-xl">
            <div className="absolute left-[34%] top-[8%] h-[68%] w-[28%] rotate-12 rounded-full bg-primary/18" />
            <div className="absolute left-[9%] top-[24%] h-[55%] w-[32%] -rotate-45 rounded-full bg-primary" />
            <div className="absolute right-[8%] top-[20%] h-[58%] w-[34%] rotate-45 rounded-full bg-accent" />
            <div className="absolute bottom-[8%] left-[28%] h-[45%] w-[44%] rounded-full bg-surface elev-1" />
            <div className="absolute bottom-[22%] left-1/2 h-[46%] border-l border-primary/50" />
            <div className="absolute bottom-[22%] left-[28%] w-[44%] border-t border-primary/30" />
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center">
              <p className="font-display text-5xl font-semibold text-primary">08</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted">weeks in season</p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5 text-xs uppercase tracking-[0.18em] text-muted">
            <span>Grown in Central Texas</span><span className="text-primary">No air freight</span><span>Plastic-free pantry</span><span>1% back to soil</span>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">This week's basket</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">Pulled from the ground on Tuesday.</h2>
              <p className="mt-4 font-serif leading-relaxed text-muted">Small batches, short supply chains, and nothing pretending not to have a season.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { name: 'Summer tomatoes', note: 'Smith Farm · 2 lb', tone: 'bg-accent/25', shape: 'bg-accent' },
                { name: 'Herb bundle', note: 'Common Ground · 8 oz', tone: 'bg-primary/12', shape: 'bg-primary' },
                { name: 'Stonefruit preserve', note: 'Batch No. 31 · 9 oz', tone: 'bg-surface-2', shape: 'bg-warning' },
              ].map((item, index) => (
                <article key={item.name} className="overflow-hidden rounded-xl border border-border bg-surface elev-1">
                  <div className={`relative aspect-square ${item.tone}`}>
                    <div className={`absolute left-1/2 top-1/2 h-[48%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full ${item.shape} ${index === 1 ? 'rotate-45' : ''}`} />
                    {index === 0 ? <div className="absolute left-[28%] top-[30%] h-[36%] w-[30%] rounded-full bg-primary/70" /> : null}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                    <p className="mt-1 text-xs text-muted">{item.note}</p>
                    <button className="mt-5 text-sm font-medium text-primary">Add to basket +</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-primary text-primary-fg">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <Sparkle size={20} />
              <blockquote className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                “A good garden is less about control than a long, attentive conversation.”
              </blockquote>
              <p className="mt-6 text-sm opacity-75">Mara Velasquez · Head grower</p>
            </div>
            <div className="rounded-xl border border-primary-fg/20 bg-primary-fg/8 p-6">
              <p className="text-xs uppercase tracking-[0.2em] opacity-70">Field report · August</p>
              <div className="mt-6 space-y-5">
                <Progress value={82} label="Summer harvest" />
                <Progress value={41} label="Autumn beds planted" />
                <Progress value={67} label="Compost cycle" />
              </div>
              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-primary-fg/20 pt-5 text-center">
                {[['14', 'crops'], ['6.2 in', 'rain'], ['92%', 'soil cover']].map(([value, label]) => (
                  <div key={label}><p className="font-display text-2xl font-semibold">{value}</p><p className="mt-1 text-[10px] uppercase tracking-wider opacity-70">{label}</p></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative min-h-96 overflow-hidden rounded-xl bg-surface-2">
              <div className="absolute -bottom-[35%] left-[8%] h-[95%] w-[42%] -rotate-45 rounded-full bg-primary/70" />
              <div className="absolute -bottom-[28%] right-[8%] h-[92%] w-[40%] rotate-45 rounded-full bg-accent/75" />
              <p className="absolute left-6 top-6 text-xs uppercase tracking-widest text-muted">Journal No. 18</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">From the journal</p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-none tracking-tight">The useful beauty of leaving seed heads standing.</h2>
              <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-muted">A winter garden can feed birds, shelter insects, and remind us that tidy is not the same thing as cared for.</p>
              <a href="#" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary">Read field notes <ArrowRight size={14} /></a>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <Check size={22} className="mx-auto text-primary" />
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight">Eat with the season.</h2>
            <p className="mx-auto mt-4 max-w-lg font-serif text-lg text-muted">A flexible basket every other week. Pause whenever the garden—or life—asks you to.</p>
            <Button size="lg" className="mt-7">Join the harvest</Button>
          </div>
        </section>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-9 text-xs text-muted">
          <span>Common Ground · Manor, Texas</span><span>{theme.name} · grown slowly</span>
        </div>
      </footer>
    </>
  );
}
