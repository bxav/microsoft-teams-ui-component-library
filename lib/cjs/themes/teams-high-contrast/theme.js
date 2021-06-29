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
exports.highContrastThemeOverrides = void 0;
var react_northstar_1 = require("@fluentui/react-northstar");
var shared_1 = require("../shared");
// Teams high contrast theme
/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
var site_variables_1 = __importDefault(require("./site-variables"));
var static_styles_1 = require("./static-styles");
var button_styles_1 = require("./components/Button/button-styles");
var card_styles_1 = require("./components/Card/card-styles");
exports.highContrastThemeOverrides = {
    componentStyles: shared_1.mergeSharedComponentStyles({
        Button: button_styles_1.buttonStyles,
        Card: card_styles_1.cardStyles,
    }),
    componentVariables: {},
    siteVariables: __assign(__assign({}, react_northstar_1.teamsHighContrastTheme.siteVariables), site_variables_1.default),
    staticStyles: shared_1.sharedStaticStyles.concat(static_styles_1.staticStyles),
};
//# sourceMappingURL=theme.js.map