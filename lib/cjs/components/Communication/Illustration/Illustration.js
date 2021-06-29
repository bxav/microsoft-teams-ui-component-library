"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Illustration = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
exports.Illustration = function (_a) {
    var option = _a.option;
    return (react_1.default.createElement(react_northstar_1.Flex, { styles: {
            width: "100%",
            maxWidth: "20rem",
            height: "12.5rem",
            maxHeight: "12.5rem",
        }, vAlign: "center", hAlign: "center" }, react_1.default.cloneElement(option, {
        style: { width: "100%", height: "100%" },
    })));
};
//# sourceMappingURL=Illustration.js.map