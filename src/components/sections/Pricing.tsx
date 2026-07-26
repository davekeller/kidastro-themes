import { Badge, Button } from "../primitives";
import { Check } from "../icons";
import { cn } from "../../lib/cn";

interface Tier {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/mo",
    description: "For side projects and getting started.",
    features: ["1 project", "Community support", "Basic components", "1 GB storage"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "/mo",
    description: "For growing teams that need more power.",
    features: [
      "Unlimited projects",
      "Priority support",
      "All components",
      "100 GB storage",
      "Advanced analytics",
    ],
    featured: true,
    cta: "Start free trial",
  },
  {
    name: "Team",
    price: "$99",
    cadence: "/mo",
    description: "For organizations at scale.",
    features: ["Everything in Pro", "SSO & SAML", "Audit logs", "Dedicated manager"],
    cta: "Contact sales",
  },
];

export function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-muted">Start free. Upgrade when you're ready.</p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "flex flex-col rounded-2xl border bg-surface p-6",
              t.featured
                ? "glow border-primary ring-1 ring-primary elev-2"
                : "border-border elev-1"
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              {t.featured ? <Badge variant="primary">Most popular</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-muted">{t.description}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">{t.price}</span>
              <span className="text-sm text-muted">{t.cadence}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check size={16} className="shrink-0 text-primary" />
                  <span className="text-fg">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-2">
              <Button
                variant={t.featured ? "primary" : "outline"}
                className="w-full"
              >
                {t.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
