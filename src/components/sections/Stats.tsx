const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "4.9/5", label: "Average rating" },
  { value: "12k+", label: "Teams onboard" },
  { value: "60ms", label: "Median response" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl font-bold tracking-tight text-fg">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
