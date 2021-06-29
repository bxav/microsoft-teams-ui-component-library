import { StoryFn } from "@storybook/addons";
import { ReactNode } from "react";
export interface IStorybookThemeProviderProps {
  children: ReactNode;
}
export declare const StorybookThemeProvider: ({
  children,
}: IStorybookThemeProviderProps) => JSX.Element;
export declare const withStorybookTheme: (storyFn: StoryFn<any>) => JSX.Element;
//# sourceMappingURL=withStorybookTheme.d.ts.map
