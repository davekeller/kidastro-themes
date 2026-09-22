import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Tone = "note" | "tip" | "warning" | "danger";

/* Tinted with token/opacity mixes rather than fixed washes, so a callout sits
   correctly on a paper palette and a near-black one without retuning. The tone
   colors the edge, the tint, and the glyph — never the text. The glyph is the
   tone's fill with its -fg, the title is --fg, so every tone reads in every
   palette (a pale primary makes a fine fill and an unreadable heading). */
const tones: Record<Tone, { wrap: string; mark: string; label: string }> = {
  note: { wrap: "border-border bg-surface-2/50", mark: "border border-current text-muted", label: "Note" },
  tip: { wrap: "border-primary/35 bg-primary/8", mark: "bg-primary text-primary-fg", label: "Tip" },
  warning: { wrap: "border-warning/40 bg-warning/10", mark: "bg-warning text-warning-fg", label: "Warning" },
  danger: { wrap: "border-danger/40 bg-danger/10", mark: "bg-danger text-danger-fg", label: "Careful" },
};

const glyphs: Record<Tone, string> = {
  note: "i",
  tip: "✦",
  warning: "!",
  danger: "×",
};

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  /** Overrides the tone's default label. Pass "" to hide it. */
  title?: string;
  children: ReactNode;
}

/** Docs admonition — note / tip / warning / danger. */
export function Callout({
  tone = "note",
  title,
  children,
  className,
  ...props
}: CalloutProps) {
  const t = tones[tone];
  const heading = title === undefined ? t.label : title;

  return (
    <div
      className={cn("flex gap-3 rounded-lg border p-4", t.wrap, className)}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold",
          t.mark
        )}
      >
        {glyphs[tone]}
      </span>
      <div className="min-w-0">
        {heading && <div className="text-sm font-semibold text-fg">{heading}</div>}
        <div className={cn("text-sm leading-relaxed text-muted", heading && "mt-1")}>
          {children}
        </div>
      </div>
    </div>
  );
}
