"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormTheme = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var withTheme_1 = require("../../lib/withTheme");
var themes_1 = require("../../themes");
var types_1 = require("../../types/types");
var getLocalTheme = function (themeName, surface) {
    return {
        componentStyles: {
            Dropdown: {
                container: function () {
                    var border = {
                        borderTopWidth: themeName === themes_1.TeamsTheme.HighContrast ? "1px" : 0,
                        borderRightWidth: themeName === themes_1.TeamsTheme.HighContrast ? "1px" : 0,
                        borderBottomWidth: themeName === themes_1.TeamsTheme.HighContrast ? "2px" : 0,
                        borderLeftWidth: themeName === themes_1.TeamsTheme.HighContrast ? "1px" : 0,
                    };
                    return __assign(__assign({ backgroundColor: "var(--input-background)" }, border), { "&:hover": __assign({ backgroundColor: "var(--input-background)" }, border), "&:focus": __assign({ backgroundColor: "var(--input-background)" }, border) });
                },
                triggerButton: function () { return ({
                    "&:hover": { backgroundColor: "inherit", borderColor: "transparent" },
                }); },
            },
            FormLabel: {
                root: function (_a) {
                    var theme = _a.theme;
                    return ({
                        color: theme.siteVariables.colorScheme.default.foreground1,
                        fontSize: ".75rem",
                    });
                },
            },
            Input: {
                input: function () { return ({ backgroundColor: "var(--input-background)" }); },
            },
            InputLabel: {
                root: function (_a) {
                    var theme = _a.theme;
                    return ({
                        color: theme.siteVariables.colorScheme.default.foreground1,
                        fontSize: ".75rem",
                    });
                },
            },
            TextArea: {
                root: function () { return ({ backgroundColor: "var(--input-background)" }); },
            },
        },
    };
};
exports.FormTheme = function (_a) {
    var _b;
    var globalTheme = _a.globalTheme, children = _a.children, surface = _a.surface, styles = _a.styles;
    var mainTheme = ((_b = globalTheme.siteVariables) === null || _b === void 0 ? void 0 : _b.theme) ? globalTheme
        : withTheme_1.themes.teamsTheme;
    var cssProperties = (function () {
        switch (surface) {
            case types_1.Surface.base:
                return {
                    background: "transparent",
                    "--surface-background": globalTheme.siteVariables.colorScheme.default.background2,
                    "--overlay-background": globalTheme.siteVariables.colorScheme.default.background,
                    "--shadow-background": globalTheme.siteVariables.colorScheme.default.border2,
                    "--input-background": globalTheme.siteVariables.colorScheme.default.background,
                };
            case types_1.Surface.raised:
                return {
                    background: "transparent",
                    "--surface-background": "transparent",
                    "--overlay-background": globalTheme.siteVariables.colorScheme.default.background,
                    "--shadow-background": globalTheme.siteVariables.colorScheme.default.border1,
                    "--input-background": (function () {
                        var _a;
                        switch ((_a = mainTheme.siteVariables) === null || _a === void 0 ? void 0 : _a.theme) {
                            case themes_1.TeamsTheme.Dark:
                                return globalTheme.siteVariables.colorScheme.default
                                    .background1;
                            default:
                                return globalTheme.siteVariables.colorScheme.default
                                    .background2;
                        }
                    })(),
                };
        }
    })();
    return (react_1.default.createElement(react_northstar_1.Provider, { theme: react_northstar_1.mergeThemes(mainTheme, withTheme_1.teamsNextVariableAssignments, getLocalTheme(globalTheme.siteVariables.theme, surface)), styles: __assign(__assign({}, cssProperties), styles) }, children));
};
//# sourceMappingURL=FormTheme.js.map