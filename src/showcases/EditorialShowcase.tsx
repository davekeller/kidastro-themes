import type { ThemeMeta } from "../themes/types";
import { Button } from "../components/primitives";
import { ArrowRight, Quote } from "../components/icons";
import { TokenPanel } from "../components/sections/TokenPanel";

/** Editorial Warm is an independent journal rather than a newspaper: slow,
 * spacious, image-led, and built around a strong serif reading voice. */
export function EditorialShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-end gap-3 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Issue No. 08</p>
          <a href="#" className="text-center font-display text-2xl font-semibold tracking-tight sm:text-3xl">Field Notes</a>
          <p className="text-right text-xs uppercase tracking-[0.2em] text-muted">Autumn 2026</p>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">The landscape issue</p>
              <h1 className="mt-5 font-display text-6xl font-semibold leading-[0.94] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
                How a place teaches us to pay attention.
              </h1>
            </div>
            <div className="border-t border-border pt-5 lg:col-span-4">
              <p className="font-serif text-xl leading-relaxed">
                Across high desert, city garden, and cold northern coast, five
                people describe the discipline of noticing what remains.
              </p>
              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-widest text-muted">
                <span>Essay · 18 min</span><span>By Mira Chen</span>
              </div>
            </div>
          </div>

          <div className="relative mt-12 aspect-[16/7] overflow-hidden bg-surface-2">
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-primary/10" />
            <div className="absolute -bottom-1/2 left-[8%] h-[120%] w-[32%] rounded-full bg-accent/45" />
            <div className="absolute -bottom-2/3 left-[33%] h-[130%] w-[40%] rounded-full bg-primary/30" />
            <div className="absolute -bottom-1/2 right-[2%] h-[110%] w-[36%] rounded-full bg-fg/12" />
            <p className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-fg/70">High Desert, 35.687° N</p>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-[1fr_3fr]">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Inside this issue</p>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ['01', 'A garden made of borrowed time'],
                ['02', 'The long memory of cold water'],
                ['03', 'Notes from the edge of the city'],
              ].map(([number, title]) => (
                <a key={number} href="#" className="group border-l border-border pl-4">
                  <span className="text-xs text-muted">{number}</span>
                  <p className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-primary">{title}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Editor's letter</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              This issue began with a question: what changes when we stop treating
              attention as a resource to optimize?
            </p>
            <p className="mt-5 font-display text-2xl italic text-primary">— Elena</p>
          </aside>

          <article className="lg:col-span-6">
            <p className="font-serif text-2xl leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.78] first-letter:text-primary">
              Before sunrise, the desert is almost blue. Sound travels differently
              here, as though the space between one thing and another has become part
              of the conversation. Mira walks without headphones and records only
              what she can name from memory.
            </p>
            <p className="mt-7 font-serif text-xl leading-relaxed text-muted">
              Her practice is less about collecting than returning: the same path,
              the same stand of grass, the same hour before heat lifts from the stone.
              Repetition reveals change too slow for a single visit.
            </p>
            <div className="my-10 border-y border-border py-8">
              <Quote size={24} className="text-primary" />
              <blockquote className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight">
                Attention is not a spotlight. It is a place you agree to stay.
              </blockquote>
            </div>
            <Button variant="outline">Continue reading <ArrowRight size={15} /></Button>
          </article>

          <aside className="lg:col-span-3">
            <div className="bg-surface-2 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Field guide</p>
              <h2 className="mt-4 font-display text-2xl font-semibold">Five ways to notice a familiar place.</h2>
              <ol className="mt-5 divide-y divide-border text-sm">
                {['Arrive before the light', 'Leave the camera behind', 'Walk one path twice', 'Name what has changed', 'Return in another season'].map((item, index) => (
                  <li key={item} className="flex gap-3 py-3"><span className="text-primary">{index + 1}</span><span>{item}</span></li>
                ))}
              </ol>
            </div>
          </aside>
        </section>

        <section className="border-y border-border">
          <div className="mx-auto grid max-w-7xl divide-y divide-border px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              ['Culture', 'A library designed for lingering'],
              ['Objects', 'The quiet intelligence of repair'],
              ['Practice', 'Why making by hand still matters'],
            ].map(([section, title], index) => (
              <article key={title} className="py-10 md:px-8 first:pl-0 last:pr-0">
                <div className={`aspect-[4/3] ${index === 0 ? 'bg-primary/18' : index === 1 ? 'bg-accent/22' : 'bg-fg/10'}`} />
                <p className="mt-5 text-xs uppercase tracking-widest text-primary">{section}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{title}</h3>
                <p className="mt-3 text-sm text-muted">A considered dispatch from people building a slower, more durable culture.</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <span className="font-display text-2xl font-semibold">Field Notes</span>
          <span className="text-xs uppercase tracking-widest text-muted">Independent journal · {theme.name}</span>
        </div>
      </footer>
    </>
  );
}
