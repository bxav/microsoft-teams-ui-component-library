"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarFind = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var react_icons_northstar_1 = require("@fluentui/react-icons-northstar");
var types_1 = require("../../types/types");
exports.ToolbarFind = function (_a) {
    var layout = _a.layout, onFindQueryChange = _a.onFindQueryChange, findActive = _a.findActive, setFindActive = _a.setFindActive, toolbarButtonStyles = _a.toolbarButtonStyles, t = _a.t;
    switch (layout) {
        case "verbose":
            return (react_1.default.createElement(react_northstar_1.Input, { clearable: true, placeholder: t["find"], "aria-label": t["find"], icon: react_1.default.createElement(react_icons_northstar_1.SearchIcon, { outline: true }), styles: {
                    flexShrink: 1,
                    width: "13.125rem",
                }, onChange: function (e, inputProps) {
                    if (onFindQueryChange && inputProps)
                        onFindQueryChange(inputProps.value);
                }, variables: { surface: types_1.Surface.base } }));
        default:
        case "compact":
            return findActive ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_northstar_1.Input, { autoFocus: true, clearable: true, placeholder: t["find"], "aria-label": t["find"], icon: react_1.default.createElement(react_icons_northstar_1.SearchIcon, { outline: true }), styles: {
                        flexShrink: 1,
                        flexGrow: 1,
                        width: "13.125rem",
                    }, onChange: function (e, inputProps) {
                        if (onFindQueryChange && inputProps)
                            onFindQueryChange(inputProps.value);
                    }, variables: { surface: types_1.Surface.base } }),
                react_1.default.createElement(react_northstar_1.Button, { text: true, title: t["cancel"], content: t["cancel"], className: "extended-toolbar__find-cancel", styles: __assign({ marginLeft: "1px", marginRight: "1px" }, toolbarButtonStyles), onClick: function (_e) {
                        onFindQueryChange && onFindQueryChange("");
                        setFindActive(false);
                    } }))) : (react_1.default.createElement(react_northstar_1.Tooltip, { trigger: react_1.default.createElement(react_northstar_1.Button, { text: true, title: t["find"], content: "", className: "extended-toolbar__find-invoker", icon: react_1.default.createElement(react_icons_northstar_1.SearchIcon, { outline: true }), styles: __assign(__assign({}, toolbarButtonStyles), { marginRight: ".5rem", flex: "0 0 auto" }), onClick: function (_e) { return setFindActive(true); } }), content: t["find"], accessibility: react_northstar_1.tooltipAsLabelBehavior }));
    }
};
//# sourceMappingURL=ToolbarFind.js.map