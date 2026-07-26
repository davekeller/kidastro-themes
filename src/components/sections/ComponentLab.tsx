import { useRef, useState } from "react";
import {
  Accordion,
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dropdown,
  Modal,
  Pagination,
  Progress,
  Skeleton,
  Table,
  Tabs,
  TBody,
  TD,
  TH,
  THead,
  Toast,
  Tooltip,
  TR,
} from "../primitives";

const invoices = [
  { id: "INV-0041", customer: "Northwind", amount: "$1,250.00", status: "Paid" },
  { id: "INV-0042", customer: "Acme Corp", amount: "$864.50", status: "Pending" },
  { id: "INV-0043", customer: "Globex", amount: "$2,310.00", status: "Paid" },
  { id: "INV-0044", customer: "Initech", amount: "$430.25", status: "Overdue" },
];

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
} as const;

interface ToastItem {
  id: number;
  title: string;
  description: string;
}

/**
 * The v2 component showcase — interactive primitives (Tabs, Accordion, Modal,
 * Toast, Tooltip, Dropdown, Table, Alert, Progress, Skeleton, Breadcrumb,
 * Pagination) demoed live under the active theme.
 */
export function ComponentLab() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextToastId = useRef(1);

  const pushToast = () => {
    const id = nextToastId.current++;
    setToasts((t) => [
      ...t,
      { id, title: "Saved", description: "Your changes are live." },
    ]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  return (
    <section id="components" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <Breadcrumb
            items={[
              { label: "Theme Lab", href: "/" },
              { label: "Components" },
              { label: "v2" },
            ]}
          />
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Component lab
          </h2>
          <p className="mt-4 text-muted">
            The interactive layer of the library — every control below is live,
            token-driven, and restyled entirely by the active theme.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-2">
          {/* Tabs + Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Tabs &amp; Accordion</CardTitle>
              <CardDescription>Disclosure patterns for dense content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Tabs
                tabs={[
                  {
                    label: "Overview",
                    content:
                      "A high-level summary of the workspace: recent activity, usage, and quick links.",
                  },
                  {
                    label: "Analytics",
                    content:
                      "Charts and breakdowns of traffic, conversion, and retention over time.",
                  },
                  {
                    label: "Settings",
                    content:
                      "Workspace name, members, billing, and the danger zone live here.",
                  },
                ]}
              />
              <Accordion
                defaultIndex={0}
                items={[
                  {
                    title: "Can I use these components in my own project?",
                    content:
                      "Yes — copy the theme's token block and any components. They only reference tokens, so they restyle automatically.",
                  },
                  {
                    title: "How do themes stay swappable?",
                    content:
                      "Every component styles itself with semantic utilities like bg-surface and text-muted. No hardcoded values anywhere.",
                  },
                  {
                    title: "What about dark themes?",
                    content:
                      "Dark is just another set of token values — nothing in the components changes.",
                  },
                ]}
              />
            </CardContent>
          </Card>

          {/* Overlays: Modal, Toast, Tooltip, Dropdown */}
          <Card>
            <CardHeader>
              <CardTitle>Overlays</CardTitle>
              <CardDescription>Modal, toast, tooltip, and dropdown menu.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                <Button variant="secondary" onClick={pushToast}>
                  Show toast
                </Button>
                <Tooltip content="Tokens all the way down">
                  <Button variant="outline">Hover me</Button>
                </Tooltip>
                <Dropdown
                  label="Actions"
                  items={[
                    { label: "Duplicate" },
                    { label: "Rename" },
                    { label: "Archive" },
                    { label: "Delete", danger: true },
                  ]}
                />
              </div>
              <Alert variant="info" title="Heads up">
                Overlay surfaces inherit elevation and radius from the theme too.
              </Alert>
              <Alert variant="success" title="Deployed">
                Build #128 is live on production.
              </Alert>
              <Alert variant="warning" title="Trial ending">
                Your trial ends in 3 days — pick a plan to keep access.
              </Alert>
              <Alert variant="danger" title="Payment failed">
                We couldn't charge your card. Update billing to continue.
              </Alert>
            </CardContent>
          </Card>

          {/* Table + Pagination */}
          <Card>
            <CardHeader>
              <CardTitle>Table &amp; Pagination</CardTitle>
              <CardDescription>Data-heavy views, themed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  {invoices.map((inv) => (
                    <TR key={inv.id}>
                      <TD className="font-mono text-xs">{inv.id}</TD>
                      <TD>{inv.customer}</TD>
                      <TD>{inv.amount}</TD>
                      <TD>
                        <Badge variant={statusVariant[inv.status as keyof typeof statusVariant]}>
                          {inv.status}
                        </Badge>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
              <div className="flex justify-center">
                <Pagination pageCount={5} defaultPage={2} />
              </div>
            </CardContent>
          </Card>

          {/* Progress + Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Progress &amp; Skeleton</CardTitle>
              <CardDescription>Loading and status feedback.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Progress label="Storage used" value={72} />
              <Progress label="Onboarding" value={40} />
              <div className="space-y-3 rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Delete project?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setModalOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        This action can't be undone. The project and all of its data will be
        permanently removed.
      </Modal>

      {/* Toast stack */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant="success"
            title={t.title}
            description={t.description}
            onDismiss={() =>
              setToasts((list) => list.filter((x) => x.id !== t.id))
            }
          />
        ))}
      </div>
    </section>
  );
}
