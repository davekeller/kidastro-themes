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
 * The first 23 themes are all one-pagers, which is exactly the gap this fills.
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
const latency = [61, 58, 64, 59, 55, 62, 57, 54, 60, 56, 52, 58];

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
            heading="Overview"
            actions={
              <>
                <Button variant="outline" size="sm">
                  Invite
                </Button>
                <Button size="sm">New deployment</Button>
              </>
            }
          />

          <div className="flex-1 space-y-6 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-xl font-semibold tracking-tight text-fg">
                  All systems operational
                </h1>
                <p className="mt-0.5 text-sm text-muted">
                  12 services across 3 regions.
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
              <StatTile label="Build minutes" value="1,204" delta="0.0%" trend="flat" caption="of 5,000" />
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <ChartCard
                title="Requests"
                value="4.82M"
                caption={`Last ${range}`}
                data={requests}
                variant="area"
                seriesClassName="text-primary"
              />
              <ChartCard
                title="p50 latency"
                value="58ms"
                caption={`Last ${range}`}
                data={latency}
                variant="bars"
                seriesClassName="text-accent"
              />
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
