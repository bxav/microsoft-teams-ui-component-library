"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartTheme = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var getLocalTheme = function () {
    return {
        componentStyles: {
            Box: {
                root: function (_a) {
                    var theme = _a.theme;
                    return ({
                        "--charts-axes-labels-fg": theme.siteVariables.colorScheme.default.foreground2,
                    });
                },
            },
            ToolbarMenuItem: {
                root: {
                    padding: 0,
                },
            },
        },
    };
};
exports.ChartTheme = function (_a) {
    var globalTheme = _a.globalTheme, children = _a.children;
    var theme = react_northstar_1.mergeThemes(globalTheme, getLocalTheme());
    return (react_1.default.createElement(react_northstar_1.Provider, { theme: theme, styles: { height: "100%" } }, children));
};
//# sourceMappingURL=ChartTheme.js.map