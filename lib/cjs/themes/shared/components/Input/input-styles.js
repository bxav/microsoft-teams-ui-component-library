"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputStyles = void 0;
var types_1 = require("../../../../types/types");
var constants_1 = require("../../../constants");
exports.inputStyles = {
    input: function (componentStyleParameters) {
        var variables = componentStyleParameters.variables, _a = componentStyleParameters.theme.siteVariables, colorScheme = _a.colorScheme, theme = _a.theme;
        return {
            backgroundColor: (function () {
                switch (variables.surface) {
                    case types_1.Surface.base:
                        return colorScheme.default.background;
                    case types_1.Surface.raised:
                    default:
                        switch (theme) {
                            case constants_1.TeamsTheme.Dark:
                                return colorScheme.default.background1;
                            default:
                                return colorScheme.default.background2;
                        }
                }
            })(),
        };
    },
};
//# sourceMappingURL=input-styles.js.map