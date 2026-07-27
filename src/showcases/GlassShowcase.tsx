import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import { cn } from "../lib/cn";
import { Avatar, Badge, Button, Switch } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Check, Sparkle } from "../components/icons";

/**
 * Custom showcase for the `glass` theme (ref: Luma on Mobbin).
 * Layout signature: translucent frosted panels floating at different depths
 * over a vivid ambient background, overlapping z-layers, and a floating pill
 * nav. The theme's surface tokens are themselves semi-transparent, so
 * `bg-surface` + a blur utility is all a panel needs.
 */

function Panel({
  className,
  children,
  ...rest
}: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6 backdrop-blur-xl elev-1",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function GlassShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient light field behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span
          className="ambient-blob"
          style={{ top: "-8%", left: "4%", width: 460, height: 460, background: "var(--primary)" }}
        />
        <span
          className="ambient-blob"
          style={{ top: "12%", right: "-6%", width: 520, height: 520, background: "var(--accent)" }}
        />
        <span
          className="ambient-blob"
          style={{ top: "58%", left: "34%", width: 480, height: 480, background: "var(--success)" }}
        />
      </div>

      <div className="relative">
        {/* Floating pill nav */}
        <div className="sticky top-16 z-30 mx-auto max-w-3xl px-6 pt-6">
          <nav className="flex items-center justify-between gap-4 rounded-full border border-border bg-surface px-5 py-2.5 backdrop-blur-xl elev-1">
            <span className="font-display text-base font-bold tracking-tight">luma</span>
            <div className="hidden gap-5 text-sm text-muted sm:flex">
              {["Explore", "Calendars", "Hosts"].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-fg">
                  {l}
                </a>
              ))}
            </div>
            <Button size="sm">Sign in</Button>
          </nav>
        </div>

        <main className="mx-auto max-w-5xl px-6 pb-24 pt-20">
          {/* Hero */}
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="gap-1.5 backdrop-blur-xl">
              <Sparkle size={12} /> Spatial invites are here
            </Badge>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Delightful events
              <br />
              start here
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
              Set up an event page, invite friends, and sell tickets. Host
              memorable gatherings with a page people actually want to open.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button size="lg">
                Create event <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-xl">
                Explore
              </Button>
            </div>
          </div>

          {/* Overlapping depth stack — the layout's centerpiece */}
          <div className="relative mt-20 h-[420px] sm:h-[380px]">
            {/* Back layer */}
            <Panel className="absolute left-0 top-0 w-[78%] -rotate-2 sm:w-[62%]">
              <p className="text-xs uppercase tracking-widest text-muted">Saturday</p>
              <h3 className="mt-1 font-display text-xl font-bold">Rooftop Listening Party</h3>
              <p className="mt-1 text-sm text-muted">8:00 PM · Mission District</p>
              <div className="mt-4 flex items-center gap-2">
                {["Ana", "Ben", "Cy", "Dee"].map((n) => (
                  <Avatar key={n} name={n} size={28} />
                ))}
                <span className="text-sm text-muted">+48 going</span>
              </div>
            </Panel>

            {/* Middle layer */}
            <Panel className="absolute right-0 top-16 w-[80%] rotate-1 elev-2 sm:w-[58%]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">Featured</p>
                  <h3 className="mt-1 font-display text-2xl font-bold">
                    Design Systems Salon
                  </h3>
                  <p className="mt-1 text-sm text-muted">Thu, Aug 14 · 6:30 PM</p>
                </div>
                <Badge variant="primary">Going</Badge>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Talks", "Studio tour", "Afterparty"].map((t) => (
                  <div
                    key={t}
                    className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-center text-xs backdrop-blur-xl"
                  >
                    {t}
                  </div>
                ))}
              </div>
              <Button className="mt-5 w-full">Request invite</Button>
            </Panel>

            {/* Front layer */}
            <Panel className="absolute bottom-0 left-8 w-[62%] -rotate-1 sm:left-24 sm:w-[42%]">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success/20 text-success">
                  <Check size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold">You're on the list</p>
                  <p className="text-xs text-muted">Calendar invite sent</p>
                </div>
              </div>
            </Panel>
          </div>

          {/* Feature panels */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              ["Invites that feel personal", "Beautiful pages, zero setup."],
              ["Ticketing built in", "Free, paid, or approval-only."],
              ["Reminders that land", "Email, SMS, and calendar sync."],
            ].map(([title, body]) => (
              <Panel key={title}>
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted">{body}</p>
              </Panel>
            ))}
          </div>

          {/* Settings panel */}
          <Panel className="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-lg font-bold">Event settings</h3>
                <p className="mt-1 text-sm text-muted">
                  Controls stay legible through the glass — every layer is a token.
                </p>
              </div>
              <div className="flex flex-wrap gap-6">
                <Switch defaultChecked label="Require approval" />
                <Switch defaultChecked label="Show guest list" />
                <Switch label="Waitlist" />
              </div>
            </div>
          </Panel>

          {/* CTA */}
          <Panel className="mt-16 text-center elev-2">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Host something people remember
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Your first event page takes about two minutes.
            </p>
            <Button size="lg" className="mt-6">
              Create event <ArrowRight size={16} />
            </Button>
          </Panel>
        </main>

        <TokenPanel themeName={theme.name} />

        <footer className="border-t border-border">
          <p className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
            © 2026 Luma — a {theme.name} layout, tokens only.
          </p>
        </footer>
      </div>
    </div>
  );
}
