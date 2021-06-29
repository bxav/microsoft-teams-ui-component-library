import React, { useState, useEffect } from "react";
import { Box, Toolbar as Legend, Button as LegendItem, BoldIcon, Flex, } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../../themes";
import { legendLabels } from "../ChartPatterns";
import { getText } from "../../../translations";
var LabelColorValue = function (_a) {
    var index = _a.index, siteVariables = _a.siteVariables, dataPointColor = _a.dataPointColor, patterns = _a.patterns;
    var borderRadius = siteVariables.borderRadius, theme = siteVariables.theme, colorScheme = siteVariables.colorScheme, colors = siteVariables.colors;
    var labelColorValueRef = React.useRef(null);
    useEffect(function () {
        if (!labelColorValueRef.current)
            return;
        var canvasRef = labelColorValueRef.current;
        legendLabels({
            canvasRef: canvasRef,
            theme: theme,
            colorScheme: colorScheme,
            patterns: patterns,
            dataPointColor: dataPointColor,
            index: index,
        });
    }, [theme]);
    return (React.createElement(Box, { styles: theme === TeamsTheme.HighContrast
            ? {
                width: "1.25rem",
                minWidth: "1.25rem",
                height: "1rem",
                minHeight: "1rem",
                marginBottom: "-1px",
                marginRight: ".4rem",
            }
            : {
                width: ".75rem",
                minWidth: ".75rem",
                height: ".75rem",
                minHeight: ".75rem",
                marginBottom: "-1px",
                marginRight: ".4rem",
            } },
        React.createElement("canvas", { ref: labelColorValueRef, tabIndex: 0, style: {
                width: "100%",
                height: "100%",
                userSelect: "none",
                border: patterns && theme === TeamsTheme.HighContrast
                    ? "1px solid " + colors.white
                    : "none",
                borderRadius: borderRadius,
            } })));
};
var legendItem = function (_a) {
    var key = _a.key, value = _a.value, hidden = _a.hidden, siteVariables = _a.siteVariables, chartDataPointColors = _a.chartDataPointColors, onLegendClick = _a.onLegendClick, patterns = _a.patterns;
    var t = siteVariables.t;
    return {
        key: key,
        kind: "custom",
        onClick: function () {
            onLegendClick(key);
        },
        content: (React.createElement(LegendItem, { styles: {
                display: "flex",
                alignItems: "center",
                fontSize: ".75rem",
                minWidth: "30px",
                color: siteVariables.colorScheme.default.foreground2,
                margin: "2px 0",
            }, text: true },
            React.createElement(LabelColorValue, { index: key, siteVariables: siteVariables, dataPointColor: chartDataPointColors[key], patterns: patterns }),
            getText(t.locale, value))),
        fitted: "horizontally",
    };
};
var LegendItems = function (data, siteVariables, chartDataPointColors, onLegendClick, verticalDataAlignment, patterns) {
    return verticalDataAlignment
        ? Array.from(data.labels, function (label, key) {
            return legendItem({
                key: key,
                value: label,
                siteVariables: siteVariables,
                chartDataPointColors: chartDataPointColors,
                onLegendClick: onLegendClick,
                patterns: patterns,
            });
        })
        : Array.from(data.datasets, function (dataset, key) {
            return legendItem({
                key: key,
                value: dataset.label,
                hidden: dataset.hidden,
                siteVariables: siteVariables,
                chartDataPointColors: chartDataPointColors,
                onLegendClick: onLegendClick,
                patterns: patterns,
            });
        });
};
export var ChartContainer = function (_a) {
    var data = _a.data, children = _a.children, siteVariables = _a.siteVariables, chartDataPointColors = _a.chartDataPointColors, onLegendClick = _a.onLegendClick, verticalDataAlignment = _a.verticalDataAlignment, patterns = _a.patterns;
    var _b = useState(false), overflowOpen = _b[0], setOverflowOpen = _b[1];
    var _c = useState(0), overflowItems = _c[0], setOverflowItems = _c[1];
    var theme = siteVariables.theme, colorScheme = siteVariables.colorScheme, t = siteVariables.t;
    var legendItems = LegendItems(data, siteVariables, chartDataPointColors, onLegendClick, verticalDataAlignment, patterns);
    useEffect(function () {
        legendItems = LegendItems(data, siteVariables, chartDataPointColors, onLegendClick, verticalDataAlignment, patterns);
    }, [theme, t]);
    return (React.createElement(Flex, { column: true, style: {
            height: "100%",
            minHeight: "14rem",
            margin: "0 -1rem 0 0",
            paddingBottom: ".5rem",
            width: "100%",
        } },
        React.createElement(Box, { styles: {
                flexGrow: 1,
                backgroundColor: colorScheme.grey.background,
            } }, children),
        React.createElement(Box, null,
            React.createElement(Legend, { "aria-label": t["toolbar overflow menu"], items: legendItems, overflow: true, overflowOpen: overflowOpen, overflowItem: {
                    icon: (React.createElement(BoldIcon, { styles: {
                            position: "relative",
                            width: "3.5rem",
                            height: "1rem",
                            borderRadius: "4px",
                            "& svg": {
                                display: "none",
                            },
                            "&::after": {
                                content: "\"" + overflowItems + " more\"",
                                display: "block",
                                position: "absolute",
                                top: 0,
                                left: ".5rem",
                                minWidth: "3rem",
                                textAlign: "left",
                                fontSize: ".75rem",
                                color: colorScheme.brand.foreground,
                            },
                        } })),
                }, onOverflowOpenChange: function (e, props) {
                    setOverflowOpen(!!(props === null || props === void 0 ? void 0 : props.overflowOpen));
                }, onOverflow: function (items) { return setOverflowItems(legendItems.length - items); }, getOverflowItems: function (startIndex) { return legendItems.slice(startIndex); }, styles: {
                    width: "100%",
                    backgroundColor: colorScheme.grey.background,
                } }))));
};
//# sourceMappingURL=ChartContainer.js.map