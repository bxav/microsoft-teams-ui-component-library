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
import { teamsDarkTheme } from "@fluentui/react-northstar";
import { mergeSharedComponentStyles, sharedStaticStyles } from "../shared";
/**
 * Custom override styles, as needed, for each exported Stardust component.
 * All component-specific styling should be defined in these functions.
 */
import { alertStyles } from "./components/Alert/alert-styles";
import { flexStyles } from "./components/Flex/flex-styles";
import { treeStyles } from "./components/Tree/tree-styles";
import { staticStyles } from "./static-styles";
import siteVariables from "./site-variables";
/**
 * TFW 2 dark theme overrides
 */
export var darkV2ThemeOverrides = {
    componentStyles: mergeSharedComponentStyles({
        Alert: alertStyles,
        Flex: flexStyles,
        Tree: treeStyles,
    }),
    siteVariables: __assign(__assign({}, teamsDarkTheme.siteVariables), siteVariables),
    staticStyles: sharedStaticStyles.concat(staticStyles),
};
//# sourceMappingURL=theme.js.map