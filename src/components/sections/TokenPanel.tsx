import { Badge, Button, Input, Switch } from "../primitives";

const swatches = [
  { name: "bg", cls: "bg-bg" },
  { name: "surface", cls: "bg-surface" },
  { name: "surface-2", cls: "bg-surface-2" },
  { name: "fg", cls: "bg-fg" },
  { name: "muted", cls: "bg-muted" },
  { name: "border", cls: "bg-border" },
  { name: "primary", cls: "bg-primary" },
  { name: "accent", cls: "bg-accent" },
  { name: "success", cls: "bg-success" },
  { name: "warning", cls: "bg-warning" },
  { name: "danger", cls: "bg-danger" },
];

const radii = [
  { name: "sm", cls: "rounded-sm" },
  { name: "md", cls: "rounded-md" },
  { name: "lg", cls: "rounded-lg" },
  { name: "xl", cls: "rounded-xl" },
];

export function TokenPanel({ themeName }: { themeName: string }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="mb-4">
          Design tokens
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The {themeName} system
        </h2>
        <p className="mt-4 text-muted">
          Every component on this page is built from the tokens below. Change the
          tokens and the whole surface reskins — nothing else moves.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Colors */}
        <div className="rounded-2xl border border-border bg-surface p-6 elev-1">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Color
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {swatches.map((s) => (
              <div key={s.name}>
                <div
                  className={`h-14 w-full rounded-lg border border-border ${s.cls}`}
                />
                <div className="mt-1.5 text-xs font-medium text-fg">{s.name}</div>
                <div className="font-mono text-[11px] text-muted">bg-{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Type + shape */}
        <div className="rounded-2xl border border-border bg-surface p-6 elev-1">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Typography
          </h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <span className="font-display text-3xl font-bold">Ag</span>
              <span className="font-mono text-[11px] text-muted">font-display</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <span className="font-serif text-2xl">Serif specimen</span>
              <span className="font-mono text-[11px] text-muted">font-serif</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <span className="text-base">The quick brown fox</span>
              <span className="font-mono text-[11px] text-muted">font-sans</span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-sm">const x = 42;</span>
              <span className="font-mono text-[11px] text-muted">font-mono</span>
            </div>
          </div>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">
            Radius
          </h3>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {radii.map((r) => (
              <div key={r.name} className="text-center">
                <div
                  className={`h-12 w-full border border-border bg-surface-2 ${r.cls}`}
                />
                <div className="mt-1.5 font-mono text-[11px] text-muted">
                  {r.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live primitives */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 elev-1">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Components
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Input className="max-w-xs" placeholder="Input field" />
          <Switch defaultChecked label="Notifications" />
        </div>
      </div>
    </section>
  );
}
