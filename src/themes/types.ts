export interface ThemeMeta {
  /** URL slug and the value used for the data-theme attribute. */
  slug: string;
  /** Display name shown in the gallery and detail bar. */
  name: string;
  /** One-line description of the aesthetic. */
  description: string;
  /** Short tags shown on the gallery card. */
  tags: string[];
}
