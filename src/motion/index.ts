import type { MotionMeta } from "./types";

/**
 * The motion registry — the second axis, mirroring src/themes.
 *
 * Each style's actual token values live in src/index.css under a
 * [data-motion="<slug>"] block; that CSS is what the component library reads.
 * The numbers here exist so the instruments on /motion can draw curves and run
 * springs, which needs the values in JS.
 *
 * To add a motion style: add a token block in index.css and an entry here.
 */
export const motionStyles: MotionMeta[] = [
  {
    slug: "precise",
    name: "Precise",
    description:
      "Short, tight, barely any overshoot. Gets out of the way — the default.",
    tags: ["Tight", "Neutral", "Fast"],
    pairsWith: ["linear", "minimal", "console", "docs"],
    curves: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      entrance: "cubic-bezier(0, 0, 0, 1)",
      exit: "cubic-bezier(0.4, 0, 1, 1)",
      emphasis: "cubic-bezier(0.3, 1.3, 0.4, 1)",
    },
    durations: [90, 150, 240, 380, 620],
    spring: { stiffness: 320, damping: 30, mass: 1 },
  },
  {
    slug: "springy",
    name: "Springy",
    description:
      "Overshoots and settles. Everything has a little weight and bounce.",
    tags: ["Bouncy", "Playful", "Overshoot"],
    pairsWith: ["clay", "candy", "neubrutalist", "native"],
    curves: {
      standard: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      entrance: "cubic-bezier(0.22, 1.7, 0.36, 1)",
      exit: "cubic-bezier(0.5, -0.4, 0.8, 0.5)",
      emphasis: "cubic-bezier(0.28, 2, 0.4, 1)",
    },
    durations: [120, 220, 340, 520, 820],
    spring: { stiffness: 260, damping: 12, mass: 1 },
  },
  {
    slug: "floaty",
    name: "Floaty",
    description:
      "Slow, long travel, soft eases. Nothing arrives abruptly. Spatial.",
    tags: ["Slow", "Soft", "Spatial"],
    pairsWith: ["glass", "liquid", "aurora", "kidastro"],
    curves: {
      standard: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
      exit: "cubic-bezier(0.7, 0, 0.84, 0)",
      emphasis: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    durations: [160, 300, 480, 720, 1100],
    spring: { stiffness: 120, damping: 22, mass: 1.4 },
  },
  {
    slug: "mechanical",
    name: "Mechanical",
    description:
      "Linear and stepped, zero overshoot. Micro-interactions don't animate at all.",
    tags: ["Stepped", "Instant", "Technical"],
    pairsWith: ["specsheet", "terminal", "brutalist", "swiss"],
    curves: {
      standard: "linear",
      entrance: "steps(4, end)",
      exit: "steps(3, end)",
      emphasis: "linear",
    },
    durations: [0, 70, 110, 160, 240],
    spring: { stiffness: 900, damping: 60, mass: 1 },
  },
  {
    slug: "cinematic",
    name: "Cinematic",
    description:
      "Long, heavy ease-in-out, big travel. Every transition is a camera move.",
    tags: ["Slow", "Dramatic", "Editorial"],
    pairsWith: ["kinetic", "broadsheet", "luxe", "deco"],
    curves: {
      standard: "cubic-bezier(0.65, 0, 0.35, 1)",
      entrance: "cubic-bezier(0.22, 1, 0.36, 1)",
      exit: "cubic-bezier(0.64, 0, 0.78, 0)",
      emphasis: "cubic-bezier(0.83, 0, 0.17, 1)",
    },
    durations: [200, 400, 650, 950, 1500],
    spring: { stiffness: 90, damping: 26, mass: 2 },
  },
];

/** The style used when no data-motion attribute is set (see :root in index.css). */
export const DEFAULT_MOTION = "precise";

export function getMotion(slug?: string): MotionMeta | undefined {
  return motionStyles.find((m) => m.slug === slug);
}

export type { MotionMeta };
