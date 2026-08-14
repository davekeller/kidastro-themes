import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import { Badge, Button, Progress } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { Check } from "../components/icons";

/**
 * Custom showcase for the `specsheet` theme (ref: Teenage Engineering, SSENSE).
 * Layout signature: information design with zero decoration — a table of
 * contents with dotted leader lines, lettered section IDs, and full-width data
 * tables as the primary layout element. Monospace throughout, no imagery.
 */

/** Row with a dotted leader between label and value — the datasheet tell. */
function LeaderRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 py-1.5 text-sm">
      <span className="shrink-0 text-muted">{label}</span>
      <span
        aria-hidden
        className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-border"
      />
      <span className="shrink-0 tabular-nums">{value}</span>
    </div>
  );
}

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="mb-4 text-sm uppercase tracking-widest">
        <span className="mr-3 text-primary">{id}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** The product faceplate turns the system from a document treatment into a
 * complete hardware skin. Every color still comes from the active tokens. */
function ControlSurface() {
  return (
    <section aria-label="NW-204 control surface" className="border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-sm uppercase tracking-widest">
        <span>NW—204 / front panel</span>
        <span className="text-muted">scale 1:2 · fig. A</span>
      </div>

      <div className="grid gap-4 py-4 lg:grid-cols-[1.1fr_1.9fr]">
        <div className="flex min-h-40 flex-col justify-between border border-border bg-fg p-3 text-bg">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest">
            <span>Pattern 04</span>
            <span className="text-primary">120.0 bpm</span>
          </div>
          <div className="grid grid-cols-8 items-end gap-1">
            {[32, 54, 38, 82, 66, 44, 72, 58].map((height, index) => (
              <span
                key={index}
                className={index === 3 ? "bg-accent" : "bg-primary"}
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-bg/60">
            <span>01:03:22</span>
            <span>REC ARM</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-4 gap-y-5 sm:grid-cols-8">
          {[
            "LEVEL", "PAN", "PITCH", "FILTER", "ATTACK", "DECAY", "SEND", "DRIVE",
          ].map((label, index) => (
            <div key={label} className="text-center">
              <div className="relative mx-auto aspect-square w-full max-w-14 rounded-full border border-border bg-surface-2 elev-1">
                <span
                  className={`absolute left-1/2 top-1 h-[42%] w-px origin-bottom bg-fg ${
                    index % 3 === 0 ? "-rotate-45" : index % 3 === 1 ? "rotate-12" : "rotate-45"
                  }`}
                />
              </div>
              <p className="mt-2 text-[10px] tracking-wide text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-8 gap-1.5 border-t border-border pt-4 sm:grid-cols-16">
        {Array.from({ length: 16 }, (_, index) => (
          <div key={index}>
            <button
              type="button"
              aria-label={`Step ${index + 1}`}
              className={`aspect-square w-full border border-border text-xs tabular-nums ${
                [0, 3, 7, 10, 12].includes(index)
                  ? "bg-primary text-primary-fg"
                  : index === 15
                    ? "bg-accent text-accent-fg"
                    : "bg-surface-2 text-muted"
              }`}
            >
              {index + 1}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SpecSheetShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-2 px-6 py-4 text-sm">
          <span className="font-display text-base uppercase">NW—204</span>
          <span className="text-muted">portable sequencer / 8-track</span>
          <span className="tabular-nums text-muted">rev. 2026.07</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        {/* Title block */}
        <div className="grid gap-6 py-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <Badge variant="outline" className="font-mono uppercase">
              In production
            </Badge>
            <h1 className="mt-4 font-display text-4xl uppercase leading-tight sm:text-5xl">
              NW—204
              <br />
              sequencer
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              Eight tracks, sixteen steps, one knob per function. Built to be
              understood from the panel alone — no menus, no modes, no manual.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="font-mono uppercase">Order — $449</Button>
              <Button variant="outline" className="font-mono uppercase">
                Download spec
              </Button>
            </div>
          </div>

          {/* Table of contents with leaders */}
          <nav className="border border-border bg-surface p-4">
            <p className="mb-2 text-sm uppercase tracking-widest">Contents</p>
            {[
              ["A.1", "Overview", "01"],
              ["A.2", "Specifications", "02"],
              ["A.3", "I/O", "03"],
              ["A.4", "Power", "04"],
              ["A.5", "Compliance", "05"],
            ].map(([id, label, page]) => (
              <LeaderRow key={id} label={`${id}  ${label}`} value={page} />
            ))}
          </nav>
        </div>

        <ControlSurface />

        <Block id="A.1" title="Overview">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              {[
                ["Tracks", "8"],
                ["Steps per pattern", "16"],
                ["Patterns", "128"],
                ["Resolution", "24 ppqn"],
                ["Swing range", "50–75%"],
              ].map(([k, v]) => (
                <LeaderRow key={k} label={k} value={v} />
              ))}
            </div>
            <div>
              {[
                ["Sample rate", "48 kHz"],
                ["Bit depth", "24-bit"],
                ["Latency", "1.4 ms"],
                ["Storage", "4 GB"],
                ["Firmware", "2.4.1"],
              ].map(([k, v]) => (
                <LeaderRow key={k} label={k} value={v} />
              ))}
            </div>
          </div>
        </Block>

        <Block id="A.2" title="Specifications">
          {/* Full-width data table as the layout element */}
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-2">
                <tr className="text-left uppercase tracking-widest">
                  <th className="border-b border-border px-3 py-2 font-normal">Ref</th>
                  <th className="border-b border-border px-3 py-2 font-normal">
                    Parameter
                  </th>
                  <th className="border-b border-border px-3 py-2 font-normal">Min</th>
                  <th className="border-b border-border px-3 py-2 font-normal">Typ</th>
                  <th className="border-b border-border px-3 py-2 font-normal">Max</th>
                  <th className="border-b border-border px-3 py-2 font-normal">Unit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1.01", "Supply voltage", "4.5", "5.0", "5.5", "V"],
                  ["1.02", "Current draw", "180", "240", "420", "mA"],
                  ["1.03", "Output level", "—", "+4", "+8", "dBu"],
                  ["1.04", "THD+N", "—", "0.003", "0.01", "%"],
                  ["1.05", "Operating temp", "-10", "20", "45", "°C"],
                  ["1.06", "Clock jitter", "—", "0.8", "2.0", "µs"],
                ].map((row) => (
                  <tr key={row[0]} className="odd:bg-surface even:bg-surface-2/40">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={
                          i === 0
                            ? "border-b border-border px-3 py-2 tabular-nums text-primary"
                            : "border-b border-border px-3 py-2 tabular-nums"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block id="A.3" title="Input / output">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-1">
              {[
                ["1 × 3.5 mm", "sync in"],
                ["1 × 3.5 mm", "sync out"],
                ["2 × 6.35 mm", "line out L/R"],
                ["1 × 3.5 mm", "headphone"],
                ["1 × USB-C", "data + power"],
              ].map(([port, fn]) => (
                <div key={fn} className="flex gap-3 text-sm">
                  <span className="w-28 shrink-0 tabular-nums">{port}</span>
                  <span className="text-muted">{fn}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="mb-3 text-sm uppercase tracking-widest text-muted">
                Panel test
              </p>
              <Progress label="Burn-in cycle" value={88} />
              <div className="mt-4 space-y-1.5">
                {["Calibration", "Firmware flash", "Audio path", "Enclosure"].map(
                  (s) => (
                    <div key={s} className="flex items-center gap-2 text-sm">
                      <Check size={12} className="text-success" />
                      <span className="text-muted">{s}</span>
                      <span className="ml-auto tabular-nums">pass</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Block>

        <Block id="A.4" title="Power">
          <div className="grid gap-x-8 md:grid-cols-2">
            {[
              ["Input", "USB-C, 5 V ⎯ 2 A"],
              ["Battery", "4 × AA, NiMH"],
              ["Runtime", "6 h 20 m"],
              ["Charge time", "2 h 45 m"],
              ["Standby draw", "12 mA"],
              ["Auto-off", "20 min"],
            ].map(([k, v]) => (
              <LeaderRow key={k} label={k} value={v} />
            ))}
          </div>
        </Block>

        <Block id="A.5" title="Compliance">
          <div className="flex flex-wrap gap-2">
            {["CE", "FCC Part 15B", "RoHS", "WEEE", "UKCA", "IP42"].map((c) => (
              <span
                key={c}
                className="border border-border px-2 py-1 text-sm uppercase tracking-widest text-muted"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            Tested to EN 55032:2015 and EN 55035:2017. Declaration of conformity
            available on request. Specifications subject to change without notice
            — see rev. header for document currency.
          </p>
        </Block>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-6 py-6 text-sm text-muted">
          <span>NORTHWIND INSTRUMENTS</span>
          <span>DOC. NW-204-DS / {theme.name}</span>
          <span className="tabular-nums">PAGE 1 / 1</span>
        </div>
      </footer>
    </>
  );
}
