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
import React from "react";
import { Button, Input, Tooltip, tooltipAsLabelBehavior, } from "@fluentui/react-northstar";
import { SearchIcon } from "@fluentui/react-icons-northstar";
import { Surface } from "../../types/types";
export var ToolbarFind = function (_a) {
    var layout = _a.layout, onFindQueryChange = _a.onFindQueryChange, findActive = _a.findActive, setFindActive = _a.setFindActive, toolbarButtonStyles = _a.toolbarButtonStyles, t = _a.t;
    switch (layout) {
        case "verbose":
            return (React.createElement(Input, { clearable: true, placeholder: t["find"], "aria-label": t["find"], icon: React.createElement(SearchIcon, { outline: true }), styles: {
                    flexShrink: 1,
                    width: "13.125rem",
                }, onChange: function (e, inputProps) {
                    if (onFindQueryChange && inputProps)
                        onFindQueryChange(inputProps.value);
                }, variables: { surface: Surface.base } }));
        default:
        case "compact":
            return findActive ? (React.createElement(React.Fragment, null,
                React.createElement(Input, { autoFocus: true, clearable: true, placeholder: t["find"], "aria-label": t["find"], icon: React.createElement(SearchIcon, { outline: true }), styles: {
                        flexShrink: 1,
                        flexGrow: 1,
                        width: "13.125rem",
                    }, onChange: function (e, inputProps) {
                        if (onFindQueryChange && inputProps)
                            onFindQueryChange(inputProps.value);
                    }, variables: { surface: Surface.base } }),
                React.createElement(Button, { text: true, title: t["cancel"], content: t["cancel"], className: "extended-toolbar__find-cancel", styles: __assign({ marginLeft: "1px", marginRight: "1px" }, toolbarButtonStyles), onClick: function (_e) {
                        onFindQueryChange && onFindQueryChange("");
                        setFindActive(false);
                    } }))) : (React.createElement(Tooltip, { trigger: React.createElement(Button, { text: true, title: t["find"], content: "", className: "extended-toolbar__find-invoker", icon: React.createElement(SearchIcon, { outline: true }), styles: __assign(__assign({}, toolbarButtonStyles), { marginRight: ".5rem", flex: "0 0 auto" }), onClick: function (_e) { return setFindActive(true); } }), content: t["find"], accessibility: tooltipAsLabelBehavior }));
    }
};
//# sourceMappingURL=ToolbarFind.js.map