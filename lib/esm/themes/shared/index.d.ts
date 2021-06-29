import {
  ComponentSlotStylesPrepared,
  ThemeComponentStylesPrepared,
} from "@fluentui/styles";
declare type TComponentStyles = {
  [key in keyof ThemeComponentStylesPrepared<
    Record<string, any>
  >]: ComponentSlotStylesPrepared;
};
export declare const sharedComponentStyles: TComponentStyles;
export declare const mergeSharedComponentStyles: (
  componentStyles: TComponentStyles
) => TComponentStyles;
export { staticStyles as sharedStaticStyles } from "./static-styles";
//# sourceMappingURL=index.d.ts.map
