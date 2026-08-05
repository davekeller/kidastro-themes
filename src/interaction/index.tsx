import { createContext, useContext, type ReactNode } from "react";
import type { InteractionMeta } from "./types";

/**
 * The interaction registry, plus the provider and hook components use to read it.
 *
 * Unlike themes and motion, this axis is delivered through React context rather
 * than CSS alone, because its choices are structural — a component has to decide
 * *what to render*, not just how to style it. The provider also stamps
 * `data-interaction` on a wrapper so the parts that are pure CSS (hover
 * affordance, scroll reveal) can be handled in the stylesheet.
 */
export const interactionStyles: InteractionMeta[] = [
  {
    slug: "direct",
    name: "Direct",
    description:
      "Everything happens in place. Nothing covers what you were looking at.",
    tags: ["In-place", "Dense", "Fast"],
    pairsWith: ["precise", "mechanical"],
    disclosure: "inline",
    nav: "sticky",
    affordance: "lift",
    scrollReveal: "none",
  },
  {
    slug: "layered",
    name: "Layered",
    description:
      "Detail arrives on top. The conventional web-app posture — modals and overlays.",
    tags: ["Overlays", "Familiar", "App-like"],
    pairsWith: ["precise", "springy"],
    disclosure: "modal",
    nav: "overlay",
    affordance: "lift",
    scrollReveal: "fade",
  },
  {
    slug: "guided",
    name: "Guided",
    description:
      "Detail slides in beside the content, and sections arrive as you reach them.",
    tags: ["Drawer", "Sidebar", "Docs"],
    pairsWith: ["floaty", "precise"],
    disclosure: "drawer",
    nav: "sidebar",
    affordance: "underline",
    scrollReveal: "stagger",
  },
  {
    slug: "expressive",
    name: "Expressive",
    description:
      "Detail takes the whole screen and the cursor is part of the interface.",
    tags: ["Full-screen", "Showy", "Agency"],
    pairsWith: ["cinematic", "floaty"],
    disclosure: "fullscreen",
    nav: "overlay",
    affordance: "cursor",
    scrollReveal: "stagger",
  },
];

export const DEFAULT_INTERACTION = "direct";

export function getInteraction(slug?: string): InteractionMeta | undefined {
  return interactionStyles.find((i) => i.slug === slug);
}

const InteractionContext = createContext<InteractionMeta>(interactionStyles[0]);

/** Read the active interaction style. Components branch on these flags. */
export function useInteraction(): InteractionMeta {
  return useContext(InteractionContext);
}

export function InteractionProvider({
  interaction,
  children,
}: {
  interaction: InteractionMeta;
  children: ReactNode;
}) {
  return (
    <InteractionContext.Provider value={interaction}>{children}</InteractionContext.Provider>
  );
}

export type { InteractionMeta };
