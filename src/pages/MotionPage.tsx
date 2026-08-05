import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getMotion, motionStyles } from "../motion";
import { themes } from "../themes";
import { CurveAtlas } from "../components/motion/CurveAtlas";
import { RaceTrack } from "../components/motion/RaceTrack";
import { DurationLadder } from "../components/motion/DurationLadder";
import { InteractionLab } from "../components/motion/InteractionLab";
import { SpringBench } from "../components/motion/SpringBench";
import { MotionTokenPanel } from "../components/motion/MotionTokenPanel";
import { cn } from "../lib/cn";

/**
 * /motion/:slug — the easing lab.
 *
 * Mirrors ThemePage's shell (breadcrumb, switcher, sticky bar) so the two axes
 * behave the same way. The theme picker here is the point of the page as much as
 * the motion is: you're choosing a pair, and the only way to judge a pairing is
 * to see the components under both at once.
 */

const LAB_THEME_KEY = "kidastro-motion-lab-theme";

export default function MotionPage() {
  const { slug } = useParams();
  const motion = getMotion(slug);
  const navigate = useNavigate();

  // Which theme the lab renders in. Persisted, because comparing motion styles
  // means hopping between them and losing your theme each time is maddening.
  const [themeSlug, setThemeSlug] = useState(() => {
    if (typeof localStorage === "undefined") return "minimal";
    return localStorage.getItem(LAB_THEME_KEY) ?? "minimal";
  });
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    localStorage.setItem(LAB_THEME_KEY, themeSlug);
  }, [themeSlug]);

  useEffect(() => {
    if (motion) document.title = `${motion.name} motion — kidastro-themes`;
    return () => {
      document.title = "kidastro-themes";
    };
  }, [motion]);

  // ←/→ hop between motion styles, matching ThemePage's behavior.
  useEffect(() => {
    if (!motion) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const target = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const i = motionStyles.findIndex((m) => m.slug === motion.slug);
      const delta = e.key === "ArrowLeft" ? -1 : 1;
      const next = motionStyles[(i + delta + motionStyles.length) % motionStyles.length];
      navigate(`/motion/${next.slug}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [motion, navigate]);

  if (!motion) return <Navigate to="/motion" replace />;

  return (
    <div
      data-theme={themeSlug}
      data-motion={motion.slug}
      data-reduce={reduce ? "true" : undefined}
      className="min-h-screen bg-bg font-sans text-fg"
    >
      <div className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <Link
              to="/motion"
              aria-label="Back to all motion styles"
              className="shrink-0 opacity-80 transition-opacity hover:opacity-100"
            >
              <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width={28} height={28} />
            </Link>
            <nav aria-label="Breadcrumb" className="hidden text-sm font-medium md:block">
              <ol className="flex items-center gap-2">
                <li>
                  <Link to="/" className="text-muted transition-colors hover:text-fg">
                    themes
                  </Link>
                </li>
                <li aria-hidden className="text-muted/40">/</li>
                <li>
                  <Link to="/motion" className="text-muted transition-colors hover:text-fg">
                    motion
                  </Link>
                </li>
                <li aria-hidden className="text-muted/40">/</li>
                <li aria-current="page" className="truncate text-fg">{motion.name}</li>
              </ol>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Motion switcher */}
            <div className="flex rounded-md border border-border p-0.5">
              {motionStyles.map((m) => (
                <Link
                  key={m.slug}
                  to={`/motion/${m.slug}`}
                  aria-current={m.slug === motion.slug ? "page" : undefined}
                  className={cn(
                    "rounded px-2 py-1 text-xs font-medium transition-colors",
                    m.slug === motion.slug
                      ? "bg-primary text-primary-fg"
                      : "text-muted hover:bg-surface-2 hover:text-fg"
                  )}
                >
                  {m.name}
                </Link>
              ))}
            </div>

            {/* Theme picker — the other half of the pair. */}
            <label className="flex items-center gap-1.5 text-xs text-muted">
              <span className="hidden sm:inline">theme</span>
              <select
                value={themeSlug}
                onChange={(e) => setThemeSlug(e.target.value)}
                aria-label="Theme"
                className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {themes.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>

            <label
              className="flex cursor-pointer items-center gap-1.5 text-xs text-muted"
              title="Force the reduced-motion code path"
            >
              <input
                type="checkbox"
                checked={reduce}
                onChange={(e) => setReduce(e.target.checked)}
                className="accent-primary"
              />
              reduced
            </label>
          </div>
        </div>
      </div>

      <header className="mx-auto max-w-6xl px-6 pb-2 pt-12">
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {motion.name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{motion.description}</p>
        <p className="mt-4 text-sm text-muted">
          Tuned against{" "}
          {motion.pairsWith.map((s, i) => (
            <span key={s}>
              {i > 0 && ", "}
              <button
                type="button"
                onClick={() => setThemeSlug(s)}
                className="font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
              >
                {s}
              </button>
            </span>
          ))}
          . Any theme works — these are just where it was aimed.
        </p>
        {reduce && (
          <p className="mt-4 rounded-lg border border-warning/40 bg-warning/10 px-4 py-2 text-sm text-warning">
            Reduced-motion preview is on. Everything below should still be legible
            and complete — just not animated.
          </p>
        )}
      </header>

      <main>
        <CurveAtlas motion={motion} />
        <DurationLadder motion={motion} />
        <RaceTrack motion={motion} />
        <InteractionLab motion={motion} />
        <SpringBench motion={motion} />
        <MotionTokenPanel motion={motion} />
      </main>

      <footer className="border-t border-border px-6 py-10 text-center text-sm text-muted">
        <Link to="/" className="underline decoration-border underline-offset-4 hover:text-fg">
          all themes
        </Link>
        <span className="mx-3 text-border">·</span>
        <Link to="/motion" className="underline decoration-border underline-offset-4 hover:text-fg">
          all motion styles
        </Link>
      </footer>
    </div>
  );
}
