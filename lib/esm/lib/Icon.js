import React from "react";
import * as FluentUIIcons from "@fluentui/react-icons-northstar";
var Icons = FluentUIIcons;
export default (function (_a) {
    var icon = _a.icon;
    var componentName = icon + "Icon";
    if (Icons.hasOwnProperty(componentName)) {
        var IconComponent = Icons[componentName];
        return React.createElement(IconComponent, { outline: true });
    }
    else {
        if (process.env.NODE_ENV === "development")
            console.warn("No such icon available:", icon);
        return null;
    }
});
//# sourceMappingURL=Icon.js.map