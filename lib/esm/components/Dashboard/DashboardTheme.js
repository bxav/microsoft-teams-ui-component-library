import React from "react";
import { Provider as FluentUIThemeProvider, mergeThemes, } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../themes";
var getLocalTheme = function () {
    return {
        componentVariables: {
            Card: function (_a) {
                var colorScheme = _a.colorScheme, borderRadius = _a.borderRadius, borderWidth = _a.borderWidth, shadowLevel1 = _a.shadowLevel1, theme = _a.theme;
                return {
                    backgroundColor: colorScheme.grey.background,
                    backgroundColorHover: colorScheme.grey.background,
                    boxShadow: shadowLevel1,
                    boxShadowHover: shadowLevel1,
                    borderRadius: borderRadius,
                    borderSize: borderWidth,
                    borderColor: theme === TeamsTheme.HighContrast
                        ? colorScheme.grey.backgroundFocus
                        : "transparent",
                    borderColorHover: theme === TeamsTheme.HighContrast
                        ? colorScheme.grey.backgroundFocus
                        : "transparent",
                };
            },
            Menu: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    color: colorScheme.default.foreground2,
                });
            },
        },
        componentStyles: {
            Menu: {
                root: {
                    marginLeft: "-0.25rem",
                    marginRight: "-0.25rem",
                },
            },
        },
    };
};
export var DashboardTheme = function (_a) {
    var globalTheme = _a.globalTheme, children = _a.children;
    var theme = mergeThemes(globalTheme, getLocalTheme());
    return (React.createElement(FluentUIThemeProvider, { theme: theme, style: {
            backgroundColor: theme.siteVariables.theme === TeamsTheme.HighContrast
                ? theme.siteVariables.colorScheme.grey.background
                : theme.siteVariables.colorScheme.default.background2,
        } }, children));
};
//# sourceMappingURL=DashboardTheme.js.map