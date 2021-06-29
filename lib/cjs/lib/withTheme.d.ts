import { ReactNode } from "react";
import { ComponentVariablesInput } from "@fluentui/react-northstar";
import { ComponentVariablesObject, ThemeInput } from "@fluentui/styles";
import { TeamsTheme } from "../themes";
import { TLocale, TTranslations } from "../translations";
export declare enum IThemeTeamsClient {
  HighContrast = "contrast",
  Dark = "dark",
  Default = "default",
}
/**
 * The Provider’s props configure how these components should be rendered: the color palette to use
 * as `themeName`, the language as `lang`, and any languages to make available through
 * `translations`. Its children should be a single component from this library.
 *
 * @public
 */
export interface IThemeProviderProps {
  children: ReactNode;
  lang: TLocale;
  themeName: TeamsTheme | IThemeTeamsClient;
  translations?: {
    [locale: string]: TTranslations;
  };
}
export declare const teamsNextVariableAssignments: {
  componentVariables: {
    TableRow: ({
      colorScheme,
    }: ComponentVariablesInput) => {
      color: any;
    };
  };
  componentStyles: {
    Box: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        color: any;
        backgroundColor: any;
        borderColor: any;
        borderWidth: any;
        boxShadow: any;
      };
    };
    ButtonContent: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        fontWeight: any;
      };
    };
    Card: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        boxShadow: any;
        "&:hover": {
          boxShadow: any;
        };
        "&:focus": {
          boxShadow: any;
        };
      };
    };
    Checkbox: {
      label: ({
        variables,
      }: ComponentVariablesObject) => {
        flex: any;
      };
    };
    Flex: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        color: any;
        backgroundColor: any;
        boxShadow: any;
      };
    };
    ListItem: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        "&:hover": {
          backgroundColor: any;
        };
        color: any;
        backgroundColor: any;
        fontWeight: any;
      };
    };
    ToolbarItem: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        color: any;
        fontWeight: any;
      };
    };
    PopupContent: {
      content: ({
        variables,
      }: ComponentVariablesObject) => {
        boxShadow: any;
        borderWidth: any;
      };
    };
    PopupButton: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        color: any;
      };
    };
    TableRow: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        height: any;
        minHeight: any;
        alignItems: any;
      };
    };
    TableCell: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        paddingTop: any;
        paddingBottom: any;
      };
    };
    TreeItem: {
      root: ({
        variables,
      }: ComponentVariablesObject) => {
        color: any;
      };
    };
  };
};
export declare const themes: {
  [themeKey: string]: ThemeInput<any>;
};
/**
 * @public
 */
export declare const HVCThemeProvider: ({
  children,
  lang,
  themeName,
  translations,
}: IThemeProviderProps) => JSX.Element;
//# sourceMappingURL=withTheme.d.ts.map
