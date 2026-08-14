import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import { Button, Input } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight } from "../components/icons";

/**
 * Custom showcase for the `swiss` theme (ref: Swissted / Readymag showcases).
 * Layout signature: an exposed 12-column grid with visible rules, numbered
 * sections, huge flush-left headlines, and hierarchy built purely from type
 * scale and rule weight — deliberately no cards, no shadows, no radius.
 */

function Section({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-border py-12 md:grid-cols-12">
      <div className="md:col-span-3">
        <p className="text-sm font-medium tabular-nums">
          <span className="text-primary">{num}</span>
          <span className="ml-3 uppercase tracking-widest">{label}</span>
        </p>
      </div>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

export function SwissShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      {/* Masthead — rules, no chrome */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-4">
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">
            Northwind
          </span>
          <nav className="hidden gap-8 text-sm uppercase tracking-widest md:flex">
            {["Work", "Studio", "Index", "Contact"].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-primary">
                {l}
              </a>
            ))}
          </nav>
          <span className="text-sm tabular-nums text-muted">2026</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* Flush-left headline, type doing all the work */}
        <div className="grid gap-6 py-16 md:grid-cols-12">
          <div className="md:col-span-9">
            <h1 className="text-[13vw] font-medium leading-[0.86] tracking-[-0.03em] md:text-[9vw]">
              Form
              <br />
              follows
              <br />
              <span className="text-primary">function</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end md:col-span-3">
            <p className="text-sm leading-relaxed">
              A design practice working in identity, editorial, and interface
              systems. Established Zürich, 1998.
            </p>
            <p className="mt-4 text-sm text-muted">
              Selected work, 2019—2026
              <br />
              Twelve clients, four continents
            </p>
          </div>
        </div>

        {/* Column-rule grid — the exposed structure. Stays four-up at every
            width so the vertical rules always read as column dividers. */}
        <div className="grid grid-cols-4 border-t border-border">
          {[
            ["01", "Identity"],
            ["02", "Editorial"],
            ["03", "Interface"],
            ["04", "Signage"],
          ].map(([n, label], i) => (
            <div
              key={label}
              className={
                i === 0
                  ? "py-6 pr-3 md:pr-6"
                  : "border-l border-border px-3 py-6 md:px-6"
              }
            >
              <p className="text-sm tabular-nums text-primary">{n}</p>
              <p className="mt-2 font-medium tracking-tight md:text-lg">{label}</p>
            </div>
          ))}
        </div>

        <Section num="05" label="Selected systems">
          <div className="grid border border-border md:grid-cols-3">
            {[
              { code: "KB", client: "Kunsthalle Basel", field: "Identity", tone: "primary" },
              { code: "MR", client: "Meridian Rail", field: "Wayfinding", tone: "ink" },
              { code: "VN", client: "Verlag Nord", field: "Editorial", tone: "paper" },
            ].map((project, index) => (
              <div
                key={project.code}
                className={`flex min-h-64 flex-col justify-between p-5 ${
                  index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""
                } ${
                  project.tone === "primary"
                    ? "bg-primary text-primary-fg"
                    : project.tone === "ink"
                      ? "bg-fg text-bg"
                      : "bg-surface-2 text-fg"
                }`}
              >
                <div className="flex items-start justify-between text-sm tabular-nums">
                  <span>0{index + 1}</span>
                  <span>202{6 - index}</span>
                </div>
                <p className="font-display text-6xl font-semibold leading-none tracking-[-0.05em]">
                  {project.code}
                </p>
                <div className="border-t border-current pt-3 text-sm">
                  <p className="font-medium">{project.client}</p>
                  <p className="mt-1 opacity-70">{project.field}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section num="06" label="Principle">
          <p className="max-w-2xl text-2xl leading-snug tracking-tight">
            Every element on this page is positioned by the grid and sized by the
            scale. Nothing floats, nothing casts a shadow, and no corner is
            rounded — the theme's radius and elevation tokens are set to zero and
            none, so the shared components simply comply.
          </p>
        </Section>

        <Section num="07" label="Type scale">
          <div className="space-y-3">
            {[
              ["72 / 62", "text-6xl", "Grotesk"],
              ["48 / 44", "text-4xl", "Grotesk"],
              ["32 / 34", "text-3xl", "Grotesk"],
              ["20 / 28", "text-xl", "Grotesk"],
              ["14 / 22", "text-sm", "Grotesk"],
            ].map(([spec, cls, name]) => (
              <div
                key={spec}
                className="flex items-baseline gap-6 border-b border-border pb-3"
              >
                <span className="w-20 shrink-0 text-sm tabular-nums text-muted">
                  {spec}
                </span>
                <span className={`${cls} font-medium tracking-tight`}>{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section num="08" label="Index of work">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left uppercase tracking-widest">
                <th className="py-2 font-medium">No.</th>
                <th className="py-2 font-medium">Client</th>
                <th className="py-2 font-medium">Discipline</th>
                <th className="py-2 text-right font-medium">Year</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["001", "Kunsthalle Basel", "Identity, signage", "2026"],
                ["002", "Verlag Nord", "Editorial system", "2025"],
                ["003", "Meridian Rail", "Wayfinding", "2024"],
                ["004", "Halide Labs", "Interface", "2023"],
                ["005", "Atelier Föhn", "Identity", "2021"],
              ].map(([n, client, disc, year]) => (
                <tr key={n} className="border-b border-border">
                  <td className="py-3 tabular-nums text-muted">{n}</td>
                  <td className="py-3 font-medium">{client}</td>
                  <td className="py-3 text-muted">{disc}</td>
                  <td className="py-3 text-right tabular-nums">{year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section num="09" label="Enquiries">
          <div className="grid gap-6 md:grid-cols-2">
            <p className="text-lg leading-relaxed">
              New projects are reviewed quarterly. Send a brief outline and
              timeline; we reply to everything.
            </p>
            <div className="flex gap-2">
              <Input placeholder="name@studio.com" />
              <Button className="shrink-0">
                Send <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <TokenPanel themeName={theme.name} />

      {/* Footnote-style colophon */}
      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 text-sm md:grid-cols-12">
          <p className="text-muted md:col-span-3">Northwind, Zürich</p>
          <p className="text-muted md:col-span-6">
            Set in Familjen Grotesk. Grid: 12 columns, 24px gutter.
          </p>
          <p className="text-muted md:col-span-3 md:text-right">
            {theme.name} — tokens only
          </p>
        </div>
      </footer>
    </>
  );
}
