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
import React, { useLayoutEffect, useState, useRef } from "react";
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";
import { Box, ButtonContent, ProviderConsumer as FluentUIThemeConsumer, Toolbar as FluentUIToolbar, Tooltip, tooltipAsLabelBehavior, } from "@fluentui/react-northstar";
import Icon from "../../lib/Icon";
import { TeamsTheme } from "../../themes";
import { ToolbarFilter } from "./ToolbarFilter";
import { ToolbarFind } from "./ToolbarFind";
import { ToolbarTheme } from "./ToolbarTheme";
var slugSeparator = "__";
var toolbarMenuProps = {
    offset: [0, 4],
    position: "below",
};
var toolbarActionTooltipProps = (function () {
    var props = cloneDeep(toolbarMenuProps);
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
    var contentIcon = (React.createElement(Box, { styles: {
            width: "1rem",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            "@media (min-width: 640px)": {
                marginRight: ".5rem",
            },
        }, className: "extended-toolbar__near-side__item__icon" },
        React.createElement(Icon, { icon: icon })));
    switch (layout) {
        case "verbose":
            return (React.createElement(React.Fragment, null,
                contentIcon,
                React.createElement(ButtonContent, { content: title })));
        default:
        case "compact":
            return (React.createElement(Tooltip, __assign({}, toolbarActionTooltipProps, { trigger: contentIcon, content: title, accessibility: tooltipAsLabelBehavior })));
    }
};
/**
 * @public
 */
export var Toolbar = function (props) {
    var actionGroups = props.actionGroups, filters = props.filters, filtersSingleSelect = props.filtersSingleSelect, find = props.find;
    var allActions = flattenedActions(actionGroups);
    var _a = useState(false), overflowOpen = _a[0], setOverflowOpen = _a[1];
    var _b = useState(false), filtersOpen = _b[0], setFiltersOpen = _b[1];
    var _c = useState("compact"), layout = _c[0], setLayout = _c[1];
    var _d = useState(false), findActive = _d[0], setFindActive = _d[1];
    var layoutQuery = useRef(null);
    var onChangeLayout = function () {
        setLayout(layoutQuery.current && layoutQuery.current.matches ? "verbose" : "compact");
    };
    useLayoutEffect(function () {
        layoutQuery.current = window.matchMedia("(min-width: 640px)");
        layoutQuery.current.addEventListener("change", onChangeLayout);
        onChangeLayout();
        return function () { var _a; return (_a = layoutQuery.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("change", onChangeLayout); };
    });
    var inFlowToolbarItems = Object.keys(allActions).reduce(function (acc, actionKey, index, actionKeys) {
        var action = allActions[actionKey];
        acc.push(__assign({ key: actionKey, children: React.createElement(InFlowToolbarItem, { action: action, layout: layout }), title: action.title, "aria-label": action.title, className: "extended-toolbar__near-side__item", styles: __assign(__assign({}, toolbarButtonStyles), { flex: "0 0 auto", margin: "0 .0625rem", display: "inline-flex", justifyContent: "center", alignItems: "center" }) }, (props.onInteraction && {
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
        acc.push(__assign({ key: actionKey, content: action.title, icon: React.createElement(Icon, { icon: action.icon }), title: action.title, "aria-label": action.title, styles: { padding: ".375rem .5rem" } }, (props.onInteraction && {
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
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (React.createElement(ToolbarTheme, { globalTheme: globalTheme },
                React.createElement(Box, __assign({ className: "extended-toolbar", variables: function (_a) {
                        var colorScheme = _a.colorScheme, theme = _a.theme;
                        return ({
                            backgroundColor: theme === TeamsTheme.HighContrast
                                ? colorScheme.grey.background
                                : colorScheme.default.background2,
                            elevation: colorScheme.elevations[16],
                        });
                    }, styles: {
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 1.25rem",
                        boxShadow: "none",
                    } }, omit(props, [
                    "actionGroups",
                    "filters",
                    "find",
                    "filtersSingleSelect",
                    "onSelectedFiltersChange",
                    "onFindQueryChange",
                ])),
                    !displayFindOnly && (React.createElement(FluentUIToolbar, { items: inFlowToolbarItems, overflow: true, overflowOpen: overflowOpen, overflowItem: {
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
                    React.createElement(Box, { styles: {
                            flex: displayFindOnly ? "1 1 100%" : "0 1 auto",
                            display: "flex",
                            flexFlow: "row nowrap",
                            overflow: "hidden",
                            paddingLeft: displayFindOnly ? "0" : "2.5rem",
                        } },
                        !displayFindOnly && filters && (React.createElement(ToolbarFilter, __assign({ singleSelect: !!filtersSingleSelect, open: filtersOpen, onOpenChange: function (_e, props) {
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
                        find && (React.createElement(ToolbarFind, __assign({}, {
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