import type { ThemeMeta } from "./types";

/**
 * The curated skin registry. Each skin has one canonical palette for now; its
 * token values live in src/index.css under a matching [data-theme] block.
 * The guidance fields feed the AI handoff on /start.
 */
export const themes: ThemeMeta[] = [
  {
    slug: "kidastro",
    name: "Kid Astro",
    description: "Deep-space navy, Bricolage Grotesque, and a sharp arcade palette.",
    tags: ["Dark", "Portfolio", "Playful"],
    bestFor: ["creative portfolios", "experimental products", "developer tools with personality"],
    designRules: [
      "Use deep navy layers instead of flat black",
      "Let teal lead while acid yellow and pink appear as small arcade signals",
      "Balance rounded glassy surfaces with crisp technical details",
    ],
    avoid: ["large rainbow gradients", "corporate blue-on-white defaults"],
  },
  {
    slug: "minimal",
    name: "Clean / Minimal",
    description: "Neutral, exact, and calm: subtle borders, compact spacing, confident blue.",
    tags: ["Light", "Product", "Neutral"],
    bestFor: ["SaaS products", "workflow apps", "general-purpose prototypes"],
    designRules: [
      "Create hierarchy with spacing and type before adding containers",
      "Keep surfaces white and separate them with quiet gray keylines",
      "Reserve blue for actions, selection, and focus",
    ],
    avoid: ["decorative gradients", "oversized radii", "heavy shadows"],
  },
  {
    slug: "editorial",
    name: "Editorial / Warm",
    description: "Warm paper, rust and moss accents, and a literary serif voice.",
    tags: ["Light", "Editorial", "Serif"],
    bestFor: ["publishing", "content-rich products", "thoughtful brand sites"],
    designRules: [
      "Use serif display type for narrative hierarchy and sans serif for utility",
      "Treat the background as warm paper, never pure white",
      "Use rust and moss as restrained editorial markers",
    ],
    avoid: ["dashboard density", "glossy effects", "cold neutral grays"],
  },
  {
    slug: "luxe",
    name: "Luxe / Noir",
    description: "Near-black, champagne gold, and high-contrast Garamond. Quiet luxury.",
    tags: ["Dark", "Luxury", "Serif"],
    bestFor: ["luxury commerce", "hospitality", "fashion and cultural brands"],
    designRules: [
      "Build contrast from charcoal, cream, and measured champagne accents",
      "Use high-contrast serif headlines with generous breathing room",
      "Keep decoration thin, symmetrical, and deliberate",
    ],
    avoid: ["bright white panels", "dense card grids", "casual rounded type"],
  },
  {
    slug: "botanical",
    name: "Organic / Botanical",
    description: "Sage paper, forest green, terracotta, and a calm bookish serif.",
    tags: ["Light", "Natural", "Serif"],
    bestFor: ["wellness", "food and agriculture", "sustainable products"],
    designRules: [
      "Layer sage-tinted paper surfaces with forest-green anchors",
      "Use terracotta as a warm counterpoint rather than a second primary",
      "Favor bookish typography and comfortable, human spacing",
    ],
    avoid: ["neon colors", "hard black outlines", "sterile all-white sections"],
  },
  {
    slug: "bento",
    name: "Bento / Grid",
    description: "Keynote-modern product storytelling in one asymmetric grid of rounded tiles.",
    tags: ["Light", "Product", "Grid"],
    bestFor: ["feature launches", "product overviews", "personal dashboards"],
    designRules: [
      "Compose the page as a varied tile rhythm instead of stacked sections",
      "Give every tile one clear idea and one dominant scale",
      "Use large radii, pale gray canvas, and crisp electric-blue actions",
    ],
    avoid: ["same-size card grids", "long prose inside tiles", "multiple competing accents"],
  },
  {
    slug: "linear",
    name: "Dark / Product",
    description: "Dev-tool precision: near-black layers, hairline glows, and compact product detail.",
    tags: ["Dark", "Product", "Technical"],
    bestFor: ["developer tools", "B2B software", "AI and infrastructure products"],
    designRules: [
      "Use near-black layers separated by hairline borders and subtle indigo light",
      "Keep type compact, neutral, and information-first",
      "Use keyboard hints and precise state details to make the interface feel engineered",
    ],
    avoid: ["large soft shadows", "playful illustration", "oversized marketing type"],
  },
  {
    slug: "aurora",
    name: "Aurora / Mesh",
    description: "Stripe-era optimism with indigo-to-cyan atmosphere and floating white product UI.",
    tags: ["Light", "SaaS", "Colorful"],
    bestFor: ["fintech", "growth SaaS", "platform marketing"],
    designRules: [
      "Keep content surfaces white while color lives in atmospheric washes",
      "Use indigo as the action color and cyan as illumination",
      "Float a small number of product surfaces across generous white space",
    ],
    avoid: ["gradient-filled body text", "rainbow card backgrounds", "dark heavy chrome"],
  },
  {
    slug: "neubrutalist",
    name: "Neubrutalist / Candy",
    description: "Gumroad energy: hot pink, thick ink, offset shadows, stickers, and marquee type.",
    tags: ["Light", "Playful", "Bold"],
    bestFor: ["creator tools", "indie commerce", "youthful community products"],
    designRules: [
      "Outline every important surface with black ink and a hard offset shadow",
      "Use flat candy fills, stickers, and purposeful rotation",
      "Make type blunt, friendly, and unapologetically visible",
    ],
    avoid: ["soft shadows", "muted beige-on-beige palettes", "delicate hairline UI"],
  },
  {
    slug: "clay",
    name: "Clay / Soft 3D",
    description: "Friendly, puffy, and tactile with chunky controls and a playful lesson rhythm.",
    tags: ["Light", "Playful", "3D"],
    bestFor: ["learning products", "family apps", "friendly consumer fintech"],
    designRules: [
      "Make controls feel pressable with inset lower edges and rounded mass",
      "Use cheerful green as progress and blue as support",
      "Prefer chunky labels, short copy, and obvious completion states",
    ],
    avoid: ["thin low-contrast controls", "sharp corners", "formal editorial layouts"],
  },
  {
    slug: "broadsheet",
    name: "Editorial / Broadsheet",
    description: "Newsprint structure with masthead rules, columns, drop caps, and decisive headlines.",
    tags: ["Light", "Editorial", "Print"],
    bestFor: ["news products", "newsletters", "research and cultural publishing"],
    designRules: [
      "Build hierarchy with masthead rules, columns, and headline scale",
      "Use red sparingly for editorial urgency and blue for references",
      "Let dense typography replace most cards and containers",
    ],
    avoid: ["rounded app cards", "centered SaaS heroes", "decorative gradients"],
  },
  {
    slug: "y2k",
    name: "Y2K / Retro-future",
    description: "Poolsuite nostalgia: sun-faded cream, chrome bevels, OS windows, and pixel metadata.",
    tags: ["Light", "Retro", "Playful"],
    bestFor: ["music and media", "fashion drops", "playful utilities"],
    designRules: [
      "Frame content as compact desktop windows with bevelled edges",
      "Mix chunky sans type with pixel-sized system labels",
      "Use faded coral and pool blue over sun-worn beige",
    ],
    avoid: ["perfectly flat cards", "modern glass blur", "corporate stock imagery"],
  },
  {
    slug: "organic",
    name: "Organic / Hand-drawn",
    description: "Warm paper, squiggles, tilted polaroids, and an intentionally pasted-up rhythm.",
    tags: ["Light", "Editorial", "Hand-drawn"],
    bestFor: ["personal tools", "creative communities", "independent publications"],
    designRules: [
      "Keep the base calm and paper-like, then add imperfect marks by hand",
      "Use slight rotation and asymmetric placement to create a pasted-up rhythm",
      "Pair handwritten display moments with a readable book serif",
    ],
    avoid: ["perfectly uniform grids", "high-gloss effects", "too many doodles at once"],
  },
  {
    slug: "swiss",
    name: "Swiss / Grid",
    description: "International Style refined through exposed grids, numbered systems, and signal red.",
    tags: ["Light", "Typographic", "Grid"],
    bestFor: ["design studios", "cultural institutions", "structured portfolios"],
    designRules: [
      "Expose the grid with rules, alignment, numbers, and disciplined whitespace",
      "Let black grotesk typography carry most of the composition",
      "Use signal red for one decisive piece of information at a time",
    ],
    avoid: ["floating cards", "rounded corners", "decorative drop shadows"],
  },
  {
    slug: "specsheet",
    name: "Spec-sheet / Mono",
    description: "An instrument-grade mono system with reference IDs, control surfaces, and dense data.",
    tags: ["Light", "Technical", "Mono"],
    bestFor: ["hardware products", "data-heavy utilities", "technical catalogs"],
    designRules: [
      "Structure the page like an instrument manual with reference IDs and measured rows",
      "Use monospace everywhere and let density communicate capability",
      "Keep electric blue functional and orange reserved for physical controls or warnings",
    ],
    avoid: ["marketing fluff", "large empty hero areas", "soft decorative illustration"],
  },
  {
    slug: "kinetic",
    name: "Kinetic / Agency",
    description: "Awwwards energy at a usable scale: bold type, marquee rhythm, and acid lime on black.",
    tags: ["Dark", "Portfolio", "Bold"],
    bestFor: ["creative agencies", "motion studios", "campaign portfolios"],
    designRules: [
      "Use bold display type as a compositional element without obscuring the content",
      "Create rhythm with marquees, pinned sections, and strong project rows",
      "Let acid lime provide the hit while the rest stays nearly monochrome",
    ],
    avoid: ["every headline filling the viewport", "dense application tables", "multiple neon accents"],
  },
  {
    slug: "console",
    name: "Console / Dashboard",
    description: "A polished operations cockpit with layered navigation, health signals, and deployment data.",
    tags: ["Dark", "Dashboard", "Technical"],
    bestFor: ["operations dashboards", "cloud platforms", "analytics and observability"],
    designRules: [
      "Keep navigation dense and the workspace calm, with status visible at a glance",
      "Use blue for action and selection, cyan for live data, and semantic colors for health",
      "Layer panels with subtle depth while preserving crisp table alignment",
    ],
    avoid: ["marketing-sized headlines", "decorative charts", "bright full-panel status colors"],
  },
  {
    slug: "docs",
    name: "Docs / Knowledge base",
    description: "Three-column documentation with readable prose, persistent anchors, code, and callouts.",
    tags: ["Light", "Docs", "Technical"],
    bestFor: ["developer documentation", "knowledge bases", "product help centers"],
    designRules: [
      "Keep prose width readable and navigation persistent",
      "Use violet for active structure and blue for supporting references",
      "Treat code, callouts, and anchors as first-class content",
    ],
    avoid: ["wide unbroken paragraphs", "floating marketing cards", "low-contrast code blocks"],
  },
  {
    slug: "liquid",
    name: "Liquid / Chrome",
    description: "Wet specular edges, concentric radii, and iridescent violet over deep indigo.",
    tags: ["Dark", "Spatial", "Frosted"],
    bestFor: ["AI products", "premium media", "spatial and immersive interfaces"],
    designRules: [
      "Make panels feel thick with paired top and bottom highlights",
      "Use concentric radii and overlapping layers to imply depth",
      "Keep violet dominant and mint limited to live or positive signals",
    ],
    avoid: ["flat translucent rectangles", "too many overlapping panels", "opaque black surfaces"],
  },
  {
    slug: "native",
    name: "Native / Mobile",
    description: "An iOS-flavored mobile shell with grouped rows, large titles, tabs, and sheets.",
    tags: ["Light", "Mobile", "Product"],
    bestFor: ["mobile prototypes", "settings and account flows", "consumer productivity"],
    designRules: [
      "Design thumb-first with grouped rows, large titles, and clear navigation depth",
      "Let page gray separate white grouped surfaces",
      "Use system blue for action and green only for positive state",
    ],
    avoid: ["desktop-density tables", "tiny tap targets", "ornamental web-style footers"],
  },
];

export function getTheme(slug?: string): ThemeMeta | undefined {
  return themes.find((theme) => theme.slug === slug);
}

export type { ThemeMeta };
