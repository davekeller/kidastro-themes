import type { ThemeMeta } from "../themes/types";
import { cn } from "../lib/cn";
import { Avatar, Badge, Button, Progress } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Bolt, Check, Star } from "../components/icons";

/**
 * Custom showcase for the `clay` theme (ref: Duolingo / Headspace on Mobbin).
 * Layout signature: a centered single column with mascot-scale illustration
 * slots, a stepped lesson path instead of a feature grid, and chunky
 * full-width buttons. The puff comes from the theme's elevation tokens
 * (inner bottom shadow + outer drop), so `elev-1` alone reads as extruded.
 */

// The path snakes left and right. Offsets only kick in from `sm` up: on a
// phone they would push rows past the viewport and scroll the whole page.
const PATH_STEPS = [
  { label: "Basics", done: true, offset: "sm:translate-x-0" },
  { label: "Phrases", done: true, offset: "sm:translate-x-16" },
  { label: "Travel", done: true, offset: "sm:translate-x-24" },
  { label: "Food", done: false, current: true, offset: "sm:translate-x-12" },
  { label: "Family", done: false, offset: "sm:-translate-x-4" },
  { label: "Work", done: false, offset: "sm:-translate-x-16" },
];

export function ClayShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-fg elev-1">
            <Bolt size={18} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            northwind
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-sm font-bold elev-1">
            🔥 <span className="text-fg">14</span>
          </span>
          <Avatar name="Dave K" size={34} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-20">
        {/* Hero with a mascot-scale slot */}
        <div className="pt-10 text-center">
          <div className="mx-auto grid h-40 w-40 place-items-center rounded-full bg-primary/15 elev-1">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-primary text-primary-fg elev-2">
              <Bolt size={52} />
            </div>
          </div>
          <h1 className="mt-8 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            The free, fun way
            <br />
            to learn anything
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted">
            Bite-sized lessons that feel like a game. Five minutes a day is
            genuinely enough.
          </p>
          {/* Chunky full-width buttons, stacked like the app */}
          <div className="mx-auto mt-8 max-w-sm space-y-3">
            <Button size="lg" className="w-full text-base font-extrabold uppercase">
              Get started
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full text-base font-extrabold uppercase text-accent"
            >
              I already have an account
            </Button>
          </div>
        </div>

        {/* Streak / stat puffs */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["14", "day streak"],
            ["2,480", "XP earned"],
            ["Gold", "league"],
            ["96%", "accuracy"],
          ].map(([val, label]) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-surface p-4 text-center elev-1"
            >
              <p className="font-display text-2xl font-extrabold tracking-tight">{val}</p>
              <p className="text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>

        {/* The lesson path — the layout's signature move */}
        <h2 className="mt-16 text-center font-display text-3xl font-extrabold tracking-tight">
          Your path
        </h2>
        <div className="mt-8 space-y-5">
          {PATH_STEPS.map((s) => (
            <div key={s.label} className={cn("flex items-center gap-4", s.offset)}>
              <span
                className={cn(
                  "grid h-16 w-16 shrink-0 place-items-center rounded-full font-display text-lg font-extrabold elev-1",
                  s.done && "bg-primary text-primary-fg",
                  s.current && "bg-accent text-accent-fg elev-2",
                  !s.done && !s.current && "border border-border bg-surface-2 text-muted"
                )}
              >
                {s.done ? <Check size={26} /> : s.current ? <Star size={24} /> : "?"}
              </span>
              <div
                className={cn(
                  "flex-1 rounded-lg border border-border bg-surface px-5 py-3 elev-1",
                  !s.done && !s.current && "opacity-60"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg font-bold">{s.label}</span>
                  {s.current ? <Badge variant="accent">In progress</Badge> : null}
                  {s.done ? <span className="text-sm text-muted">5/5</span> : null}
                </div>
                {s.current ? (
                  <div className="mt-2">
                    <Progress value={60} />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial puff */}
        <div className="mt-16 rounded-lg border border-border bg-surface p-7 text-center elev-2">
          <p className="font-display text-xl font-bold leading-snug">
            "My kid asks to do lessons. On a weekend. I have no notes."
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Avatar name="Jo Park" size={34} />
            <span className="text-sm text-muted">Jo Park — parent of two</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-lg bg-primary p-8 text-center text-primary-fg elev-2">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">
            Ready to keep the streak?
          </h2>
          <p className="mx-auto mt-2 max-w-sm opacity-90">
            Free forever. Five minutes a day.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-6 bg-surface text-base font-extrabold uppercase text-fg"
          >
            Start learning <ArrowRight size={16} />
          </Button>
        </div>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <p className="mx-auto max-w-3xl px-6 py-8 text-center text-sm text-muted">
          © 2026 Northwind — a {theme.name} layout, tokens only.
        </p>
      </footer>
    </>
  );
}
