import React from "react";
import { Provider as FluentUIThemeProvider, mergeThemes, } from "@fluentui/react-northstar";
import { teamsNextVariableAssignments, themes } from "../../lib/withTheme";
import { TeamsTheme } from "../../themes";
var getLocalTheme = function (themeKey) {
    return {
        componentStyles: {
            Avatar: {
                root: {
                    borderRadius: "9999px",
                },
                image: {
                    borderWidth: "1px",
                    borderStyle: "solid",
                },
                label: {
                    borderWidth: "1px",
                    borderStyle: "solid",
                },
            },
            Box: {
                root: function (_a) {
                    var variables = _a.variables;
                    return ({
                        "&::after": {
                            borderColor: variables.borderFocus,
                            backgroundColor: variables.separatorColor,
                        },
                        "&::before": {
                            borderColor: variables.borderFocusWithin,
                        },
                    });
                },
            },
            Card: {
                root: function (_a) {
                    var variables = _a.variables, theme = _a.theme;
                    return {
                        padding: "0",
                        backgroundColor: variables.backgroundColor,
                        borderWidth: theme.siteVariables.theme === TeamsTheme.HighContrast ? "1px" : 0,
                        "--separator-color": theme.siteVariables.colorScheme.default.border1,
                        "--content-color-secondary": theme.siteVariables.colorScheme.default.foreground2,
                        "--surface-background-color": theme.siteVariables.colorScheme.default.background,
                        "&:hover": {
                            "--surface-background-color": theme.siteVariables.theme === TeamsTheme.HighContrast
                                ? theme.siteVariables.colorScheme.default.backgroundHover3
                                : theme.siteVariables.colorScheme.default.backgroundHover1,
                        },
                    };
                },
            },
            CardBody: {
                root: {
                    margin: "0 1.25rem .75rem 1.25rem",
                },
            },
            CardFooter: {
                root: {
                    marginTop: "1.625rem",
                    marginLeft: "1.25rem",
                    marginRight: "1.25rem",
                    marginBottom: 0,
                    "&::before": {
                        content: '""',
                        display: "block",
                        height: "1px",
                        backgroundColor: "var(--separator-color)",
                        position: "relative",
                        top: "-.5rem",
                    },
                },
            },
            PopupContent: {
                content: {
                    padding: ".5rem 0",
                },
            },
        },
        staticStyles: [
            "html[data-whatinput=\"keyboard\"] .board__lane:focus::before {\n        z-index: 2;\n        top: 1px; bottom: 1px; left: 2px; right: 3px;\n      }",
            "html[data-whatinput=\"keyboard\"] .board__lane:focus::after {\n        z-index: 2;\n        top: 0; bottom: 0; left: 1px; right: 2px;\n      }",
        ],
    };
};
export var BoardTheme = function (_a) {
    var _b;
    var globalTheme = _a.globalTheme, children = _a.children, style = _a.style;
    var mainTheme = ((_b = globalTheme.siteVariables) === null || _b === void 0 ? void 0 : _b.theme) ? globalTheme
        : themes.teamsTheme;
    return (React.createElement(FluentUIThemeProvider, { theme: mergeThemes(mainTheme, teamsNextVariableAssignments, getLocalTheme(globalTheme.siteVariables.theme)), style: style }, children));
};
//# sourceMappingURL=BoardTheme.js.map