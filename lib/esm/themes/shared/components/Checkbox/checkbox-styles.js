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
export var checkboxStyles = {
    root: function (componentStyleParameters) {
        var variables = componentStyleParameters.variables;
        return __assign({ padding: ".25rem .3125rem" }, (variables.layout === "radio-like" && {
            display: "grid",
            gridTemplateColumns: "auto 0.75rem 1fr",
        }));
    },
};
//# sourceMappingURL=checkbox-styles.js.map