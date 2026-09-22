import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useResolvedTokens } from "../../lib/skin-state";
import { paletteTokenNames } from "../../lib/tokens";
import { PALETTE_SLUGS, type PaletteMeta, type SkinMeta } from "../../skins";
import { Button } from "../primitives";

/* The brand sheet for a skin: type, color, shape, motion, and the rules that
 * keep it recognizable. Everything shown is read back off the live tokens on
 * <body>, so the sheet is a description of what the skin actually resolves to,
 * not a second copy of the numbers. Ported from daves-demos; its literal font
 * list went, because a skin's faces are tokens and the sheet should say so. */

const FACES = ["--font-display", "--font-sans", "--font-serif", "--font-mono"] as const;
const SHAPE = ["--radius", "--elev-1", "--elev-2", "--shadow-ink"] as const;
const MOTION = [
  "--curve-standard",
  "--curve-entrance",
  "--curve-exit",
  "--dur-1",
  "--dur-2",
  "--dur-3",
  "--dur-4",
  "--dur-5",
  "--lift",
  "--press",
] as const;

/** `"Outfit", system-ui, sans-serif` → `Outfit` */
function familyName(stack: string) {
  return stack.split(",")[0]?.replace(/["']/g, "").trim() || "—";
}

/* Plot area: x 0→100, y 90 (progress 0) → 30 (progress 1), so overshoot and
 * anticipation have room inside viewBox 0 -16 100 136. */
function curvePath(spec: string): string {
  if (spec === "linear") return "M0,90 L100,30";
  const steps = spec.match(/^steps\((\d+)/);
  if (steps) {
    const n = Number(steps[1]);
    let d = "M0,90";
    for (let i = 1; i <= n; i++) {
      d += ` H${((i * 100) / n).toFixed(1)} V${(90 - (i * 60) / n).toFixed(1)}`;
    }
    return d;
  }
  const m = spec.match(/cubic-bezier\(([^)]+)\)/);
  if (!m) return "M0,90 L100,30";
  const [x1, y1, x2, y2] = m[1].split(",").map(Number);
  return `M0,90 C${(x1 * 100).toFixed(1)},${(90 - y1 * 60).toFixed(1)} ${(x2 * 100).toFixed(1)},${(90 - y2 * 60).toFixed(1)} 100,30`;
}

function CurvePlot({ standard, entrance, exit }: { standard: string; entrance: string; exit: string }) {
  return (
    <svg viewBox="0 -16 100 136" className="h-28 w-full" aria-hidden preserveAspectRatio="none">
      <line x1="0" y1="90" x2="100" y2="90" className="stroke-fg/15" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="0" y1="30" x2="100" y2="30" className="stroke-fg/15" strokeWidth="1" strokeDasharray="2 3" />
      <path d={curvePath(exit)} className="stroke-fg/30" strokeWidth="1.5" fill="none" />
      <path d={curvePath(entrance)} className="stroke-accent" strokeWidth="1.5" fill="none" />
      <path d={curvePath(standard)} className="stroke-primary" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Section({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface elev-1", className)}>{children}</div>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[11px] text-muted">{children}</span>;
}

export function StyleGuideView({ skin, palette }: { skin: SkinMeta; palette: PaletteMeta }) {
  const faces = useResolvedTokens(FACES);
  const colors = useResolvedTokens(paletteTokenNames);
  const shape = useResolvedTokens(SHAPE);
  const motion = useResolvedTokens(MOTION);
  const [playKey, setPlayKey] = useState(0);

  const colorNames = paletteTokenNames.filter((n) => n !== "--shadow-ink");

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      {/* ---------------- Type ---------------- */}
      <Section title="Type">
        <Panel className="p-6">
          <p className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            One skin, three palettes, no reskinning.
          </p>
          <p className="mt-2 font-display text-xl text-muted">
            ABCDEFGHIJKLM abcdefghijklm 0123456789 &amp;?!
          </p>
          <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
            <div>
              <p className="max-w-prose text-sm leading-6">
                Body copy sits on the skin&rsquo;s sans: readable, unshowy, set by{" "}
                <code className="font-mono text-xs">--font-sans</code> like everything else here.
              </p>
              <p className="mt-2 font-serif text-lg">
                The serif carries pull quotes and anything that wants a little ceremony.
              </p>
              <p className="mt-2 font-mono text-sm">const tokens = "all the way down";</p>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 self-start text-sm">
              {FACES.map((f) => (
                <div key={f} className="contents">
                  <dt>
                    <Mono>{f}</Mono>
                  </dt>
                  <dd className="text-fg">{familyName(faces[f])}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>
      </Section>

      {/* ---------------- Color ---------------- */}
      <Section
        title="Color"
        aside={
          <Mono>
            active: {palette.slug} · {palette.label}
          </Mono>
        }
      >
        <Panel className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2.5">
                  <Mono>palette</Mono>
                </th>
                {colorNames.map((n) => (
                  <th key={n} className="px-1 py-2.5 text-center">
                    <Mono>{n.slice(2)}</Mono>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PALETTE_SLUGS.map((slug) => {
                const meta = skin.palettes.find((p) => p.slug === slug);
                const active = slug === palette.slug;
                return (
                  <tr
                    key={slug}
                    data-skin={skin.slug}
                    data-palette={slug}
                    className={cn("border-b border-border last:border-b-0", active && "bg-surface-2")}
                  >
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span className="capitalize">{slug}</span>
                      <span className="text-muted"> · {meta?.label}</span>
                    </td>
                    {colorNames.map((n) => (
                      <td key={n} className="px-1 py-3">
                        <span
                          aria-hidden
                          className="mx-auto block h-9 w-full rounded-md border border-border"
                          style={{ backgroundColor: `var(${n})` }}
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border px-4 py-3">
            {paletteTokenNames.map((n) => (
              <Mono key={n}>
                {n}: {colors[n]}
              </Mono>
            ))}
          </div>
        </Panel>
      </Section>

      {/* ---------------- Shape & elevation ---------------- */}
      <Section title="Shape & elevation">
        <div className="grid gap-4 sm:grid-cols-2">
          <Panel className="p-5">
            <div className="grid grid-cols-4 gap-3">
              {(["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl"] as const).map((r) => (
                <div key={r} className="text-center">
                  <div className={cn("h-12 w-full border border-border bg-surface-2", r)} />
                  <div className="mt-1.5">
                    <Mono>{r.slice(8)}</Mono>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4">
              <Mono>--radius: {shape["--radius"]}</Mono>
            </p>
          </Panel>
          <Panel className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-surface p-4 text-sm elev-1">elev-1</div>
              <div className="rounded-lg border border-border bg-surface p-4 text-sm elev-2">elev-2</div>
            </div>
            <div className="mt-4 space-y-1">
              <p>
                <Mono>--elev-1: {shape["--elev-1"]}</Mono>
              </p>
              <p>
                <Mono>--shadow-ink: {shape["--shadow-ink"]}</Mono>
              </p>
            </div>
          </Panel>
        </div>
      </Section>

      {/* ---------------- Motion ---------------- */}
      <Section
        title="Motion"
        aside={
          <span className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-muted uppercase">
            <span className="flex items-center gap-1">
              <span aria-hidden className="h-0.5 w-4 rounded-full bg-primary" /> standard
            </span>
            <span className="flex items-center gap-1">
              <span aria-hidden className="h-0.5 w-4 rounded-full bg-accent" /> entrance
            </span>
            <span className="flex items-center gap-1">
              <span aria-hidden className="h-0.5 w-4 rounded-full bg-fg/30" /> exit
            </span>
          </span>
        }
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel className="p-5">
            <CurvePlot
              standard={motion["--curve-standard"]}
              entrance={motion["--curve-entrance"]}
              exit={motion["--curve-exit"]}
            />
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {(["--dur-1", "--dur-2", "--dur-3", "--dur-4", "--dur-5"] as const).map((d) => (
                <Mono key={d}>
                  {d.slice(2)} {motion[d]}
                </Mono>
              ))}
              <Mono>lift {motion["--lift"]}</Mono>
              <Mono>press {motion["--press"]}</Mono>
            </div>
            <p className="mt-3 max-w-prose text-sm leading-6 text-muted">
              Motion ships with the skin. Every plain <code className="font-mono text-xs">transition-*</code>{" "}
              resolves through these curves, so the components move like {skin.name} without
              being told to.
            </p>
          </Panel>
          <Panel className="grid gap-4 p-5 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Button onClick={() => setPlayKey((k) => k + 1)}>Play entrance</Button>
              <span className="hover-lift press-scale inline-flex cursor-pointer items-center justify-center rounded-md border border-border bg-surface-2 px-4 py-2 text-sm select-none">
                Hover me, press me
              </span>
            </div>
            <div className="grid h-40 place-items-center overflow-hidden rounded-lg border border-border bg-surface-2">
              <div key={playKey} className="motion-enter w-40 rounded-lg border border-border bg-surface p-3 elev-2">
                <span aria-hidden className="flex items-center gap-1.5">
                  <span className="block h-2 w-6 rounded-full bg-accent" />
                  <span className="block h-2 w-1/2 rounded-full bg-fg/45" />
                </span>
                <span aria-hidden className="mt-2 block h-1.5 rounded-full bg-fg/30" />
                <span aria-hidden className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-fg/30" />
                <span className="mt-3 inline-block rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-fg">
                  Enter
                </span>
              </div>
            </div>
          </Panel>
        </div>
      </Section>

      {/* ---------------- Rules ---------------- */}
      <Section title="Rules">
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel className="p-5">
            <h3 className="font-mono text-xs tracking-widest text-muted uppercase">Best for</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {skin.bestFor.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-5">
            <h3 className="font-mono text-xs tracking-widest text-muted uppercase">Do</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {skin.rules.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-5">
            <h3 className="font-mono text-xs tracking-widest text-muted uppercase">Avoid</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {skin.avoid.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Panel>
        </div>
      </Section>
    </div>
  );
}
