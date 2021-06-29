"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonStyles = void 0;
exports.buttonStyles = {
    root: function (componentStyleParameters) {
        var colorScheme = componentStyleParameters.theme.siteVariables.colorScheme, _a = componentStyleParameters.props, primary = _a.primary, text = _a.text;
        return {
            borderRadius: "4px",
            borderStyle: "solid",
            "&:hover": {
                borderColor: colorScheme.default.borderHover,
                backgroundColor: colorScheme.default.backgroundHover,
                color: colorScheme.default.foregroundHover + " !important",
            },
            "&:focus": {
                backgroundColor: !text && primary
                    ? colorScheme.brand.background + " !important"
                    : colorScheme.default.background + " !important",
                color: !text && primary
                    ? colorScheme.brand.foreground4
                    : colorScheme.default.foreground + " !important",
            },
        };
    },
};
//# sourceMappingURL=button-styles.js.map