import React from "react";
import { Provider as FluentUIThemeProvider, mergeThemes, } from "@fluentui/react-northstar";
var getLocalTheme = function () {
    return {
        componentStyles: {
            Box: {
                root: function (_a) {
                    var theme = _a.theme;
                    return ({
                        "--charts-axes-labels-fg": theme.siteVariables.colorScheme.default.foreground2,
                    });
                },
            },
            ToolbarMenuItem: {
                root: {
                    padding: 0,
                },
            },
        },
    };
};
export var ChartTheme = function (_a) {
    var globalTheme = _a.globalTheme, children = _a.children;
    var theme = mergeThemes(globalTheme, getLocalTheme());
    return (React.createElement(FluentUIThemeProvider, { theme: theme, styles: { height: "100%" } }, children));
};
//# sourceMappingURL=ChartTheme.js.map