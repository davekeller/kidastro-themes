import { Button, Input } from "../primitives";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-2xl border border-border bg-surface-2 px-6 py-14 text-center elev-1">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Join thousands of teams building better products. Start your free trial
          today.
        </p>
        <form
          className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input type="email" placeholder="you@company.com" aria-label="Email" />
          <Button type="submit" className="shrink-0">
            Start free trial
          </Button>
        </form>
      </div>
    </section>
  );
}
