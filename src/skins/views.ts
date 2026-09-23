/** The three ways into a skin, in the order the top bar shows them. The path is
 *  appended to /skin/:slug; `short` is the label at phone width. */
export const SKIN_VIEWS = [
  { key: "page", label: "Page", short: "Page", path: "" },
  { key: "components", label: "Components", short: "Parts", path: "/components" },
  { key: "guide", label: "Style guide", short: "Guide", path: "/guide" },
] as const;

export type SkinView = (typeof SKIN_VIEWS)[number]["key"];
