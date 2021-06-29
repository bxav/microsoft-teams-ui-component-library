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
export var treeStyles = {
    root: function (componentStyleParameters) {
        var isCallingRoster = componentStyleParameters.variables.isCallingRoster, colorSchemeDefault = componentStyleParameters.theme.siteVariables.colorScheme.default;
        return __assign({}, (isCallingRoster && {
            backgroundColor: colorSchemeDefault.background2,
        }));
    },
};
//# sourceMappingURL=tree-styles.js.map