const cols = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Docs"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  { title: "Resources", links: ["Community", "Support", "Status", "Terms"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary" />
              <span className="text-lg font-semibold">Northwind</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Beautiful products, built faster.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-fg">{c.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-fg">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <span>© 2026 Northwind, Inc.</span>
          <span>Built with Theme Lab</span>
        </div>
      </div>
    </footer>
  );
}
