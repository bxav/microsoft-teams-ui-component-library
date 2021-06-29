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
import pick from "lodash/pick";
import { Box } from "@fluentui/react-northstar";
import { Table, } from "../Table/Table";
import { Toolbar, } from "../Toolbar/Toolbar";
import { Communication } from "../..";
import { ProviderConsumer as FluentUIThemeConsumer } from "@fluentui/react-northstar/dist/es/components/Provider/ProviderConsumer";
import { CommunicationOptions } from "../Communication";
import { getText } from "../../translations";
/**
 * @public
 */
export var List = function (props) {
    var tableProps = pick(props, [
        "columns",
        "rows",
        "selectable",
        "truncate",
        "onInteraction",
    ]);
    var toolbarProps = pick(props, [
        "filtersSingleSelect",
        "find",
        "onInteraction",
    ]);
    // Row selection and common actions
    var _a = useState(new Set()), selectedRows = _a[0], setSelectedRows = _a[1];
    var onSelectedChange = function (selected) {
        setSelectedRows(selected);
        return selected;
    };
    var getCommonActionGroups = function () {
        var selectedRowsArr = Array.from(selectedRows);
        var firstActions = props.rows[selectedRowsArr[0]].actions;
        if (firstActions) {
            // return the only selected row's actions if just one is selected
            if (selectedRowsArr.length === 1)
                return {
                    g1: Object.keys(firstActions).reduce(function (acc, actionKey) {
                        acc[actionKey] = __assign(__assign({}, firstActions[actionKey]), { subject: selectedRowsArr });
                        return acc;
                    }, {}),
                };
            else {
                // find all common actions where `multi` is truthy
                var firstMultiActionKeys = new Set(Object.keys(firstActions).filter(function (actionKey) { return firstActions[actionKey].multi; }));
                var commonMultiActionKeys = selectedRowsArr
                    .slice(1)
                    .reduce(function (acc, rowKey) {
                    var rowActions = props.rows[rowKey].actions || {};
                    var multiActionKeys = new Set(Object.keys(rowActions).filter(function (actionKey) { return rowActions[actionKey].multi; }));
                    return new Set(Array.from(acc).filter(function (actionKey) {
                        return multiActionKeys.has(actionKey);
                    }));
                }, firstMultiActionKeys);
                return {
                    g1: Array.from(commonMultiActionKeys).reduce(function (acc, actionKey) {
                        acc[actionKey] = __assign(__assign({}, firstActions[actionKey]), { subject: selectedRowsArr });
                        return acc;
                    }, {}),
                };
            }
        }
        // there are no actions selected rows could have in common
        else
            return {};
    };
    var actionGroups = selectedRows.size > 0
        ? getCommonActionGroups()
        : props.emptySelectionActionGroups;
    // Filters and find:
    var _b = useState([]), selectedFilters = _b[0], setSelectedFilters = _b[1];
    var onSelectedFiltersChange = function (selectedFilters) {
        setSelectedFilters(selectedFilters);
        return selectedFilters;
    };
    var filterMap = {};
    var filters = (function () {
        return props.filters
            ? props.filters.reduce(function (acc, columnKey, c) {
                acc[c] = {
                    id: "f" + c,
                    title: props.columns[columnKey].title,
                    items: Array.from(Object.keys(props.rows).reduce(function (acc, rowKey) {
                        acc.add(props.rows[rowKey][columnKey]);
                        return acc;
                    }, new Set())).map(function (title, v) {
                        var id = "f" + c + "f" + v;
                        filterMap[id] = [columnKey, title];
                        return {
                            id: id,
                            title: title,
                        };
                    }),
                };
                return acc;
            }, [])
            : [];
    })();
    var _c = useState(null), findQuery = _c[0], setFindQuery = _c[1];
    var onFindQueryChange = function (query) {
        if (query.length > 0) {
            try {
                setFindQuery(new RegExp(query, "imu"));
            }
            catch (_err) {
                setFindQuery(query);
            }
        }
        else
            setFindQuery(null);
        return query;
    };
    var rowPassesFilters = function (row) {
        if (selectedFilters.length === 0)
            return true;
        else {
            return (selectedFilters.findIndex(function (filterId) {
                var _a = filterMap[filterId], columnKey = _a[0], value = _a[1];
                return row[columnKey] === value;
            }) > -1);
        }
    };
    var rowPassesFind = function (row) {
        if (findQuery) {
            return (Object.keys(row).findIndex(function (columnKey) {
                var value = JSON.stringify(row[columnKey]);
                return typeof findQuery === "string"
                    ? value.includes(findQuery)
                    : findQuery.test(value);
            }) > -1);
        }
        else
            return true;
    };
    var filterBy = function (row) {
        return rowPassesFilters(row) && rowPassesFind(row);
    };
    // Return value
    return (React.createElement(React.Fragment, null,
        React.createElement(Toolbar, __assign({}, toolbarProps, {
            actionGroups: actionGroups,
            filters: filters,
            onSelectedFiltersChange: onSelectedFiltersChange,
            onFindQueryChange: onFindQueryChange,
        }, { "aria-controls": "fluentui-teams__list-content", "aria-label": "List content controls" })),
        Object.keys(props.rows).length > 0 ? (React.createElement(Table, __assign({}, tableProps, { onSelectedChange: onSelectedChange, filterBy: filterBy }, { "aria-live": "polite", id: "fluentui-teams__list-content", "aria-label": "List content" }))) : (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
                var t = globalTheme.siteVariables.t;
                return (React.createElement(Box, { styles: { height: "calc(100vh - 4.25rem)" } },
                    React.createElement(Communication, __assign({}, (props.emptyState || {
                        option: CommunicationOptions.Empty,
                        fields: {
                            title: getText(t.locale, t["list empty header"]),
                            desc: getText(t.locale, t["list empty body"]),
                        },
                    }), { onInteraction: props.onInteraction }))));
            } }))));
};
//# sourceMappingURL=List.js.map