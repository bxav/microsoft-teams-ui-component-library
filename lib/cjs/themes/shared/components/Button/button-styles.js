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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonStyles = void 0;
exports.buttonStyles = {
    root: function (componentStyleParameters) {
        var colorScheme = componentStyleParameters.theme.siteVariables.colorScheme, _a = componentStyleParameters.props, primary = _a.primary, text = _a.text;
        return __assign({ borderRadius: "4px", color: colorScheme.default.foreground }, (!text && __assign(__assign({ boxShadow: colorScheme.elevations[4] }, (primary && {
            color: colorScheme.brand.foregroundHover1,
        })), { "&:active": {
                boxShadow: colorScheme.elevations[2],
            } })));
    },
};
//# sourceMappingURL=button-styles.js.map