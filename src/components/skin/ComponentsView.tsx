import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { SkinMeta } from "../../skins";
import { ArrowRight, Bolt, Check, Info, Shield, Sparkle, Star } from "../icons";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  buttonClasses,
  Callout,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartCard,
  CodeBlock,
  Dropdown,
  EmptyState,
  FilterChips,
  Input,
  Label,
  ListRow,
  Modal,
  Pagination,
  Progress,
  SegmentedControl,
  Select,
  Sheet,
  Skeleton,
  StatTile,
  StatusPill,
  Switch,
  Table,
  Tabs,
  TBody,
  TD,
  Textarea,
  TH,
  THead,
  Toast,
  Tooltip,
  TR,
} from "../primitives";
import { AppTopBar } from "../sections/AppTopBar";
import { CTA } from "../sections/CTA";
import { DeviceFrame } from "../sections/DeviceFrame";
import { DocsNav } from "../sections/DocsNav";
import { Features } from "../sections/Features";
import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { Hero } from "../sections/Hero";
import { PageHeader } from "../sections/PageHeader";
import { Pricing } from "../sections/Pricing";
import { Sidebar } from "../sections/Sidebar";
import { Stats } from "../sections/Stats";
import { TabBar } from "../sections/TabBar";
import { Testimonial } from "../sections/Testimonial";
import { TOC } from "../sections/TOC";

/**
 * The Components view of a skin: the whole shared library as a documented
 * catalogue, rendered under the active skin × palette. Nothing here is styled
 * for a particular skin — every entry is the real component naming tokens —
 * which is what makes this page the place "legible in all three palettes" gets
 * checked. Add a component to the library, add it to GROUPS below.
 */

/* ------------------------------------------------------------ live demos */

function SegmentedDemo() {
  const [range, setRange] = useState("Week");
  return (
    <div className="space-y-3">
      <SegmentedControl
        aria-label="Range"
        options={["Day", "Week", "Month"]}
        value={range}
        onChange={setRange}
      />
      <p className="text-sm text-muted">Showing the last {range.toLowerCase()}.</p>
    </div>
  );
}

const TEAMS = ["Design", "Engineering", "Research", "Ops"];

function FilterChipsDemo() {
  const [selected, setSelected] = useState<string[]>(["Design"]);
  return (
    <FilterChips
      options={TEAMS}
      selected={selected}
      onToggle={(t) =>
        setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))
      }
      onClear={() => setSelected([])}
    />
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  // Stable, so Modal's Escape listener isn't torn down on every render.
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={close}
        title="Archive this project?"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button variant="danger" onClick={close}>
              Archive
            </Button>
          </>
        }
      >
        Archived projects leave the sidebar but keep their history. Restore one any time
        from Settings.
      </Modal>
    </>
  );
}

function SheetDemo() {
  const [side, setSide] = useState<"bottom" | "right" | null>(null);
  const close = useCallback(() => setSide(null), []);
  return (
    <div className="relative h-72 overflow-hidden rounded-md border border-border bg-surface">
      <div className="space-y-3 p-4">
        <p className="text-sm font-medium text-fg">Northwind / Files</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setSide("bottom")}>
            Bottom sheet
          </Button>
          <Button size="sm" variant="outline" onClick={() => setSide("right")}>
            Side sheet
          </Button>
        </div>
        <div className="space-y-2 pt-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
      <Sheet
        open={side !== null}
        onClose={close}
        side={side ?? "bottom"}
        title={side === "right" ? "Filters" : "Share file"}
        footer={
          <Button size="sm" onClick={close}>
            Done
          </Button>
        }
      >
        {side === "right" ? (
          <div className="space-y-3">
            <Switch label="Only mine" defaultChecked />
            <Switch label="Include archived" />
          </div>
        ) : (
          "Anyone with the link can view it. Only editors can change it."
        )}
      </Sheet>
    </div>
  );
}

function ToastDemo() {
  const [toasts, setToasts] = useState<number[]>([]);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);

  // The array is mutated in place, so the reference captured here is the one
  // holding every timer by the time the cleanup runs.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const dismiss = (id: number) => setToasts((list) => list.filter((t) => t !== id));
  const push = () => {
    const id = nextId.current++;
    setToasts((list) => [...list, id]);
    timers.current.push(window.setTimeout(() => dismiss(id), 4000));
  };

  return (
    <div className="space-y-4">
      <Toast variant="success" title="Saved" description="Your changes are live." />
      <Button variant="secondary" onClick={push}>
        Show a live toast
      </Button>
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 ml-auto flex max-w-sm flex-col gap-2"
      >
        {toasts.map((id) => (
          <Toast
            key={id}
            className="motion-enter"
            variant="info"
            title="Heads up"
            description="Live toasts stack here and leave on their own."
            onDismiss={() => dismiss(id)}
          />
        ))}
      </div>
    </div>
  );
}

const SIDEBAR_GROUPS = [
  {
    items: [
      { label: "Overview", icon: <Bolt size={16} />, active: true },
      { label: "Projects", icon: <Star size={16} />, badge: "12" },
      { label: "Reports", icon: <Check size={16} /> },
    ],
  },
  {
    label: "Team",
    items: [
      { label: "Members", icon: <Shield size={16} /> },
      { label: "Billing", icon: <Sparkle size={16} /> },
    ],
  },
];

function AppShellDemo() {
  return (
    <div className="flex h-96">
      {/* The rail needs md+ to sit beside a usable page; below that it hides. */}
      <div className="hidden md:block">
        <Sidebar
          title="Northwind"
          groups={SIDEBAR_GROUPS}
          className="h-full"
          footer={
            <div className="flex items-center gap-2">
              <Avatar name="Ava Reyes" size={28} />
              <span className="truncate text-sm text-fg">Ava Reyes</span>
            </div>
          }
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar heading="Overview" actions={<Button size="sm">New project</Button>} />
        <div className="grid flex-1 content-start gap-3 overflow-hidden p-4 lg:grid-cols-2">
          <StatTile label="Revenue" value="$48.2k" delta="12.4%" trend="up" caption="vs. last month" />
          <StatTile label="Seats" value="1,204" caption="across 38 teams" />
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { label: "Home", icon: <Bolt size={18} />, active: true },
  { label: "Search", icon: <Sparkle size={18} /> },
  { label: "Inbox", icon: <Info size={18} />, badge: "3" },
  { label: "You", icon: <Star size={18} /> },
];

function MobileShellDemo() {
  return (
    <DeviceFrame>
      <div className="px-5 pt-3 pb-3">
        <p className="font-display text-2xl font-bold tracking-tight text-fg">Inbox</p>
        <p className="text-xs text-muted">3 unread</p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="divide-y divide-border border-y border-border bg-surface">
          <ListRow
            leading={<Avatar name="Ava Reyes" size={32} />}
            label="Ava Reyes"
            detail="The dark palette landed"
            trailing="9:12"
          />
          <ListRow
            leading={<Avatar name="Marcus Lee" size={32} />}
            label="Marcus Lee"
            detail="Pricing copy, round two"
            trailing="8:40"
          />
          <ListRow
            leading={<Avatar name="Priya Shah" size={32} />}
            label="Priya Shah"
            detail="Can we ship Friday?"
            trailing="Mon"
          />
          <ListRow label="Archive" detail="42 conversations" chevron />
        </div>
      </div>
      <TabBar items={TABS} />
    </DeviceFrame>
  );
}

/* --------------------------------------------------------------- content */

const INVOICES = [
  { id: "INV-0041", customer: "Northwind", amount: "$1,250.00", status: "Paid" },
  { id: "INV-0042", customer: "Acme Corp", amount: "$864.50", status: "Pending" },
  { id: "INV-0043", customer: "Globex", amount: "$2,310.00", status: "Paid" },
  { id: "INV-0044", customer: "Initech", amount: "$430.25", status: "Overdue" },
] as const;

const INVOICE_STATUS = { Paid: "success", Pending: "warning", Overdue: "danger" } as const;

const CODE_TSX = `// The page wears one skin × palette; nothing below restyles itself.
<main data-skin="neubrutalist" data-palette="dark">
  <Card>
    <CardHeader>
      <CardTitle>Northwind</CardTitle>
    </CardHeader>
    <CardFooter>
      <Button variant="accent">Open</Button>
    </CardFooter>
  </Card>
</main>`;

const CODE_CSS = `/* A component never names a color — only a role. */
.card {
  background: var(--surface);
  color: var(--fg);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--elev-1);
}`;

interface Entry {
  id: string;
  name: string;
  /** Where it lives, from src/components. */
  file: string;
  about: string;
  demo: ReactNode;
  /** Spans both columns of its group. */
  wide?: boolean;
  /** A full-width section: rendered edge to edge in a clipped frame instead of
   *  on a padded stage. */
  bleed?: boolean;
}

interface Group {
  id: string;
  title: string;
  blurb: string;
  entries: Entry[];
}

const GROUPS: Group[] = [
  {
    id: "actions",
    title: "Actions",
    blurb: "Things you press. A filled control sets its label in the fill's own -fg.",
    entries: [
      {
        id: "button",
        name: "Button",
        file: "primitives/Button.tsx",
        about:
          "Six variants in three sizes. buttonClasses() puts the same look on anything that can't be a <button>, like a router link.",
        wide: true,
        demo: (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button>Primary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button>Medium</Button>
              <Button size="lg">
                Large <ArrowRight size={18} />
              </Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
              <a href="#button" className={buttonClasses("outline", "sm")}>
                A link, dressed as a button
              </a>
            </div>
          </div>
        ),
      },
      {
        id: "dropdown",
        name: "Dropdown",
        file: "primitives/Dropdown.tsx",
        about:
          "A menu button. It closes on an outside click or Escape; a destructive item is set in --danger.",
        demo: (
          <Dropdown
            label="Actions"
            items={[
              { label: "Duplicate" },
              { label: "Rename" },
              { label: "Archive" },
              { label: "Delete", danger: true },
            ]}
          />
        ),
      },
      {
        id: "tooltip",
        name: "Tooltip",
        file: "primitives/Tooltip.tsx",
        about:
          "CSS only. It shows on hover and on keyboard focus, inverted out of the palette.",
        demo: (
          <div className="flex flex-wrap gap-3 pt-8">
            <Tooltip content="Tokens all the way down">
              <Button variant="outline">Hover me</Button>
            </Tooltip>
            <Tooltip content="Focus works too">
              <Button variant="ghost">Or tab to me</Button>
            </Tooltip>
          </div>
        ),
      },
    ],
  },
  {
    id: "inputs",
    title: "Inputs & forms",
    blurb: "Every text control shares one field recipe; the focus ring is the palette's --ring.",
    entries: [
      {
        id: "text-fields",
        name: "Text fields",
        file: "primitives/Input.tsx",
        about:
          "Input, Textarea and Label, built on fieldClasses — the recipe to reach for when something has to read as a field.",
        demo: (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cv-email">Email</Label>
              <Input id="cv-email" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="cv-note">What are you building?</Label>
              <Textarea
                id="cv-note"
                rows={3}
                placeholder="A storefront, a dashboard, a docs site…"
              />
            </div>
          </div>
        ),
      },
      {
        id: "select",
        name: "Select",
        file: "primitives/Input.tsx",
        about:
          "A native <select> in the field recipe with a drawn chevron. It keeps the platform's own picker and keyboard handling.",
        demo: (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cv-plan">Plan</Label>
              <Select id="cv-plan" defaultValue="pro">
                <option value="starter">Starter — free</option>
                <option value="pro">Pro — $29/mo</option>
                <option value="team">Team — $99/mo</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="cv-region">Region</Label>
              <Select id="cv-region" defaultValue="us">
                <option value="us">United States</option>
                <option value="eu">Europe</option>
                <option value="ap">Asia–Pacific</option>
              </Select>
            </div>
          </div>
        ),
      },
      {
        id: "switch",
        name: "Switch",
        file: "primitives/Switch.tsx",
        about:
          "A binary toggle. The knob is content on the track: the fill's -fg when on, --muted when off.",
        demo: (
          <div className="flex flex-col gap-3">
            <Switch label="Email me a weekly digest" defaultChecked />
            <Switch label="Show archived projects" />
          </div>
        ),
      },
      {
        id: "segmented-control",
        name: "Segmented control",
        file: "primitives/SegmentedControl.tsx",
        about:
          "One choice from a few, with exactly one always active. The Page / Components / Style guide toggle above is one.",
        demo: <SegmentedDemo />,
      },
      {
        id: "filter-chips",
        name: "Filter chips",
        file: "primitives/FilterChips.tsx",
        about:
          "Multi-select toggles with an optional All chip that clears them. The Themes list filters with these.",
        demo: <FilterChipsDemo />,
      },
    ],
  },
  {
    id: "display",
    title: "Data display",
    blurb: "Surfaces, and the things that sit on them.",
    entries: [
      {
        id: "badge",
        name: "Badge",
        file: "primitives/Badge.tsx",
        about:
          "A solid label. Each variant sets its text in its fill's -fg, so success, warning and danger stay AA in all three palettes.",
        demo: (
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        ),
      },
      {
        id: "status-pill",
        name: "Status pill",
        file: "primitives/StatusPill.tsx",
        about:
          "Status as a dot beside muted text. The dot only has to be visible, so status colors can stay saturated. From daves-demos.",
        demo: (
          <div className="flex flex-wrap gap-2">
            <StatusPill>Idea</StatusPill>
            <StatusPill tone="success">Shipped</StatusPill>
            <StatusPill tone="warning">Building</StatusPill>
            <StatusPill tone="danger">Blocked</StatusPill>
          </div>
        ),
      },
      {
        id: "avatar",
        name: "Avatar",
        file: "primitives/Avatar.tsx",
        about: "A photo, or initials on --surface-2, at any size.",
        demo: (
          <div className="flex flex-wrap items-center gap-3">
            <Avatar name="Ava Reyes" size={28} />
            <Avatar name="Marcus Lee" size={36} />
            <Avatar name="Priya Shah" />
            <Avatar name="Tess Moreau" size={52} />
          </div>
        ),
      },
      {
        id: "card",
        name: "Card",
        file: "primitives/Card.tsx",
        about:
          "The raised surface, with header, title, description, content and footer parts. Radius and elevation are the skin's.",
        demo: (
          <Card>
            <CardHeader>
              <CardTitle>Northwind storefront</CardTitle>
              <CardDescription>Last deployed 12 minutes ago.</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress label="Launch checklist" value={68} />
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Open</Button>
              <Button size="sm" variant="ghost">
                Settings
              </Button>
            </CardFooter>
          </Card>
        ),
      },
      {
        id: "stat-tile",
        name: "Stat tile",
        file: "primitives/StatTile.tsx",
        about:
          "One KPI with an optional trend. The delta is status-colored text, which is why status colors are contrast-checked on --surface too.",
        wide: true,
        demo: (
          <div className="grid gap-3 lg:grid-cols-3">
            <StatTile label="Revenue" value="$48.2k" delta="12.4%" trend="up" caption="vs. last month" />
            <StatTile label="Conversion" value="3.1%" delta="0.4%" trend="down" caption="vs. last month" />
            <StatTile label="Seats" value="1,204" delta="0%" trend="flat" caption="unchanged" />
          </div>
        ),
      },
      {
        id: "chart-card",
        name: "Chart card",
        file: "primitives/ChartCard.tsx",
        about:
          "Inline SVG, no chart library. The series color is a token class, so the chart follows the palette.",
        demo: (
          <div className="grid gap-3">
            <ChartCard
              title="Visitors"
              value="18.4k"
              caption="Last 14 days"
              data={[12, 18, 15, 22, 19, 28, 24, 31, 27, 35, 30, 38, 34, 42]}
            />
            <ChartCard
              title="Signups"
              caption="By week"
              variant="bars"
              seriesClassName="text-accent"
              data={[8, 12, 9, 15, 11, 18, 14, 21]}
            />
          </div>
        ),
      },
      {
        id: "list-row",
        name: "List row",
        file: "primitives/ListRow.tsx",
        about: "The settings or inbox row: a leading slot, label, detail, and a trailing value or chevron.",
        demo: (
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            <ListRow
              leading={<Avatar name="Ava Reyes" size={32} />}
              label="Ava Reyes"
              detail="Shipped the dark palette"
              trailing="9:12"
            />
            <ListRow
              leading={<Avatar name="Marcus Lee" size={32} />}
              label="Marcus Lee"
              detail="Left a comment on Pricing"
              trailing="Mon"
            />
            <ListRow label="Notification settings" detail="Email, push, digest" chevron />
          </div>
        ),
      },
      {
        id: "table",
        name: "Table",
        file: "primitives/Table.tsx",
        about:
          "Rows under a header band on --surface-2. It scrolls sideways inside itself instead of widening the page.",
        wide: true,
        demo: (
          <Table>
            <THead>
              <TR>
                <TH>Invoice</TH>
                <TH>Customer</TH>
                <TH>Amount</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {INVOICES.map((inv) => (
                <TR key={inv.id}>
                  <TD className="font-mono text-xs">{inv.id}</TD>
                  <TD>{inv.customer}</TD>
                  <TD>{inv.amount}</TD>
                  <TD>
                    <Badge variant={INVOICE_STATUS[inv.status]}>{inv.status}</Badge>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        ),
      },
      {
        id: "code-block",
        name: "Code block",
        file: "primitives/CodeBlock.tsx",
        about:
          "Unhighlighted on purpose: a syntax highlighter brings its own color scheme, and it would be the one thing on the page ignoring the palette.",
        wide: true,
        demo: (
          <CodeBlock
            tabs={[
              { label: "App.tsx", code: CODE_TSX },
              { label: "styles.css", code: CODE_CSS },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    blurb:
      "What the interface says back. The tone colors the edge, the tint and the icon; the words stay in ink.",
    entries: [
      {
        id: "alert",
        name: "Alert",
        file: "primitives/Alert.tsx",
        about: "An inline message on a tint of its status color: title in --fg, body in --muted, icon in the tone.",
        wide: true,
        demo: (
          <div className="grid gap-3 md:grid-cols-2">
            <Alert variant="info" title="Heads up">
              Overlays inherit elevation and radius from the skin.
            </Alert>
            <Alert variant="success" title="Deployed">
              Build 128 is live on production.
            </Alert>
            <Alert variant="warning" title="Trial ending">
              Pick a plan within three days to keep access.
            </Alert>
            <Alert variant="danger" title="Payment failed">
              Update billing to keep the workspace running.
            </Alert>
          </div>
        ),
      },
      {
        id: "callout",
        name: "Callout",
        file: "primitives/Callout.tsx",
        about:
          "A docs admonition. The glyph is the tone's fill with its -fg, and the title stays in --fg, so no tone is ever set as text.",
        wide: true,
        demo: (
          <div className="grid gap-3 md:grid-cols-2">
            <Callout tone="note">A skin owns form; a palette owns color.</Callout>
            <Callout tone="tip">Copy tokens hands you both blocks at once.</Callout>
            <Callout tone="warning">Writing a raw hex fails the token guard.</Callout>
            <Callout tone="danger">A palette that misses AA doesn't ship.</Callout>
          </div>
        ),
      },
      {
        id: "toast",
        name: "Toast",
        file: "primitives/Toast.tsx",
        about:
          "A passing confirmation. Live ones come in on the skin's entrance curve and leave on their own.",
        demo: <ToastDemo />,
      },
      {
        id: "progress",
        name: "Progress & skeleton",
        file: "primitives/Progress.tsx",
        about: "Determinate progress on --surface-2, and a pulsing placeholder for content on its way.",
        demo: (
          <div className="space-y-5">
            <Progress label="Storage used" value={72} />
            <Progress label="Onboarding" value={40} />
            <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "empty-state",
        name: "Empty state",
        file: "primitives/EmptyState.tsx",
        about:
          "What a panel says before it has anything in it. The dashed edge reads as “not filled in yet” in every skin. From daves-demos.",
        demo: (
          <EmptyState
            title="No projects yet"
            body="Projects you create or join show up here."
            action={<Button size="sm">New project</Button>}
          />
        ),
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation & disclosure",
    blurb: "Finding your way, and showing only what was asked for.",
    entries: [
      {
        id: "tabs",
        name: "Tabs",
        file: "primitives/Tabs.tsx",
        about: "Panels behind a segmented header, with the tab and tabpanel roles wired up.",
        demo: (
          <Tabs
            tabs={[
              { label: "Overview", content: "Recent activity, usage, and quick links for the workspace." },
              { label: "Analytics", content: "Traffic, conversion, and retention over time." },
              { label: "Settings", content: "Name, members, billing — and the danger zone." },
            ]}
          />
        ),
      },
      {
        id: "accordion",
        name: "Accordion",
        file: "primitives/Accordion.tsx",
        about: "One section open at a time; the chevron turns on the skin's emphasis curve.",
        demo: (
          <Accordion
            defaultIndex={0}
            items={[
              {
                title: "Can I use these in my own project?",
                content:
                  "Yes. Copy the skin's token blocks and the components; they only name tokens, so they restyle themselves.",
              },
              {
                title: "What makes it a skin, not a theme?",
                content:
                  "A skin is the form — radius, ink, type, motion. It wears any of three palettes without a component changing.",
              },
              {
                title: "Where did dark mode go?",
                content: "It's a palette: just another set of color values.",
              },
            ]}
          />
        ),
      },
      {
        id: "breadcrumb",
        name: "Breadcrumb",
        file: "primitives/Breadcrumb.tsx",
        about: "Where you are. Every step but the last is a link.",
        demo: (
          <Breadcrumb
            items={[
              { label: "Workspace", href: "#breadcrumb" },
              { label: "Projects", href: "#breadcrumb" },
              { label: "Northwind" },
            ]}
          />
        ),
      },
      {
        id: "pagination",
        name: "Pagination",
        file: "primitives/Pagination.tsx",
        about: "Numbered pages with previous and next. The current page takes the primary fill.",
        demo: <Pagination pageCount={5} defaultPage={2} />,
      },
    ],
  },
  {
    id: "overlays",
    title: "Overlays",
    blurb: "Surfaces above the page: second elevation, over a scrim.",
    entries: [
      {
        id: "modal",
        name: "Modal",
        file: "primitives/Modal.tsx",
        about: "A dialog fixed to the viewport. Escape or a click on the scrim closes it.",
        demo: <ModalDemo />,
      },
      {
        id: "sheet",
        name: "Sheet",
        file: "primitives/Sheet.tsx",
        about:
          "An edge-anchored panel held by its nearest positioned ancestor — a small frame here; a phone or the page in an app.",
        demo: <SheetDemo />,
      },
    ],
  },
  {
    id: "chrome",
    title: "App chrome",
    blurb: "The frames an app is built inside, arranged here the way an app would use them.",
    entries: [
      {
        id: "sidebar",
        name: "Sidebar & top bar",
        file: "sections/Sidebar.tsx · sections/AppTopBar.tsx",
        about:
          "The desktop shell: a navigation rail beside a header with search and actions. The rail hides at phone widths here.",
        wide: true,
        bleed: true,
        demo: <AppShellDemo />,
      },
      {
        id: "mobile-shell",
        name: "Mobile shell",
        file: "sections/DeviceFrame.tsx · sections/TabBar.tsx",
        about:
          "A phone with list rows and a bottom tab bar. The bezel is fixed hardware geometry; everything on the screen is tokens.",
        demo: <MobileShellDemo />,
      },
      {
        id: "docs-nav",
        name: "Docs navigation",
        file: "sections/DocsNav.tsx · sections/TOC.tsx",
        about:
          "The documentation pair: a page tree for the left column and an on-this-page rail for the right. Active entries get a primary rule, not primary text.",
        demo: (
          <div className="flex flex-wrap gap-x-10 gap-y-8">
            <DocsNav
              version="v2.4"
              sections={[
                {
                  label: "Getting started",
                  pages: [{ label: "Introduction" }, { label: "Installation", active: true }, { label: "Theming" }],
                },
                {
                  label: "Components",
                  pages: [{ label: "Button" }, { label: "Card" }, { label: "Table" }],
                },
              ]}
            />
            <TOC
              entries={[
                { label: "Requirements" },
                { label: "Install the package", active: true },
                { label: "With npm", level: 3 },
                { label: "From a CDN", level: 3 },
                { label: "Next steps" },
              ]}
            />
          </div>
        ),
      },
      {
        id: "page-header",
        name: "Page header",
        file: "sections/PageHeader.tsx",
        about:
          "Eyebrow, title and lede, with an actions slot that wraps under the text on narrow screens. From daves-demos.",
        wide: true,
        demo: (
          <PageHeader
            eyebrow="Workspace"
            title="Quarterly review"
            sub="Revenue, retention, and what shipped this quarter — refreshed every morning."
          >
            <div className="flex gap-2">
              <Button variant="outline">Export</Button>
              <Button>Share</Button>
            </div>
          </PageHeader>
        ),
      },
    ],
  },
  {
    id: "sections",
    title: "Page sections",
    blurb:
      "Full-width marketing blocks. A skin's Page view arranges these, or a composition of its own, into a page.",
    entries: [
      { id: "header", name: "Header", file: "sections/Header.tsx", about: "Logo, links, and the sign-in / get-started pair.", wide: true, bleed: true, demo: <Header /> },
      { id: "hero", name: "Hero", file: "sections/Hero.tsx", about: "Announcement badge, headline, two calls to action, and a product mock drawn in tokens.", wide: true, bleed: true, demo: <Hero /> },
      { id: "stats", name: "Stats", file: "sections/Stats.tsx", about: "A row of headline numbers.", wide: true, bleed: true, demo: <Stats /> },
      { id: "features", name: "Features", file: "sections/Features.tsx", about: "A grid of icon cards on a tinted band.", wide: true, bleed: true, demo: <Features /> },
      { id: "pricing", name: "Pricing", file: "sections/Pricing.tsx", about: "Three tiers, the middle one featured.", wide: true, bleed: true, demo: <Pricing /> },
      { id: "testimonials", name: "Testimonials", file: "sections/Testimonial.tsx", about: "Three quote cards with ratings and avatars.", wide: true, bleed: true, demo: <Testimonial /> },
      { id: "cta", name: "Call to action", file: "sections/CTA.tsx", about: "The closing ask, with an inline email form.", wide: true, bleed: true, demo: <CTA /> },
      { id: "footer", name: "Footer", file: "sections/Footer.tsx", about: "Brand, three link columns, and the fine print.", wide: true, bleed: true, demo: <Footer /> },
    ],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.entries.length, 0);

/* ---------------------------------------------------------------- layout */

function Spec({ entry }: { entry: Entry }) {
  return (
    <article
      id={entry.id}
      aria-labelledby={`${entry.id}-title`}
      className={cn("min-w-0 scroll-mt-32 lg:scroll-mt-20", entry.wide && "md:col-span-2")}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 id={`${entry.id}-title`} className="font-display text-base font-semibold tracking-tight">
          {entry.name}
        </h3>
        <code className="font-mono text-[11px] text-muted">{entry.file}</code>
      </div>
      <p className="mt-1 text-sm leading-6 text-muted">{entry.about}</p>
      <div
        className={cn(
          "mt-3 rounded-lg border border-border bg-bg",
          entry.bleed ? "overflow-hidden" : "p-4"
        )}
      >
        {entry.demo}
      </div>
    </article>
  );
}

function GroupSection({ group }: { group: Group }) {
  return (
    <section
      id={group.id}
      aria-labelledby={`${group.id}-title`}
      className="scroll-mt-32 lg:scroll-mt-20"
    >
      <div className="border-b border-border pb-3">
        <h2 id={`${group.id}-title`} className="font-display text-xl font-semibold tracking-tight">
          {group.title}
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">{group.blurb}</p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
        {group.entries.map((e) => (
          <Spec key={e.id} entry={e} />
        ))}
      </div>
    </section>
  );
}

/** The on-this-page index, pinned beside the catalogue on wide screens. */
function Index() {
  return (
    <nav aria-label="Component index" className="hidden xl:block">
      {/* Clears the shell's sticky top bar, which is one 56px row at this width. */}
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-4">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">On this page</p>
        <ul className="mt-3 space-y-4 text-sm">
          {GROUPS.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="font-medium text-fg hover:underline">
                {g.title}
              </a>
              <ul className="mt-1.5 space-y-0.5 border-l border-border">
                {g.entries.map((e) => (
                  <li key={e.id}>
                    <a
                      href={`#${e.id}`}
                      className="-ml-px block border-l border-transparent py-0.5 pl-3 text-muted transition-colors hover:border-fg hover:text-fg"
                    >
                      {e.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function ComponentsView({ skin }: { skin: SkinMeta }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_11rem]">
        <div className="min-w-0">
          <header className="max-w-3xl">
            <h1 className="font-display text-2xl font-semibold tracking-tight">Component library</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              All {TOTAL} components in the shared library, in {skin.name} and the active
              palette. None of them is styled for this skin — each only names tokens — so
              switching the palette restyles the whole sheet, and{" "}
              <code className="font-mono text-xs">npm run contrast</code> keeps every text-on-fill
              pair AA in all three.
            </p>
            <nav aria-label="Jump to a group" className="mt-5 flex flex-wrap gap-2 xl:hidden">
              {GROUPS.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted transition-colors hover:text-fg"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </header>

          <div className="mt-12 space-y-16">
            {GROUPS.map((g) => (
              <GroupSection key={g.id} group={g} />
            ))}
          </div>
        </div>

        <Index />
      </div>
    </div>
  );
}
