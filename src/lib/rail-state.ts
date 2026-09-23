import { useSyncExternalStore } from "react";

/* The house rail's width, kept the way the skin pair is: as an attribute on
 * <body>. index.html restores it before the first paint, so the page never
 * jumps from collapsed to expanded on load, and the rail and the column beside
 * it both size from --rail-w (index.css), which the attribute switches.
 * Collapsed — icons only — is the default. */

export const RAIL_KEY = "kt-rail";
const RAIL_EVENT = "kt-rail-state";

function read(): boolean {
  return document.body.getAttribute("data-rail") === "expanded";
}

export function setRailExpanded(expanded: boolean) {
  if (expanded) document.body.setAttribute("data-rail", "expanded");
  else document.body.removeAttribute("data-rail");
  try {
    localStorage.setItem(RAIL_KEY, expanded ? "expanded" : "collapsed");
  } catch {
    // Private mode or blocked storage — the attribute still applies for this visit.
  }
  window.dispatchEvent(new Event(RAIL_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(RAIL_EVENT, onChange);
  return () => window.removeEventListener(RAIL_EVENT, onChange);
}

/** Whether the rail is expanded, re-rendering when it's toggled anywhere. */
export function useRailExpanded(): boolean {
  return useSyncExternalStore(subscribe, read, () => false);
}
