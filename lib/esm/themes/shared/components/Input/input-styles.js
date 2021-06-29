import { Surface } from "../../../../types/types";
import { TeamsTheme } from "../../../constants";
export var inputStyles = {
    input: function (componentStyleParameters) {
        var variables = componentStyleParameters.variables, _a = componentStyleParameters.theme.siteVariables, colorScheme = _a.colorScheme, theme = _a.theme;
        return {
            backgroundColor: (function () {
                switch (variables.surface) {
                    case Surface.base:
                        return colorScheme.default.background;
                    case Surface.raised:
                    default:
                        switch (theme) {
                            case TeamsTheme.Dark:
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