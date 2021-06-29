import React from "react";
import { Provider as FluentUIThemeProvider, mergeThemes, } from "@fluentui/react-northstar";
import { teamsNextVariableAssignments, themes } from "../../lib/withTheme";
import { TeamsTheme } from "../../themes";
var menuContentStyles = function (_a) {
    var theme = _a.theme;
    var _b = theme.siteVariables, themeKey = _b.theme, colorScheme = _b.colorScheme;
    return {
        borderWidth: themeKey === TeamsTheme.HighContrast ? "1px" : 0,
        boxShadow: colorScheme.elevations[8],
    };
};
var getLocalTheme = function (_themeKey) {
    return {
        componentStyles: {
            Button: {
                root: function () { return ({ minWidth: 0 }); },
            },
            ButtonContent: {
                root: function (_a) {
                    var variables = _a.variables;
                    return ({
                        fontWeight: 400,
                        fontSize: "inherit",
                    });
                },
            },
            Checkbox: {
                root: function () { return ({
                    padding: ".375rem",
                }); },
                checkbox: function (_a) {
                    var variables = _a.variables, theme = _a.theme;
                    if (variables.indeterminate) {
                        switch (theme.siteVariables.theme) {
                            // todo: these are necessary to add an indeterminate state to the `Checkbox` component; reassess when upgrading Fluent UI as it may no longer be necessary.
                            case TeamsTheme.HighContrast:
                                return {
                                    backgroundImage: "url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' style='background-color: %231aebff; padding: 2px;' focusable='false' viewBox='8 8 22.5 22.5'%3E%3Cg%3E%3Cpath fill='%23000' d='M10 16v-1h12v1H10z 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E\")",
                                };
                            case TeamsTheme.Dark:
                                return {
                                    backgroundImage: "url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' style='background-color: %23A6A7DC; padding: 2px;' focusable='false' viewBox='8 8 22.5 22.5'%3E%3Cg%3E%3Cpath fill='%232D2C2C' d='M10 16v-1h12v1H10z 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E\")",
                                };
                            default:
                                return {
                                    backgroundImage: "url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' style='background-color: %236264A7; padding: 2px;' focusable='false' viewBox='8 8 22.5 22.5'%3E%3Cg%3E%3Cpath fill='%23fff' d='M10 16v-1h12v1H10z 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E\")",
                                };
                        }
                    }
                    return {};
                },
            },
            Menu: {
                root: function () { return ({ borderWidth: 0 }); },
            },
            PopupContent: {
                content: function (cvo) {
                    return Object.assign(menuContentStyles(cvo), { padding: 0 });
                },
            },
            TableCell: {
                content: function (_a) {
                    var variables = _a.variables;
                    return variables.flush ? { width: "100%", height: "100%" } : {};
                },
            },
        },
    };
};
export var TableTheme = function (_a) {
    var _b;
    var globalTheme = _a.globalTheme, children = _a.children;
    var mainTheme = ((_b = globalTheme.siteVariables) === null || _b === void 0 ? void 0 : _b.theme) ? globalTheme
        : themes.teamsTheme;
    return (React.createElement(FluentUIThemeProvider, { theme: mergeThemes(mainTheme, teamsNextVariableAssignments, getLocalTheme(globalTheme.siteVariables.theme)) }, children));
};
//# sourceMappingURL=TableTheme.js.map