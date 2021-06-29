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
exports.flexStyles = void 0;
exports.flexStyles = {
    root: function (componentStyleParameters) {
        var colorScheme = componentStyleParameters.theme.siteVariables.colorScheme, _a = componentStyleParameters.variables, isCallingSidePanel = _a.isCallingSidePanel, appTileVertical = _a.appTileVertical;
        var colorSchemeDefault = colorScheme.default;
        return __assign(__assign({}, (isCallingSidePanel && {
            background: colorSchemeDefault.background2,
            borderLeft: ".1rem solid " + colorSchemeDefault.border2,
        })), (appTileVertical && {
            color: colorSchemeDefault.foreground1,
            ":hover": {
                backgroundColor: colorSchemeDefault.backgroundHover,
                color: colorSchemeDefault.foregroundHover,
            },
        }));
    },
};
//# sourceMappingURL=flex-styles.js.map