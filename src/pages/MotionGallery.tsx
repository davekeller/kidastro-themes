import { Link } from "react-router-dom";
import { motionStyles } from "../motion";
import type { MotionMeta } from "../motion/types";
import { AstroHedron } from "../components/AstroHedron";
import { Starfield } from "../components/Starfield";
import { NorthernLights } from "../components/NorthernLights";
import { parseEasing, easingPath } from "../lib/easing";

/**
 * /motion — the second gallery. Same shape and chrome as the theme gallery, so
 * the two axes feel like siblings rather than one bolted onto the other.
 *
 * Each card previews its own curve live: a dot loops the lane in that style's
 * real timing, so you feel the difference before clicking through.
 */

export default function MotionGallery() {
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
                <Link to="/" className="text-muted transition-colors hover:text-fg">
                  themes
                </Link>
              </li>
              <li aria-hidden className="text-muted/40">/</li>
              <li aria-current="page" className="text-fg">motion</li>
            </ol>
          </nav>

          <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            motion styles
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-loose text-muted">
            The second axis. A theme decides how a surface looks; a motion style
            decides how it moves. Pick one, pair it with any theme, and the whole
            component library takes on its timing.
          </p>
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {motionStyles.map((m) => (
              <MotionCard key={m.slug} motion={m} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted">
            Motion here is plain CSS variables — no animation library. Copy a block
            into a project and the feel travels with it.
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

function MotionCard({ motion }: { motion: MotionMeta }) {
  const easing = parseEasing(motion.curves.standard);

  return (
    <Link
      to={`/motion/${motion.slug}`}
      data-motion={motion.slug}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface elev-1 hover-lift"
    >
      {/* Live preview: the curve drawn, and a dot looping it in real timing. */}
      <div className="bg-bg p-5">
        <div className="rounded-xl border border-border bg-surface p-4">
          <svg viewBox="-0.05 -0.05 1.1 1.1" className="h-16 w-full" aria-hidden>
            <line
              x1="0" y1="1" x2="1" y2="0"
              stroke="currentColor" strokeWidth="0.008" strokeDasharray="0.03"
              className="text-border"
            />
            <polyline
              points={easingPath(easing)}
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-primary" vectorEffect="non-scaling-stroke" strokeLinecap="round"
            />
          </svg>

          <div className="relative mt-3 h-6 rounded-md bg-surface-2">
            <span
              className="motion-lane absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-accent"
              style={{
                animationDuration: `${motion.durations[2] * 2 + 900}ms`,
                animationTimingFunction: motion.curves.standard,
              }}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border p-5">
        <h3 className="font-semibold text-fg">{motion.name}</h3>
        <p className="mt-1 text-sm text-muted">{motion.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {motion.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
