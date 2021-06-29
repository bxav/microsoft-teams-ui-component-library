export var tableCellStyles = {
    content: function (_a) {
        var colorScheme = _a.theme.siteVariables.colorScheme;
        return {
            fontSize: "var(--table-cell__content--font-size, 0.875rem)",
            color: "var(--table-cell__content--color, " + colorScheme.default.foreground + ")",
            backgroundColor: "var(--table-cell__content--background-color, transparent)",
        };
    },
};
//# sourceMappingURL=tableCell-styles.js.map