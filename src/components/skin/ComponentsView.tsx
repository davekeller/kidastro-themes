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
  Textarea,
} from "../primitives";
import { ComponentLab } from "../sections/ComponentLab";
import type { SkinMeta } from "../../skins";

/**
 * The Components view of a skin: the shared primitives under the active
 * skin × palette. Phase 2 seeds it with the primitives sheet that was the /lab
 * harness plus the existing interactive lab; Phase 3 replaces this with the
 * consolidated, documented library page.
 */
export function ComponentsView({ skin }: { skin: SkinMeta }) {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Primitives</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Every control below styles itself from tokens only, so this is {skin.name} in the
          active palette with nothing reskinned by hand. Switch the palette and watch it follow.
        </p>

        <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Variants and sizes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges &amp; switch</CardTitle>
              <CardDescription>Status vocabulary and a toggle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <Switch label="Notifications" defaultChecked />
                <Switch label="Marketing email" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form fields</CardTitle>
              <CardDescription>Input and textarea, with focus rings from the palette.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="you@example.com" />
              <Textarea placeholder="Tell us what you're building…" rows={3} />
            </CardContent>
          </Card>

          <Card className="elev-1">
            <CardHeader>
              <CardTitle>Elevated card</CardTitle>
              <CardDescription>
                The skin&rsquo;s shadow geometry, inked by the palette.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-surface-2 p-3 text-sm text-fg">
                A well on <code className="font-mono text-xs">--surface-2</code>.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <ComponentLab />
    </div>
  );
}
