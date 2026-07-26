import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import { Avatar, Badge, Button } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Check } from "../components/icons";

/**
 * Custom showcase for the `linear` theme. The layout signature: a dense,
 * narrow centered column — feature *rows* instead of card grids, hairline
 * dividers, a glowing product frame, and keyboard-first affordances.
 */

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-surface-2 px-1.5 font-mono text-xs text-muted">
      {children}
    </kbd>
  );
}

function FeatureRow({
  eyebrow,
  title,
  body,
  panel,
  flip,
}: {
  eyebrow: string;
  title: string;
  body: string;
  panel: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 border-t border-border py-16 md:grid-cols-2">
      <div className={flip ? "md:order-2" : undefined}>
        <p className="text-sm font-medium text-primary">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{body}</p>
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fg transition-opacity hover:opacity-80"
        >
          Learn more <ArrowRight size={14} />
        </a>
      </div>
      <div className={flip ? "md:order-1" : undefined}>{panel}</div>
    </div>
  );
}

function IssueRow({ id, title, tag, done }: { id: string; title: string; tag?: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-3 border-t border-border px-4 py-2.5 first:border-t-0">
      <span
        className={
          done
            ? "flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-fg"
            : "h-4 w-4 rounded-full border-2 border-muted/40"
        }
      >
        {done ? <Check size={10} /> : null}
      </span>
      <span className="font-mono text-xs text-muted">{id}</span>
      <span className="flex-1 truncate text-sm">{title}</span>
      {tag ? <Badge variant="outline">{tag}</Badge> : null}
    </div>
  );
}

export function LinearShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      {/* Slim sticky nav */}
      <header className="sticky top-14 z-30 border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm bg-primary" />
              <span className="text-sm font-semibold">Northwind</span>
            </div>
            <nav className="hidden gap-5 text-sm text-muted md:flex">
              {["Features", "Method", "Customers", "Pricing"].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-fg">
                  {l}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 text-xs text-muted sm:flex">
              Search <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero — tight, centered, engineered */}
        <div className="mx-auto max-w-3xl pb-16 pt-20 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:text-fg"
          >
            <Badge className="px-1.5 py-0">New</Badge> Automations is here
            <ArrowRight size={12} />
          </a>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Built for the way
            <br />
            modern teams ship
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            Purpose-built tracking, planning, and roadmaps. Fast enough to keep up
            with your best engineers.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button>Start building</Button>
            <Button variant="ghost">
              Talk to sales <ArrowRight size={14} />
            </Button>
          </div>
        </div>

        {/* Product frame with glow */}
        <div className="rounded-lg border border-border bg-surface p-1.5 glow">
          <div className="rounded-md border border-border bg-bg">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-sm font-medium">Active issues</span>
              <span className="flex gap-1">
                <Kbd>F</Kbd>
                <Kbd>V</Kbd>
              </span>
            </div>
            <IssueRow id="NW-201" title="Polish empty states for boards" tag="Design" done />
            <IssueRow id="NW-204" title="Keyboard nav between panels" tag="Core" />
            <IssueRow id="NW-207" title="Batch-edit labels from command menu" />
            <IssueRow id="NW-212" title="Sync conflicts resolve silently" tag="Bug" done />
          </div>
        </div>

        {/* Feature rows */}
        <div className="mt-20">
          <FeatureRow
            eyebrow="Command menu"
            title="Do everything from the keyboard"
            body="Every action in the app is one shortcut away. Assign, label, move, and merge without ever touching the mouse."
            panel={
              <div className="rounded-lg border border-border bg-surface p-4 elev-1">
                <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2 text-sm text-muted">
                  <span className="flex-1">Type a command…</span>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  {[
                    ["Assign to…", "A"],
                    ["Change status…", "S"],
                    ["Set priority…", "P"],
                  ].map(([label, key]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-md px-3 py-1.5 text-muted first:bg-surface-2 first:text-fg"
                    >
                      {label} <Kbd>{key}</Kbd>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
          <FeatureRow
            flip
            eyebrow="Cycles"
            title="Momentum you can measure"
            body="Automatic sprints that roll unfinished work forward. No ceremony, no stale boards — just a steady shipping rhythm."
            panel={
              <div className="rounded-lg border border-border bg-surface p-5 elev-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">Cycle 14</span>
                  <span className="text-xs text-muted">4 days left</span>
                </div>
                <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-surface-2">
                  <span className="w-3/5 bg-primary" />
                  <span className="w-1/6 bg-accent" />
                </div>
                <div className="mt-3 flex justify-between text-xs text-muted">
                  <span>32 done</span>
                  <span>9 in progress</span>
                  <span>7 todo</span>
                </div>
              </div>
            }
          />
          <FeatureRow
            eyebrow="Insights"
            title="Answers without dashboards"
            body="Velocity, scope creep, and load balance surface automatically — in the flow of work, not in a BI tool."
            panel={
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Velocity", "48", "+12%"],
                  ["Scope", "94", "-3%"],
                  ["Load", "76%", "even"],
                ].map(([k, val, delta]) => (
                  <div key={k} className="rounded-lg border border-border bg-surface p-3 elev-1">
                    <p className="text-xs text-muted">{k}</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">{val}</p>
                    <p className="text-xs text-success">{delta}</p>
                  </div>
                ))}
              </div>
            }
          />
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {[
            ["10k+", "teams"],
            ["99.99%", "uptime"],
            ["<50ms", "interactions"],
            ["4.8/5", "rating"],
          ].map(([val, label]) => (
            <div key={label} className="bg-surface px-6 py-5">
              <p className="text-2xl font-semibold tracking-tight">{val}</p>
              <p className="mt-0.5 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mx-auto max-w-2xl py-20 text-center">
          <p className="text-xl font-medium leading-relaxed tracking-tight">
            "The first tool that actually keeps up. Our engineers stopped
            complaining about process — because there isn't any."
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Avatar name="Rae Okafor" size={32} />
            <span className="text-sm text-muted">Rae Okafor — CTO, Halide Labs</span>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mb-20 rounded-lg border border-border bg-surface px-8 py-14 text-center glow">
          <h2 className="text-3xl font-semibold tracking-tight">Plan less. Ship more.</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Get started free — migrate your whole workspace in an afternoon.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button>
              Get started <ArrowRight size={14} />
            </Button>
            <Button variant="outline">Docs</Button>
          </div>
        </div>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <p className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
          © 2026 Northwind — a {theme.name} layout built entirely from theme tokens.
        </p>
      </footer>
    </>
  );
}
