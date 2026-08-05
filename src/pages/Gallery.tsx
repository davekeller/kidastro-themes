import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { themes } from "../themes";
import type { ThemeMeta } from "../themes/types";
import { AstroHedron } from "../components/AstroHedron";
import { AstroHelmet } from "../components/AstroHelmet";
import { Starfield } from "../components/Starfield";
import { NorthernLights } from "../components/NorthernLights";
import { FilterChips, Input } from "../components/primitives";

export default function Gallery() {
  const [tags, setTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  // Tag vocabulary comes from the registry itself, so a new theme's tags show
  // up as filters with nothing else to wire.
  const allTags = useMemo(
    () => [...new Set(themes.flatMap((t) => t.tags))].sort((a, b) => a.localeCompare(b)),
    []
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return themes.filter((t) => {
      // Tags are OR'd — selecting "Dark" and "Serif" widens the results
      // rather than demanding both, which at this count is what you want.
      const tagMatch = tags.length === 0 || t.tags.some((tag) => tags.includes(tag));
      const textMatch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return tagMatch && textMatch;
    });
  }, [tags, query]);

  const toggleTag = (tag: string) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  return (
    <div
      data-theme="kidastro"
      className="space-bg relative min-h-screen font-sans text-fg"
    >
      {/* Ambient chrome from the portfolio: aurora, stars, drifting color bar */}
      <NorthernLights />
      <Starfield />
      <div aria-hidden className="color-bar fixed top-0 z-50 h-[3px] w-full" />

      <div className="relative z-10">
        {/* Top-left breadcrumb, matching every other page on the site. Sits above
            the header so it clears the helmet canvas. */}
        <nav aria-label="Breadcrumb" className="absolute top-6 left-6 z-30 text-sm font-medium">
          <ol className="flex items-center gap-2">
            <li>
              <a
                href="https://kidastro.com"
                className="text-muted transition-colors hover:text-fg"
              >
                kidastro
              </a>
            </li>
            <li aria-hidden className="text-muted/40">/</li>
            <li aria-current="page" className="text-fg">themes</li>
          </ol>
        </nav>

        {/* Portfolio-style intro: the /games astro helmet floating over the title */}
        <header className="relative overflow-hidden text-center">
          <div className="h-[340px] sm:h-[400px]">
            <AstroHelmet />
          </div>
          <div className="pointer-events-none relative z-10 mx-auto -mt-14 max-w-3xl px-6 pb-14 sm:-mt-16">
            <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
              kidastro-themes
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-loose text-muted">
              A personal library of {themes.length} hand-tuned UI themes. Click one
              to open its full component showcase, or point your AI tools at any
              theme to bootstrap a prototype with the styling already in place.
            </p>
            <p className="pointer-events-auto mx-auto mt-5 max-w-2xl text-base text-muted">
              Ready to build?{" "}
              <Link
                to="/start"
                className="font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
              >
                Start a project
              </Link>{" "}
              and leave with a theme, a motion style, and a prompt.
            </p>
            <p className="pointer-events-auto mx-auto mt-3 max-w-2xl text-base text-muted">
              There&rsquo;s a second axis too —{" "}
              <Link
                to="/motion"
                className="font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
              >
                motion styles
              </Link>{" "}
              decide how it all moves, and{" "}
              <Link
                to="/interaction"
                className="font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
              >
                interaction styles
              </Link>{" "}
              decide how it&rsquo;s built.
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-8">
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter themes…"
                aria-label="Filter themes"
                className="max-w-xs"
              />
              <p aria-live="polite" className="text-sm text-muted">
                {visible.length} of {themes.length}
              </p>
            </div>
            <FilterChips
              options={allTags}
              selected={tags}
              onToggle={toggleTag}
              onClear={() => setTags([])}
            />
          </div>

          {visible.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((t) => (
                <ThemeCard key={t.slug} theme={t} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-muted">
              Nothing matches that. Try fewer tags.
            </p>
          )}
        </main>

        {/* Sign-off: the homepage icosahedron */}
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

function ThemeCard({ theme }: { theme: ThemeMeta }) {
  return (
    <Link
      to={`/theme/${theme.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface elev-1 hover-lift"
    >
      {/* Live preview rendered in the theme's own tokens */}
      <div data-theme={theme.slug} className="bg-bg p-5">
        <div className="rounded-xl border border-border bg-surface p-4 elev-1">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-fg">Aa</span>
            <span className="flex gap-1">
              <span className="h-4 w-4 rounded-full bg-primary" />
              <span className="h-4 w-4 rounded-full bg-accent" />
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-fg">
              Primary
            </span>
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-fg">
              Outline
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="h-2 flex-1 rounded bg-surface-2" />
            <span className="h-2 w-8 rounded bg-primary" />
          </div>
        </div>
      </div>

      {/* Meta (rendered in the gallery's own neutral theme) */}
      <div className="border-t border-border p-5">
        <h3 className="font-semibold text-fg">{theme.name}</h3>
        <p className="mt-1 text-sm text-muted">{theme.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {theme.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
