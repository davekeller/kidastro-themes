import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { themes } from "../themes";
import { DEFAULT_MOTION, getMotion, motionStyles } from "../motion";
import { DEFAULT_INTERACTION, getInteraction, interactionStyles } from "../interaction";
import { Badge, Button, Card, CardContent, CardDescription, CardTitle, Switch } from "../components/primitives";
import { StatTile } from "../components/primitives";
import { Starfield } from "../components/Starfield";
import { NorthernLights } from "../components/NorthernLights";
import { motionTokenNames, tokenNames } from "../lib/tokens";
import { cn } from "../lib/cn";

/**
 * /start — the handoff.
 *
 * Pick a theme, pick a motion style, get one block you can paste into a fresh
 * project along with a short instruction paragraph for an AI tool. This is the
 * page the whole library exists to feed: everything else is browsing, this is
 * leaving with something.
 *
 * Values are read from a live, hidden element carrying both attributes, so what
 * you copy is what the preview is actually running rather than what a registry
 * claims.
 */

export default function Start() {
  const [params, setParams] = useSearchParams();
  const themeSlug = themes.find((t) => t.slug === params.get("theme"))?.slug ?? "minimal";
  const motionSlug = getMotion(params.get("motion") ?? "")?.slug ?? DEFAULT_MOTION;
  const interactionSlug =
    getInteraction(params.get("interaction") ?? "")?.slug ?? DEFAULT_INTERACTION;

  const theme = themes.find((t) => t.slug === themeSlug)!;
  const motion = getMotion(motionSlug)!;
  const interaction = getInteraction(interactionSlug)!;

  const probeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<"css" | "prompt" | null>(null);
  const [resolved, setResolved] = useState<Record<string, string>>({});

  /* Functional updater, not a closed-over `params`. Two picks landing in the
     same React batch would both read the pre-batch value, and the second would
     silently drop the first — selecting a theme and a motion style in quick
     succession lost the theme. */
  const set = (key: "theme" | "motion" | "interaction", value: string) => {
    setParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.set(key, value);
        return p;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    document.title = "Start a project — kidastro-themes";
    return () => {
      document.title = "kidastro-themes";
    };
  }, []);

  /* Re-read on every pair change. getComputedStyle is cheap here and it's the
     only way to be sure the emitted block matches the rendered preview — the
     registry could drift from index.css, and index.css is the truth. */
  useEffect(() => {
    if (!probeRef.current) return;
    const cs = getComputedStyle(probeRef.current);
    const next: Record<string, string> = {};
    for (const n of [...tokenNames, ...motionTokenNames]) {
      next[n] = cs.getPropertyValue(n).trim();
    }
    setResolved(next);
  }, [themeSlug, motionSlug]);

  const css = useMemo(() => {
    const block = (selector: string, names: readonly string[]) => {
      const lines = names
        .map((n) => (resolved[n] ? `  ${n}: ${resolved[n]};` : null))
        .filter(Boolean);
      return lines.length ? `${selector} {\n${lines.join("\n")}\n}` : "";
    };

    return [
      `/* ${theme.name} + ${motion.name} + ${interaction.name} — from kidastro.com/themes */`,
      ``,
      block(`[data-theme="${themeSlug}"]`, tokenNames),
      ``,
      block(`[data-motion="${motionSlug}"]`, motionTokenNames),
      ``,
      `/* Map the raw variables into Tailwind. Without the two`,
      `   --default-transition-* lines, every transition-* utility keeps`,
      `   Tailwind's stock 150ms and the motion style does nothing. */`,
      `@theme inline {`,
      `  --color-bg: var(--bg);`,
      `  --color-surface: var(--surface);`,
      `  --color-surface-2: var(--surface-2);`,
      `  --color-fg: var(--fg);`,
      `  --color-muted: var(--muted);`,
      `  --color-border: var(--border);`,
      `  --color-ring: var(--ring);`,
      `  --color-primary: var(--primary);`,
      `  --color-primary-fg: var(--primary-fg);`,
      `  --color-accent: var(--accent);`,
      `  --color-accent-fg: var(--accent-fg);`,
      `  --color-success: var(--success);`,
      `  --color-warning: var(--warning);`,
      `  --color-danger: var(--danger);`,
      ``,
      `  --radius-sm: calc(var(--radius) - 4px);`,
      `  --radius-md: calc(var(--radius) - 2px);`,
      `  --radius-lg: var(--radius);`,
      `  --radius-xl: calc(var(--radius) + 4px);`,
      `  --radius-2xl: calc(var(--radius) + 8px);`,
      ``,
      `  --font-sans: var(--font-sans);`,
      `  --font-serif: var(--font-serif);`,
      `  --font-mono: var(--font-mono);`,
      `  --font-display: var(--font-display);`,
      ``,
      `  --ease-standard: var(--curve-standard);`,
      `  --ease-entrance: var(--curve-entrance);`,
      `  --ease-exit: var(--curve-exit);`,
      `  --ease-emphasis: var(--curve-emphasis);`,
      `  --default-transition-duration: var(--dur-2);`,
      `  --default-transition-timing-function: var(--curve-standard);`,
      `}`,
      ``,
      `/* Helpers the components expect. */`,
      `.elev-1 { box-shadow: var(--elev-1); }`,
      `.elev-2 { box-shadow: var(--elev-2); }`,
      `.glow   { box-shadow: var(--elev-glow); }`,
      `.dur-1 { transition-duration: var(--dur-1); }`,
      `.dur-2 { transition-duration: var(--dur-2); }`,
      `.dur-3 { transition-duration: var(--dur-3); }`,
      `.dur-4 { transition-duration: var(--dur-4); }`,
      `.dur-5 { transition-duration: var(--dur-5); }`,
      `.hover-lift {`,
      `  transition-property: transform, box-shadow;`,
      `  transition-duration: var(--dur-2);`,
      `  transition-timing-function: var(--curve-standard);`,
      `}`,
      `.hover-lift:hover { transform: translateY(var(--lift)); }`,
      `.press-scale:active { transform: scale(var(--press)); }`,
      ``,
      `@media (prefers-reduced-motion: reduce) {`,
      `  .dur-1, .dur-2, .dur-3, .dur-4, .dur-5, .hover-lift {`,
      `    transition-duration: 1ms;`,
      `  }`,
      `  .hover-lift:hover, .press-scale:active { transform: none; }`,
      `}`,
      ``,
    ].join("\n");
  }, [resolved, theme, motion, themeSlug, motionSlug]);

  const prompt = useMemo(
    () =>
      [
        `I'm starting a React + Tailwind CSS v4 project using a design system called`,
        `"${theme.name}" with "${motion.name}" motion and "${interaction.name}" interaction.`,
        ``,
        `Rules:`,
        `- Style with tokens only. Never hardcode a hex, font, radius, shadow, or`,
        `  duration. Use bg-bg, bg-surface, text-fg, text-muted, bg-primary,`,
        `  border-border, ring-ring, rounded-sm|md|lg|xl, font-display|sans|serif|mono,`,
        `  and elev-1 | elev-2 | glow.`,
        `- For motion, use dur-1…dur-5 (micro, control, surface, overlay, scene) and`,
        `  ease-standard | ease-entrance | ease-exit | ease-emphasis. A plain`,
        `  transition-colors is already correct — it resolves through the tokens.`,
        `  Writing duration-300 opts an element out of the system, so don't.`,
        `- Use hover-lift for hover elevation and press-scale for press feedback`,
        `  instead of hardcoding a distance.`,
        `- Set data-theme="${themeSlug}" data-motion="${motionSlug}" data-interaction="${interactionSlug}"`,
        `  on the root element.`,
        `- Respect prefers-reduced-motion; the CSS below already handles the tokens.`,
        ``,
        `Interaction style — "${interaction.name}". These are structural choices,`,
        `not CSS, so build them into your components:`,
        `- Disclosure: open detail ${interaction.disclosure}.`,
        `- Navigation: ${interaction.nav}.`,
        `- Hover affordance: ${interaction.affordance}.`,
        `- Scroll reveal: ${interaction.scrollReveal}.`,
        ``,
        `The theme is ${theme.description.toLowerCase()}`,
        `The motion is ${motion.description.toLowerCase()}`,
        `The interaction is ${interaction.description.toLowerCase()}`,
        ``,
        `Paste the accompanying CSS into your Tailwind entry file and build from there.`,
      ].join("\n"),
    [theme, motion, interaction, themeSlug, motionSlug, interactionSlug]
  );

  const copy = async (which: "css" | "prompt") => {
    await navigator.clipboard.writeText(which === "css" ? css : prompt);
    setCopied(which);
    setTimeout(() => setCopied((c) => (c === which ? null : c)), 1800);
  };

  return (
    <div data-theme="kidastro" className="space-bg relative min-h-screen font-sans text-fg">
      <NorthernLights />
      <Starfield />
      <div aria-hidden className="color-bar fixed top-0 z-50 h-[3px] w-full" />

      {/* Hidden probe carrying the chosen pair — the source of the copied values. */}
      <div
        ref={probeRef}
        data-theme={themeSlug}
        data-motion={motionSlug}
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium">
          <ol className="flex items-center gap-2">
            <li>
              <a href="https://kidastro.com" className="text-muted transition-colors hover:text-fg">
                kidastro
              </a>
            </li>
            <li aria-hidden className="text-muted/40">/</li>
            <li>
              <Link to="/" className="text-muted transition-colors hover:text-fg">
                themes
              </Link>
            </li>
            <li aria-hidden className="text-muted/40">/</li>
            <li aria-current="page" className="text-fg">start</li>
          </ol>
        </nav>

        <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
          start a project
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-loose text-muted">
          Pick how it looks and how it moves. Copy one block, hand it to your AI
          tool with the prompt, and start building with the design system already
          in place.
        </p>

        {/* Pickers */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 elev-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Theme — how it looks
            </h2>
            {/* Two columns at most: the three-axis layout leaves this card about
                a third of the page, and three columns truncated every theme name
                to two characters. */}
            <div className="mt-4 grid max-h-72 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {themes.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => set("theme", t.slug)}
                  aria-pressed={t.slug === themeSlug}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs transition-colors",
                    t.slug === themeSlug
                      ? "border-primary bg-primary/10 text-fg"
                      : "border-border text-muted hover:bg-surface-2 hover:text-fg"
                  )}
                >
                  <span data-theme={t.slug} className="flex shrink-0 gap-0.5">
                    <span className="h-3.5 w-3.5 rounded-full border border-border bg-bg" />
                    <span className="h-3.5 w-3.5 rounded-full bg-primary" />
                    <span className="h-3.5 w-3.5 rounded-full bg-accent" />
                  </span>
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 elev-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Motion — how it moves
            </h2>
            <div className="mt-4 space-y-2">
              {motionStyles.map((m) => (
                <button
                  key={m.slug}
                  type="button"
                  onClick={() => set("motion", m.slug)}
                  aria-pressed={m.slug === motionSlug}
                  className={cn(
                    "block w-full rounded-lg border px-3 py-2 text-left transition-colors",
                    m.slug === motionSlug
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-surface-2"
                  )}
                >
                  <span className="text-sm font-medium text-fg">{m.name}</span>
                  <span className="mt-0.5 block text-xs text-muted">{m.description}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 elev-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Interaction — how it&rsquo;s built
            </h2>
            <div className="mt-4 space-y-2">
              {interactionStyles.map((i) => (
                <button
                  key={i.slug}
                  type="button"
                  onClick={() => set("interaction", i.slug)}
                  aria-pressed={i.slug === interactionSlug}
                  className={cn(
                    "block w-full rounded-lg border px-3 py-2 text-left transition-colors",
                    i.slug === interactionSlug
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-surface-2"
                  )}
                >
                  <span className="text-sm font-medium text-fg">{i.name}</span>
                  <span className="mt-0.5 block font-mono text-[11px] text-muted">
                    {i.disclosure} · {i.nav} · {i.affordance}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live preview in the chosen pair */}
        <section
          data-theme={themeSlug}
          data-motion={motionSlug}
          className="mt-10 overflow-hidden rounded-2xl border border-border"
        >
          <div className="bg-bg p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
                  {theme.name} · {motion.name}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Hover and press these. This is the pair you&rsquo;ll be copying.
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="hover-lift press-scale">Primary</Button>
                <Button variant="outline" className="hover-lift press-scale">
                  Outline
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <StatTile label="Revenue" value="$48.2k" delta="12.4%" trend="up" />
              <StatTile label="Churn" value="1.8%" delta="0.4%" trend="down" />
              <Card className="hover-lift cursor-pointer">
                <CardContent>
                  <CardTitle className="text-base">A card</CardTitle>
                  <CardDescription>Rises by this style&rsquo;s lift token.</CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Switch defaultChecked label="Token-driven" />
              <Badge variant="primary">{themeSlug}</Badge>
              <Badge variant="outline">{motionSlug}</Badge>
              <Link
                to={`/theme/${themeSlug}?motion=${motionSlug}`}
                className="text-sm font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
              >
                See the full showcase →
              </Link>
            </div>
          </div>
        </section>

        {/* Handoff */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5 elev-1">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                1 · The CSS
              </h2>
              <Button size="sm" variant={copied === "css" ? "secondary" : "primary"} onClick={() => copy("css")}>
                {copied === "css" ? "Copied" : "Copy CSS"}
              </Button>
            </div>
            <pre className="mt-4 max-h-80 overflow-auto rounded-lg border border-border bg-bg p-4 font-mono text-[11px] leading-relaxed text-fg">
              <code>{css}</code>
            </pre>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 elev-1">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                2 · The prompt
              </h2>
              <Button
                size="sm"
                variant={copied === "prompt" ? "secondary" : "primary"}
                onClick={() => copy("prompt")}
              >
                {copied === "prompt" ? "Copied" : "Copy prompt"}
              </Button>
            </div>
            <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-bg p-4 font-mono text-[11px] leading-relaxed text-fg">
              <code>{prompt}</code>
            </pre>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted">
          Browse{" "}
          <Link to="/" className="underline decoration-border underline-offset-4 hover:text-fg">
            all {themes.length} themes
          </Link>{" "}
          or{" "}
          <Link to="/motion" className="underline decoration-border underline-offset-4 hover:text-fg">
            all {motionStyles.length} motion styles
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
