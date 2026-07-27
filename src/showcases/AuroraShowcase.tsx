import type { ThemeMeta } from "../themes/types";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  Progress,
} from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Check, Sparkle } from "../components/icons";

/**
 * Custom showcase for the `aurora` theme (ref: Stripe on Mobbin).
 * Layout signature: a mesh-gradient hero bleeding behind a floating product
 * card, angled section seams instead of borders, and soft color washes
 * separating bands. Light, airy, generous whitespace.
 */

const MESH =
  "radial-gradient(at 12% 4%, var(--primary) 0px, transparent 55%), " +
  "radial-gradient(at 78% 0%, var(--accent) 0px, transparent 50%), " +
  "radial-gradient(at 92% 62%, var(--primary) 0px, transparent 45%), " +
  "radial-gradient(at 30% 78%, var(--accent) 0px, transparent 45%)";

export function AuroraShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      {/* Hero band — mesh gradient with an angled bottom seam */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: MESH, clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
        />
        <div className="relative">
          <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
            <div className="flex items-center gap-8">
              <span className="font-display text-xl font-bold tracking-tight">northwind</span>
              <nav className="hidden gap-6 text-sm font-medium text-muted md:flex">
                {["Products", "Solutions", "Developers", "Pricing"].map((l) => (
                  <a key={l} href="#" className="transition-colors hover:text-fg">
                    {l}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
              <Button size="sm">
                Start now <ArrowRight size={14} />
              </Button>
            </div>
          </header>

          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="gap-1.5">
                <Sparkle size={12} /> Now with instant payouts
              </Badge>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                Financial
                <br />
                infrastructure
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, var(--primary), var(--accent))",
                  }}
                >
                  to grow on
                </span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Millions of companies use our platform to accept payments, send
                payouts, and manage their businesses online.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg">
                  Start with Northwind <ArrowRight size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Contact sales
                </Button>
              </div>
            </div>

            {/* Floating product card, tilted out of the grid */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 opacity-30"
                style={{ backgroundImage: MESH, filter: "blur(40px)" }}
              />
              <Card className="relative rotate-1 elev-2">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted">Today</span>
                    <Badge variant="primary">Live</Badge>
                  </div>
                  <p className="mt-2 font-display text-4xl font-bold tracking-tight">
                    $128,420
                  </p>
                  <p className="text-sm text-success">↑ 14.2% vs last week</p>
                  {/* Token-driven bar chart */}
                  <div className="mt-6 flex h-28 items-end gap-2">
                    {[38, 52, 44, 68, 58, 82, 74].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background:
                            i % 2 === 0 ? "var(--primary)" : "var(--accent)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-5 space-y-3 border-t border-border pt-4">
                    <Progress label="Payouts cleared" value={92} />
                    <Progress label="Disputes resolved" value={64} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Logo strip */}
      <div className="border-y border-border bg-surface-2/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-8">
          {["Meridian", "Halide", "Northgate", "Cobalt", "Pinewood", "Lumen"].map((n) => (
            <span key={n} className="font-display text-lg font-semibold text-muted/70">
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Feature band with a wash + angled top seam */}
      <div className="relative py-24">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: MESH }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold text-primary">Payments</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                A fully integrated suite
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Reduce costs, grow revenue, and run your business more efficiently
                on a fully integrated platform. Use it to handle everything from
                one-off payments to global subscriptions.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "135+ currencies and payment methods",
                  "Unified reporting across every channel",
                  "Radar fraud protection built in",
                  "Instant payouts to connected accounts",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Check size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Code panel */}
            <div className="overflow-hidden rounded-lg border border-border bg-fg elev-2">
              <div className="flex items-center gap-2 border-b border-border/20 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-danger" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
                <span className="ml-2 font-mono text-xs text-bg/60">payment.ts</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-bg/90">
                <code>{`const payment = await northwind.payments.create({
  amount: 12840,
  currency: "usd",
  customer: cus_4Q9x2Lp,
  metadata: { plan: "pro", seats: 12 },
});

await northwind.payouts.instant(payment.id);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing — three plain columns, no heavy cards */}
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pricing that scales with you
          </h2>
          <p className="mt-4 text-muted">Start free. Only pay for what you process.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { name: "Starter", price: "2.9%", note: "+ 30¢ per transaction", cta: "Start free" },
            { name: "Scale", price: "2.5%", note: "+ 25¢ per transaction", cta: "Choose Scale", featured: true },
            { name: "Enterprise", price: "Custom", note: "volume pricing", cta: "Contact sales" },
          ].map((p) => (
            <div
              key={p.name}
              className={
                p.featured
                  ? "rounded-xl border-2 border-primary bg-surface p-6 elev-2"
                  : "rounded-xl border border-border bg-surface p-6 elev-1"
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                {p.featured ? <Badge variant="primary">Popular</Badge> : null}
              </div>
              <p className="mt-4 font-display text-3xl font-bold tracking-tight">
                {p.price}
              </p>
              <p className="mt-1 text-sm text-muted">{p.note}</p>
              <Button
                variant={p.featured ? "primary" : "outline"}
                className="mt-6 w-full"
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="border-y border-border bg-surface-2/50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight">
            "We moved our entire billing stack over in a week and cut failed
            payments by a third."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Avatar name="Priya Raman" size={36} />
            <span className="text-sm text-muted">Priya Raman — CFO, Meridian</span>
          </div>
        </div>
      </div>

      {/* Gradient CTA band */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: MESH }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Create an account instantly and start accepting payments today.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg">
              Start now <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="outline">
              Read the docs
            </Button>
          </div>
        </div>
      </div>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
          © 2026 Northwind — an {theme.name} layout, tokens only.
        </p>
      </footer>
    </>
  );
}
