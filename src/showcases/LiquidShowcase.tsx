import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import { Badge, Button, StatTile, Switch } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Bolt, Shield, Sparkle } from "../components/icons";

/**
 * Custom showcase for the `liquid` theme.
 * Layout signature: specular translucency. Where `glass` is flat visionOS
 * frost, this is wet — panels carry highlights on their top and bottom edges
 * (via the theme's elev tokens), radii are large and concentric, and content
 * floats in overlapping layers over a soft caustic wash.
 *
 * The wash is built from token colors at low opacity, so it re-tints with the
 * theme rather than being a fixed gradient.
 */

/** A floating specular panel. Radius nests: outer rounded-2xl, inner rounded-xl. */
function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border/70 bg-surface/70 p-6 backdrop-blur-xl elev-2 ${className}`}
    >
      {children}
    </div>
  );
}

const features = [
  {
    icon: <Sparkle size={18} />,
    title: "Depth by default",
    body: "Panels layer over one another with real edge highlights, not flat borders.",
  },
  {
    icon: <Bolt size={18} />,
    title: "Refractive surfaces",
    body: "Backdrop blur plus inner highlights read as thickness rather than transparency.",
  },
  {
    icon: <Shield size={18} />,
    title: "Concentric radii",
    body: "Nested corners step down in lockstep, so nothing looks pasted on.",
  },
];

export function LiquidShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <div className="relative overflow-hidden">
        {/* Caustic wash — token colors at low opacity, so it follows the theme. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute right-[-10%] top-10 h-[380px] w-[380px] rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-[-15%] left-1/3 h-[360px] w-[360px] rounded-full bg-danger/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-14">
          {/* Floating nav pill */}
          <nav className="mx-auto mb-16 flex max-w-3xl items-center justify-between rounded-full border border-border/70 bg-surface/60 px-5 py-2.5 backdrop-blur-xl elev-1">
            <span className="font-display text-sm font-semibold tracking-tight">
              Meniscus
            </span>
            <div className="hidden gap-6 text-sm text-muted md:flex">
              {["Product", "Surfaces", "Pricing", "Docs"].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-fg">
                  {l}
                </a>
              ))}
            </div>
            <Button size="sm">Open app</Button>
          </nav>

          {/* Hero */}
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="backdrop-blur-xl">
              New — Surfaces 2.0
            </Badge>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Interfaces with
              <span className="text-primary"> actual depth</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
              A surface system built on light rather than lines. Everything
              refracts, nothing shouts.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg">
                Start building
                <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="outline">
                Watch the film
              </Button>
            </div>
          </div>

          {/* Overlapping panel stack — the depth demo */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <Panel className="relative z-10">
              <div className="grid gap-4 sm:grid-cols-3">
                <StatTile label="Refraction" value="0.94" delta="6%" trend="up" />
                <StatTile label="Frame budget" value="8.2ms" delta="1.1ms" trend="down" />
                <StatTile label="Layers" value="12" caption="composited" />
              </div>
            </Panel>

            {/* Offset behind, so the stack reads as depth not decoration. */}
            <Panel className="relative z-0 -mt-4 mx-6 opacity-90">
              <div className="flex items-center justify-between gap-6">
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold">
                    Adaptive translucency
                  </p>
                  <p className="mt-1 truncate text-sm text-muted">
                    Panels sample what&rsquo;s behind them and adjust.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </Panel>
          </div>

          {/* Features in their own floating panels */}
          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {features.map((f) => (
              <Panel key={f.title}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-primary/15 text-primary">
                  {f.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
              </Panel>
            ))}
          </div>

          {/* CTA */}
          <Panel className="mt-20 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Build something you can see through
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Copy the token block and the surfaces come with it.
            </p>
            <Button size="lg" className="mt-6">
              Get the tokens
              <ArrowRight size={16} />
            </Button>
          </Panel>
        </div>
      </div>

      <TokenPanel themeName={theme.name} />
    </>
  );
}
