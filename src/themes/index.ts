import type { ThemeMeta } from "./types";

/**
 * The theme registry — the single source of truth for the gallery and routes.
 * Each theme's actual token values live in src/index.css under a
 * [data-theme="<slug>"] block. To add a theme: add a token block in index.css
 * and an entry here. That's it.
 */
export const themes: ThemeMeta[] = [
  {
    slug: "kidastro",
    name: "Kid Astro",
    description:
      "The portfolio theme — deep-space navy, Bricolage Grotesque, and an arcade palette.",
    tags: ["Dark", "Portfolio", "Playful"],
  },
  {
    slug: "minimal",
    name: "Clean / Minimal",
    description:
      "Neutral palette, tight spacing, subtle borders. A calm product/SaaS baseline.",
    tags: ["Neutral", "Product", "SaaS"],
  },
  {
    slug: "neon",
    name: "Dark / Neon",
    description:
      "Dark canvas with cyan and magenta glow. Techy, high-energy, mono display type.",
    tags: ["Dark", "Techy", "Glow"],
  },
  {
    slug: "editorial",
    name: "Editorial / Warm",
    description:
      "Paper tones, warm ink, and a serif display face. Magazine-style and human.",
    tags: ["Serif", "Editorial", "Warm"],
  },
  {
    slug: "brutalist",
    name: "Bold / Brutalist",
    description:
      "Raw paper, pure black ink, zero radius, hard offset shadows. Loud and unapologetic.",
    tags: ["Raw", "High-contrast", "Mono"],
  },
  {
    slug: "terminal",
    name: "Retro / Terminal",
    description:
      "Phosphor green on near-black with an amber accent. Everything set in mono.",
    tags: ["Dark", "CRT", "Mono"],
  },
  {
    slug: "luxe",
    name: "Luxe / Noir",
    description:
      "Near-black canvas, champagne gold, and a garamond display. Quiet luxury.",
    tags: ["Dark", "Luxury", "Serif"],
  },
  {
    slug: "candy",
    name: "Soft / Candy",
    description:
      "Cream, bubblegum, and mint with huge radii and rounded type. Pure play.",
    tags: ["Playful", "Pastel", "Rounded"],
  },
  {
    slug: "botanical",
    name: "Organic / Botanical",
    description:
      "Sage paper, forest green, and terracotta with a bookish serif. Calm and natural.",
    tags: ["Natural", "Calm", "Green"],
  },
  {
    slug: "industrial",
    name: "Industrial / Utility",
    description:
      "Graphite, safety orange, and condensed capitals. Built, not decorated.",
    tags: ["Dark", "Utilitarian", "Bold"],
  },
  {
    slug: "deco",
    name: "Deco / Emerald",
    description:
      "Ivory, deep emerald, and antique gold under a Cinzel display. Gatsby-grade elegance.",
    tags: ["Geometric", "Gold", "Elegant"],
  },
];

export function getTheme(slug?: string): ThemeMeta | undefined {
  return themes.find((t) => t.slug === slug);
}

export type { ThemeMeta };
