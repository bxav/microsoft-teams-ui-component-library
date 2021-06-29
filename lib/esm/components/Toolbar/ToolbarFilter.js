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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState } from "react";
import get from "lodash/get";
import { Box, Button, Divider, Popup, Text, Tooltip, Tree, tooltipAsLabelBehavior, } from "@fluentui/react-northstar";
import { FilterIcon, TriangleDownIcon, TriangleEndIcon, } from "@fluentui/react-icons-northstar";
import { TeamsTheme } from "../../themes";
var treeItemIconStyles = {
    position: "relative",
    left: "-1rem",
    height: "1rem",
    width: "0",
    display: "block",
    pointerEvents: "none",
};
var treeItemTitleRenderer = function (Component, _a) {
    var content = _a.content, expanded = _a.expanded, hasSubtree = _a.hasSubtree, restProps = __rest(_a, ["content", "expanded", "hasSubtree"]);
    return (React.createElement(Component, __assign({ expanded: expanded, hasSubtree: hasSubtree, styles: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "0.325rem 0.875rem 0.325rem 1.125rem",
        }, selectionIndicator: {
            styles: { flex: "0 0 auto", marginLeft: "1rem" },
        } }, restProps),
        hasSubtree ? (expanded ? (React.createElement(TriangleDownIcon, { styles: treeItemIconStyles })) : (React.createElement(TriangleEndIcon, { styles: treeItemIconStyles }))) : null,
        React.createElement(Text, { styles: {
                flex: "1 1 auto",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                pointerEvents: "none",
                marginRight: ".5rem",
            }, content: content, className: "extended-toolbar__filters-menu__item__content" })));
};
var addSelectableParent = function (items) {
    return items.map(function (item) {
        if (item && item.hasOwnProperty("items"))
            return Object.assign(item, {
                selectableParent: true,
                items: addSelectableParent(get(item, ["items"], [])),
            });
        else
            return item;
    });
};
var findSingleTitle = function (selectedId, filters) {
    var result = null;
    for (var i = 0; i < filters.length; i += 1) {
        if (get(filters, [i, "id"]) === selectedId) {
            result = get(filters, [i, "title"]);
            break;
        }
        else if (Array.isArray(get(filters, [i, "items"]))) {
            var deepResult = findSingleTitle(selectedId, get(filters, [i, "items"]));
            if (deepResult) {
                result = deepResult;
                break;
            }
        }
    }
    return result;
};
var getSingleTitle = function (t, layout, selectedId, filters) {
    switch (layout) {
        case "verbose":
            return ((selectedId && findSingleTitle(selectedId, filters)) || t["filter"]);
        default:
        case "compact":
            return selectedId ? "(1)" : "";
    }
};
var passThrough = function (arg) { return arg; };
export var ToolbarFilter = function (props) {
    var layout = props.layout, filters = props.filters, singleSelect = props.singleSelect, open = props.open, onOpenChange = props.onOpenChange, toolbarMenuProps = props.toolbarMenuProps, toolbarButtonStyles = props.toolbarButtonStyles, t = props.t;
    var _a = useState([]), selectedFilters = _a[0], setSelectedFilters = _a[1];
    var propagateSetSelectedFilters = function (selectedFilters) {
        return setSelectedFilters((props.onSelectedFiltersChange || passThrough)(selectedFilters));
    };
    var invokerTitle = singleSelect
        ? getSingleTitle(t, layout, selectedFilters[0], filters)
        : "" + (layout === "verbose" ? t["filter"] : "") + (selectedFilters.length > 0 ? " (" + selectedFilters.length + ")" : "");
    var filtersForTree = singleSelect
        ? filters
        : addSelectableParent(filters);
    var filterInvoker = (React.createElement(Button, { text: true, title: t["filter"], content: invokerTitle, className: "extended-toolbar__filters-invoker", icon: React.createElement(FilterIcon, { outline: true }), styles: __assign(__assign({}, toolbarButtonStyles), { marginRight: ".5rem", flex: "0 0 auto" }), onClick: function (e) { return onOpenChange(e, { open: !open }); } }));
    return filters.length ? (React.createElement(Popup, __assign({}, toolbarMenuProps, { open: open, onOpenChange: onOpenChange, trigger: layout === "compact" ? (React.createElement(Tooltip, { trigger: filterInvoker, content: t["filter"], accessibility: tooltipAsLabelBehavior })) : (filterInvoker), content: {
            styles: { width: "13.75rem" },
            content: (React.createElement(Box, { className: "extended-toolbar__filters-menu" },
                React.createElement(Box, { className: "extended-toolbar__filters-menu__header", styles: {
                        display: "flex",
                        flexFlow: "row wrap",
                        alignItems: "center",
                        padding: "0 .5rem",
                    } },
                    React.createElement(Text, { content: t["filter"], className: "extended-toolbar__filters-menu__title", styles: {
                            flex: "1 0 auto",
                            padding: ".5rem 0",
                        } }),
                    React.createElement(Button, { text: true, primary: true, content: t["clear"], "aria-label": t["clear"], className: "extended-toolbar__filters-menu__clear-action", onClick: function () { return propagateSetSelectedFilters([]); }, styles: {
                            marginRight: "calc(1px - .5rem)",
                            padding: ".5rem",
                            height: "2rem",
                            minWidth: 0,
                        }, variables: function (_a) {
                            var colorScheme = _a.colorScheme, theme = _a.theme;
                            var color = colorScheme.brand.foreground;
                            switch (theme) {
                                case TeamsTheme.HighContrast:
                                    color = colorScheme.grey.foregroundHover;
                                    break;
                            }
                            return { color: color };
                        } })),
                React.createElement(Divider, { styles: { padding: 0, margin: "0 .5rem" } }),
                React.createElement(Tree, { selectable: true, items: filtersForTree, onSelectedItemIdsChange: function (_e, props) {
                        var selectedItemIds = props === null || props === void 0 ? void 0 : props.selectedItemIds;
                        var nextSelectedFilters = typeof selectedItemIds === "function"
                            ? selectedItemIds(selectedFilters)
                            : Array.isArray(selectedItemIds)
                                ? selectedItemIds
                                : [];
                        propagateSetSelectedFilters(singleSelect
                            ? nextSelectedFilters.slice(nextSelectedFilters.length - 1, nextSelectedFilters.length)
                            : nextSelectedFilters);
                    }, selectedItemIds: selectedFilters, renderItemTitle: treeItemTitleRenderer, className: "extended-toolbar__filters-menu__tree", "aria-labelledby": "extended-toolbar__filters-menu__title", styles: { padding: "0.3125rem 0" } }))),
        }, trapFocus: {
            firstFocusableSelector: ".extended-toolbar__filters-menu__tree [data-is-focusable=true]",
        } }))) : null;
};
//# sourceMappingURL=ToolbarFilter.js.map