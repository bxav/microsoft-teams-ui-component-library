import { ReactNode } from "react";
import { ICSSInJSStyle, ThemePrepared } from "@fluentui/styles";
import { Surface } from "../../types/types";
export interface IFormThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
  surface: Surface;
  styles?: ICSSInJSStyle;
}
export declare const FormTheme: ({
  globalTheme,
  children,
  surface,
  styles,
}: IFormThemeProps) => JSX.Element;
//# sourceMappingURL=FormTheme.d.ts.map
