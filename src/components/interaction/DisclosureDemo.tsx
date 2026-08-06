import { useState } from "react";
import { useInteraction } from "../../interaction";
import { Button, Card, CardContent, CardDescription, CardTitle, Modal, Sheet } from "../primitives";
import { cn } from "../../lib/cn";

/**
 * One component, four structures. This is the whole argument for the third axis:
 * `disclosure` isn't a value you can interpolate, it's a decision about what to
 * render — so unlike a theme or a motion style, this one has to branch.
 *
 * The trigger and the content are identical in every branch. Only the container
 * changes.
 */

const DETAIL = {
  title: "Deployment dpl_9f2a",
  body: "api-gateway · production · 48s. Built from main at 3f21c9e, promoted automatically after checks passed.",
};

export function DisclosureDemo() {
  const { disclosure } = useInteraction();
  const [open, setOpen] = useState(false);

  const body = (
    <>
      <p className="text-sm leading-relaxed text-muted">{DETAIL.body}</p>
      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button size="sm">Promote</Button>
      </div>
    </>
  );

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-surface p-5 elev-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-fg">Disclosure</h3>
          <p className="mt-0.5 text-xs text-muted">
            This style opens detail{" "}
            <span className="font-mono text-primary">{disclosure}</span>.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          {open && disclosure === "inline" ? "Collapse" : "Open detail"}
        </Button>
      </div>

      {/* Inline — grows in place, nothing covered. */}
      {disclosure === "inline" && (
        <div
          className="grid transition-[grid-template-rows,opacity] dur-3 ease-standard"
          style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
        >
          <div className="overflow-hidden">
            <div className="mt-4 rounded-md border border-border bg-surface-2 p-4">
              <p className="text-sm font-medium text-fg">{DETAIL.title}</p>
              <div className="mt-2">{body}</div>
            </div>
          </div>
        </div>
      )}

      {/* Modal — centered, viewport-fixed. */}
      {disclosure === "modal" && (
        <Modal open={open} onClose={() => setOpen(false)} title={DETAIL.title}>
          {body}
        </Modal>
      )}

      {/* Drawer — slides in from the side, content stays put. */}
      {disclosure === "drawer" && (
        <>
          <div className="mt-4 h-24 rounded-md border border-dashed border-border" />
          <Sheet open={open} onClose={() => setOpen(false)} title={DETAIL.title} side="right">
            {body}
          </Sheet>
        </>
      )}

      {/* Full-screen — takes the whole surface. */}
      {disclosure === "fullscreen" && (
        <>
          <div className="mt-4 h-24 rounded-md border border-dashed border-border" />
          <div
            className={cn(
              "absolute inset-0 z-30 flex flex-col justify-center bg-bg p-6 transition-opacity dur-4 ease-entrance",
              open ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <p className="font-display text-2xl font-bold tracking-tight text-fg">
              {DETAIL.title}
            </p>
            <div className="mt-3 max-w-md">{body}</div>
          </div>
        </>
      )}
    </div>
  );
}
