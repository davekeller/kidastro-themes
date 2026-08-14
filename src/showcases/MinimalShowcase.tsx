import type { ThemeMeta } from "../themes/types";
import { Badge, Button, Switch } from "../components/primitives";
import { ArrowRight, Check, ChevronRight, Sparkle } from "../components/icons";
import { TokenPanel } from "../components/sections/TokenPanel";

/** Clean Minimal is a focused work surface: whitespace first, almost no
 * decoration, and one crisp blue action at a time. */
export function MinimalShowcase({ theme }: { theme: ThemeMeta }) {
  const tasks = [
    { title: "Review launch brief", meta: "Today · 10:00", done: true },
    { title: "Resolve onboarding edge cases", meta: "Product · 3 comments", done: false },
    { title: "Share prototype with research", meta: "Tomorrow", done: false },
  ];

  return (
    <>
      <header className="border-b border-border bg-bg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-display text-base font-semibold tracking-tight">Northwind</a>
          <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
            {['Product', 'Solutions', 'Customers', 'Resources'].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-fg">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">Sign in</Button>
            <Button size="sm">Try Northwind</Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <Badge variant="outline">A calmer workspace</Badge>
            <h1 className="mt-6 max-w-xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              Make space for the work that matters.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Projects, notes, and decisions in one quiet system. Nothing flashes,
              shouts, or competes with the thing you came to finish.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg">Start free <ArrowRight size={16} /></Button>
              <Button size="lg" variant="outline">Watch overview</Button>
            </div>
            <p className="mt-5 text-xs text-muted">Free for teams of five · No card required</p>
          </div>

          <div className="rounded-xl border border-border bg-surface elev-2">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="text-sm font-semibold">Today</p>
                <p className="mt-0.5 text-xs text-muted">Tuesday, August 12</p>
              </div>
              <Button size="sm">New task</Button>
            </div>
            <div className="grid sm:grid-cols-[160px_1fr]">
              <aside className="hidden border-r border-border p-4 sm:block">
                {['Inbox  4', 'Today  3', 'Upcoming', 'Notes'].map((item, index) => (
                  <div key={item} className={`rounded-md px-3 py-2 text-sm ${index === 1 ? 'bg-primary/8 font-medium text-primary' : 'text-muted'}`}>
                    {item}
                  </div>
                ))}
                <p className="mt-7 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted">Projects</p>
                {['Launch', 'Research', 'Website'].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-2 text-sm text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />{item}
                  </div>
                ))}
              </aside>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold tracking-tight">Three priorities</h2>
                  <span className="text-xs text-muted">1 of 3 done</span>
                </div>
                <div className="mt-4 divide-y divide-border border-y border-border">
                  {tasks.map((task) => (
                    <div key={task.title} className="flex items-start gap-3 py-4">
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${task.done ? 'border-primary bg-primary text-primary-fg' : 'border-border'}`}>
                        {task.done ? <Check size={11} /> : null}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium ${task.done ? 'text-muted line-through' : 'text-fg'}`}>{task.title}</p>
                        <p className="mt-1 text-xs text-muted">{task.meta}</p>
                      </div>
                      <ChevronRight size={15} className="mt-1 text-muted" />
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-lg bg-surface-2 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-md bg-bg text-primary"><Sparkle size={15} /></span>
                    <div><p className="text-xs font-medium">Focus mode</p><p className="text-[11px] text-muted">Hide everything else</p></div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface-2/55">
          <div className="mx-auto grid max-w-7xl gap-px px-6 sm:grid-cols-3">
            {[
              ['12 hrs', 'saved per person each month'],
              ['43%', 'fewer status meetings'],
              ['4.9 / 5', 'average team rating'],
            ].map(([value, label]) => (
              <div key={label} className="py-10 sm:px-8 first:pl-0">
                <p className="font-display text-3xl font-semibold tracking-tight">{value}</p>
                <p className="mt-2 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">Designed to disappear</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">A system you understand in an afternoon.</h2>
          </div>
          <div className="mt-12 grid border-y border-border md:grid-cols-3">
            {[
              ['01', 'Capture without filing', 'Start with the thought. Structure can arrive when it becomes useful.'],
              ['02', 'One obvious next step', 'Every view earns its primary action and removes the rest.'],
              ['03', 'Quiet by default', 'Notifications are summaries, not a running commentary on your day.'],
            ].map(([number, title, body], index) => (
              <article key={number} className={`py-8 md:px-8 ${index > 0 ? 'border-t border-border md:border-l md:border-t-0' : ''}`}>
                <span className="font-mono text-xs text-primary">{number}</span>
                <h3 className="mt-10 font-display text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
            <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Your best work needs less software around it.</p>
            <Button size="lg" className="mt-7">Create your workspace</Button>
          </div>
        </section>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-8 text-xs text-muted">
          <span>© 2026 Northwind</span><span>{theme.name} · clear by design</span>
        </div>
      </footer>
    </>
  );
}
