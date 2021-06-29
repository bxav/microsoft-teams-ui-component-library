import React from "react";
import { Box } from "@fluentui/react-northstar";
import CustomScrollArea from "react-perfect-scrollbar";
export var SignifiedOverflow = function (_a) {
    var body = _a.body, footer = _a.footer, useCustomScrollbar = _a.useCustomScrollbar;
    var Wrapper = useCustomScrollbar ? CustomScrollArea : React.Fragment;
    return (React.createElement(Wrapper, null,
        body,
        React.createElement(Box, { styles: {
                backgroundColor: "var(--surface-background)",
                height: "1px",
                position: "absolute",
                left: 0,
                right: 0,
                zIndex: 1,
            } }),
        React.createElement(Box, { styles: {
                backgroundColor: "var(--shadow-background)",
                height: "1px",
                position: "sticky",
                bottom: "4.5rem",
            } }),
        React.createElement(Box, { styles: {
                backgroundColor: "var(--surface-background)",
                position: "sticky",
                bottom: 0,
                height: "4.5rem",
                zIndex: 2,
            } }, footer)));
};
//# sourceMappingURL=SignifiedOverflow.js.map