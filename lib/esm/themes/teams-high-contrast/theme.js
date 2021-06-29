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
import { teamsHighContrastTheme, } from "@fluentui/react-northstar";
import { mergeSharedComponentStyles, sharedStaticStyles } from "../shared";
// Teams high contrast theme
/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
import siteVariables from "./site-variables";
import { staticStyles } from "./static-styles";
import { buttonStyles } from "./components/Button/button-styles";
import { cardStyles } from "./components/Card/card-styles";
export var highContrastThemeOverrides = {
    componentStyles: mergeSharedComponentStyles({
        Button: buttonStyles,
        Card: cardStyles,
    }),
    componentVariables: {},
    siteVariables: __assign(__assign({}, teamsHighContrastTheme.siteVariables), siteVariables),
    staticStyles: sharedStaticStyles.concat(staticStyles),
};
//# sourceMappingURL=theme.js.map