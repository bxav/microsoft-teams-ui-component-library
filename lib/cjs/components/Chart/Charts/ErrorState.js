"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartErrorState = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var themes_1 = require("../../../themes");
function ChartErrorState(_a) {
    var siteVariables = _a.siteVariables;
    var textColor;
    switch (siteVariables.theme) {
        case themes_1.TeamsTheme.Dark:
            textColor = siteVariables.colors.red["300"];
            break;
        case themes_1.TeamsTheme.HighContrast:
            textColor = siteVariables.colors.white;
            break;
        case themes_1.TeamsTheme.Default:
        default:
            textColor = siteVariables.colors.red["400"];
            break;
    }
    var t = siteVariables.t;
    return (react_1.default.createElement(react_northstar_1.Flex, { styles: {
            height: "100%",
            minHeight: "14rem",
            backgroundColor: siteVariables.colorScheme.grey.background,
            color: textColor,
        }, vAlign: "center", hAlign: "center" },
        react_1.default.createElement(react_northstar_1.InfoIcon, { outline: true, styles: { marginRight: ".5rem" } }),
        " ",
        t["could not load data"]));
}
exports.ChartErrorState = ChartErrorState;
//# sourceMappingURL=ErrorState.js.map