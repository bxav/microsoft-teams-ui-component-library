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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
var react_1 = __importStar(require("react"));
var get_1 = __importDefault(require("lodash/get"));
var set_1 = __importDefault(require("lodash/set"));
var immer_1 = __importDefault(require("immer"));
var react_northstar_1 = require("@fluentui/react-northstar");
var translations_1 = require("../../translations");
var react_icons_northstar_1 = require("@fluentui/react-icons-northstar");
var SignifiedOverflow_1 = require("../../lib/SignifiedOverflow");
var types_1 = require("../../types/types");
var matchesFind = function (findQuery, title) {
    return (findQuery.length < 3 ||
        title.toLowerCase().includes(findQuery.toLowerCase()));
};
/**
 * @internal
 */
exports.Sidebar = function (_a) {
    var t = _a.t, open = _a.open, onClose = _a.onClose, widgets = _a.widgets, preferencesState = _a.preferencesState, updatePreferences = _a.updatePreferences;
    var _b = react_1.useState(""), findQuery = _b[0], setFindQuery = _b[1];
    return (react_1.default.createElement(react_northstar_1.Dialog, __assign({ trapFocus: true, content: react_1.default.createElement(SignifiedOverflow_1.SignifiedOverflow, { useCustomScrollbar: true, body: react_1.default.createElement(react_northstar_1.Box, { style: { flex: "1 0 0", padding: "2rem 2rem 1rem 2rem" } },
                react_1.default.createElement(react_northstar_1.Flex, null,
                    react_1.default.createElement(react_northstar_1.Text, { size: "large", weight: "bold", styles: { flex: "1 0 0", marginTop: ".25rem" } }, t["edit dashboard"]),
                    react_1.default.createElement(react_northstar_1.Button, { text: true, iconOnly: true, icon: react_1.default.createElement(react_icons_northstar_1.CloseIcon, null), title: t["close"], onClick: onClose })),
                react_1.default.createElement(react_northstar_1.Text, { as: "p", styles: { marginBottom: "2.5rem" } }, t["edit dashboard coaching"]),
                react_1.default.createElement(react_northstar_1.Input, { clearable: true, fluid: true, placeholder: t["find"], "aria-label": t["find"], value: findQuery, icon: react_1.default.createElement(react_icons_northstar_1.SearchIcon, { outline: true }), onChange: function (e, inputProps) {
                        setFindQuery(get_1.default(inputProps, "value", ""));
                    }, variables: { surface: types_1.Surface.base }, styles: { marginBottom: "2.5rem" } }),
                react_1.default.createElement(react_northstar_1.Box, null, widgets.map(function (_a) {
                    var id = _a.id, title = _a.title;
                    var widgetTitle = translations_1.getText(t.locale, title);
                    return (matchesFind(findQuery, widgetTitle) && (react_1.default.createElement(react_northstar_1.Checkbox, { toggle: true, key: "widgetDisplayToggle-" + id, checked: get_1.default(preferencesState, "widgetSettings." + id + ".display"), label: widgetTitle, labelPosition: "start", styles: {
                            display: "flex",
                            margin: ".5rem 0",
                            paddingLeft: 0,
                            paddingRight: 0,
                        }, variables: { labelFlex: "1 0 0" }, onChange: function (_e, props) {
                            updatePreferences(immer_1.default(preferencesState, function (draft) {
                                set_1.default(draft, "widgetSettings." + id + ".display", !!(props === null || props === void 0 ? void 0 : props.checked));
                            }));
                        } })));
                }))), footer: react_1.default.createElement(react_northstar_1.Flex, { hAlign: "end", vAlign: "center", styles: { height: "4.5rem", padding: "0 2rem 0 2rem" } },
                react_1.default.createElement(react_northstar_1.Button, { primary: true, content: t["ok"], onClick: onClose })) }), onCancel: onClose, onConfirm: onClose, footer: null }, { open: open }, { variables: { variant: types_1.DialogVariant.sidebar }, styles: {
            width: "20rem",
        } })));
};
//# sourceMappingURL=Sidebar.js.map