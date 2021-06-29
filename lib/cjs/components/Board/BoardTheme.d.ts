import { CSSProperties, ReactNode } from "react";
import { ThemePrepared } from "@fluentui/styles";
export interface IBoardThemeProps {
  globalTheme: ThemePrepared;
  children: ReactNode;
  style: CSSProperties;
}
export declare const BoardTheme: ({
  globalTheme,
  children,
  style,
}: IBoardThemeProps) => JSX.Element;
//# sourceMappingURL=BoardTheme.d.ts.map
