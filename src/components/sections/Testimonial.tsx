import { Avatar, Card, CardContent } from "../primitives";
import { Star } from "../icons";

const quotes = [
  {
    body: "This completely changed how our team ships. What used to take weeks now takes an afternoon.",
    name: "Ava Reyes",
    role: "Head of Design, Loom",
  },
  {
    body: "The attention to detail is unreal. Every component just feels right out of the box.",
    name: "Marcus Lee",
    role: "Founder, Basewell",
  },
  {
    body: "We replaced three tools with this. Our engineers and designers finally speak the same language.",
    name: "Priya Shah",
    role: "VP Product, Northstar",
  },
];

export function Testimonial() {
  return (
    <section className="border-y border-border bg-surface-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by modern teams
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {quotes.map((q) => (
            <Card key={q.name}>
              <CardContent>
                <div className="mb-3 flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} />
                  ))}
                </div>
                <p className="text-fg">“{q.body}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar name={q.name} size={36} />
                  <div>
                    <div className="text-sm font-medium text-fg">{q.name}</div>
                    <div className="text-xs text-muted">{q.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
