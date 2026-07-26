import type { HTMLAttributes } from "react";
import type { ThemeMeta } from "../themes/types";
import { cn } from "../lib/cn";
import {
  Avatar,
  Badge,
  Button,
  Progress,
  Switch,
  Tabs,
} from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Bolt, Check, Shield, Star } from "../components/icons";

/**
 * Custom showcase for the `bento` theme. The layout signature: no linear
 * hero→features→pricing flow — the whole product story lives in one
 * asymmetric grid of rounded tiles. Same shared primitives, different bones.
 */

function Tile({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-6 elev-1",
        className
      )}
      {...props}
    />
  );
}

export function BentoShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      {/* Minimal centered chrome — the grid is the star */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary" />
          <span className="font-display text-lg font-bold tracking-tight">Northwind</span>
        </div>
        <Button size="sm">Get started</Button>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mx-auto max-w-3xl py-14 text-center">
          <Badge variant="outline">New — v2.0 is here</Badge>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            Everything in its place
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            One toolkit, one grid. Every piece of the product story gets a tile —
            no scrolling through sections to find what matters.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg">
              Start building <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline">
              Live demo
            </Button>
          </div>
        </div>

        {/* The bento */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product tile — the big one */}
          <Tile className="sm:col-span-2 lg:row-span-2">
            <div>
              <Badge>Product</Badge>
              <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight">
                Ship weekly, not quarterly
              </h2>
              <p className="mt-2 text-sm text-muted">
                Design, build, and launch from one place.
              </p>
            </div>
            <div className="mt-6 rounded-lg border border-border bg-bg p-3">
              <div className="flex gap-1.5 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
              </div>
              <div className="space-y-2 rounded-md bg-surface p-3 elev-1">
                <div className="h-2.5 w-2/5 rounded bg-surface-2" />
                <div className="h-2.5 w-4/5 rounded bg-surface-2" />
                <div className="h-2.5 w-3/5 rounded bg-surface-2" />
                <div className="mt-3 h-8 w-24 rounded-md bg-primary" />
              </div>
            </div>
          </Tile>

          {/* Stat tiles */}
          <Tile>
            <span className="text-sm font-medium text-muted">Uptime</span>
            <div>
              <p className="font-display text-4xl font-extrabold tracking-tight">99.98%</p>
              <p className="mt-1 text-sm text-muted">past 12 months</p>
            </div>
          </Tile>
          <Tile>
            <span className="flex items-center gap-1 text-warning">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} />
              ))}
            </span>
            <div>
              <p className="font-display text-4xl font-extrabold tracking-tight">4.9</p>
              <p className="mt-1 text-sm text-muted">from 2,400+ reviews</p>
            </div>
          </Tile>

          {/* Settings tile */}
          <Tile>
            <span className="text-sm font-medium text-muted">Sensible defaults</span>
            <div className="mt-4 space-y-3">
              <Switch defaultChecked label="Auto-deploy" />
              <Switch defaultChecked label="Preview branches" />
              <Switch label="Weekly digest" />
            </div>
          </Tile>

          {/* Security tile */}
          <Tile>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
              <Shield size={20} />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Secure by default</h3>
              <p className="mt-1 text-sm text-muted">SSO, SAML, audit logs, SOC 2.</p>
            </div>
          </Tile>

          {/* Pricing tile */}
          <Tile className="sm:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-extrabold tracking-tight">Pro</h3>
                <p className="mt-1 text-sm text-muted">For small teams moving fast.</p>
              </div>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                $29<span className="text-base font-medium text-muted">/mo</span>
              </p>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {["Unlimited projects", "Custom domains", "Analytics", "Priority support"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-2 text-muted">
                    <Check size={14} className="shrink-0 text-success" /> {f}
                  </li>
                )
              )}
            </ul>
            <Button className="mt-5 w-full">Start free trial</Button>
          </Tile>

          {/* Quote tile */}
          <Tile className="sm:col-span-2">
            <p className="font-display text-lg font-bold leading-snug tracking-tight">
              "What used to take our team weeks now takes an afternoon."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name="Maya Chen" size={36} />
              <div>
                <p className="text-sm font-semibold">Maya Chen</p>
                <p className="text-xs text-muted">VP Design, Meridian</p>
              </div>
            </div>
          </Tile>

          {/* Speed tile */}
          <Tile>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/12 text-accent">
              <Bolt size={20} />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Blazing fast</h3>
              <p className="mt-1 text-sm text-muted">Every interaction feels instant.</p>
            </div>
          </Tile>

          {/* Progress tile */}
          <Tile>
            <span className="text-sm font-medium text-muted">Rollout status</span>
            <div className="mt-4 space-y-4">
              <Progress label="US regions" value={100} />
              <Progress label="EU regions" value={68} />
            </div>
          </Tile>

          {/* Tabs tile */}
          <Tile className="sm:col-span-2">
            <Tabs
              tabs={[
                {
                  label: "Design",
                  content: "Token-driven components that restyle with one attribute.",
                },
                {
                  label: "Build",
                  content: "Plain React + Tailwind. Copy a tile, keep shipping.",
                },
                {
                  label: "Launch",
                  content: "Deploys on every push — previews for every branch.",
                },
              ]}
            />
          </Tile>

          {/* CTA tile */}
          <Tile className="border-none bg-primary text-primary-fg sm:col-span-2">
            <h3 className="font-display text-2xl font-extrabold tracking-tight">
              Start in minutes
            </h3>
            <p className="mt-1 text-sm opacity-80">Free for 14 days. No credit card.</p>
            <div className="mt-5">
              <Button variant="secondary" className="bg-surface text-fg">
                Create account
              </Button>
            </div>
          </Tile>
        </div>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted">
          © 2026 Northwind — every tile on this page is built from {theme.name} tokens.
        </p>
      </footer>
    </>
  );
}
