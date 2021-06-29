"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTheme = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var themes_1 = require("../../themes");
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
                    borderColor: theme === themes_1.TeamsTheme.HighContrast
                        ? colorScheme.grey.backgroundFocus
                        : "transparent",
                    borderColorHover: theme === themes_1.TeamsTheme.HighContrast
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
exports.DashboardTheme = function (_a) {
    var globalTheme = _a.globalTheme, children = _a.children;
    var theme = react_northstar_1.mergeThemes(globalTheme, getLocalTheme());
    return (react_1.default.createElement(react_northstar_1.Provider, { theme: theme, style: {
            backgroundColor: theme.siteVariables.theme === themes_1.TeamsTheme.HighContrast
                ? theme.siteVariables.colorScheme.grey.background
                : theme.siteVariables.colorScheme.default.background2,
        } }, children));
};
//# sourceMappingURL=DashboardTheme.js.map