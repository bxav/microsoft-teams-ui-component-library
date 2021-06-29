"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Placeholder = void 0;
var react_northstar_1 = require("@fluentui/react-northstar");
var react_1 = __importDefault(require("react"));
/**
 * @internal
 */
var Placeholder = function (_a) {
    var message = _a.message;
    return (react_1.default.createElement(react_northstar_1.Flex, { vAlign: "center", hAlign: "center", styles: { height: "100%", border: "1px dashed rgb(179, 176, 173)" } },
        react_1.default.createElement(react_northstar_1.Text, { size: "large", weight: "semibold" }, message)));
};
exports.Placeholder = Placeholder;
//# sourceMappingURL=Placeholder.js.map