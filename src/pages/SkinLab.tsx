import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Switch,
} from "../components/primitives";

/**
 * Phase 1 QA harness (unlinked, reachable at /lab). Renders the shared
 * primitives under each of the reference skin's three palettes at once, so the
 * skin × palette model can be verified and screenshotted. This is the seed of
 * the Phase 2 "Components" view; it is intentionally minimal and token-only.
 */

const PALETTES = [
  { slug: "light", label: "Light · Paper" },
  { slug: "dark", label: "Dark · Blackout" },
  { slug: "fun", label: "Fun · Candy" },
] as const;

function Panel() {
  return (
    <div className="space-y-5 p-5">
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-fg">
          Neubrutalist
        </h3>
        <p className="text-sm text-muted">Secondary copy on the canvas, in --muted.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>

      <Input placeholder="An input field" />
      <Switch label="A switch" defaultChecked />

      <Card className="elev-1">
        <CardHeader>
          <CardTitle>Elevated card</CardTitle>
          <CardDescription>
            The skin&rsquo;s hard offset shadow, inked by the palette.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-surface-2 p-3 text-sm text-fg">
            A well on --surface-2.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SkinLab() {
  return (
    <div className="min-h-screen bg-bg px-6 py-10 text-fg">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">Phase 1 · QA harness</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
          Skin lab — Neubrutalist × three palettes
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          The same components under <code>data-skin="neubrutalist"</code> in each palette. Unlinked;
          superseded by the Phase 2 theme detail.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {PALETTES.map((p) => (
            <section
              key={p.slug}
              data-skin="neubrutalist"
              data-palette={p.slug}
              className="overflow-hidden rounded-lg border border-border bg-bg text-fg"
            >
              <div className="border-b border-border bg-surface px-5 py-3">
                <span className="font-mono text-xs tracking-wider text-muted uppercase">
                  {p.label}
                </span>
              </div>
              <Panel />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
