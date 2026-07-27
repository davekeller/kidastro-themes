import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import { cn } from "../lib/cn";
import { Avatar, Button, Input } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Bolt, Star } from "../components/icons";

/**
 * Custom showcase for the `neubrutalist` theme (ref: Gumroad on Mobbin).
 * Layout signature: viewport-filling display type, a scrolling marquee strip,
 * overlapping and rotated elements, thick ink outlines on flat candy fills,
 * and hard offset shadows everywhere. Nothing is subtle.
 */

function Slab({
  className,
  children,
  tilt,
}: {
  className?: string;
  children: ReactNode;
  tilt?: string;
}) {
  return (
    <div
      className={cn("border-2 border-border bg-surface p-6 elev-1", className)}
      style={tilt ? { transform: `rotate(${tilt})` } : undefined}
    >
      {children}
    </div>
  );
}

const MARQUEE = "SELL WHAT YOU KNOW ✦ GET PAID FRIDAY ✦ NO GATEKEEPERS ✦ ";

export function NeubrutalistShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      {/* Fat bordered nav */}
      <header className="border-b-2 border-border bg-primary">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl font-black tracking-tight text-primary-fg">
            northwind
          </span>
          <nav className="hidden gap-5 font-display text-sm font-bold text-primary-fg md:flex">
            {["Discover", "Library", "Pricing", "Blog"].map((l) => (
              <a key={l} href="#" className="underline-offset-4 hover:underline">
                {l}
              </a>
            ))}
          </nav>
          <Button
            size="sm"
            variant="secondary"
            className="border-2 border-border bg-surface font-bold elev-1"
          >
            Start selling
          </Button>
        </div>
      </header>

      {/* Oversized headline + rotated sticker */}
      <div className="relative overflow-hidden border-b-2 border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="font-display text-[15vw] font-black uppercase leading-[0.82] tracking-tighter sm:text-[11vw]">
            sell what
            <br />
            you know
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-md text-lg font-medium">
              Go from zero to $1 — then to your first $100k. No gatekeepers, no
              storefront to build, no cut of your audience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="border-2 border-border font-bold elev-1">
                Start selling <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="border-2 border-border bg-accent font-bold text-accent-fg elev-1"
              >
                See examples
              </Button>
            </div>
          </div>
        </div>

        {/* Rotated starburst sticker, breaking the grid */}
        <div
          className="absolute -right-6 top-8 hidden h-32 w-32 place-items-center border-2 border-border bg-warning text-center font-display text-sm font-black uppercase leading-tight text-fg lg:grid"
          style={{ transform: "rotate(14deg)", borderRadius: "50%" }}
        >
          zero
          <br />
          platform
          <br />
          fees
        </div>
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden border-b-2 border-border bg-accent py-3">
        <div className="marquee-track whitespace-nowrap font-display text-xl font-black uppercase tracking-tight text-accent-fg">
          <span>{MARQUEE.repeat(4)}</span>
          <span aria-hidden>{MARQUEE.repeat(4)}</span>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Overlapping stat slabs */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            ["$996M", "paid to creators"],
            ["176k", "people selling"],
            ["4.9★", "creator rating"],
          ].map(([val, label], i) => (
            <Slab key={label} tilt={["-1.5deg", "1deg", "-0.5deg"][i]}>
              <p className="font-display text-4xl font-black tracking-tight">{val}</p>
              <p className="mt-1 font-medium uppercase tracking-wide text-muted">
                {label}
              </p>
            </Slab>
          ))}
        </div>

        {/* Product grid — flat candy fills */}
        <h2 className="mt-20 font-display text-4xl font-black uppercase tracking-tight">
          Staff picks
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Type Specimens", price: "$29", fill: "bg-primary", fg: "text-primary-fg" },
            { title: "Risograph Pack", price: "$18", fill: "bg-accent", fg: "text-accent-fg" },
            { title: "Zine Templates", price: "$12", fill: "bg-warning", fg: "text-fg" },
            { title: "Brush Set Vol. 3", price: "$34", fill: "bg-surface-2", fg: "text-fg" },
            { title: "Sticker Mockups", price: "$22", fill: "bg-success", fg: "text-white" },
            { title: "Grid Poster Kit", price: "$40", fill: "bg-danger", fg: "text-white" },
          ].map((p) => (
            <div key={p.title} className="border-2 border-border bg-surface elev-1">
              <div
                className={cn(
                  "flex h-36 items-end border-b-2 border-border p-4 font-display text-2xl font-black uppercase",
                  p.fill,
                  p.fg
                )}
              >
                {p.title}
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="flex items-center gap-1 text-sm font-bold">
                  <Star size={12} className="text-warning" /> 4.9 (128)
                </span>
                <span className="border-2 border-border px-2 py-0.5 font-display font-black">
                  {p.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Overlapping quote + signup, deliberately collaged */}
        <div className="relative mt-20 grid gap-6 lg:grid-cols-5">
          <Slab className="bg-primary lg:col-span-3" tilt="-1deg">
            <Bolt size={28} />
            <p className="mt-4 font-display text-2xl font-black uppercase leading-tight tracking-tight">
              "I made more in one Gumroad weekend than a whole month of client
              work."
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Avatar name="Tess Moreau" size={36} className="border-2 border-border" />
              <span className="font-bold">Tess Moreau — illustrator</span>
            </div>
          </Slab>
          <Slab className="lg:col-span-2" tilt="1.5deg">
            <h3 className="font-display text-2xl font-black uppercase tracking-tight">
              Get the newsletter
            </h3>
            <p className="mt-2 font-medium text-muted">
              Tactics from people actually selling. Every Thursday.
            </p>
            <div className="mt-4 space-y-3">
              <Input
                placeholder="you@email.com"
                className="border-2 border-border font-medium"
              />
              <Button className="w-full border-2 border-border bg-accent font-bold text-accent-fg elev-1">
                Subscribe
              </Button>
            </div>
          </Slab>
        </div>
      </main>

      {/* Loud CTA */}
      <div className="border-y-2 border-border bg-warning">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl">
            start today.
            <br />
            get paid friday.
          </h2>
          <Button
            size="lg"
            className="mt-8 border-2 border-border font-bold elev-2"
          >
            Create your shop <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t-2 border-border bg-surface-2">
        <p className="mx-auto max-w-6xl px-6 py-8 font-bold uppercase tracking-wide">
          © 2026 Northwind — {theme.name}, tokens only
        </p>
      </footer>
    </>
  );
}
