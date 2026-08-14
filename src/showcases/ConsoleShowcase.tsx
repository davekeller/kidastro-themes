import { useState } from "react";
import type { ThemeMeta } from "../themes/types";
import {
  Badge,
  Button,
  ChartCard,
  FilterChips,
  SegmentedControl,
  StatTile,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
} from "../components/primitives";
import { Sidebar } from "../components/sections/Sidebar";
import { AppTopBar } from "../components/sections/AppTopBar";
import { TokenPanel } from "../components/sections/TokenPanel";
import { Bolt, Shield, Sparkle, Star } from "../components/icons";

/**
 * Custom showcase for the `console` theme.
 * Layout signature: a real application shell — fixed sidebar rail, top bar
 * with search, a KPI row, charts, and a data table as the primary surface.
 * No hero, no pricing, no marketing flow; this is the page behind the login.
 * It fills the product-shell gap in a library that began with marketing pages.
 */

const groups = [
  {
    items: [
      { label: "Overview", icon: <Sparkle size={15} />, active: true },
      { label: "Deployments", icon: <Bolt size={15} />, badge: "3" },
      { label: "Observability", icon: <Star size={15} /> },
    ],
  },
  {
    label: "Platform",
    items: [
      { label: "Services", icon: <Shield size={15} /> },
      { label: "Data stores", icon: <Shield size={15} /> },
      { label: "Secrets", icon: <Shield size={15} /> },
      { label: "Audit log", icon: <Shield size={15} /> },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Members", icon: <Star size={15} /> },
      { label: "Billing", icon: <Star size={15} /> },
    ],
  },
];

const requests = [24, 31, 28, 42, 38, 51, 47, 63, 58, 71, 66, 82];

const regions = [
  { name: "Chicago", code: "ord", latency: "24ms", load: "68%", width: "68%" },
  { name: "Frankfurt", code: "fra", latency: "41ms", load: "54%", width: "54%" },
  { name: "Singapore", code: "sin", latency: "63ms", load: "39%", width: "39%" },
];

const deployments = [
  { id: "dpl_9f2a", service: "api-gateway", env: "production", status: "Healthy", took: "48s" },
  { id: "dpl_9f28", service: "web", env: "production", status: "Healthy", took: "1m 12s" },
  { id: "dpl_9f21", service: "worker", env: "staging", status: "Degraded", took: "39s" },
  { id: "dpl_9f1c", service: "scheduler", env: "production", status: "Failed", took: "8s" },
  { id: "dpl_9f0e", service: "api-gateway", env: "staging", status: "Healthy", took: "44s" },
];

const statusVariant = {
  Healthy: "success",
  Degraded: "warning",
  Failed: "danger",
} as const;

export function ConsoleShowcase({ theme }: { theme: ThemeMeta }) {
  const [range, setRange] = useState("24h");
  const [envs, setEnvs] = useState<string[]>([]);

  const toggleEnv = (env: string) =>
    setEnvs((prev) => (prev.includes(env) ? prev.filter((e) => e !== env) : [...prev, env]));

  const rows = envs.length
    ? deployments.filter((d) => envs.includes(d.env))
    : deployments;

  return (
    <>
      <div className="flex min-h-[720px]">
        <Sidebar
          title="Northwind"
          groups={groups}
          className="hidden md:flex"
          footer={
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 shrink-0 rounded-full bg-accent" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-xs text-muted">
                dave@kidastro.com
              </span>
            </div>
          }
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppTopBar
            heading={
              <div className="flex items-center gap-2">
                <span>Northwind Cloud</span>
                <span className="text-muted">/</span>
                <span className="font-normal text-muted">Production</span>
              </div>
            }
            actions={
              <>
                <Button variant="outline" size="sm">
                  Invite
                </Button>
                <Button size="sm">New deployment</Button>
              </>
            }
          />

          <div className="flex-1 space-y-5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 elev-1">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-success ring-4 ring-success/15" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-fg">Global edge network</p>
                  <p className="text-xs text-muted">42 points of presence reporting normally</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden font-mono text-xs text-muted sm:inline">updated 42s ago</span>
                <Badge variant="success">Operational</Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-semibold tracking-tight text-fg">
                  Infrastructure overview
                </h1>
                <p className="mt-0.5 text-sm text-muted">
                  Production traffic across 12 services and 3 primary regions.
                </p>
              </div>
              <SegmentedControl
                options={["24h", "7d", "30d"]}
                value={range}
                onChange={setRange}
                size="sm"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatTile label="Requests" value="4.82M" delta="8.1%" trend="up" caption={`last ${range}`} />
              <StatTile label="p50 latency" value="58ms" delta="3.4%" trend="down" caption="lower is better" />
              <StatTile label="Error rate" value="0.04%" delta="0.01%" trend="down" caption={`last ${range}`} />
              <StatTile label="Availability" value="99.99%" delta="0.02%" trend="up" caption="30-day SLO" />
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              <ChartCard
                title="Request volume"
                value="4.82M"
                caption={`Last ${range}`}
                data={requests}
                variant="area"
                seriesClassName="text-primary"
                className="xl:col-span-2"
              />
              <div className="rounded-lg border border-border bg-surface p-4 elev-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-fg">Region health</p>
                    <p className="mt-0.5 text-xs text-muted">Live traffic distribution</p>
                  </div>
                  <Badge variant="outline">3 online</Badge>
                </div>
                <div className="mt-4 space-y-4">
                  {regions.map((region) => (
                    <div key={region.code}>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium text-fg">{region.name}</span>
                        <span className="font-mono text-muted">{region.code}</span>
                        <span className="ml-auto font-mono text-muted">{region.latency}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                          <span className="block h-full rounded-full bg-accent" style={{ width: region.width }} />
                        </span>
                        <span className="w-8 text-right font-mono text-[10px] text-muted">{region.load}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Recent deployments
                </h2>
                <FilterChips
                  options={["production", "staging"]}
                  selected={envs}
                  onToggle={toggleEnv}
                  onClear={() => setEnvs([])}
                />
              </div>

              <Table>
                <THead>
                  <TR>
                    <TH>ID</TH>
                    <TH>Service</TH>
                    <TH>Environment</TH>
                    <TH>Status</TH>
                    <TH>Duration</TH>
                  </TR>
                </THead>
                <TBody>
                  {rows.map((d) => (
                    <TR key={d.id}>
                      <TD>
                        <span className="font-mono text-xs">{d.id}</span>
                      </TD>
                      <TD>{d.service}</TD>
                      <TD>
                        <span className="font-mono text-xs text-muted">{d.env}</span>
                      </TD>
                      <TD>
                        <Badge variant={statusVariant[d.status as keyof typeof statusVariant]}>
                          {d.status}
                        </Badge>
                      </TD>
                      <TD>
                        <span className="font-mono text-xs text-muted">{d.took}</span>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <TokenPanel themeName={theme.name} />
    </>
  );
}
