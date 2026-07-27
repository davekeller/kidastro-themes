import type { ThemeMeta } from "../themes/types";
import { Avatar, Badge, Button, Input } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { Quote } from "../components/icons";

/**
 * Custom showcase for the `broadsheet` theme (ref: Substack on Mobbin).
 * Layout signature: print logic instead of marketing logic — a ruled
 * masthead with dateline, a multi-column article grid, a drop-capped lead,
 * a pull quote breaking the column, and a colophon footer. No cards.
 */

const STORIES = [
  {
    kicker: "Design",
    title: "The quiet return of the ruled line",
    dek: "Borders went out of fashion for a decade. Print never stopped needing them.",
    author: "M. Ellison",
    read: "8 min",
  },
  {
    kicker: "Craft",
    title: "Against the infinite canvas",
    dek: "Constraints are the whole job. A fixed column count is a gift, not a cage.",
    author: "R. Nakamura",
    read: "6 min",
  },
  {
    kicker: "Systems",
    title: "Tokens are a publishing decision",
    dek: "When your palette is data, a redesign becomes an edit rather than a rebuild.",
    author: "P. Adeyemi",
    read: "11 min",
  },
];

export function BroadsheetShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      {/* Masthead */}
      <header className="border-b-2 border-fg">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center justify-between border-b border-border py-2 font-sans text-xs uppercase tracking-widest text-muted">
            <span>Sunday, July 26, 2026</span>
            <span className="hidden sm:inline">No. 1,284</span>
            <span>Subscriber edition</span>
          </div>
          <h1 className="py-6 text-center font-display text-5xl font-bold tracking-tight sm:text-7xl">
            The Northwind Review
          </h1>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 border-t border-border py-2 font-sans text-xs font-medium uppercase tracking-widest">
            {["Design", "Craft", "Systems", "Interviews", "Archive"].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-primary">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* Lead story — two columns, drop cap, sidebar rail */}
        <div className="grid gap-8 border-b border-border py-10 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-primary">
              The Lead
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              A design system is a newspaper, not a poster
            </h2>
            <p className="mt-3 font-sans text-sm text-muted">
              By <span className="text-fg">Dave Keller</span> · 14 min read
            </p>
            <div className="mt-6 columns-1 gap-8 sm:columns-2 [&>p]:mb-4">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8]">
                Posters get designed once and admired forever. Newspapers get
                designed once and then survive ten thousand editions of content
                nobody planned for — which is a fundamentally different problem,
                and much closer to what a component library actually does.
              </p>
              <p>
                The discipline that makes a broadsheet work is not typographic
                flair. It is the ruthless reuse of a small number of elements: a
                column measure, three type sizes, one rule weight, and a
                hierarchy that survives whatever the news happens to be that day.
              </p>
              <p>
                Every page you are looking at right now is drawn from the same
                token set as a neon arcade theme and a claymorphic learning app.
                Only the values changed. That is the entire argument, rendered
                rather than asserted.
              </p>
              <p>
                What follows is a short defense of constraint — and a working
                demonstration that a component built for a marketing page can set
                a passable front page if the tokens are honest about their job.
              </p>
            </div>
          </article>

          {/* Rail */}
          <aside className="space-y-6 lg:border-l lg:border-border lg:pl-8">
            <div>
              <h3 className="border-b border-fg pb-1 font-sans text-xs font-bold uppercase tracking-widest">
                In this issue
              </h3>
              <ol className="mt-3 space-y-3">
                {STORIES.map((s, i) => (
                  <li key={s.title} className="flex gap-3 text-sm">
                    <span className="font-display text-lg font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="font-medium">{s.title}</span>
                      <span className="block font-sans text-xs text-muted">
                        {s.read}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="font-display text-lg font-bold">Get the Review</h3>
              <p className="mt-1 font-sans text-sm text-muted">
                One issue each Sunday. No tracking, no filler.
              </p>
              <div className="mt-3 space-y-2">
                <Input placeholder="you@email.com" className="font-sans" />
                <Button className="w-full font-sans">Subscribe</Button>
              </div>
              <p className="mt-2 font-sans text-xs text-muted">
                Free · 42,000 readers
              </p>
            </div>
          </aside>
        </div>

        {/* Pull quote breaking the measure */}
        <blockquote className="border-y-2 border-fg py-10 text-center">
          <Quote size={22} className="mx-auto text-primary" />
          <p className="mx-auto mt-4 max-w-2xl font-display text-2xl font-medium italic leading-snug sm:text-3xl">
            "Constraint is not the opposite of expression. It is the delivery
            mechanism for it."
          </p>
          <footer className="mt-4 font-sans text-xs uppercase tracking-widest text-muted">
            — from The Lead
          </footer>
        </blockquote>

        {/* Story grid — ruled columns, no cards */}
        <div className="grid gap-8 py-10 sm:grid-cols-3 sm:divide-x sm:divide-border">
          {STORIES.map((s) => (
            <article key={s.title} className="sm:px-4 sm:first:pl-0 sm:last:pr-0">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-primary">
                {s.kicker}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                {s.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{s.dek}</p>
              <div className="mt-4 flex items-center gap-2 font-sans text-xs text-muted">
                <Avatar name={s.author} size={24} />
                {s.author} · {s.read}
              </div>
            </article>
          ))}
        </div>

        {/* Opinion strip */}
        <div className="border-t border-border py-10">
          <h3 className="border-b border-fg pb-1 font-sans text-xs font-bold uppercase tracking-widest">
            Letters & Opinion
          </h3>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {[
              ["On dark mode as a default", "A. Whitfield, Portland"],
              ["The case against the hamburger", "S. Okonjo, Lagos"],
              ["Why our docs page reads better in print", "T. Bauer, Berlin"],
              ["Bring back the table of contents", "L. Marchetti, Milan"],
            ].map(([title, who]) => (
              <div key={title} className="border-b border-border pb-4">
                <p className="font-display text-lg font-semibold leading-snug">
                  {title}
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-widest text-muted">
                  {who}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe band */}
        <div className="border-y-2 border-fg py-12 text-center">
          <Badge variant="outline" className="font-sans">
            Subscriber edition
          </Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Read the Review every Sunday
          </h2>
          <p className="mx-auto mt-3 max-w-md font-sans text-muted">
            Long-form design writing, delivered as plainly as possible.
          </p>
          <div className="mx-auto mt-6 flex max-w-md gap-2">
            <Input placeholder="you@email.com" className="font-sans" />
            <Button className="shrink-0 font-sans">Subscribe</Button>
          </div>
        </div>
      </main>

      <TokenPanel themeName={theme.name} />

      {/* Colophon */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center font-sans text-xs uppercase tracking-widest text-muted">
          <p>The Northwind Review · Set in Newsreader and Karla</p>
          <p className="mt-1">
            {theme.name} — every rule and column drawn from theme tokens
          </p>
        </div>
      </footer>
    </>
  );
}
