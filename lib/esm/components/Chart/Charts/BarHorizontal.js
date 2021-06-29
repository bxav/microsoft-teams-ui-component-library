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
import React, { useEffect } from "react";
import Chart from "chart.js";
import { TeamsTheme } from "../../../themes";
import { tooltipTrigger, chartConfig, axesConfig, setTooltipColorScheme, horizontalBarValue, usNumberFormat, } from "../ChartUtils";
import { ChartContainer } from "./ChartContainer";
import { buildPattern, chartBarDataPointPatterns } from "../ChartPatterns";
import { getText } from "../../../translations";
export var BarHorizontalChart = function (_a) {
    var title = _a.title, data = _a.data, siteVariables = _a.siteVariables, stacked = _a.stacked;
    var colorScheme = siteVariables.colorScheme, theme = siteVariables.theme, colors = siteVariables.colors, t = siteVariables.t;
    var canvasRef = React.useRef(null);
    var chartRef = React.useRef();
    var chartId = React.useMemo(function () { return Math.random().toString(36).substr(2, 9); }, []);
    var chartDataPointColors = React.useMemo(function () { return [
        colors.brand["600"],
        colors.brand["200"],
        colors.brand["800"],
        colors.grey["400"],
        colors.grey["500"],
        colorScheme.default.borderHover,
    ]; }, [theme]);
    var createDataPoints = function () {
        return Array.from(data.datasets, function (set, i) {
            var dataPointConfig = {
                label: getText(t.locale, set.label),
                data: set.data,
                borderWidth: 0,
                barPercentage: 0.5,
                borderSkipped: false,
                borderColor: colorScheme.default.background,
                hoverBorderColor: chartDataPointColors[i],
                backgroundColor: chartDataPointColors[i],
                hoverBorderWidth: 0,
                hoverBackgroundColor: chartDataPointColors[i],
                pointBorderColor: colorScheme.default.background,
                pointBackgroundColor: colorScheme.default.foreground3,
                pointHoverBackgroundColor: colorScheme.default.foreground3,
                pointHoverBorderColor: chartDataPointColors[i],
                pointHoverBorderWidth: 0,
                borderCapStyle: "round",
                borderJoinStyle: "round",
                pointBorderWidth: 0,
                pointRadius: 0,
                pointHoverRadius: 0,
            };
            if (theme === TeamsTheme.HighContrast) {
                dataPointConfig = __assign(__assign({}, dataPointConfig), { borderWidth: 1, hoverBorderColor: colorScheme.default.borderHover, hoverBorderWidth: 3, pointBorderColor: colorScheme.default.border, pointHoverBorderColor: colorScheme.default.borderHover, pointHoverRadius: 0, borderColor: colorScheme.brand.background, backgroundColor: buildPattern(__assign(__assign({}, chartBarDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background })), hoverBackgroundColor: buildPattern(__assign(__assign({}, chartBarDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.default.borderHover })) });
            }
            return dataPointConfig;
        });
    };
    useEffect(function () {
        var selectedIndex = -1;
        var selectedDataSet = 0;
        if (!canvasRef.current)
            return;
        var ctx = canvasRef.current.getContext("2d");
        if (!ctx)
            return;
        var config = chartConfig({ type: "horizontalBar" });
        config.options.layout.padding.top = -6;
        config.options.layout.padding.left = -32;
        config.options.hover.mode = "index";
        config.options.scales.xAxes[0].ticks.display = false;
        config.options.scales.xAxes[0].gridLines.display = false;
        config.options.scales.yAxes[0].ticks.callback = function (v) { return v; };
        config.options.scales.yAxes[0].ticks.mirror = true;
        config.options.scales.yAxes[0].ticks.padding = 0;
        config.options.scales.yAxes[0].gridLines.display = false;
        config.options.tooltips.position = "nearest";
        if (stacked) {
            config.options.hover.mode = "point";
            config.options.scales.yAxes[0].stacked = true;
            config.options.scales.xAxes[0].stacked = true;
            config.options.tooltips.mode = "nearest";
            config.options.tooltips.axis = "y";
            config.options.tooltips.callbacks.title = function (tooltipItems) {
                var total = 0;
                data.datasets.map(function (dataset) {
                    var value = dataset.data[tooltipItems[0].index];
                    if (typeof value === "number") {
                        return (total += value);
                    }
                });
                return ((tooltipItems[0].xLabel / total) * 100).toPrecision(2) + "% (" + usNumberFormat(tooltipItems[0].xLabel) + ")";
            };
        }
        chartRef.current = new Chart(ctx, __assign(__assign({}, config), { data: {
                labels: Array.isArray(data.labels)
                    ? data.labels.map(function (label) { return getText(t.locale, label); })
                    : getText(t.locale, data.labels),
                datasets: [],
            }, plugins: [
                {
                    afterDatasetsDraw: function (_a) {
                        var ctx = _a.ctx, tooltip = _a.tooltip, chart = _a.chart;
                        horizontalBarValue({
                            chart: chart,
                            ctx: ctx,
                            stacked: stacked,
                        });
                    },
                },
            ] }));
        var chart = chartRef.current;
        chart.config.options.scales.yAxes[0].ticks.labelOffset =
            chart.chartArea.bottom / data.datasets[0].data.length / 2 - 2;
        /**
         * Keyboard manipulations
         */
        function meta() {
            return chart.getDatasetMeta(selectedDataSet);
        }
        function removeFocusStyleOnClick() {
            // Remove focus state style if selected by mouse
            if (canvasRef.current) {
                canvasRef.current.style.boxShadow = "none";
            }
        }
        function removeDataPointsHoverStates() {
            if (selectedIndex > -1) {
                meta().controller.removeHoverStyle(meta().data[selectedIndex], 0, selectedIndex);
            }
        }
        function hoverDataPoint(pointID) {
            meta().controller.setHoverStyle(meta().data[pointID], selectedDataSet, pointID);
        }
        function showFocusedDataPoint() {
            var _a;
            hoverDataPoint(selectedIndex);
            tooltipTrigger({
                chart: chartRef.current,
                data: data,
                set: selectedDataSet,
                index: selectedIndex,
                siteVariables: siteVariables,
            });
            (_a = document
                .getElementById(chartId + "-tooltip-" + selectedDataSet + "-" + selectedIndex)) === null || _a === void 0 ? void 0 : _a.focus();
        }
        function resetChartStates() {
            removeDataPointsHoverStates();
            var activeElements = chart.tooltip._active;
            var requestedElem = chart.getDatasetMeta(selectedDataSet).data[selectedIndex];
            activeElements.find(function (v, i) {
                if (requestedElem._index === v._index) {
                    activeElements.splice(i, 1);
                    return true;
                }
            });
            for (var i = 0; i < activeElements.length; i++) {
                if (requestedElem._index === activeElements[i]._index) {
                    activeElements.splice(i, 1);
                    break;
                }
            }
            if (siteVariables.theme === TeamsTheme.HighContrast) {
                chartRef.current.data.datasets.map(function (dataset, i) {
                    dataset.borderColor = siteVariables.colorScheme.default.border;
                    dataset.borderWidth = 2;
                    dataset.backgroundColor = buildPattern(__assign(__assign({}, chartBarDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background }));
                });
                chart.update();
            }
            chart.tooltip._active = activeElements;
            chart.tooltip.update(true);
            chart.draw();
        }
        function changeFocus(e) {
            removeDataPointsHoverStates();
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    selectedIndex = (selectedIndex + 1) % meta().data.length;
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    selectedIndex = (selectedIndex || meta().data.length) - 1;
                    break;
            }
            showFocusedDataPoint();
        }
        canvasRef.current.addEventListener("click", removeFocusStyleOnClick);
        canvasRef.current.addEventListener("keydown", changeFocus);
        canvasRef.current.addEventListener("focusout", resetChartStates);
        return function () {
            if (!chartRef.current)
                return;
            if (canvasRef.current) {
                canvasRef.current.removeEventListener("click", removeFocusStyleOnClick);
                canvasRef.current.removeEventListener("keydown", changeFocus);
                canvasRef.current.removeEventListener("focusout", resetChartStates);
            }
            chartRef.current.destroy();
        };
    }, []);
    /**
     * Theme updates
     */
    useEffect(function () {
        if (!chartRef.current)
            return;
        if (!canvasRef.current)
            return;
        var ctx = canvasRef.current.getContext("2d");
        if (!ctx)
            return;
        // Apply new colors scheme for data points
        chartRef.current.data.datasets = createDataPoints();
        // Update tooltip colors scheme
        setTooltipColorScheme({
            chart: chartRef.current,
            siteVariables: siteVariables,
            chartDataPointColors: chartDataPointColors,
            patterns: chartBarDataPointPatterns,
        });
        // Update axeses
        axesConfig({ chart: chartRef.current, ctx: ctx, colorScheme: colorScheme });
        chartRef.current.options.defaultColor = colorScheme.default.foreground;
        chartRef.current.update();
    }, [theme]);
    function onLegendClick(datasetIndex) {
        if (!chartRef.current)
            return;
        chartRef.current.data.datasets[datasetIndex].hidden = !chartRef.current
            .data.datasets[datasetIndex].hidden;
        chartRef.current.update();
    }
    return (React.createElement(ChartContainer, { siteVariables: siteVariables, data: data, chartDataPointColors: chartDataPointColors, patterns: chartBarDataPointPatterns, onLegendClick: onLegendClick },
        React.createElement("canvas", { id: chartId, ref: canvasRef, tabIndex: 0, style: {
                userSelect: "none",
            }, "aria-label": title }, data.datasets.map(function (set, setKey) {
            return set.data.forEach(function (item, itemKey) { return (
            // Generated tooltips for screen readers
            React.createElement("div", { key: itemKey, id: chartId + "-tooltip-" + setKey + "-" + itemKey },
                React.createElement("p", null, item),
                React.createElement("span", null,
                    getText(t.locale, set.label),
                    ": ",
                    set.data[itemKey]))); });
        }))));
};
//# sourceMappingURL=BarHorizontal.js.map