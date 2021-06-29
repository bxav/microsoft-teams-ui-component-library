"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignifiedOverflow = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var react_perfect_scrollbar_1 = __importDefault(require("react-perfect-scrollbar"));
exports.SignifiedOverflow = function (_a) {
    var body = _a.body, footer = _a.footer, useCustomScrollbar = _a.useCustomScrollbar;
    var Wrapper = useCustomScrollbar ? react_perfect_scrollbar_1.default : react_1.default.Fragment;
    return (react_1.default.createElement(Wrapper, null,
        body,
        react_1.default.createElement(react_northstar_1.Box, { styles: {
                backgroundColor: "var(--surface-background)",
                height: "1px",
                position: "absolute",
                left: 0,
                right: 0,
                zIndex: 1,
            } }),
        react_1.default.createElement(react_northstar_1.Box, { styles: {
                backgroundColor: "var(--shadow-background)",
                height: "1px",
                position: "sticky",
                bottom: "4.5rem",
            } }),
        react_1.default.createElement(react_northstar_1.Box, { styles: {
                backgroundColor: "var(--surface-background)",
                position: "sticky",
                bottom: 0,
                height: "4.5rem",
                zIndex: 2,
            } }, footer)));
};
//# sourceMappingURL=SignifiedOverflow.js.map