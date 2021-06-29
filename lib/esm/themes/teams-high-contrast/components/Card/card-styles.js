export var cardStyles = {
    root: function (_a) {
        var colorScheme = _a.theme.siteVariables.colorScheme, _b = _a.variables;
        return {
            borderRadius: "4px",
            borderColor: colorScheme.default.border,
            "&:hover": {
                backgroundColor: colorScheme.default.background,
                borderColor: colorScheme.default.borderHover,
            },
        };
    },
};
//# sourceMappingURL=card-styles.js.map