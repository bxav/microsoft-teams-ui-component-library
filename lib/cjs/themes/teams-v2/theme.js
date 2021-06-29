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
exports.defaultV2ThemeOverrides = void 0;
var react_northstar_1 = require("@fluentui/react-northstar");
var shared_1 = require("../shared");
/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
var alert_styles_1 = require("./components/Alert/alert-styles");
var flex_styles_1 = require("./components/Flex/flex-styles");
var static_styles_1 = require("./static-styles");
var site_variables_1 = __importDefault(require("./site-variables"));
/**
 * TFW 2 default theme overrides
 */
exports.defaultV2ThemeOverrides = {
    componentStyles: shared_1.mergeSharedComponentStyles({
        Alert: alert_styles_1.alertStyles,
        Flex: flex_styles_1.flexStyles,
    }),
    siteVariables: __assign(__assign({}, react_northstar_1.teamsTheme.siteVariables), site_variables_1.default),
    staticStyles: shared_1.sharedStaticStyles.concat(static_styles_1.staticStyles),
};
//# sourceMappingURL=theme.js.map