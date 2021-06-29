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
import React, { useState } from "react";
import get from "lodash/get";
import set from "lodash/set";
import produce from "immer";
import { Box, Button, Checkbox, Dialog, Flex, Input, Text, } from "@fluentui/react-northstar";
import { getText } from "../../translations";
import { CloseIcon, SearchIcon } from "@fluentui/react-icons-northstar";
import { SignifiedOverflow } from "../../lib/SignifiedOverflow";
import { Surface, DialogVariant } from "../../types/types";
var matchesFind = function (findQuery, title) {
    return (findQuery.length < 3 ||
        title.toLowerCase().includes(findQuery.toLowerCase()));
};
/**
 * @internal
 */
export var Sidebar = function (_a) {
    var t = _a.t, open = _a.open, onClose = _a.onClose, widgets = _a.widgets, preferencesState = _a.preferencesState, updatePreferences = _a.updatePreferences;
    var _b = useState(""), findQuery = _b[0], setFindQuery = _b[1];
    return (React.createElement(Dialog, __assign({ trapFocus: true, content: React.createElement(SignifiedOverflow, { useCustomScrollbar: true, body: React.createElement(Box, { style: { flex: "1 0 0", padding: "2rem 2rem 1rem 2rem" } },
                React.createElement(Flex, null,
                    React.createElement(Text, { size: "large", weight: "bold", styles: { flex: "1 0 0", marginTop: ".25rem" } }, t["edit dashboard"]),
                    React.createElement(Button, { text: true, iconOnly: true, icon: React.createElement(CloseIcon, null), title: t["close"], onClick: onClose })),
                React.createElement(Text, { as: "p", styles: { marginBottom: "2.5rem" } }, t["edit dashboard coaching"]),
                React.createElement(Input, { clearable: true, fluid: true, placeholder: t["find"], "aria-label": t["find"], value: findQuery, icon: React.createElement(SearchIcon, { outline: true }), onChange: function (e, inputProps) {
                        setFindQuery(get(inputProps, "value", ""));
                    }, variables: { surface: Surface.base }, styles: { marginBottom: "2.5rem" } }),
                React.createElement(Box, null, widgets.map(function (_a) {
                    var id = _a.id, title = _a.title;
                    var widgetTitle = getText(t.locale, title);
                    return (matchesFind(findQuery, widgetTitle) && (React.createElement(Checkbox, { toggle: true, key: "widgetDisplayToggle-" + id, checked: get(preferencesState, "widgetSettings." + id + ".display"), label: widgetTitle, labelPosition: "start", styles: {
                            display: "flex",
                            margin: ".5rem 0",
                            paddingLeft: 0,
                            paddingRight: 0,
                        }, variables: { labelFlex: "1 0 0" }, onChange: function (_e, props) {
                            updatePreferences(produce(preferencesState, function (draft) {
                                set(draft, "widgetSettings." + id + ".display", !!(props === null || props === void 0 ? void 0 : props.checked));
                            }));
                        } })));
                }))), footer: React.createElement(Flex, { hAlign: "end", vAlign: "center", styles: { height: "4.5rem", padding: "0 2rem 0 2rem" } },
                React.createElement(Button, { primary: true, content: t["ok"], onClick: onClose })) }), onCancel: onClose, onConfirm: onClose, footer: null }, { open: open }, { variables: { variant: DialogVariant.sidebar }, styles: {
            width: "20rem",
        } })));
};
//# sourceMappingURL=Sidebar.js.map