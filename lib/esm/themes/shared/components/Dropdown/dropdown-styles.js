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
var borderZero = {
    borderTopWidth: "0",
    borderRightWidth: "0",
    borderBottomWidth: "0",
    borderLeftWidth: "0",
};
export var dropdownStyles = {
    root: function (componentStyleParameters) {
        var props = componentStyleParameters.props, colorScheme = componentStyleParameters.theme.siteVariables.colorScheme;
        return {
            borderRadius: "4px",
            position: "relative",
            "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                borderRadius: "4px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: props.error ? colorScheme.red.foreground : "transparent",
                pointerEvents: "none",
            },
        };
    },
    container: function (componentStyleParameters) {
        return __assign(__assign({}, borderZero), { "&:hover": borderZero });
    },
    triggerButton: function (componentStyleParameters) {
        return {
            "--button__content--font-weight": 400,
        };
    },
};
//# sourceMappingURL=dropdown-styles.js.map