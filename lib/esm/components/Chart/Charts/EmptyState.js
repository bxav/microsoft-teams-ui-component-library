import React from "react";
import { Flex, InfoIcon, } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";
export function ChartEmptyState(_a) {
    var siteVariables = _a.siteVariables;
    var textColor;
    switch (siteVariables.theme) {
        case TeamsTheme.Dark:
            textColor = siteVariables.colors.grey["400"];
            break;
        case TeamsTheme.HighContrast:
            textColor = siteVariables.colors.white;
            break;
        case TeamsTheme.Default:
        default:
            textColor = siteVariables.colors.grey["400"];
            break;
    }
    var t = siteVariables.t;
    return (React.createElement(Flex, { styles: {
            height: "100%",
            minHeight: "14rem",
            backgroundColor: siteVariables.colorScheme.grey.background,
            color: textColor,
        }, vAlign: "center", hAlign: "center" },
        React.createElement(InfoIcon, { outline: true, styles: { marginRight: ".5rem" } }),
        " ",
        t["no data"]));
}
//# sourceMappingURL=EmptyState.js.map