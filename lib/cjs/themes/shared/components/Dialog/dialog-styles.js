"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialogStyles = void 0;
var types_1 = require("../../../../types/types");
exports.dialogStyles = {
    overlay: function (componentStyleParameters) {
        var variables = componentStyleParameters.variables, _a = componentStyleParameters.theme.siteVariables, colorScheme = _a.colorScheme, theme = _a.theme;
        switch (variables.variant) {
            case types_1.DialogVariant.sidebar:
                return {
                    background: "transparent",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    overflow: "none",
                };
            default:
                return {};
        }
    },
    root: function (componentStyleParameters) {
        var variables = componentStyleParameters.variables, _a = componentStyleParameters.theme.siteVariables, colorScheme = _a.colorScheme, theme = _a.theme;
        switch (variables.variant) {
            case types_1.DialogVariant.sidebar:
                return {
                    height: "100%",
                    borderRadius: 0,
                    background: colorScheme.default.background2,
                    boxShadow: colorScheme.elevations[8],
                    display: "flex",
                    flexFlow: "column nowrap",
                    padding: 0,
                    "--surface-background": colorScheme.default.background2,
                    "--shadow-background": colorScheme.default.border2,
                };
            default:
                return {};
        }
    },
    content: function (componentStyleParameters) {
        var variables = componentStyleParameters.variables, _a = componentStyleParameters.theme.siteVariables, colorScheme = _a.colorScheme, theme = _a.theme;
        switch (variables.variant) {
            case types_1.DialogVariant.sidebar:
                return {
                    flex: "1 0 0",
                    overflow: "auto",
                    marginBottom: 0,
                };
            default:
                return {};
        }
    },
    footer: function (componentStyleParameters) {
        var variables = componentStyleParameters.variables, _a = componentStyleParameters.theme.siteVariables, colorScheme = _a.colorScheme, theme = _a.theme;
        switch (variables.variant) {
            case types_1.DialogVariant.sidebar:
                return {
                    flex: "0 0 auto",
                    padding: "1rem 2rem 2rem 2rem",
                    marginTop: 0,
                };
            default:
                return {};
        }
    },
};
//# sourceMappingURL=dialog-styles.js.map