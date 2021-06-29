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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import groupBy from "lodash/groupBy";
export var defaultMinWidth = 240;
export var accessoryWidth = 40;
export var staticSpacing = 40;
var defaultHidePriority = Infinity;
export var columnMinWidth = function (columnKey, columns) {
    switch (columnKey) {
        case "overflow":
        case "selection":
            return accessoryWidth;
        default:
            return columns[columnKey].minWidth || defaultMinWidth;
    }
};
export default function getBreakpoints(columns, hasActions, selectable) {
    var preparedColumns = Object.keys(columns)
        // flatten columns and add key as value and defaults
        .map(function (columnKey) { return (__assign({ key: columnKey, hidePriority: defaultHidePriority }, columns[columnKey])); })
        // sort by priority
        .sort(function (columnA, columnB) { return columnA.hidePriority - columnB.hidePriority; });
    // group columns between those that can be hidden and those that can’t
    var preparedColumnsByHideable = __assign({ true: [], false: [] }, groupBy(preparedColumns, function (column) { return !!column.hideable; }));
    // define the set of columns that must be included in all breakpoints
    var baseSet = new Set(preparedColumnsByHideable["false"]
        .map(function (column) { return column.key; })
        .concat(__spreadArrays((selectable ? ["selection"] : []), (hasActions || preparedColumnsByHideable["true"].length > 0
        ? ["overflow"]
        : []))));
    // accumulate breakpoints by each hide-able columns' minimum width
    return preparedColumnsByHideable["true"].reduce(function (acc, column, i, arr) {
        var minWidth = columnMinWidth(column.key, columns);
        var cursor = acc.cursor + minWidth;
        return {
            cursor: cursor,
            breakpoints: acc.breakpoints.set(cursor, new Set(Array.from(acc.breakpoints.get(acc.cursor) || baseSet).concat(__spreadArrays([
                column.key
            ], (i + 1 < arr.length ? ["overflow"] : []))))),
        };
    }, {
        // cursor begins at the min width for all columns that can’t be hidden
        cursor: preparedColumnsByHideable["false"].reduce(function (acc, column) { return acc + (column.minWidth || defaultMinWidth); }, 0) +
            (hasActions || preparedColumnsByHideable["true"].length > 0
                ? accessoryWidth
                : 0) +
            (selectable ? accessoryWidth : 0) +
            staticSpacing,
        breakpoints: new Map()
            // add an `Infinity` breakpoint which contains all column keys;
            // this is also what is returned if no columns are allowed to be hidden
            .set(Infinity, new Set(Object.keys(columns).concat(__spreadArrays((selectable ? ["selection"] : []), (hasActions ? ["overflow"] : [])))))
            // add a breakpoint for the baseSet
            .set(Array.from(baseSet).reduce(function (acc, columnKey) { return acc + columnMinWidth(columnKey, columns); }, 0), baseSet),
    }
    // return only the breakpoints from the accumulator
    ).breakpoints;
}
//# sourceMappingURL=tableBreakpoints.js.map