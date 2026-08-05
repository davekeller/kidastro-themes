import { Link } from "react-router-dom";
import { interactionStyles } from "../interaction";
import type { InteractionMeta } from "../interaction/types";
import { AstroHedron } from "../components/AstroHedron";
import { Starfield } from "../components/Starfield";
import { NorthernLights } from "../components/NorthernLights";
import { Badge } from "../components/primitives";

/**
 * /interaction — the third gallery. Cards show the four structural decisions each
 * style makes, since unlike a curve there's nothing to draw: the difference is
 * behavioral and only really lands on the detail page.
 */

export default function InteractionGallery() {
  return (
    <div data-theme="kidastro" className="space-bg relative min-h-screen font-sans text-fg">
      <NorthernLights />
      <Starfield />
      <div aria-hidden className="color-bar fixed top-0 z-50 h-[3px] w-full" />

      <div className="relative z-10">
        <header className="mx-auto max-w-3xl px-6 pb-12 pt-24 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium">
            <ol className="flex items-center justify-center gap-2">
              <li>
                <a href="https://kidastro.com" className="text-muted transition-colors hover:text-fg">
                  kidastro
                </a>
              </li>
              <li aria-hidden className="text-muted/40">/</li>
              <li>
                <Link to="/" className="text-muted transition-colors hover:text-fg">themes</Link>
              </li>
              <li aria-hidden className="text-muted/40">/</li>
              <li aria-current="page" className="text-fg">interaction</li>
            </ol>
          </nav>

          <Badge variant="outline" className="mb-4">Third axis · proof of concept</Badge>
          <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            interaction styles
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-loose text-muted">
            A theme is how it looks. A motion style is how it moves. An interaction
            style is how it&rsquo;s <em>built</em> — whether detail opens in place or on
            top, where navigation lives, how a thing says it&rsquo;s clickable.
          </p>
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {interactionStyles.map((i) => (
              <InteractionCard key={i.slug} interaction={i} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted">
            This axis changes structure rather than values, so it ships as React
            context plus a <code className="font-mono">data-interaction</code>{" "}
            attribute. Four demo components branch on it; the wider library
            doesn&rsquo;t yet.
          </p>
        </main>

        <footer className="pb-16 pt-10 text-center">
          <div className="mx-auto h-[300px] w-full max-w-[420px]">
            <AstroHedron />
          </div>
          <p className="mt-2 text-sm text-muted">
            an extension of{" "}
            <a
              href="https://kidastro.com"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-fg"
            >
              kidastro.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

function InteractionCard({ interaction }: { interaction: InteractionMeta }) {
  const facets: [string, string][] = [
    ["disclosure", interaction.disclosure],
    ["nav", interaction.nav],
    ["affordance", interaction.affordance],
    ["reveal", interaction.scrollReveal],
  ];

  return (
    <Link
      to={`/interaction/${interaction.slug}`}
      className="group block rounded-2xl border border-border bg-surface p-6 elev-1 hover-lift"
    >
      <h3 className="font-display text-xl font-bold tracking-tight text-fg">
        {interaction.name}
      </h3>
      <p className="mt-1.5 text-sm text-muted">{interaction.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-2">
        {facets.map(([k, v]) => (
          <div key={k} className="rounded-md border border-border bg-surface-2/50 px-2.5 py-1.5">
            <dt className="text-[10px] uppercase tracking-wide text-muted">{k}</dt>
            <dd className="font-mono text-xs text-fg">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {interaction.tags.map((t) => (
          <span key={t} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
