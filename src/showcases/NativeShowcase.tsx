import { useState } from "react";
import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import {
  Avatar,
  Badge,
  Button,
  ListRow,
  Progress,
  SegmentedControl,
  Sheet,
  Switch,
} from "../components/primitives";
import { DeviceFrame } from "../components/sections/DeviceFrame";
import { TabBar } from "../components/sections/TabBar";
import { TokenPanel } from "../components/sections/TokenPanel";
import { Bolt, Shield, Sparkle, Star } from "../components/icons";

/**
 * Custom showcase for the `native` theme.
 * Layout signature: the content lives inside phone viewports rather than a
 * page. Grouped list rows on the theme's gray page color, a collapsing large
 * title, a segmented control, a bottom tab bar, and a sheet.
 *
 * Two frames side by side so the theme can show a list screen and a detail
 * screen at once — the honest way to present a mobile design system.
 */

/** iOS-style grouped section: a label above a rounded card of rows. */
function Group({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="px-4 pb-5">
      {label && (
        <div className="px-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
          {label}
        </div>
      )}
      <div className="overflow-hidden rounded-lg bg-surface elev-1">{children}</div>
    </div>
  );
}

const Divider = () => <div className="ml-4 border-t border-border" />;

const tabs = [
  { label: "Today", icon: <Sparkle size={16} />, active: true },
  { label: "Browse", icon: <Star size={16} /> },
  { label: "Activity", icon: <Bolt size={16} />, badge: "2" },
  { label: "Settings", icon: <Shield size={16} /> },
];

export function NativeShowcase({ theme }: { theme: ThemeMeta }) {
  const [scope, setScope] = useState("All");
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="primary">Mobile shell</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-fg">
            Designed for the thumb
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            The same token-driven components, composed at phone scale — grouped
            rows, segmented controls, tab bars, and sheets.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-start justify-center gap-10">
          {/* Screen one — grouped list with a large title */}
          <DeviceFrame>
            <div className="shrink-0 px-4 pb-2 pt-3">
              <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
                Settings
              </h2>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pt-2">
              <Group>
                <div className="flex items-center gap-3 p-4">
                  <Avatar name="Dave Keller" size={44} />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-fg">
                      Dave Keller
                    </div>
                    <div className="truncate text-xs text-muted">
                      dave@kidastro.com
                    </div>
                  </div>
                </div>
              </Group>

              <Group label="Preferences">
                <ListRow label="Appearance" detail="System" chevron onClick={() => setSheetOpen(true)} />
                <Divider />
                {/* Switch is uncontrolled by design in this library — it owns
                    its own state, so the row just hands it a starting value. */}
                <ListRow label="Notifications" trailing={<Switch defaultChecked />} />
                <Divider />
                <ListRow label="Language" detail="English (US)" chevron />
              </Group>

              <Group label="Storage">
                <div className="p-4">
                  <Progress label="4.2 GB of 10 GB" value={42} />
                </div>
                <Divider />
                <ListRow label="Manage storage" chevron />
              </Group>

              <Group label="About">
                <ListRow label="Version" trailing="2.4.0" />
                <Divider />
                <ListRow label="Privacy policy" chevron />
              </Group>
            </div>
            <TabBar items={tabs} className="shrink-0" />

            <Sheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              title="Appearance"
              footer={
                <Button size="sm" onClick={() => setSheetOpen(false)}>
                  Done
                </Button>
              }
            >
              System follows your device setting. Light and Dark override it.
            </Sheet>
          </DeviceFrame>

          {/* Screen two — a feed with a scope picker */}
          <DeviceFrame>
            <div className="shrink-0 space-y-3 px-4 pb-3 pt-3">
              <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
                Activity
              </h2>
              <SegmentedControl
                options={["All", "Mentions", "Mine"]}
                value={scope}
                onChange={setScope}
                size="sm"
                className="w-full"
              />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pt-1">
              <Group>
                <ListRow
                  label="Deploy finished"
                  detail="api-gateway · 48s ago"
                  leading={<Bolt size={16} />}
                  chevron
                />
                <Divider />
                <ListRow
                  label="New comment"
                  detail="Maya on “Token audit”"
                  leading={<Star size={16} />}
                  chevron
                />
                <Divider />
                <ListRow
                  label="Build degraded"
                  detail="worker · staging"
                  leading={<Shield size={16} />}
                  chevron
                />
              </Group>

              <Group label="Earlier">
                {["Invite accepted", "Plan upgraded", "Key rotated", "Report ready"].map(
                  (label, i, all) => (
                    <div key={label}>
                      <ListRow label={label} detail="Yesterday" chevron />
                      {i < all.length - 1 && <Divider />}
                    </div>
                  )
                )}
              </Group>
            </div>
            <TabBar
              items={tabs.map((t) => ({ ...t, active: t.label === "Activity" }))}
              className="shrink-0"
            />
          </DeviceFrame>
        </div>
      </div>

      <TokenPanel themeName={theme.name} />
    </>
  );
}
