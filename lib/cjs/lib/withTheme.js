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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HVCThemeProvider = exports.themes = exports.teamsNextVariableAssignments = exports.IThemeTeamsClient = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var themes_1 = require("../themes");
var translations_1 = __importDefault(require("../translations"));
var IThemeTeamsClient;
(function (IThemeTeamsClient) {
    IThemeTeamsClient["HighContrast"] = "contrast";
    IThemeTeamsClient["Dark"] = "dark";
    IThemeTeamsClient["Default"] = "default";
})(IThemeTeamsClient = exports.IThemeTeamsClient || (exports.IThemeTeamsClient = {}));
exports.teamsNextVariableAssignments = {
    componentVariables: {
        TableRow: function (_a) {
            var colorScheme = _a.colorScheme;
            return ({
                color: colorScheme.default.foreground1,
            });
        },
    },
    componentStyles: {
        Box: {
            root: function (_a) {
                var variables = _a.variables;
                return ({
                    color: variables.color,
                    backgroundColor: variables.backgroundColor,
                    borderColor: variables.borderColor,
                    borderWidth: variables.borderWidth,
                    boxShadow: variables.elevation,
                });
            },
        },
        ButtonContent: {
            root: function (_a) {
                var variables = _a.variables;
                return ({
                    fontWeight: variables.fontWeight,
                });
            },
        },
        Card: {
            root: function (_a) {
                var variables = _a.variables;
                return ({
                    boxShadow: variables.elevation,
                    "&:hover": { boxShadow: variables.hoverElevation },
                    "&:focus": { boxShadow: variables.elevation },
                });
            },
        },
        Checkbox: {
            label: function (_a) {
                var variables = _a.variables;
                return ({
                    flex: variables.labelFlex,
                });
            },
        },
        Flex: {
            root: function (_a) {
                var variables = _a.variables;
                return ({
                    color: variables.color,
                    backgroundColor: variables.backgroundColor,
                    boxShadow: variables.elevation,
                });
            },
        },
        ListItem: {
            root: function (_a) {
                var variables = _a.variables;
                return (__assign({ color: variables.color, backgroundColor: variables.backgroundColor, fontWeight: variables.fontWeight }, (variables.hoverBackgroundColor && {
                    "&:hover": {
                        backgroundColor: variables.hoverBackgroundColor,
                    },
                })));
            },
        },
        ToolbarItem: {
            root: function (_a) {
                var variables = _a.variables;
                return ({
                    color: variables.color,
                    fontWeight: variables.fontWeight,
                });
            },
        },
        PopupContent: {
            content: function (_a) {
                var variables = _a.variables;
                return ({
                    boxShadow: variables.elevation,
                    borderWidth: variables.borderWidth,
                });
            },
        },
        PopupButton: {
            root: function (_a) {
                var variables = _a.variables;
                return ({
                    color: variables.color,
                });
            },
        },
        TableRow: {
            root: function (_a) {
                var variables = _a.variables;
                return {
                    height: variables.compactRow
                        ? variables.compactRowHeight
                        : variables.defaultRowHeight,
                    minHeight: variables.compactRow
                        ? variables.compactRowMinHeight
                        : variables.defaultRowMinHeight,
                    alignItems: variables.cellVerticalAlignment,
                };
            },
        },
        TableCell: {
            root: function (_a) {
                var variables = _a.variables;
                return ({
                    paddingTop: variables.compactRow
                        ? variables.compactRowVerticalPadding
                        : variables.defaultRowVerticalPadding,
                    paddingBottom: variables.compactRow
                        ? variables.compactRowVerticalPadding
                        : variables.defaultRowVerticalPadding,
                });
            },
        },
        TreeItem: {
            root: function (_a) {
                var variables = _a.variables;
                return ({
                    color: variables.color,
                });
            },
        },
    },
};
exports.themes = (_a = {},
    _a[themes_1.TeamsTheme.Default] = react_northstar_1.mergeThemes(react_northstar_1.teamsTheme, exports.teamsNextVariableAssignments, themes_1.defaultV2ThemeOverrides),
    _a[themes_1.TeamsTheme.Dark] = react_northstar_1.mergeThemes(react_northstar_1.teamsDarkTheme, exports.teamsNextVariableAssignments, themes_1.darkV2ThemeOverrides),
    _a[themes_1.TeamsTheme.HighContrast] = react_northstar_1.mergeThemes(react_northstar_1.teamsHighContrastTheme, exports.teamsNextVariableAssignments, themes_1.highContrastThemeOverrides),
    _a);
/**
 * @public
 */
exports.HVCThemeProvider = function (_a) {
    // [v-wishow] todo: translations will (presumably) eventually need to be loaded asynchronously
    var _b, _c, _d, _e;
    var children = _a.children, lang = _a.lang, themeName = _a.themeName, translations = _a.translations;
    switch (themeName) {
        case IThemeTeamsClient.Dark:
            themeName = themes_1.TeamsTheme.Dark;
            break;
        case IThemeTeamsClient.Default:
            themeName = themes_1.TeamsTheme.Default;
            break;
        case IThemeTeamsClient.HighContrast:
            themeName = themes_1.TeamsTheme.HighContrast;
            break;
    }
    var theme = exports.themes[themeName];
    var rtl = lang === "fa";
    if (theme.siteVariables) {
        theme.siteVariables.lang = lang;
        theme.siteVariables.rtl = rtl;
        theme.siteVariables.t =
            (translations && translations[lang]) || translations_1.default[lang];
    }
    var customScrollbarStyles = 
    // From `react-perfect-scrollbar`:
    "/*\n       * Container style\n       */\n      .ps {\n        overflow: hidden !important;\n        overflow-anchor: none;\n        -ms-overflow-style: none;\n        touch-action: auto;\n        -ms-touch-action: auto;\n      }\n      \n      /*\n       * Scrollbar rail styles\n       */\n      .ps__rail-x {\n        display: none;\n        opacity: 1;\n        transition: background-color .2s linear, opacity .2s linear;\n        -webkit-transition: background-color .2s linear, opacity .2s linear;\n        height: 6px;\n        /* there must be 'bottom' or 'top' for ps__rail-x */\n        bottom: 2px;\n        /* please don't change 'position' */\n        position: absolute;\n      }\n      \n      .ps__rail-y {\n        display: none;\n        opacity: 1;\n        transition: background-color .2s linear, opacity .2s linear;\n        -webkit-transition: background-color .2s linear, opacity .2s linear;\n        width: 6px;\n        /* there must be 'right' or 'left' for ps__rail-y */\n        " + (rtl ? "left" : "right") + ": 2px;\n        /* please don't change 'position' */\n        position: absolute;\n      }\n      \n      .ps--active-x > .ps__rail-x,\n      .ps--active-y > .ps__rail-y {\n        display: block;\n        background-color: transparent;\n      }\n      \n      .ps:hover > .ps__rail-x,\n      .ps:hover > .ps__rail-y,\n      .ps--focus > .ps__rail-x,\n      .ps--focus > .ps__rail-y,\n      .ps--scrolling-x > .ps__rail-x,\n      .ps--scrolling-y > .ps__rail-y {\n        opacity: 1;\n      }\n      \n      .ps .ps__rail-x:hover,\n      .ps .ps__rail-y:hover,\n      .ps .ps__rail-x:focus,\n      .ps .ps__rail-y:focus,\n      .ps .ps__rail-x.ps--clicking,\n      .ps .ps__rail-y.ps--clicking {\n        opacity: 1;\n      }\n      \n      /*\n       * Scrollbar thumb styles\n       */\n      .ps__thumb-x {\n        opacity: " + (themeName === themes_1.TeamsTheme.HighContrast ? "1" : "0.2") + ";\n        background-color: " + theme.siteVariables.colorScheme.default.foreground + ";\n        border-radius: 9999px;\n        transition: background-color .2s linear, height .2s ease-in-out;\n        -webkit-transition: background-color .2s linear, height .2s ease-in-out;\n        height: 6px;\n        /* there must be 'bottom' for ps__thumb-x */\n        bottom: 2px;\n        /* please don't change 'position' */\n        position: absolute;\n        z-index: 1000;\n      }\n      \n      .ps__thumb-y {\n        opacity: " + (themeName === themes_1.TeamsTheme.HighContrast ? "1" : "0.2") + ";\n        background-color: " + theme.siteVariables.colorScheme.default.foreground + ";\n        border-radius: 9999px;\n        transition: background-color .2s linear, width .2s ease-in-out;\n        -webkit-transition: background-color .2s linear, width .2s ease-in-out;\n        width: 6px;\n        /* there must be 'right' for ps__thumb-y */\n        right: 2px;\n        /* please don't change 'position' */\n        position: absolute;\n        z-index: 1000;\n      }\n      \n      .ps__rail-x:hover > .ps__thumb-x,\n      .ps__rail-x:focus > .ps__thumb-x,\n      .ps__rail-x.ps--clicking .ps__thumb-x {\n        background-color: " + theme.siteVariables.colorScheme.default.foreground + ";\n        height: 6px;\n      }\n      \n      .ps__rail-y:hover > .ps__thumb-y,\n      .ps__rail-y:focus > .ps__thumb-y,\n      .ps__rail-y.ps--clicking .ps__thumb-y {\n        background-color: " + theme.siteVariables.colorScheme.default.foreground + ";\n        width: 6px;\n      }\n      \n      /* MS supports */\n      @supports (-ms-overflow-style: none) {\n        .ps {\n          overflow: auto !important;\n        }\n      }\n      \n      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n        .ps {\n          overflow: auto !important;\n        }\n      }\n      .scrollbar-container {\n        position: relative;\n        height: 100%;\n      }";
    return (react_1.default.createElement(react_northstar_1.Provider, { theme: theme, rtl: rtl, style: {
            backgroundColor: theme.siteVariables &&
                theme.siteVariables.colorScheme.default.background2,
        } },
        react_1.default.createElement("style", null, "\n          html, body, #root, #root > .ui-provider { min-height: 100% }\n          ::-webkit-scrollbar { width: .75rem } \n          ::-webkit-scrollbar-track {\n            background-color: " + ((_b = theme.siteVariables) === null || _b === void 0 ? void 0 : _b.colorScheme.default.background2) + ";\n          }\n          ::-webkit-scrollbar-thumb {\n            background-color: " + ((_c = theme.siteVariables) === null || _c === void 0 ? void 0 : _c.colorScheme.onyx.border2) + ";\n            border-radius: .75rem;\n            border: 3px solid transparent;\n            background-clip: content-box;\n          }\n          ::-webkit-scrollbar-thumb:hover {\n            background-color: " + ((_d = theme.siteVariables) === null || _d === void 0 ? void 0 : _d.colorScheme.default.foreground2) + ";\n          }\n          canvas {\n            border-radius: 3px;\n            transition: box-shadow .05s .1s ease-out;\n          }\n          canvas:focus {\n            outline: none;\n            box-shadow: inset 0 0 0 2px " + ((_e = theme.siteVariables) === null || _e === void 0 ? void 0 : _e.colorScheme.default.foregroundActive) + ";\n          }\n        " + customScrollbarStyles),
        react_1.default.createElement("svg", { viewBox: "0 0 1 1", style: { position: "absolute", left: "-9999px", top: "-9999px" }, role: "none" },
            react_1.default.createElement("defs", null,
                react_1.default.createElement("clipPath", { id: "avatar-clip-path--hex--large", clipPathUnits: "objectBoundingBox" },
                    react_1.default.createElement("path", { d: "M0.781177 0.107772L0.989252 0.461033C1.00358 0.485327 1.00358 0.514647 0.989252 0.538941L0.781177 0.892202C0.765728 0.918452 0.735978 0.934783 0.703609 0.934783H0.296347C0.264007 0.934783 0.234257 0.918452 0.218808 0.892202L0.0107039 0.538941C-0.00356796 0.514647 -0.00356796 0.485327 0.0107039 0.461033L0.218808 0.107772C0.234257 0.0815495 0.264007 0.065218 0.296347 0.065218H0.703609C0.735978 0.065218 0.765728 0.0815495 0.781177 0.107772" })),
                react_1.default.createElement("clipPath", { id: "avatar-clip-path--hex--medium", clipPathUnits: "objectBoundingBox" },
                    react_1.default.createElement("path", { d: "M0.781177 0.0990553L0.989252 0.460166C1.00358 0.485 1.00358 0.514972 0.989252 0.539805L0.781177 0.900916C0.765728 0.92775 0.735978 0.944444 0.703609 0.944444H0.296347C0.264007 0.944444 0.234257 0.92775 0.218808 0.900916L0.0107039 0.539805C-0.00356796 0.514972 -0.00356796 0.485 0.0107039 0.460166L0.218808 0.0990553C0.234257 0.0722498 0.264007 0.0555553 0.296347 0.0555553H0.703609C0.735978 0.0555553 0.765728 0.0722498 0.781177 0.0990553" })),
                react_1.default.createElement("clipPath", { id: "avatar-clip-path--hex--small", clipPathUnits: "objectBoundingBox" },
                    react_1.default.createElement("path", { d: "M0.781177 0.10532L0.989252 0.460789C1.00358 0.485234 1.00358 0.514738 0.989252 0.539184L0.781177 0.894652C0.765728 0.921066 0.735978 0.9375 0.703609 0.9375H0.296347C0.264007 0.9375 0.234257 0.921066 0.218808 0.894652L0.0107039 0.539184C-0.00356796 0.514738 -0.00356796 0.485234 0.0107039 0.460789L0.218808 0.10532C0.234257 0.0789336 0.264007 0.0625 0.296347 0.0625H0.703609C0.735978 0.0625 0.765728 0.0789336 0.781177 0.10532Z" })))),
        children));
};
//# sourceMappingURL=withTheme.js.map