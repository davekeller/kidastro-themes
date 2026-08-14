import type { ThemeMeta } from "../themes/types";
import { AstroHedron } from "../components/AstroHedron";
import { Badge, Button, Progress } from "../components/primitives";
import { ArrowRight, Bolt, Shield, Sparkle, Star } from "../components/icons";
import { TokenPanel } from "../components/sections/TokenPanel";

/**
 * Kid Astro is the creative mission-control skin: playful space chrome,
 * technical readouts, and a few bright arcade signals against deep navy.
 */
export function KidAstroShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <header className="border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-primary text-primary">
              <Star size={11} />
            </span>
            KID ASTRO / LAB 07
          </a>
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-widest text-muted md:flex">
            {['Missions', 'Experiments', 'Logbook'].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-primary">{item}</a>
            ))}
          </nav>
          <Badge variant="outline" className="font-mono">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success" />
            SYSTEMS NOMINAL
          </Badge>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-x-0 top-1/2 border-t border-border/60" aria-hidden />
          <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-12">
            <div className="relative z-10 lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
                Independent design engineer · Austin TX
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-6xl font-extrabold leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
                Build strange things.
                <span className="block text-accent">Make them useful.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                Product systems, creative tools, and delightful machines for people
                willing to try something new.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg">Open the flight log <ArrowRight size={16} /></Button>
                <Button size="lg" variant="outline">Current experiments</Button>
              </div>
            </div>

            <div className="relative min-h-[420px] lg:col-span-5">
              <div className="absolute inset-5 rounded-full border border-border" aria-hidden />
              <div className="absolute inset-16 rounded-full border border-primary/40" aria-hidden />
              <div className="absolute inset-0">
                <AstroHedron />
              </div>
              <div className="absolute left-0 top-12 rounded-md border border-border bg-surface/85 px-3 py-2 font-mono text-[10px] text-muted elev-1">
                ORBIT 03<br /><span className="text-primary">42.168°</span>
              </div>
              <div className="absolute bottom-10 right-0 rounded-md border border-border bg-surface/85 px-3 py-2 font-mono text-[10px] text-muted elev-1">
                SIGNAL<br /><span className="text-accent">LOCKED</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/45">
          <div className="mx-auto grid max-w-7xl divide-y divide-border px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ['26', 'products launched'],
              ['14 yr', 'designing systems'],
              ['∞', 'curiosity remaining'],
            ].map(([value, label]) => (
              <div key={label} className="py-7 sm:px-7 first:pl-0">
                <p className="font-display text-3xl font-bold text-primary">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Selected missions</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Things in orbit.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Each mission combines product thinking, interaction, and just enough spectacle.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <article className="relative overflow-hidden rounded-xl border border-border bg-surface p-7 elev-1 lg:col-span-7">
              <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-primary/30" aria-hidden />
              <div className="absolute right-16 top-16 h-20 w-20 rounded-full bg-primary/10" aria-hidden />
              <Badge variant="primary">MISSION 01</Badge>
              <h3 className="mt-16 max-w-md font-display text-4xl font-bold tracking-tight">A calmer way to operate the grid.</h3>
              <p className="mt-4 max-w-md text-muted">An observability cockpit that turns noisy infrastructure into an understandable system.</p>
              <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">View case study <ArrowRight size={14} /></a>
            </article>

            <div className="grid gap-5 lg:col-span-5">
              {[
                { icon: <Bolt size={18} />, code: 'M-02', title: 'Arcade learning engine', body: 'Short loops, visible progress, and tactile feedback.' },
                { icon: <Shield size={18} />, code: 'M-03', title: 'Trust by design', body: 'A security product that explains itself before asking for faith.' },
              ].map((mission) => (
                <article key={mission.code} className="rounded-xl border border-border bg-surface p-6 elev-1">
                  <div className="flex items-center justify-between text-primary">
                    {mission.icon}<span className="font-mono text-xs">{mission.code}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold tracking-tight">{mission.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{mission.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-accent">
                <Sparkle size={17} /><span className="font-mono text-xs uppercase tracking-widest">Live experiment</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">Signal garden / build 0.8</h2>
              <p className="mt-3 max-w-lg leading-relaxed text-muted">A tiny creative coding environment where sound grows geometry. Shipping when it feels inevitable.</p>
              <div className="mt-7 max-w-md"><Progress value={78} label="Flight readiness" /></div>
            </div>
            <div className="rounded-lg border border-border bg-bg p-5 font-mono text-xs leading-loose elev-1">
              <p className="text-muted">17:42:03 <span className="text-primary">render.loop</span> stable at 60 fps</p>
              <p className="text-muted">17:42:07 <span className="text-accent">audio.field</span> mapped to geometry</p>
              <p className="text-muted">17:42:12 <span className="text-success">deploy.preview</span> complete</p>
              <p className="text-fg">17:42:18 awaiting curious human<span className="text-primary">_</span></p>
            </div>
          </div>
        </section>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-xs uppercase tracking-widest text-muted">
          <span>Kid Astro Laboratory</span><span>{theme.name} · one canonical palette</span>
        </div>
      </footer>
    </>
  );
}
