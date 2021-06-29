import React from "react";
import { Flex } from "@fluentui/react-northstar";
export var Illustration = function (_a) {
    var option = _a.option;
    return (React.createElement(Flex, { styles: {
            width: "100%",
            maxWidth: "20rem",
            height: "12.5rem",
            maxHeight: "12.5rem",
        }, vAlign: "center", hAlign: "center" }, React.cloneElement(option, {
        style: { width: "100%", height: "100%" },
    })));
};
//# sourceMappingURL=Illustration.js.map