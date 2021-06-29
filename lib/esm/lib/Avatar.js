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
import { Avatar as FluentUIAvatar, } from "@fluentui/react-northstar";
import React from "react";
import { EAvatarVariant } from "../types/types";
var extendStyles = function (variant, size, styles) {
    if (styles === void 0) { styles = {}; }
    var borderRadius;
    var clipPath;
    var dims;
    switch (variant) {
        case EAvatarVariant.entity:
            borderRadius = "0.1875rem";
            break;
        case EAvatarVariant.bot:
            borderRadius = "0";
            switch (size) {
                case "large":
                    clipPath = "url('#avatar-clip-path--hex--large')";
                    dims = { width: "2.875rem", height: "2.625rem" };
                    break;
                case "medium":
                    clipPath = "url('#avatar-clip-path--hex--medium')";
                    dims = { width: "2.25rem", height: "2rem" };
                    break;
                default:
                    clipPath = "url('#avatar-clip-path--hex--small')";
                    dims = { width: "2rem", height: "1.875rem" };
                    break;
            }
            break;
    }
    return {
        styles: __assign(__assign(__assign(__assign({}, styles), (borderRadius && { "--avatar__border-radius": borderRadius })), (clipPath && { "--avatar__clip-path": clipPath })), dims),
    };
};
var Avatar = function (_a) {
    var name = _a.name, image = _a.image, styles = _a.styles, variables = _a.variables, _b = _a.size, size = _b === void 0 ? "small" : _b, _c = _a.variant, variant = _c === void 0 ? EAvatarVariant.human : _c;
    return (React.createElement(FluentUIAvatar, __assign({}, (image && { image: image }), { name: name, size: size, variables: variables }, extendStyles(variant, size, styles))));
};
export default Avatar;
//# sourceMappingURL=Avatar.js.map