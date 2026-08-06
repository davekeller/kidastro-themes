import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getInteraction, InteractionProvider, interactionStyles } from "../interaction";
import { DEFAULT_MOTION, getMotion, motionStyles } from "../motion";
import { themes } from "../themes";
import { DisclosureDemo } from "../components/interaction/DisclosureDemo";
import { NavDemo } from "../components/interaction/NavDemo";
import { AffordanceDemo } from "../components/interaction/AffordanceDemo";
import { ScrollRevealDemo } from "../components/interaction/ScrollRevealDemo";
import { Badge } from "../components/primitives";
import { cn } from "../lib/cn";

/**
 * /interaction/:slug — the third axis, demonstrated.
 *
 * Scoped as a proof of concept rather than a library-wide retrofit: four demo
 * components branch on the flags, and the hook is available for real use. Making
 * every primitive interaction-aware is a much larger job than making them
 * motion-aware was, because motion could ride Tailwind's transition defaults and
 * structure can't.
 */

const LAB_KEY = "kidastro-interaction-lab-theme";

export default function InteractionPage() {
  const { slug } = useParams();
  const interaction = getInteraction(slug);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const motionSlug = getMotion(params.get("motion") ?? "")?.slug ?? DEFAULT_MOTION;
  const [themeSlug, setThemeSlug] = useState(() =>
    typeof localStorage === "undefined" ? "minimal" : localStorage.getItem(LAB_KEY) ?? "minimal"
  );

  useEffect(() => {
    localStorage.setItem(LAB_KEY, themeSlug);
  }, [themeSlug]);

  useEffect(() => {
    if (interaction) document.title = `${interaction.name} interaction — kidastro-themes`;
    return () => {
      document.title = "kidastro-themes";
    };
  }, [interaction]);

  useEffect(() => {
    if (!interaction) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const t = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      const i = interactionStyles.findIndex((x) => x.slug === interaction.slug);
      const d = e.key === "ArrowLeft" ? -1 : 1;
      const next = interactionStyles[(i + d + interactionStyles.length) % interactionStyles.length];
      navigate(`/interaction/${next.slug}${params.toString() ? `?${params}` : ""}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [interaction, navigate, params]);

  if (!interaction) return <Navigate to="/interaction" replace />;

  const setMotion = (next: string) =>
    setParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        if (next === DEFAULT_MOTION) p.delete("motion");
        else p.set("motion", next);
        return p;
      },
      { replace: true }
    );

  return (
    <div
      data-theme={themeSlug}
      data-motion={motionSlug}
      data-interaction={interaction.slug}
      className="min-h-screen bg-bg font-sans text-fg"
    >
      <div className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-2">
          <nav aria-label="Breadcrumb" className="text-sm font-medium">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="text-muted transition-colors hover:text-fg">themes</Link>
              </li>
              <li aria-hidden className="text-muted/40">/</li>
              <li>
                <Link to="/interaction" className="text-muted transition-colors hover:text-fg">
                  interaction
                </Link>
              </li>
              <li aria-hidden className="text-muted/40">/</li>
              <li aria-current="page" className="text-fg">{interaction.name}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-md border border-border p-0.5">
              {interactionStyles.map((i) => (
                <Link
                  key={i.slug}
                  to={`/interaction/${i.slug}${params.toString() ? `?${params}` : ""}`}
                  aria-current={i.slug === interaction.slug ? "page" : undefined}
                  className={cn(
                    "rounded px-2 py-1 text-xs font-medium transition-colors",
                    i.slug === interaction.slug
                      ? "bg-primary text-primary-fg"
                      : "text-muted hover:bg-surface-2 hover:text-fg"
                  )}
                >
                  {i.name}
                </Link>
              ))}
            </div>

            <label className="flex items-center gap-1.5 text-xs text-muted">
              <span className="hidden sm:inline">motion</span>
              <select
                value={motionSlug}
                onChange={(e) => setMotion(e.target.value)}
                aria-label="Motion style"
                className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {motionStyles.map((m) => (
                  <option key={m.slug} value={m.slug}>{m.name}</option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-muted">
              <span className="hidden sm:inline">theme</span>
              <select
                value={themeSlug}
                onChange={(e) => setThemeSlug(e.target.value)}
                aria-label="Theme"
                className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {themes.map((t) => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <header className="mx-auto max-w-6xl px-6 pb-2 pt-12">
        <Badge variant="outline" className="mb-4">Third axis · proof of concept</Badge>
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {interaction.name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{interaction.description}</p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-4">
          {[
            ["disclosure", interaction.disclosure],
            ["nav", interaction.nav],
            ["affordance", interaction.affordance],
            ["scroll reveal", interaction.scrollReveal],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border bg-surface p-3 elev-1">
              <dt className="text-[11px] uppercase tracking-wide text-muted">{k}</dt>
              <dd className="mt-0.5 font-mono text-sm text-fg">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-2xl rounded-lg border border-border bg-surface-2/50 px-4 py-3 text-sm text-muted">
          Unlike themes and motion, this axis changes <strong className="text-fg">structure</strong>{" "}
          — what gets rendered, not how it&rsquo;s styled. So it&rsquo;s delivered through
          React context rather than CSS variables alone, and the four demos below
          branch on those flags. The rest of the component library is not yet
          interaction-aware; that&rsquo;s a bigger job than motion was, because motion
          could ride Tailwind&rsquo;s transition defaults and structure can&rsquo;t.
        </p>
      </header>

      <InteractionProvider interaction={interaction}>
        <main className="mx-auto max-w-6xl space-y-5 px-6 py-12">
          <div className="grid gap-5 lg:grid-cols-2">
            <DisclosureDemo />
            <NavDemo />
          </div>
          <AffordanceDemo />
          <ScrollRevealDemo />
        </main>
      </InteractionProvider>

      <footer className="border-t border-border px-6 py-10 text-center text-sm text-muted">
        <Link
          to={`/start?interaction=${interaction.slug}&motion=${motionSlug}&theme=${themeSlug}`}
          className="underline decoration-border underline-offset-4 hover:text-fg"
        >
          take this trio to /start
        </Link>
      </footer>
    </div>
  );
}
