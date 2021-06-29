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
exports.Toolbar = void 0;
var react_1 = __importStar(require("react"));
var omit_1 = __importDefault(require("lodash/omit"));
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var react_northstar_1 = require("@fluentui/react-northstar");
var Icon_1 = __importDefault(require("../../lib/Icon"));
var themes_1 = require("../../themes");
var ToolbarFilter_1 = require("./ToolbarFilter");
var ToolbarFind_1 = require("./ToolbarFind");
var ToolbarTheme_1 = require("./ToolbarTheme");
var slugSeparator = "__";
var toolbarMenuProps = {
    offset: [0, 4],
    position: "below",
};
var toolbarActionTooltipProps = (function () {
    var props = cloneDeep_1.default(toolbarMenuProps);
    props.offset[1] += 10;
    return props;
})();
var toolbarButtonStyles = {
    padding: ".5rem",
    borderWidth: "1px",
    marginTop: 0,
    marginBottom: 0,
    height: "3rem",
    minWidth: 0,
    "&:focus:before": {
        top: "calc(.5rem - 1px)",
        bottom: "calc(.5rem - 1px)",
    },
    "&:focus:after": {
        top: "calc(.5rem - 1px)",
        bottom: "calc(.5rem - 1px)",
    },
};
function flattenedActions(actionGroups) {
    return Object.keys(actionGroups).reduce(function (acc_i, actionGroupSlug) {
        var actionGroup = actionGroups[actionGroupSlug];
        return Object.keys(actionGroup).reduce(function (acc_j, actionKey) {
            var action = actionGroup[actionKey];
            acc_j["" + actionGroupSlug + slugSeparator + actionKey] = action;
            return acc_j;
        }, acc_i);
    }, {});
}
function needsSeparator(actionKey, index, actionKeys) {
    var _a;
    return index === 0
        ? false
        : ((_a = actionKeys[index - 1]) === null || _a === void 0 ? void 0 : _a.split(slugSeparator)[0]) !==
            actionKey.split(slugSeparator)[0];
}
var InFlowToolbarItem = function (_a) {
    var action = _a.action, layout = _a.layout;
    var icon = action.icon, title = action.title;
    var contentIcon = (react_1.default.createElement(react_northstar_1.Box, { styles: {
            width: "1rem",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            "@media (min-width: 640px)": {
                marginRight: ".5rem",
            },
        }, className: "extended-toolbar__near-side__item__icon" },
        react_1.default.createElement(Icon_1.default, { icon: icon })));
    switch (layout) {
        case "verbose":
            return (react_1.default.createElement(react_1.default.Fragment, null,
                contentIcon,
                react_1.default.createElement(react_northstar_1.ButtonContent, { content: title })));
        default:
        case "compact":
            return (react_1.default.createElement(react_northstar_1.Tooltip, __assign({}, toolbarActionTooltipProps, { trigger: contentIcon, content: title, accessibility: react_northstar_1.tooltipAsLabelBehavior })));
    }
};
/**
 * @public
 */
exports.Toolbar = function (props) {
    var actionGroups = props.actionGroups, filters = props.filters, filtersSingleSelect = props.filtersSingleSelect, find = props.find;
    var allActions = flattenedActions(actionGroups);
    var _a = react_1.useState(false), overflowOpen = _a[0], setOverflowOpen = _a[1];
    var _b = react_1.useState(false), filtersOpen = _b[0], setFiltersOpen = _b[1];
    var _c = react_1.useState("compact"), layout = _c[0], setLayout = _c[1];
    var _d = react_1.useState(false), findActive = _d[0], setFindActive = _d[1];
    var layoutQuery = react_1.useRef(null);
    var onChangeLayout = function () {
        setLayout(layoutQuery.current && layoutQuery.current.matches ? "verbose" : "compact");
    };
    react_1.useLayoutEffect(function () {
        layoutQuery.current = window.matchMedia("(min-width: 640px)");
        layoutQuery.current.addEventListener("change", onChangeLayout);
        onChangeLayout();
        return function () { var _a; return (_a = layoutQuery.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("change", onChangeLayout); };
    });
    var inFlowToolbarItems = Object.keys(allActions).reduce(function (acc, actionKey, index, actionKeys) {
        var action = allActions[actionKey];
        acc.push(__assign({ key: actionKey, children: react_1.default.createElement(InFlowToolbarItem, { action: action, layout: layout }), title: action.title, "aria-label": action.title, className: "extended-toolbar__near-side__item", styles: __assign(__assign({}, toolbarButtonStyles), { flex: "0 0 auto", margin: "0 .0625rem", display: "inline-flex", justifyContent: "center", alignItems: "center" }) }, (props.onInteraction && {
            onClick: function () {
                return props.onInteraction({
                    event: "click",
                    target: "toolbar",
                    subject: action.subject || null,
                    action: actionKey.split("__").pop(),
                });
            },
        })));
        if (needsSeparator(actionKey, index, actionKeys))
            acc.push({
                key: "divider" + slugSeparator + index,
                kind: "divider",
            });
        return acc;
    }, []);
    var overflowToolbarItems = Object.keys(allActions).reduce(function (acc, actionKey, index, actionKeys) {
        var action = allActions[actionKey];
        acc.push(__assign({ key: actionKey, content: action.title, icon: react_1.default.createElement(Icon_1.default, { icon: action.icon }), title: action.title, "aria-label": action.title, styles: { padding: ".375rem .5rem" } }, (props.onInteraction && {
            onClick: function () {
                return props.onInteraction({
                    event: "click",
                    target: "toolbar",
                    action: actionKey.split("__").pop(),
                    subject: action.subject || null,
                });
            },
        })));
        if (needsSeparator(actionKey, index, actionKeys))
            acc.push({
                key: "divider" + slugSeparator + index,
                kind: "divider",
                styles: { margin: ".25rem 0", "&:first-child": { display: "none" } },
            });
        return acc;
    }, []);
    var displayFindOnly = find && layout === "compact" && findActive;
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (react_1.default.createElement(ToolbarTheme_1.ToolbarTheme, { globalTheme: globalTheme },
                react_1.default.createElement(react_northstar_1.Box, __assign({ className: "extended-toolbar", variables: function (_a) {
                        var colorScheme = _a.colorScheme, theme = _a.theme;
                        return ({
                            backgroundColor: theme === themes_1.TeamsTheme.HighContrast
                                ? colorScheme.grey.background
                                : colorScheme.default.background2,
                            elevation: colorScheme.elevations[16],
                        });
                    }, styles: {
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 1.25rem",
                        boxShadow: "none",
                    } }, omit_1.default(props, [
                    "actionGroups",
                    "filters",
                    "find",
                    "filtersSingleSelect",
                    "onSelectedFiltersChange",
                    "onFindQueryChange",
                ])),
                    !displayFindOnly && (react_1.default.createElement(react_northstar_1.Toolbar, { items: inFlowToolbarItems, overflow: true, overflowOpen: overflowOpen, overflowItem: {
                            title: t["more"],
                            menu: toolbarMenuProps,
                            styles: toolbarButtonStyles,
                        }, onOverflowOpenChange: function (e, props) {
                            var open = !!(props === null || props === void 0 ? void 0 : props.overflowOpen);
                            setOverflowOpen(open);
                            if (open)
                                setFiltersOpen(false);
                        }, getOverflowItems: function (startIndex) {
                            return overflowToolbarItems.slice(startIndex);
                        }, styles: {
                            flex: "1 0 0",
                            overflow: "hidden",
                            maxWidth: "40rem",
                            minWidth: "2rem",
                        } })),
                    react_1.default.createElement(react_northstar_1.Box, { styles: {
                            flex: displayFindOnly ? "1 1 100%" : "0 1 auto",
                            display: "flex",
                            flexFlow: "row nowrap",
                            overflow: "hidden",
                            paddingLeft: displayFindOnly ? "0" : "2.5rem",
                        } },
                        !displayFindOnly && filters && (react_1.default.createElement(ToolbarFilter_1.ToolbarFilter, __assign({ singleSelect: !!filtersSingleSelect, open: filtersOpen, onOpenChange: function (_e, props) {
                                var open = !!(props === null || props === void 0 ? void 0 : props.open);
                                setFiltersOpen(open);
                                if (open)
                                    setOverflowOpen(false);
                            }, onSelectedFiltersChange: props.onSelectedFiltersChange }, {
                            layout: layout,
                            filters: filters,
                            toolbarMenuProps: toolbarMenuProps,
                            toolbarButtonStyles: toolbarButtonStyles,
                            t: t,
                        }))),
                        find && (react_1.default.createElement(ToolbarFind_1.ToolbarFind, __assign({}, {
                            layout: layout,
                            findActive: findActive,
                            setFindActive: setFindActive,
                            toolbarButtonStyles: toolbarButtonStyles,
                            onFindQueryChange: props.onFindQueryChange,
                            t: t,
                        })))))));
        } }));
};
//# sourceMappingURL=Toolbar.js.map