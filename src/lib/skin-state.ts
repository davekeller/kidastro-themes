import { useMemo, useSyncExternalStore } from "react";
import {
  DEFAULT_PALETTE,
  DEFAULT_SKIN,
  getSkin,
  isPaletteSlug,
  type PaletteSlug,
} from "../skins";

/* How the active skin × palette works, end to end:
 *
 * The pair lives as data-skin / data-palette on <body> — the DOM is the store,
 * exactly as daves-demos kept its theme on <html>. index.html sets the defaults
 * statically and an inline script restores the saved pair from localStorage
 * before the first paint, so there is no flash of the default; keep that
 * script's keys in step with the constants here. Switching paints the attribute
 * imperatively, persists it, and fires one window event that every subscriber
 * (rail, switcher, style guide) picks up through useSkinState().
 *
 * <body>, not <html>, on purpose: `:root` and `[data-skin="…"]` tie on
 * specificity and the :root theme defaults come later in index.css, so a skin
 * set on <html> would lose its form tokens (radius, type, motion) to them.
 * Nothing in the cascade competes with an attribute on <body>. */

export const SKIN_KEY = "kt-skin";
export const PALETTE_KEY = "kt-palette";
export const SKIN_STATE_EVENT = "kt-skin-state";

export interface SkinState {
  skin: string;
  palette: PaletteSlug;
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage — the attribute still applies for this visit.
  }
}

function announce() {
  window.dispatchEvent(new Event(SKIN_STATE_EVENT));
}

/** Read the live pair off <body>, resolving anything unknown to the defaults. */
export function readSkinState(): SkinState {
  const body = document.body;
  const skin = getSkin(body.getAttribute("data-skin"))?.slug ?? DEFAULT_SKIN;
  const palette = body.getAttribute("data-palette");
  return { skin, palette: isPaletteSlug(palette) ? palette : DEFAULT_PALETTE };
}

export function applySkin(slug: string) {
  const skin = getSkin(slug)?.slug ?? DEFAULT_SKIN;
  if (document.body.getAttribute("data-skin") === skin) return;
  document.body.setAttribute("data-skin", skin);
  persist(SKIN_KEY, skin);
  announce();
}

export function applyPalette(slug: PaletteSlug) {
  const palette = isPaletteSlug(slug) ? slug : DEFAULT_PALETTE;
  if (document.body.getAttribute("data-palette") === palette) return;
  document.body.setAttribute("data-palette", palette);
  persist(PALETTE_KEY, palette);
  announce();
}

/** Repair whatever the inline script restored: a slug saved by a skin that no
 *  longer exists falls back to the default instead of leaving <body> unskinned. */
export function ensureSkinState() {
  const { skin, palette } = readSkinState();
  if (document.body.getAttribute("data-skin") !== skin) applySkin(skin);
  if (document.body.getAttribute("data-palette") !== palette) applyPalette(palette);
}

function subscribe(onChange: () => void) {
  window.addEventListener(SKIN_STATE_EVENT, onChange);
  return () => window.removeEventListener(SKIN_STATE_EVENT, onChange);
}

/* useSyncExternalStore compares snapshots with Object.is, so an unchanged pair
 * must come back as the same object, not a fresh equal one. */
let snapshot: SkinState | null = null;
function getSnapshot(): SkinState {
  const next = readSkinState();
  if (!snapshot || snapshot.skin !== next.skin || snapshot.palette !== next.palette) {
    snapshot = next;
  }
  return snapshot;
}

/** The active skin × palette, live across every subscriber. */
export function useSkinState(): SkinState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

const SEP = "\u0000";

/**
 * The values the given custom properties currently resolve to on <body>, i.e.
 * under the active skin × palette, re-read whenever the pair changes. Pass a
 * module-level constant for `names` so the memo holds.
 */
export function useResolvedTokens(names: readonly string[]): Record<string, string> {
  const joined = useSyncExternalStore(
    subscribe,
    () => {
      const styles = getComputedStyle(document.body);
      return names.map((n) => styles.getPropertyValue(n).trim()).join(SEP);
    },
    () => ""
  );
  return useMemo(() => {
    const values = joined.split(SEP);
    return Object.fromEntries(names.map((n, i) => [n, values[i] ?? ""]));
  }, [joined, names]);
}
