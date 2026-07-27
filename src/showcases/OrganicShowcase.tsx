import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import { cn } from "../lib/cn";
import { Avatar, Badge, Button, Input } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Check, Sparkle } from "../components/icons";

/**
 * Custom showcase for the `organic` theme (ref: Notion on Mobbin).
 * Layout signature: a pasted-up page — hand-drawn squiggle underlines and
 * arrows connecting sections, tilted polaroid-style cards, doodle dividers,
 * and asymmetric margins that feel collaged rather than gridded.
 * All strokes use currentColor, so the ink is a token like everything else.
 */

/** Hand-drawn underline that sits beneath a word. */
function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("h-2.5 w-full", className)}
    >
      <path
        d="M2 8c14-6 28 2 42-1s26-6 40-2 26 7 40 3 28-6 34-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Loose hand-drawn arrow, used to connect collaged sections. */
function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" aria-hidden className={cn("h-24 w-16", className)}>
      <path
        d="M12 6c26 16 40 40 32 62-6 17-22 26-34 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 0"
      />
      <path
        d="M10 98l0 20 20-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Torn-paper style horizontal divider. */
function DoodleRule() {
  return (
    <svg
      viewBox="0 0 400 10"
      preserveAspectRatio="none"
      aria-hidden
      className="my-14 h-2.5 w-full text-border"
    >
      <path
        d="M0 5c30-4 50 4 80 1s52-6 84-2 60 7 92 3 58-6 88-3 56 4 56 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Polaroid({
  children,
  tilt,
  className,
}: {
  children: ReactNode;
  tilt: string;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-surface p-5 elev-1", className)}
      style={{ transform: `rotate(${tilt})` }}
    >
      {children}
    </div>
  );
}

export function OrganicShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-3xl font-bold">northwind</span>
        <nav className="hidden gap-6 text-sm md:flex">
          {["Notes", "Recipes", "Field guide", "About"].map((l) => (
            <a key={l} href="#" className="transition-colors hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <Button size="sm" variant="outline">
          Start a page
        </Button>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        {/* Hero — deliberately off-center, with a squiggle and a connecting arrow */}
        <div className="relative pt-8">
          <div className="max-w-2xl md:ml-10">
            <Badge variant="outline" className="gap-1.5">
              <Sparkle size={12} /> A quieter kind of workspace
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Write it down,
              <br />
              then make it{" "}
              <span className="relative inline-block">
                <span className="font-display text-5xl font-bold text-primary sm:text-6xl">
                  yours
                </span>
                <Squiggle className="absolute -bottom-1 left-0 text-primary" />
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-loose text-muted">
              Notes, docs, and half-finished ideas that don't judge you for the
              mess. Everything starts as one page and grows only if it wants to.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg">
                Start writing <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="ghost">
                See a template
              </Button>
            </div>
          </div>

          {/* Doodle arrow pointing from the hero to the cards */}
          <DoodleArrow className="absolute -right-2 top-16 hidden text-muted/50 lg:block" />
        </div>

        <DoodleRule />

        {/* Collaged polaroid cards at different tilts and offsets */}
        <div className="grid gap-8 sm:grid-cols-3">
          <Polaroid tilt="-2deg" className="sm:mt-6">
            <div className="mb-4 grid h-28 place-items-center rounded-md bg-surface-2 font-display text-2xl text-muted">
              morning pages
            </div>
            <h3 className="font-display text-2xl font-bold">Daily notes</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              One page per day, created automatically. Yesterday is always one
              keystroke away.
            </p>
          </Polaroid>
          <Polaroid tilt="1.5deg">
            <div className="mb-4 space-y-2 rounded-md bg-surface-2 p-4">
              {["Sourdough starter", "Call the framer", "Seed order"].map((t, i) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <span
                    className={cn(
                      "grid h-4 w-4 place-items-center rounded-sm border border-border",
                      i === 0 && "bg-accent text-accent-fg"
                    )}
                  >
                    {i === 0 ? <Check size={10} /> : null}
                  </span>
                  <span className={cn(i === 0 && "line-through opacity-60")}>{t}</span>
                </div>
              ))}
            </div>
            <h3 className="font-display text-2xl font-bold">Lists that forgive</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Check things off whenever. Nothing turns red, nothing nags.
            </p>
          </Polaroid>
          <Polaroid tilt="-1deg" className="sm:mt-10">
            <div className="mb-4 grid h-28 place-items-center rounded-md bg-primary/10 font-display text-2xl text-primary">
              field guide
            </div>
            <h3 className="font-display text-2xl font-bold">Collections</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Group pages by feel, not folder. Rearrange them like postcards on a
              table.
            </p>
          </Polaroid>
        </div>

        <DoodleRule />

        {/* Asymmetric two-column: quote pinned left, notes stacked right */}
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-semibold tracking-tight">
              What people keep in here
            </h2>
            <div className="mt-6 space-y-4">
              {[
                ["Recipes with margin notes", "including the failures, which are the useful part"],
                ["A running list of bird sightings", "kept badly, for eleven years"],
                ["Half a novel", "no pressure, no deadline, no outline"],
                ["Every houseplant's watering history", "the ferns are winning"],
              ].map(([title, note]) => (
                <div
                  key={title}
                  className="flex items-baseline gap-3 border-b border-border pb-3"
                >
                  <span className="font-display text-xl text-primary">✳</span>
                  <p>
                    <span className="font-medium">{title}</span>
                    <span className="block text-sm italic text-muted">{note}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Polaroid tilt="2deg" className="self-start lg:col-span-2">
            <p className="font-display text-3xl leading-snug text-primary">
              "It's the only app that feels like my own handwriting."
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Avatar name="Iris Hale" size={34} />
              <span className="text-sm text-muted">Iris Hale — botanist</span>
            </div>
          </Polaroid>
        </div>

        <DoodleRule />

        {/* Signup — pasted-up, slightly rotated */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Start with one{" "}
            <span className="relative inline-block">
              <span className="font-display text-4xl font-bold text-accent">page</span>
              <Squiggle className="absolute -bottom-1 left-0 text-accent" />
            </span>
          </h2>
          <p className="mt-4 leading-loose text-muted">
            No setup, no workspace wizard. Just somewhere to put the thought.
          </p>
          <div
            className="mx-auto mt-7 flex max-w-md gap-2 rounded-lg border border-border bg-surface p-2 elev-1"
            style={{ transform: "rotate(-0.6deg)" }}
          >
            <Input placeholder="you@email.com" className="border-0 bg-transparent" />
            <Button className="shrink-0">Get started</Button>
          </div>
          <p className="mt-3 text-sm italic text-muted">
            Free for one person, forever.
          </p>
        </div>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <p className="mx-auto max-w-5xl px-6 py-8 text-center text-sm italic text-muted">
          © 2026 Northwind — a {theme.name} layout, drawn entirely from tokens.
        </p>
      </footer>
    </>
  );
}
