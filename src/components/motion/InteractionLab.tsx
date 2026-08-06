import { useState } from "react";
import type { ReactNode } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Dropdown,
  Modal,
  Progress,
  SegmentedControl,
  Switch,
  Tabs,
  Toast,
  Tooltip,
} from "../primitives";
import type { MotionMeta } from "../../motion/types";

/**
 * The section that actually matters. Every one of these primitives already
 * exists — this is composition, not new components — and every one of them is
 * running under the active motion tokens with no per-component wiring, because
 * the token layer overrides Tailwind's transition defaults.
 *
 * Reading a curve tells you what a style is. Pressing a button tells you how it
 * feels, which is the thing you're actually choosing between.
 */

function Bay({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 elev-1">
      <h3 className="text-sm font-semibold text-fg">{title}</h3>
      <p className="mt-0.5 text-xs text-muted">{hint}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

const STAGGER_ITEMS = ["Deploy finished", "New comment", "Build degraded", "Invite accepted"];

export function InteractionLab({ motion }: { motion: MotionMeta }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<number[]>([]);
  const [nextToast, setNextToast] = useState(1);
  const [progress, setProgress] = useState(38);
  const [segment, setSegment] = useState("Day");
  const [listShown, setListShown] = useState(true);

  const pushToast = () => {
    const id = nextToast;
    setNextToast(id + 1);
    setToasts((t) => [...t, id]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x !== id)), 3600);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
        Interaction lab
      </h2>
      <p className="mt-2 max-w-2xl text-muted">
        The real component library, running on {motion.name.toLowerCase()}. Curves
        tell you what a style is; pressing things tells you how it feels.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Bay title="Buttons" hint="Hover for the lift, hold for the press.">
          <div className="flex flex-wrap items-center gap-2">
            <Button className="hover-lift press-scale">Primary</Button>
            <Button variant="outline" className="hover-lift press-scale">
              Outline
            </Button>
            <Button variant="ghost" className="press-scale">
              Ghost
            </Button>
          </div>
        </Bay>

        <Bay title="Switch" hint="The knob travels on the control tier.">
          <div className="flex flex-col gap-3">
            <Switch defaultChecked label="Notifications" />
            <Switch label="Beta features" />
          </div>
        </Bay>

        <Bay title="Segmented control" hint="The active pane slides between options.">
          <SegmentedControl
            options={["Day", "Week", "Month"]}
            value={segment}
            onChange={setSegment}
          />
        </Bay>

        <Bay title="Tabs" hint="Switching panels — watch the label colors cross.">
          <Tabs
            tabs={[
              { label: "Overview", content: <p className="text-sm text-muted">Panel one.</p> },
              { label: "Activity", content: <p className="text-sm text-muted">Panel two.</p> },
              { label: "Settings", content: <p className="text-sm text-muted">Panel three.</p> },
            ]}
          />
        </Bay>

        <Bay title="Accordion" hint="The chevron uses the emphasis curve.">
          <Accordion
            items={[
              { title: "How do tokens work?", content: "Two axes on one wrapper." },
              { title: "Can I mix styles?", content: "Any theme with any motion style." },
            ]}
          />
        </Bay>

        <Bay title="Dropdown" hint="A surface appearing — surface tier.">
          <Dropdown
            label="Actions"
            items={[
              { label: "Duplicate" },
              { label: "Rename" },
              { label: "Delete", danger: true },
            ]}
          />
        </Bay>

        <Bay title="Tooltip" hint="Fastest tier — should feel instantaneous.">
          <Tooltip content="Runs on dur-1">
            <Button variant="outline" size="sm">
              Hover me
            </Button>
          </Tooltip>
        </Bay>

        <Bay title="Overlay" hint="The slowest interactive tier.">
          <Button variant="outline" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
        </Bay>

        <Bay title="Toast" hint="Arrives on the entrance curve.">
          <Button variant="outline" onClick={pushToast}>
            Push a toast
          </Button>
        </Bay>

        <Bay title="Progress" hint="A long move — the scene tier.">
          <div className="space-y-3">
            <Progress value={progress} label={`${progress}%`} />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setProgress(12)}>
                12%
              </Button>
              <Button size="sm" variant="outline" onClick={() => setProgress(64)}>
                64%
              </Button>
              <Button size="sm" variant="outline" onClick={() => setProgress(100)}>
                100%
              </Button>
            </div>
          </div>
        </Bay>

        <Bay title="Card lift" hint="Rises by this style's --lift.">
          <Card className="hover-lift cursor-pointer">
            <CardContent>
              <CardTitle className="text-base">Hover this card</CardTitle>
              <CardDescription>It rises by the token, not a hardcoded 4px.</CardDescription>
            </CardContent>
          </Card>
        </Bay>

        <Bay title="Stagger" hint="Items offset by --stagger.">
          <div className="space-y-2">
            <Button size="sm" variant="outline" onClick={() => setListShown((v) => !v)}>
              {listShown ? "Hide" : "Reveal"} list
            </Button>
            <ul className="space-y-1.5">
              {STAGGER_ITEMS.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-fg"
                  style={{
                    transitionProperty: "opacity, transform",
                    transitionDuration: "var(--dur-3)",
                    transitionTimingFunction: listShown
                      ? "var(--curve-entrance)"
                      : "var(--curve-exit)",
                    // Stagger runs forward on reveal and backward on hide, so
                    // the list unbuilds from the bottom instead of the top.
                    transitionDelay: `calc(var(--stagger) * ${listShown ? i : STAGGER_ITEMS.length - 1 - i})`,
                    opacity: listShown ? 1 : 0,
                    transform: listShown
                      ? "translateX(0)"
                      : "translateX(calc(-1 * var(--travel-md)))",
                  }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Bay>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Overlay tier"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Got it</Button>
          </>
        }
      >
        Overlays get the slowest interactive tier, because they cover what you were
        looking at and the eye needs time to follow.
      </Modal>

      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex w-80 flex-col gap-2">
          {toasts.map((id) => (
            <Toast
              key={id}
              variant="success"
              title={`Toast ${id}`}
              description={`Entered on ${motion.name.toLowerCase()}.`}
              onDismiss={() => setToasts((t) => t.filter((x) => x !== id))}
              className="motion-enter"
            />
          ))}
        </div>
      )}

      <Badge variant="outline" className="mt-6">
        None of these components were modified for this page
      </Badge>
    </section>
  );
}
