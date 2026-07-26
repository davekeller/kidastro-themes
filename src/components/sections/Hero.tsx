import { Badge, Button } from "../primitives";
import { ArrowRight, Sparkle } from "../icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 text-center">
        <div className="mb-5 flex justify-center">
          <Badge variant="outline" className="gap-1.5 py-1">
            <Sparkle size={14} />
            New — v2.0 is here
          </Badge>
        </div>
        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Ship your product with a design you're proud of
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          A component toolkit and workflow that helps teams design, build, and
          launch beautiful interfaces — faster than ever.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">
            Start building
            <ArrowRight size={18} />
          </Button>
          <Button variant="outline" size="lg">
            Live demo
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted">
          No credit card required · Free for 14 days
        </p>

        {/* Product preview mock */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="glow rounded-2xl border border-border bg-surface elev-2">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-surface-2" />
              <span className="h-3 w-3 rounded-full bg-surface-2" />
              <span className="h-3 w-3 rounded-full bg-surface-2" />
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 text-left">
              <div className="col-span-1 space-y-2">
                <div className="h-8 rounded-md bg-primary/15" />
                <div className="h-6 rounded-md bg-surface-2" />
                <div className="h-6 rounded-md bg-surface-2" />
                <div className="h-6 rounded-md bg-surface-2" />
                <div className="h-6 rounded-md bg-surface-2" />
              </div>
              <div className="col-span-3 space-y-4">
                <div className="flex items-end gap-2">
                  <div className="h-3 w-24 rounded bg-surface-2" />
                  <div className="ml-auto h-8 w-20 rounded-md bg-primary" />
                </div>
                <div className="flex h-40 items-end gap-3 rounded-lg border border-border bg-bg p-4">
                  {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={
                        i % 2 === 0
                          ? "w-full rounded-t bg-primary"
                          : "w-full rounded-t bg-accent"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
