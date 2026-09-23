import { AstroHedron } from "../components/AstroHedron";
import { ArrowRight, Bolt, Shield, Sparkle, Star } from "../components/icons";
import { Badge, Button, Progress } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { cn } from "../lib/cn";
import { useSkinState } from "../lib/skin-state";
import type { ThemeMeta } from "../themes/types";

const MISSIONS = [
  {
    icon: <Bolt size={18} />,
    code: "M-02",
    title: "Arcade learning engine",
    body: "Short loops, visible progress, and tactile feedback.",
  },
  {
    icon: <Shield size={18} />,
    code: "M-03",
    title: "Trust by design",
    body: "A security product that explains itself before asking for faith.",
  },
];

const LOG = [
  { time: "17:42:03", key: "render.loop", text: "stable at 60 fps", dot: "bg-primary" },
  { time: "17:42:07", key: "audio.field", text: "mapped to geometry", dot: "bg-accent" },
  { time: "17:42:12", key: "deploy.preview", text: "complete", dot: "bg-success" },
];

/**
 * Kid Astro's Page: creative mission control — playful space chrome, technical
 * readouts, and a few bright arcade signals on a deep canvas. Ported from the
 * Codex curation (codex/theme-library-curation) and re-inked for three
 * palettes: the signal colors mark things as fills, rules, and dots, and every
 * word stays in --fg or --muted, so Daylight reads as well as Deep space.
 */
export function KidAstroShowcase({ theme }: { theme: ThemeMeta }) {
  // The icosahedron reads its colors once, on mount; a new palette remounts it.
  const { palette } = useSkinState();

  return (
    <>
      <header className="border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <a href="#" className="flex items-center gap-2.5 font-display text-sm font-bold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-fg">
              <Star size={12} />
            </span>
            KID ASTRO / LAB 07
          </a>
          <nav className="hidden items-center gap-7 text-xs tracking-widest text-muted uppercase md:flex">
            {["Missions", "Experiments", "Logbook"].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-fg">
                {item}
              </a>
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
              <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.24em] text-muted uppercase">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary glow" />
                Product design × design engineering
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-6xl leading-[0.9] font-extrabold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
                Build strange things.
                <span className="mt-3 inline-block rounded-md bg-accent px-3 pb-1 text-accent-fg box-decoration-clone">
                  Make them useful.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                Product systems, creative tools, and delightful machines for people willing to
                try something new.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg">
                  Open the flight log <ArrowRight size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Current experiments
                </Button>
              </div>
            </div>

            <div className="relative min-h-[420px] lg:col-span-5">
              <div className="absolute inset-5 rounded-full border border-border" aria-hidden />
              <div className="absolute inset-16 rounded-full border border-primary/40" aria-hidden />
              <div className="absolute inset-0">
                <AstroHedron key={palette} />
              </div>
              <div className="absolute top-12 left-0 rounded-md border border-border bg-surface/85 px-3 py-2 font-mono text-[10px] text-muted elev-1">
                ORBIT 03
                <br />
                <span className="font-semibold text-fg">42.168°</span>
              </div>
              <div className="absolute right-0 bottom-10 rounded-md border border-border bg-surface/85 px-3 py-2 font-mono text-[10px] text-muted elev-1">
                SIGNAL
                <br />
                <span className="inline-flex items-center gap-1.5 font-semibold text-fg">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  LOCKED
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/45">
          <div className="mx-auto grid max-w-7xl divide-y divide-border px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["07", "missions in orbit"],
              ["60 fps", "render loop, steady"],
              ["∞", "curiosity remaining"],
            ].map(([value, label]) => (
              <div key={label} className="py-7 first:pl-0 sm:px-7">
                <p className="font-display text-3xl font-bold text-fg">{value}</p>
                <p className="mt-1 flex items-center gap-2 text-xs tracking-widest text-muted uppercase">
                  <span aria-hidden className="h-px w-4 bg-primary" />
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="flex items-center gap-2.5 font-mono text-xs tracking-widest text-muted uppercase">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                Selected missions
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Things in orbit.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Each mission combines product thinking, interaction, and just enough spectacle.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <article className="relative overflow-hidden rounded-xl border border-border bg-surface p-7 elev-1 lg:col-span-7">
              <div className="absolute top-8 right-8 h-28 w-28 rounded-full border border-primary/30" aria-hidden />
              <div className="absolute top-16 right-16 h-20 w-20 rounded-full bg-primary/10" aria-hidden />
              <Badge variant="primary">MISSION 01</Badge>
              <h3 className="mt-16 max-w-md font-display text-4xl font-bold tracking-tight">
                A calmer way to operate the grid.
              </h3>
              <p className="mt-4 max-w-md text-muted">
                An observability cockpit that turns noisy infrastructure into an understandable
                system.
              </p>
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:decoration-fg"
              >
                View case study <ArrowRight size={14} />
              </a>
            </article>

            <div className="grid gap-5 lg:col-span-5">
              {MISSIONS.map((mission) => (
                <article key={mission.code} className="rounded-xl border border-border bg-surface p-6 elev-1">
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-fg">
                      {mission.icon}
                    </span>
                    <span className="font-mono text-xs text-muted">{mission.code}</span>
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
              <div className="flex items-center gap-2.5 text-muted">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-accent-fg">
                  <Sparkle size={14} />
                </span>
                <span className="font-mono text-xs tracking-widest uppercase">Live experiment</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
                Signal garden / build 0.8
              </h2>
              <p className="mt-3 max-w-lg leading-relaxed text-muted">
                A tiny creative-coding environment where sound grows geometry. Shipping when it
                feels inevitable.
              </p>
              <div className="mt-7 max-w-md">
                <Progress value={78} label="Flight readiness" />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-bg p-5 font-mono text-xs leading-loose elev-1">
              {LOG.map((line) => (
                <p key={line.time} className="text-muted">
                  {line.time}{" "}
                  <span className="inline-flex items-center gap-1.5 text-fg">
                    <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", line.dot)} />
                    {line.key}
                  </span>{" "}
                  {line.text}
                </p>
              ))}
              <p className="text-fg">
                17:42:18 awaiting curious human
                <span aria-hidden className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-primary" />
              </p>
            </div>
          </div>
        </section>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-xs tracking-widest text-muted uppercase">
          <span>Kid Astro Laboratory</span>
          <span>{theme.name} · three palettes</span>
        </div>
      </footer>
    </>
  );
}
