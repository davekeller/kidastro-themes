import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FilterChips, Input } from "../components/primitives";
import { SkinMiniature } from "../components/skin/SkinMiniature";
import { cn } from "../lib/cn";
import { useSkinState } from "../lib/skin-state";
import { skins, type SkinMeta } from "../skins";
import { themes, type ThemeMeta } from "../themes";

/* The top level of the new IA: every skin as a card that previews itself in
 * all three palettes, then — until Phase 4 has migrated the keepers — the
 * single-palette themes from the previous library, still on their own pages.
 * One search and one tag set filter both sections. */

interface Searchable {
  name: string;
  description: string;
  tags: string[];
}

export default function Themes() {
  const [tags, setTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const { skin: activeSkin } = useSkinState();

  useEffect(() => {
    document.title = "kidastro-themes";
  }, []);

  // A theme that has become a skin leaves the legacy section.
  const legacy = useMemo(() => {
    const migrated = new Set(skins.map((s) => s.slug));
    return themes.filter((t) => !migrated.has(t.slug));
  }, []);

  const allTags = useMemo(
    () =>
      [...new Set([...skins, ...legacy].flatMap((t) => t.tags))].sort((a, b) =>
        a.localeCompare(b)
      ),
    [legacy]
  );

  const matches = (t: Searchable) => {
    const q = query.trim().toLowerCase();
    // Tags are OR'd — selecting "Dark" and "Serif" widens rather than demands both.
    const tagMatch = tags.length === 0 || t.tags.some((tag) => tags.includes(tag));
    const textMatch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q));
    return tagMatch && textMatch;
  };

  const visibleSkins = skins.filter(matches);
  const visibleLegacy = legacy.filter(matches);
  const total = skins.length + legacy.length;
  const shown = visibleSkins.length + visibleLegacy.length;

  const toggleTag = (tag: string) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
      <header>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">Themes</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Pick a skin
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          A skin is a form — radius, ink, type, motion — that wears any of three palettes.
          Open one to see it as a full page, as a component library, and as a style guide.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter — name, tag, vibe…"
            aria-label="Filter themes"
            className="max-w-xs"
          />
          <p aria-live="polite" className="text-sm text-muted">
            {shown} of {total}
          </p>
        </div>
        <FilterChips
          options={allTags}
          selected={tags}
          onToggle={toggleTag}
          onClear={() => setTags([])}
        />
      </div>

      <section className="mt-10">
        <h2 className="flex items-baseline gap-3 font-display text-xl font-semibold tracking-tight">
          Skins
          <span className="font-mono text-xs font-normal tracking-wider text-muted uppercase">
            {visibleSkins.length} · three palettes each
          </span>
        </h2>
        {visibleSkins.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSkins.map((s) => (
              <SkinCard key={s.slug} skin={s} active={s.slug === activeSkin} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-border bg-surface p-6 text-sm text-muted">
            No skin matches that.
          </p>
        )}
      </section>

      {legacy.length > 0 && (
        <section className="mt-14">
          <h2 className="flex items-baseline gap-3 font-display text-xl font-semibold tracking-tight">
            Not yet migrated
            <span className="font-mono text-xs font-normal tracking-wider text-muted uppercase">
              {visibleLegacy.length} · single palette
            </span>
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Themes from the previous library, still on their original pages. Each moves up as
            it is rebuilt as a skin with three palettes.
          </p>
          {visibleLegacy.length > 0 ? (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleLegacy.map((t) => (
                <LegacyCard key={t.slug} theme={t} />
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-lg border border-border bg-surface p-6 text-sm text-muted">
              Nothing here matches that. Try fewer tags.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

function SkinCard({ skin, active }: { skin: SkinMeta; active: boolean }) {
  return (
    <Link
      to={`/skin/${skin.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border border-border bg-surface elev-1 hover-lift",
        active && "ring-2 ring-ring ring-offset-2 ring-offset-bg"
      )}
    >
      {/* The same form in its three colorways, each scoped to its own palette. */}
      <div className="grid grid-cols-3 gap-px bg-border">
        {skin.palettes.map((p) => (
          <span
            key={p.slug}
            data-skin={skin.slug}
            data-palette={p.slug}
            className="block bg-bg p-1.5 text-fg"
          >
            <SkinMiniature />
            <span className="mt-1 block text-center font-mono text-[10px] text-muted">
              {p.slug}
            </span>
          </span>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-semibold tracking-tight text-fg">{skin.name}</h3>
          {active && (
            <span className="shrink-0 rounded-full border border-border bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
              Active
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{skin.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skin.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/** A pre-migration theme: one palette, its own full page at /theme/:slug. */
function LegacyCard({ theme }: { theme: ThemeMeta }) {
  return (
    <Link
      to={`/theme/${theme.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface elev-1 hover-lift"
    >
      <div data-theme={theme.slug} className="bg-bg p-4 text-fg">
        <div className="rounded-xl border border-border bg-surface p-4 elev-1">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold">Aa</span>
            <span className="flex gap-1">
              <span className="h-4 w-4 rounded-full bg-primary" />
              <span className="h-4 w-4 rounded-full bg-accent" />
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-fg">Primary</span>
            <span className="rounded-full border border-border px-2 py-0.5 text-xs">Outline</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="h-2 flex-1 rounded bg-surface-2" />
            <span className="h-2 w-8 rounded bg-primary" />
          </div>
        </div>
      </div>
      <div className="border-t border-border p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-fg">{theme.name}</h3>
          <span className="shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
            legacy
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">{theme.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {theme.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
