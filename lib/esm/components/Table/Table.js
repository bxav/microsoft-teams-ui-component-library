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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useLayoutEffect, useState, useRef, } from "react";
import omit from "lodash/omit";
import debounce from "lodash/debounce";
import get from "lodash/get";
import { Button, Checkbox, Flex, Popup, Menu, MenuButton, ProviderConsumer as FluentUIThemeConsumer, Table as FluentUITable, Text, dialogBehavior, gridNestedBehavior, gridCellWithFocusableElementBehavior, } from "@fluentui/react-northstar";
import { ArrowDownIcon, ArrowUpIcon, AcceptIcon, ChevronDownIcon, MoreIcon, OpenOutsideIcon, } from "@fluentui/react-icons-northstar";
import Icon from "../../lib/Icon";
import Avatar from "../../lib/Avatar";
import { TableTheme } from "./TableTheme";
import getBreakpoints, { accessoryWidth, columnMinWidth, } from "./tableBreakpoints";
import { EButtonVariants, } from "../..";
import { TeamsTheme } from "../../themes";
import { getText } from "../../translations";
var SortOrderIndicator = function (_a) {
    var columnKey = _a.columnKey, sortOrder = _a.sortOrder;
    var sortOrderKey = sortOrder[0], sortOrderDirection = sortOrder[1];
    if (columnKey === sortOrderKey) {
        if (sortOrderDirection === "asc")
            return (React.createElement(React.Fragment, null,
                React.createElement(ArrowUpIcon, { outline: true, styles: { marginRight: ".25rem", marginLeft: ".5rem" } }),
                React.createElement(ChevronDownIcon, { outline: true, size: "small" })));
        else
            return (React.createElement(React.Fragment, null,
                React.createElement(ArrowDownIcon, { outline: true, styles: { marginRight: ".25rem", marginLeft: ".5rem" } }),
                React.createElement(ChevronDownIcon, { outline: true, size: "small" })));
    }
    else
        return React.createElement(ChevronDownIcon, { outline: true, size: "small" });
};
var ariaSort = function (_a) {
    var columnKey = _a.columnKey, sortOrder = _a.sortOrder;
    var sortOrderKey = sortOrder[0], sortOrderDirection = sortOrder[1];
    if (columnKey === sortOrderKey) {
        if (sortOrderDirection === "asc")
            return { "aria-sort": "ascending" };
        else
            return { "aria-sort": "descending" };
    }
    else
        return { "aria-sort": undefined };
};
var defaultSortOrder = ["__rowKey__", "desc"];
var passThrough = function (arg) { return arg; };
var CellContentOrnament = function (_a) {
    var type = _a.type, props = __rest(_a, ["type"]);
    switch (type) {
        case "avatar":
            return (React.createElement(Avatar, __assign({}, props, { styles: { margin: "-0.375rem 0 -0.375rem 0" } })));
        case "icon":
            return React.createElement(Icon, __assign({}, props));
        default:
            return null;
    }
};
var CellContent = function (_a) {
    var locale = _a.locale, rtl = _a.rtl, cell = _a.cell, onInteraction = _a.onInteraction, rowKey = _a.rowKey;
    if (!cell)
        return null;
    if (get(cell, "type") === "button") {
        var buttonCell_1 = cell;
        var textContent = getText(locale, buttonCell_1.content);
        var props = __assign(__assign(__assign(__assign(__assign({ title: textContent, style: { margin: "-.8125rem 0", transform: "translateY(-.125rem)" } }, (buttonCell_1.disabled && { disabled: true })), (buttonCell_1.iconOnly ? { iconOnly: true } : { content: textContent })), (onInteraction && {
            onClick: function () {
                return onInteraction({
                    event: "click",
                    target: "table",
                    subject: rowKey,
                    action: buttonCell_1.actionId,
                });
            },
        })), (buttonCell_1.icon && { icon: React.createElement(Icon, { icon: buttonCell_1.icon }) })), (buttonCell_1.iconPosition && { iconPosition: buttonCell_1.iconPosition }));
        switch (buttonCell_1.variant) {
            case EButtonVariants.primary:
                props = __assign(__assign({}, props), { primary: true });
                break;
            case EButtonVariants.text:
                props = __assign(__assign({}, props), { text: true });
                break;
            case EButtonVariants.tinted:
                props = __assign(__assign({}, props), { tinted: true });
                break;
            case EButtonVariants.default:
            default:
                break;
        }
        return React.createElement(Button, __assign({}, props));
    }
    if (cell.hasOwnProperty("content")) {
        var ornamentedCell = cell;
        return (React.createElement(Flex, { vAlign: "center" },
            ornamentedCell.before && (React.createElement(CellContentOrnament, __assign({}, ornamentedCell.before, (ornamentedCell.before.hasOwnProperty("name") && {
                name: getText(locale, ornamentedCell.before.name),
            })))),
            React.createElement(Text, { styles: {
                    marginLeft: ornamentedCell.hasOwnProperty(rtl ? "after" : "before")
                        ? ".5rem"
                        : 0,
                    marginRight: ornamentedCell.hasOwnProperty(rtl ? "before" : "after")
                        ? ".5rem"
                        : 0,
                } }, getText(locale, ornamentedCell.content)),
            ornamentedCell.after && (React.createElement(CellContentOrnament, __assign({}, ornamentedCell.after, (ornamentedCell.after.hasOwnProperty("name") && {
                name: getText(locale, ornamentedCell.after.name),
            }))))));
    }
    else {
        return React.createElement(Text, null, getText(locale, cell));
    }
};
/**
 * @public
 */
export var Table = function (props) {
    var rowKeys = Object.keys(props.rows);
    var columnKeys = Object.keys(props.columns);
    var _a = useState(defaultSortOrder), sortOrder = _a[0], setSortOrder = _a[1];
    var _b = useState(new Set()), selected = _b[0], setSelected = _b[1];
    var propagateSetSelected = function (selected) {
        return setSelected((props.onSelectedChange || passThrough)(selected));
    };
    var selectedIndeterminate = selected.size > 0 && selected.size < rowKeys.length;
    var hasActions = rowKeys.findIndex(function (rowKey) {
        return props.rows[rowKey].hasOwnProperty("actions");
    }) >= 0;
    var breakpoints = getBreakpoints(props.columns, hasActions, !!props.selectable);
    var $tableWrapper = useRef(null);
    var _c = useState(
    // start by displaying all columns (in case of SSR)
    breakpoints.get(Infinity)), inFlowColumns = _c[0], setInFlowColumns = _c[1];
    var onResize = function () {
        if ($tableWrapper.current !== null) {
            var widths = Array.from(breakpoints.keys()).sort(function (a, b) { return a - b; });
            var firstBreak = widths.findIndex(function (width) { return width > $tableWrapper.current.clientWidth; });
            // use the last width to not be greater than the client width, or zero if they all were
            var nextInFlowColumns = breakpoints.get(widths[Math.max(0, firstBreak - 1)]);
            setInFlowColumns(nextInFlowColumns);
        }
    };
    useLayoutEffect(function () {
        var debouncedResize = debounce(onResize, 100);
        window.addEventListener("resize", debouncedResize);
        onResize();
        return function () { return window.removeEventListener("resize", debouncedResize); };
    }, []);
    var rowWidthStyles = function (truncate, selectable) {
        var minWidth = Array.from(inFlowColumns).reduce(function (acc, columnKey) { return acc + columnMinWidth(columnKey, props.columns); }, 0);
        return __assign({ padding: "0 1.25rem", minWidth: minWidth + "px" }, (selectable && { cursor: "pointer" }));
    };
    var columnWidthStyles = function (columnKey, truncate) {
        var minWidth = columnMinWidth(columnKey, props.columns);
        return {
            flexGrow: minWidth,
            minWidth: minWidth + "px",
        };
    };
    var accessoryStyles = {
        flexShrink: 0,
        flexGrow: 0,
        width: accessoryWidth + "px",
        minWidth: accessoryWidth + "px",
        display: "flex",
        justifyContent: "center",
        height: "calc(3rem - 2px)",
    };
    var columnOrder = __spreadArrays(["selection"], columnKeys, ["overflow"]);
    var rowOrder = sortOrder[0] === defaultSortOrder[0]
        ? rowKeys
        : rowKeys.sort(function (rowKeyA, rowKeyB) {
            var rowKeyI = rowKeyA, rowKeyJ = rowKeyB;
            if (sortOrder[1] === "asc") {
                rowKeyI = rowKeyB;
                rowKeyJ = rowKeyA;
            }
            return props.rows[rowKeyI][sortOrder[0]].localeCompare(props.rows[rowKeyJ][sortOrder[0]]);
        });
    var hiddenColumns = new Set(columnKeys.filter(function (columnKey) { return !inFlowColumns.has(columnKey); }));
    var setRowSelected = function (rowSelected, rowKey) {
        if (rowSelected)
            propagateSetSelected(new Set(selected.add(rowKey)));
        else {
            selected.delete(rowKey);
            propagateSetSelected(new Set(selected));
        }
    };
    var includeRow = function (row) {
        return props.filterBy ? props.filterBy(row) : true;
    };
    var sortableLabelDesc = function (t, sortable) {
        return t["sort-order " + sortable + " descending"];
    };
    var sortableLabelAsc = function (t, sortable) {
        return t["sort-order " + sortable + " ascending"];
    };
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var _a = globalTheme.siteVariables, t = _a.t, rtl = _a.rtl;
            return (React.createElement(TableTheme, { globalTheme: globalTheme },
                React.createElement("div", { ref: $tableWrapper, style: { width: "100%", overflowX: "auto" } },
                    React.createElement(FluentUITable, __assign({ header: {
                            key: "header",
                            compact: true,
                            variables: { compactRow: true },
                            styles: __assign(__assign({}, rowWidthStyles(!!props.truncate, false)), { backgroundColor: globalTheme.siteVariables.colorScheme.default.background2 }),
                            items: columnOrder.reduce(function (acc, columnKey) {
                                var _a;
                                var column = props.columns[columnKey];
                                if (inFlowColumns.has(columnKey))
                                    switch (columnKey) {
                                        case "overflow":
                                            acc.push({
                                                key: "header__overflow",
                                                content: "",
                                                styles: accessoryStyles,
                                                "data-is-focusable": false,
                                            });
                                            break;
                                        case "selection":
                                            acc.push({
                                                key: "header__selection",
                                                accessibility: gridCellWithFocusableElementBehavior,
                                                content: (React.createElement(Checkbox, { "aria-label": "Select all", checked: selected.size > 0, variables: {
                                                        margin: 0,
                                                        indeterminate: selectedIndeterminate,
                                                    }, onChange: function (_e, props) {
                                                        if (props === null || props === void 0 ? void 0 : props.checked)
                                                            propagateSetSelected(new Set(rowKeys));
                                                        else if (selectedIndeterminate)
                                                            propagateSetSelected(new Set(rowKeys));
                                                        else
                                                            propagateSetSelected(new Set());
                                                    }, styles: {
                                                        gridTemplateColumns: "1fr",
                                                    } })),
                                                styles: __assign(__assign({}, accessoryStyles), { height: "calc(2.5rem - 2px)" }),
                                            });
                                            break;
                                        default:
                                            var columnTitle = (column === null || column === void 0 ? void 0 : column.icon) ? (React.createElement(Flex, { vAlign: "center" },
                                                React.createElement(Icon, { icon: column.icon }),
                                                React.createElement(Text, { style: (_a = {},
                                                        _a[rtl
                                                            ? "marginRight"
                                                            : "marginLeft"] = ".5rem",
                                                        _a) }, getText(t.locale, column.title)))) : (React.createElement(Text, null, getText(t.locale, column.title)));
                                            acc.push(__assign({ key: "header__" + columnKey, content: column.sortable ? (React.createElement(MenuButton, { menu: [
                                                        __assign({ content: sortableLabelDesc(globalTheme.siteVariables.t, column.sortable), onClick: function () {
                                                                setSortOrder(sortOrder[0] === columnKey &&
                                                                    sortOrder[1] === "desc"
                                                                    ? defaultSortOrder
                                                                    : [columnKey, "desc"]);
                                                            } }, (sortOrder[0] === columnKey && {
                                                            icon: (React.createElement(AcceptIcon, { outline: true, styles: {
                                                                    visibility: sortOrder[1] === "desc"
                                                                        ? "visible"
                                                                        : "hidden",
                                                                } })),
                                                        })),
                                                        __assign({ content: sortableLabelAsc(globalTheme.siteVariables.t, column.sortable), onClick: function () {
                                                                setSortOrder(sortOrder[0] === columnKey &&
                                                                    sortOrder[1] === "asc"
                                                                    ? defaultSortOrder
                                                                    : [columnKey, "asc"]);
                                                            } }, (sortOrder[0] === columnKey && {
                                                            icon: (React.createElement(AcceptIcon, { outline: true, styles: {
                                                                    visibility: sortOrder[1] === "asc"
                                                                        ? "visible"
                                                                        : "hidden",
                                                                } })),
                                                        })),
                                                    ], trigger: React.createElement(Button, { content: columnTitle, icon: React.createElement(SortOrderIndicator, __assign({}, { sortOrder: sortOrder, columnKey: columnKey })), iconPosition: "after", text: true, fluid: true, styles: {
                                                            padding: 0,
                                                            height: "100%",
                                                            justifyContent: "flex-start",
                                                        } }), styles: { display: "block", height: "100%" } })) : (columnTitle), styles: columnWidthStyles(columnKey, !!props.truncate), variables: { flush: !!column.sortable } }, (column.sortable
                                                ? __assign({ accessibility: gridCellWithFocusableElementBehavior }, ariaSort({ sortOrder: sortOrder, columnKey: columnKey })) : {})));
                                            break;
                                    }
                                return acc;
                            }, []),
                        }, rows: rowOrder.reduce(function (acc, rowKey) {
                            var row = props.rows[rowKey];
                            var rowActionKeys = (hiddenColumns.size
                                ? ["__details__"]
                                : []).concat(row.actions ? Object.keys(row.actions) : []);
                            if (includeRow(row))
                                acc.push({
                                    key: rowKey,
                                    styles: rowWidthStyles(!!props.truncate, !!props.selectable),
                                    variables: function (_a) {
                                        var colorScheme = _a.colorScheme, theme = _a.theme;
                                        return selected.has(rowKey) &&
                                            theme !== TeamsTheme.HighContrast
                                            ? {
                                                backgroundColor: colorScheme.grey.backgroundFocus,
                                                color: colorScheme.grey.foregroundFocus,
                                            }
                                            : {
                                                backgroundColor: colorScheme.default.background2,
                                            };
                                    },
                                    onClickCapture: function (e) {
                                        if (props.selectable) {
                                            var aaClass = e.target.getAttribute("data-aa-class");
                                            if (aaClass && aaClass.startsWith("Table")) {
                                                e.stopPropagation();
                                                setRowSelected(!selected.has(rowKey), rowKey);
                                            }
                                        }
                                    },
                                    items: columnOrder.reduce(function (acc, columnKey) {
                                        if (inFlowColumns.has(columnKey))
                                            switch (columnKey) {
                                                case "overflow":
                                                    acc.push({
                                                        key: rowKey + "__overflow",
                                                        content: rowActionKeys.length ? (React.createElement(Popup, { trigger: React.createElement(Button, { icon: React.createElement(MoreIcon, { outline: true }), text: true, "aria-label": "More actions", styles: { color: "currentColor" } }), content: React.createElement(Menu, { items: rowActionKeys.map(function (rowActionKey) {
                                                                    switch (rowActionKey) {
                                                                        case "__details__":
                                                                            return __assign({ key: rowKey + "__details__", icon: (React.createElement(OpenOutsideIcon, { outline: true })), content: "Details" }, (props.onInteraction && {
                                                                                onClick: function () {
                                                                                    return props.onInteraction({
                                                                                        event: "click",
                                                                                        target: "table",
                                                                                        subject: rowKey,
                                                                                        action: rowActionKey,
                                                                                    });
                                                                                },
                                                                            }));
                                                                        default:
                                                                            return __assign({ key: rowKey + "__" + rowActionKey, icon: (React.createElement(Icon, { icon: row.actions[rowActionKey].icon })), content: row.actions[rowActionKey].title }, (props.onInteraction && {
                                                                                onClick: function () {
                                                                                    return props.onInteraction({
                                                                                        event: "click",
                                                                                        target: "table",
                                                                                        subject: rowKey,
                                                                                        action: rowActionKey,
                                                                                    });
                                                                                },
                                                                            }));
                                                                    }
                                                                }), vertical: true }), offset: [-4, 4], position: "below", accessibility: dialogBehavior, autoFocus: true })) : (""),
                                                        styles: accessoryStyles,
                                                        accessibility: gridCellWithFocusableElementBehavior,
                                                    });
                                                    break;
                                                case "selection":
                                                    acc.push({
                                                        key: rowKey + "__selection",
                                                        content: (React.createElement(Checkbox, { "aria-label": "Select", variables: { margin: 0 }, checked: selected.has(rowKey), onChange: function (_e, props) {
                                                                setRowSelected(!!(props === null || props === void 0 ? void 0 : props.checked), rowKey);
                                                            }, styles: {
                                                                gridTemplateColumns: "1fr",
                                                            } })),
                                                        accessibility: gridCellWithFocusableElementBehavior,
                                                        styles: accessoryStyles,
                                                    });
                                                    break;
                                                default:
                                                    var cell = row[columnKey];
                                                    acc.push(__assign({ key: rowKey + "__" + columnKey, content: (React.createElement(CellContent, __assign({ locale: t.locale, rtl: t.rtl, cell: cell }, {
                                                            rowKey: rowKey,
                                                            onInteraction: props.onInteraction,
                                                        }))), truncateContent: !!props.truncate, styles: columnWidthStyles(columnKey, !!props.truncate) }, (get(cell, "type") === "button" && {
                                                        accessibility: gridCellWithFocusableElementBehavior,
                                                    })));
                                                    break;
                                            }
                                        return acc;
                                    }, []),
                                });
                            return acc;
                        }, []), variables: function (_a) {
                            var theme = _a.theme, colorScheme = _a.colorScheme;
                            return __assign(__assign(__assign({ 
                                // box model
                                compactRowHeight: "2.5rem", defaultRowMinHeight: "3rem", defaultRowVerticalPadding: ".8125rem" }, (props.truncate
                                ? {
                                    defaultRowHeight: "3rem",
                                }
                                : {
                                    defaultRowHeight: "auto",
                                    cellVerticalAlignment: "flex-start",
                                })), { 
                                // colors
                                backgroundColor: theme === TeamsTheme.HighContrast
                                    ? colorScheme.grey.background
                                    : colorScheme.grey.background2 }), (theme === TeamsTheme.HighContrast
                                ? {
                                    rowBorderColor: colorScheme.grey.foreground,
                                    rowBorderHoverColor: colorScheme.grey.foreground,
                                }
                                : {}));
                        }, styles: {
                            width: "auto",
                        }, accessibility: gridNestedBehavior }, omit(props, [
                        "columns",
                        "rows",
                        "truncate",
                        "selectable",
                        "onSelectedChange",
                        "findQuery",
                        "filterBy",
                    ]))))));
        } }));
};
//# sourceMappingURL=Table.js.map