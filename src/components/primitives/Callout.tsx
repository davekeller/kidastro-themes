import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Tone = "note" | "tip" | "warning" | "danger";

/* Tinted with token/opacity mixes rather than fixed washes, so a callout sits
   correctly on a paper theme and a near-black one without retuning. */
const tones: Record<Tone, { wrap: string; mark: string; label: string }> = {
  note: { wrap: "border-border bg-surface-2/50", mark: "text-muted", label: "Note" },
  tip: { wrap: "border-primary/35 bg-primary/8", mark: "text-primary", label: "Tip" },
  warning: { wrap: "border-warning/40 bg-warning/10", mark: "text-warning", label: "Warning" },
  danger: { wrap: "border-danger/40 bg-danger/10", mark: "text-danger", label: "Careful" },
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
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current font-mono text-[11px] font-bold",
          t.mark
        )}
      >
        {glyphs[tone]}
      </span>
      <div className="min-w-0">
        {heading && (
          <div className={cn("text-sm font-semibold", t.mark)}>{heading}</div>
        )}
        <div className={cn("text-sm leading-relaxed text-muted", heading && "mt-1")}>
          {children}
        </div>
      </div>
    </div>
  );
}
