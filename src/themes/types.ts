export interface ThemeMeta {
  /** URL slug and the value used for the data-theme attribute. */
  slug: string;
  /** Display name shown in the gallery and detail bar. */
  name: string;
  /** One-line description of the aesthetic. */
  description: string;
  /** Short tags shown on the gallery card. */
  tags: string[];
  /** Product surfaces this skin is especially good at. */
  bestFor: string[];
  /** The small set of visual rules that make the skin recognizable. */
  designRules: string[];
  /** Common choices that dilute or fight the skin. */
  avoid: string[];
}
