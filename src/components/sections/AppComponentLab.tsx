import { useState } from "react";
import {
  Button,
  Callout,
  ChartCard,
  CodeBlock,
  FilterChips,
  ListRow,
  SegmentedControl,
  Sheet,
  StatTile,
} from "../primitives";

/**
 * The wave-three showcase — the primitives that app shells, docs sites, and
 * mobile screens are built from (StatTile, ChartCard, FilterChips,
 * SegmentedControl, CodeBlock, Callout, ListRow, Sheet), demoed live under the
 * active theme.
 *
 * Kept separate from ComponentLab rather than bolted onto it: that file was
 * already near 280 lines, and these read as a distinct family.
 */

const revenue = [12, 19, 15, 24, 22, 31, 28, 36, 33, 41, 38, 47];
const sessions = [8, 14, 11, 17, 22, 18, 26, 21, 29, 34, 30, 38];

const tokenSnippet = `[data-theme="minimal"] {
  --bg: #ffffff;
  --fg: #111827;
  --primary: #2563eb;
  --radius: 8px;
}`;

const usageSnippet = `<div data-theme="minimal">
  <Button variant="primary">Ship it</Button>
</div>`;

const facets = ["Dark", "Serif", "Playful", "Grid", "Mono"];

export function AppComponentLab() {
  const [range, setRange] = useState("30d");
  const [selected, setSelected] = useState<string[]>(["Dark"]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl font-bold tracking-tight text-fg">
        App, docs &amp; mobile
      </h2>
      <p className="mt-2 max-w-2xl text-muted">
        The building blocks for dashboards, documentation, and small screens —
        every one of them token-driven.
      </p>

      {/* Dashboard row */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Metrics
        </h3>
        <SegmentedControl
          options={["7d", "30d", "12m"]}
          value={range}
          onChange={setRange}
          size="sm"
        />
      </div>

      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Revenue" value="$48.2k" delta="12.4%" trend="up" caption={`vs. prior ${range}`} />
        <StatTile label="Active teams" value="1,284" delta="3.1%" trend="up" caption="rolling average" />
        <StatTile label="Churn" value="1.8%" delta="0.4%" trend="down" caption="lower is better" />
        <StatTile label="Median latency" value="62ms" delta="0.0%" trend="flat" caption="p50 across regions" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Revenue"
          value="$48.2k"
          caption={`Last ${range}`}
          data={revenue}
          variant="area"
          seriesClassName="text-primary"
        />
        <ChartCard
          title="Sessions"
          value="38.4k"
          caption={`Last ${range}`}
          data={sessions}
          variant="bars"
          seriesClassName="text-accent"
        />
      </div>

      <div className="mt-4">
        <FilterChips
          options={facets}
          selected={selected}
          onToggle={toggle}
          onClear={() => setSelected([])}
        />
      </div>

      {/* Docs + mobile row */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Documentation
          </h3>
          <CodeBlock
            tabs={[
              { label: "tokens.css", code: tokenSnippet },
              { label: "usage.tsx", code: usageSnippet },
            ]}
          />
          <Callout tone="tip">
            Copy a theme&rsquo;s <code className="font-mono text-xs">[data-theme]</code>{" "}
            block and point your AI tools at it — the styling comes along.
          </Callout>
          <Callout tone="warning">
            Never hardcode a hex, font, or radius in a component. Tokens only.
          </Callout>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Lists &amp; sheets
          </h3>
          <div className="relative overflow-hidden rounded-lg border border-border bg-surface elev-1">
            <ListRow label="Account" detail="dave@kidastro.com" chevron />
            <div className="border-t border-border" />
            <ListRow label="Appearance" detail="System" chevron />
            <div className="border-t border-border" />
            <ListRow label="Notifications" trailing="On" chevron />
            <div className="border-t border-border" />
            <ListRow label="Storage" detail="4.2 GB of 10 GB" trailing="42%" />

            {/* Anchored to this panel, not the viewport — Sheet is absolute. */}
            <Sheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              title="Appearance"
              side="bottom"
              footer={
                <Button size="sm" onClick={() => setSheetOpen(false)}>
                  Done
                </Button>
              }
            >
              Choose how the interface looks. System follows your device setting.
            </Sheet>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSheetOpen(true)}>
            Open sheet
          </Button>
        </div>
      </div>
    </section>
  );
}
