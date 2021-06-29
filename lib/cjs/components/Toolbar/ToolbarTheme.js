"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarTheme = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var withTheme_1 = require("../../lib/withTheme");
var themes_1 = require("../../themes");
var getLocalTheme = function (themeKey) {
    var buttonRootVariables = function (_a) {
        var colorScheme = _a.colorScheme, theme = _a.theme;
        var color = colorScheme.default.foreground1;
        switch (theme) {
            case themes_1.TeamsTheme.Dark:
                color = colorScheme.default.foreground1;
                break;
            case themes_1.TeamsTheme.HighContrast:
                color = colorScheme.grey.foregroundHover;
                break;
        }
        return {
            color: color,
        };
    };
    var menuContentStyles = function (_a) {
        var theme = _a.theme;
        var _b = theme.siteVariables, themeKey = _b.theme, colorScheme = _b.colorScheme;
        return {
            borderWidth: themeKey === themes_1.TeamsTheme.HighContrast ? "1px" : 0,
        };
    };
    return {
        componentVariables: {
            Button: buttonRootVariables,
            ToolbarItem: buttonRootVariables,
            TreeItem: function (_a) {
                var colorScheme = _a.colorScheme, theme = _a.theme;
                return ({
                    color: theme === themes_1.TeamsTheme.HighContrast
                        ? colorScheme.grey.backgroundFocus
                        : colorScheme.grey.background2,
                });
            },
            TreeTitle: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    color: colorScheme.grey.foreground,
                });
            },
            SvgIcon: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    fill: colorScheme.default.foreground1,
                });
            },
        },
        componentStyles: {
            ButtonContent: {
                root: function (_a) {
                    var variables = _a.variables;
                    return ({
                        fontWeight: 400,
                    });
                },
            },
            Input: {
                input: {
                    width: "100%",
                },
            },
            PopupContent: {
                content: function (cvo) {
                    return Object.assign(menuContentStyles(cvo), { padding: 0 });
                },
            },
            ToolbarMenu: { root: menuContentStyles },
            TreeItem: {
                root: {
                    paddingLeft: 0,
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        right: ".25rem",
                        bottom: 0,
                        left: ".25rem",
                        background: "transparent",
                        borderRadius: "2px",
                    },
                    "&:hover::before": {
                        background: "currentColor",
                    },
                },
            },
        },
        staticStyles: [
            ".extended-toolbar__filters-menu .ui-tree__title__selection-indicator {\n        flex: 0 0 auto;\n        -webkit-flex: 0 0 auto;\n      }",
            ".extended-toolbar .ui-toolbar__menu {\n        top: .25rem !important;\n      }",
            ".extended-toolbar .extended-toolbar__filters-invoker:focus::before,\n      .extended-toolbar .extended-toolbar__filters-invoker:focus::after,\n      .extended-toolbar .extended-toolbar__find-invoker:focus::before,\n      .extended-toolbar .extended-toolbar__find-invoker:focus::after,\n      .extended-toolbar .extended-toolbar__find-cancel:focus::before,\n      .extended-toolbar .extended-toolbar__find-cancel:focus::after,\n      .extended-toolbar .ui-toolbar__item:focus::before,\n      .extended-toolbar .ui-toolbar__item:focus::after {\n        top: calc(.5rem - 1px) !important;\n        bottom: calc(.5rem - 1px) !important;\n      }\n      ",
        ],
    };
};
exports.ToolbarTheme = function (_a) {
    var _b;
    var globalTheme = _a.globalTheme, children = _a.children;
    var mainTheme = ((_b = globalTheme.siteVariables) === null || _b === void 0 ? void 0 : _b.theme) ? globalTheme
        : withTheme_1.themes.teamsTheme;
    var theme = react_northstar_1.mergeThemes(mainTheme, withTheme_1.teamsNextVariableAssignments, getLocalTheme(globalTheme.siteVariables.theme));
    return (react_1.default.createElement(react_northstar_1.Provider, { theme: theme, styles: {
            position: "sticky",
            display: "grid",
            top: 0,
            marginBottom: "1.25rem",
            boxShadow: globalTheme.siteVariables.colorScheme.elevations[8],
            zIndex: 999,
        } }, children));
};
//# sourceMappingURL=ToolbarTheme.js.map