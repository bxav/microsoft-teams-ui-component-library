/**
 * A locale as an [IETF BCP 47 language tag](https://tools.ietf.org/rfc/bcp/bcp47.txt).
 * @public
 */
export declare type TLocale = string;
/**
 * Text content to display. When the preferred locale is not available, the plain string or the only
 * available locale will be used instead.
 * @public
 */
export declare type TTextObject =
  | string
  | {
      [locale: string]: string;
    }
  | undefined;
declare type TInterpolationArgs = [object] | string[];
export declare const interpolate: (
  template: string,
  interpolationArgs: TInterpolationArgs
) => string;
export declare const getText: (
  currentLocale: TLocale | null | undefined,
  textObject: TTextObject,
  ...interpolationArgs: TInterpolationArgs
) => string;
/**
 * A collection of strings for a certain locale. This library fetches translations by a `stringKey`,
 * which is common between all translations.
 *
 * @public
 */
export declare type TTranslations = {
  locale: TLocale;
  [stringKey: string]: string;
};
declare const _default: {
  [x: string]: TTranslations;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
