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
export var tableRowStyles = {
    root: function (_a) {
        var header = _a.props.header, colorScheme = _a.theme.siteVariables.colorScheme;
        return __assign(__assign({ borderBottomColor: colorScheme.default.border2 }, (header && { "--table-cell__content--font-size": "0.75rem" })), { "&:hover": {
                backgroundColor: colorScheme.default.background4 + " !important",
                borderLeftColor: colorScheme.default.background4 + " !important",
                borderTopColor: colorScheme.default.background4 + " !important",
                borderRightColor: colorScheme.default.background4 + " !important",
                borderBottomColor: colorScheme.default.border2 + " !important",
            } });
    },
};
//# sourceMappingURL=tableRow-styles.js.map