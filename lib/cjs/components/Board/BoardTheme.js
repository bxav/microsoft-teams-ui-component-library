"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardTheme = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var withTheme_1 = require("../../lib/withTheme");
var themes_1 = require("../../themes");
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
                        borderWidth: theme.siteVariables.theme === themes_1.TeamsTheme.HighContrast ? "1px" : 0,
                        "--separator-color": theme.siteVariables.colorScheme.default.border1,
                        "--content-color-secondary": theme.siteVariables.colorScheme.default.foreground2,
                        "--surface-background-color": theme.siteVariables.colorScheme.default.background,
                        "&:hover": {
                            "--surface-background-color": theme.siteVariables.theme === themes_1.TeamsTheme.HighContrast
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
exports.BoardTheme = function (_a) {
    var _b;
    var globalTheme = _a.globalTheme, children = _a.children, style = _a.style;
    var mainTheme = ((_b = globalTheme.siteVariables) === null || _b === void 0 ? void 0 : _b.theme) ? globalTheme
        : withTheme_1.themes.teamsTheme;
    return (react_1.default.createElement(react_northstar_1.Provider, { theme: react_northstar_1.mergeThemes(mainTheme, withTheme_1.teamsNextVariableAssignments, getLocalTheme(globalTheme.siteVariables.theme)), style: style }, children));
};
//# sourceMappingURL=BoardTheme.js.map