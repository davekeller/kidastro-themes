import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { skins } from "../skins";
import { themes } from "../themes";

const QUERY_PARAM = "q";
const TAG_PARAM = "tag";

export interface SearchableTheme {
  name: string;
  description: string;
  tags: string[];
}

const migratedSlugs = new Set(skins.map((skin) => skin.slug));

/** Legacy themes disappear from this collection as soon as they become skins. */
export const legacyThemes = themes.filter((theme) => !migratedSlugs.has(theme.slug));

export const themeFilterOptions = [
  ...new Set([...skins, ...legacyThemes].flatMap((theme) => theme.tags)),
].sort((a, b) => a.localeCompare(b));

const validTags = new Set(themeFilterOptions);
const allThemes: SearchableTheme[] = [...skins, ...legacyThemes];

export function matchesTheme(theme: SearchableTheme, query: string, tags: string[]) {
  const normalizedQuery = query.trim().toLowerCase();
  // Tags are OR'd — selecting "Dark" and "Serif" widens rather than demands both.
  const tagMatch = tags.length === 0 || theme.tags.some((tag) => tags.includes(tag));
  const textMatch =
    !normalizedQuery ||
    theme.name.toLowerCase().includes(normalizedQuery) ||
    theme.description.toLowerCase().includes(normalizedQuery) ||
    theme.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

  return tagMatch && textMatch;
}

/** Shared, URL-backed state for the Themes page and its sticky top bar. */
export function useThemeFilters() {
  const [params, setParams] = useSearchParams();
  const query = params.get(QUERY_PARAM) ?? "";
  const tags = useMemo(
    () => [...new Set(params.getAll(TAG_PARAM))].filter((tag) => validTags.has(tag)),
    [params]
  );

  const updateParams = useCallback(
    (update: (next: URLSearchParams) => void) => {
      setParams(
        (current) => {
          const next = new URLSearchParams(current);
          update(next);
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const setQuery = useCallback(
    (value: string) => {
      updateParams((next) => {
        if (value) next.set(QUERY_PARAM, value);
        else next.delete(QUERY_PARAM);
      });
    },
    [updateParams]
  );

  const toggleTag = useCallback(
    (tag: string) => {
      if (!validTags.has(tag)) return;
      updateParams((next) => {
        const selected = new Set(
          next.getAll(TAG_PARAM).filter((candidate) => validTags.has(candidate))
        );
        if (selected.has(tag)) selected.delete(tag);
        else selected.add(tag);

        next.delete(TAG_PARAM);
        themeFilterOptions.forEach((option) => {
          if (selected.has(option)) next.append(TAG_PARAM, option);
        });
      });
    },
    [updateParams]
  );

  const clearTags = useCallback(
    () => updateParams((next) => next.delete(TAG_PARAM)),
    [updateParams]
  );

  const shown = useMemo(
    () => allThemes.filter((theme) => matchesTheme(theme, query, tags)).length,
    [query, tags]
  );

  return {
    query,
    tags,
    options: themeFilterOptions,
    setQuery,
    toggleTag,
    clearTags,
    shown,
    total: allThemes.length,
    active: Boolean(query.trim() || tags.length),
  };
}
