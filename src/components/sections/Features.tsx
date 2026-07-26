import { Card, CardContent } from "../primitives";
import { Bolt, Shield, Sparkle, ArrowRight, Check, Star } from "../icons";
import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  body: string;
}

const features: Feature[] = [
  {
    icon: <Bolt size={20} />,
    title: "Blazing fast",
    body: "Optimized from the ground up so every interaction feels instant.",
  },
  {
    icon: <Shield size={20} />,
    title: "Secure by default",
    body: "Enterprise-grade security and privacy baked into every layer.",
  },
  {
    icon: <Sparkle size={20} />,
    title: "Delightful details",
    body: "Thoughtful motion and polish that make the product feel alive.",
  },
  {
    icon: <ArrowRight size={20} />,
    title: "Ships anywhere",
    body: "Deploy to any platform with a single command and zero config.",
  },
  {
    icon: <Check size={20} />,
    title: "Accessible",
    body: "Meets WCAG standards with keyboard and screen-reader support.",
  },
  {
    icon: <Star size={20} />,
    title: "Loved by teams",
    body: "Trusted by thousands of designers and engineers worldwide.",
  },
];

export function Features() {
  return (
    <section className="border-y border-border bg-surface-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to build
          </h2>
          <p className="mt-4 text-muted">
            A complete set of primitives and patterns, designed to work together.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardContent>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
