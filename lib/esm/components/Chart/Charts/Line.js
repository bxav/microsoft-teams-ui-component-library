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
import React, { useEffect } from "react";
import Chart from "chart.js";
import { tooltipTrigger, tooltipAxisYLine, chartConfig, axesConfig, setTooltipColorScheme, hexToRgb, } from "../ChartUtils";
import { TeamsTheme } from "../../../themes";
import { ChartContainer } from "./ChartContainer";
import { lineChartPatterns } from "../ChartPatterns";
import { getText } from "../../../translations";
export var LineChart = function (_a) {
    var title = _a.title, data = _a.data, siteVariables = _a.siteVariables, gradients = _a.gradients;
    var colorScheme = siteVariables.colorScheme, theme = siteVariables.theme, t = siteVariables.t;
    var canvasRef = React.useRef(null);
    var chartRef = React.useRef();
    var chartId = React.useMemo(function () { return Math.random().toString(36).substr(2, 9); }, []);
    var chartDataPointColors = React.useMemo(function () { return [
        colorScheme.brand.background,
        colorScheme.default.borderHover,
        colorScheme.brand.borderHover,
        colorScheme.default.foreground2,
        colorScheme.brand.background4,
        colorScheme.default.foreground,
    ]; }, [theme]);
    var createDataPoints = function () {
        return Array.from(data.datasets, function (set, i) {
            var dataPointConfig = {
                label: getText(t.locale, set.label),
                data: set.data,
                borderColor: chartDataPointColors[i],
                hoverBorderColor: chartDataPointColors[i],
                hoverBorderWidth: 2,
                backgroundColor: "transparent",
                hoverBackgroundColor: "transparent",
                borderWidth: 2,
                pointBorderColor: chartDataPointColors[i],
                pointBackgroundColor: chartDataPointColors[i],
                pointHoverBackgroundColor: chartDataPointColors[i],
                pointHoverBorderColor: chartDataPointColors[i],
                pointHoverBorderWidth: 0,
                borderCapStyle: "round",
                borderJoinStyle: "round",
                pointBorderWidth: 0,
                pointRadius: 2,
                pointHoverRadius: 2,
                pointStyle: "circle",
                borderDash: [],
            };
            if (theme === TeamsTheme.HighContrast) {
                dataPointConfig = __assign(__assign({}, dataPointConfig), { borderColor: colorScheme.brand.background, hoverBorderColor: colorScheme.default.borderHover, pointBorderColor: colorScheme.brand.background, pointBackgroundColor: colorScheme.brand.background, pointHoverBackgroundColor: colorScheme.brand.background, pointHoverBorderColor: colorScheme.brand.background, hoverBorderWidth: 4, pointRadius: 4, pointHoverRadius: 4, pointStyle: lineChartPatterns[i].pointStyle, borderDash: lineChartPatterns[i].lineBorderDash });
            }
            return dataPointConfig;
        });
    };
    var createAreaChartDataPoints = function (ctx) {
        return Array.from(data.datasets, function (set, i) {
            var gradientStroke = ctx.createLinearGradient(0, 0, 0, ctx.canvas.clientHeight * 0.8);
            var hoverGradientStroke = ctx.createLinearGradient(0, 0, 0, ctx.canvas.clientHeight * 0.8);
            if (theme === TeamsTheme.HighContrast) {
                var colorRGB = hexToRgb(colorScheme.brand.background);
                var hoverColorRGB = hexToRgb(colorScheme.default.borderHover);
                gradientStroke.addColorStop(0, "rgba(" + colorRGB + ", .2)");
                gradientStroke.addColorStop(1, "rgba(" + colorRGB + ", .0)");
                hoverGradientStroke.addColorStop(0, "rgba(" + hoverColorRGB + ", .4)");
                hoverGradientStroke.addColorStop(1, "rgba(" + hoverColorRGB + ", .0)");
            }
            else {
                var colorRGB = hexToRgb(chartDataPointColors[i]);
                gradientStroke.addColorStop(0, "rgba(" + colorRGB + ", .4)");
                gradientStroke.addColorStop(1, "rgba(" + colorRGB + ", .0)");
                hoverGradientStroke.addColorStop(0, "rgba(" + colorRGB + ", .6)");
                hoverGradientStroke.addColorStop(1, "rgba(" + colorRGB + ", .0)");
            }
            var dataPointConfig = {
                label: getText(t.locale, set.label),
                data: set.data,
                borderColor: chartDataPointColors[i],
                hoverBorderColor: chartDataPointColors[i],
                hoverBorderWidth: 2,
                backgroundColor: gradientStroke,
                hoverBackgroundColor: hoverGradientStroke,
                borderWidth: 2,
                pointBorderColor: chartDataPointColors[i],
                pointBackgroundColor: chartDataPointColors[i],
                pointHoverBackgroundColor: chartDataPointColors[i],
                pointHoverBorderColor: chartDataPointColors[i],
                pointHoverBorderWidth: 0,
                borderCapStyle: "round",
                borderJoinStyle: "round",
                pointBorderWidth: 0,
                pointRadius: 2,
                pointHoverRadius: 2,
                pointStyle: "circle",
                borderDash: [],
            };
            if (theme === TeamsTheme.HighContrast) {
                dataPointConfig = __assign(__assign({}, dataPointConfig), { borderColor: colorScheme.brand.background, hoverBorderColor: colorScheme.default.borderHover, pointBorderColor: colorScheme.brand.background, pointBackgroundColor: colorScheme.brand.background, pointHoverBackgroundColor: colorScheme.brand.background, pointHoverBorderColor: colorScheme.brand.background, hoverBorderWidth: 4, pointRadius: 4, pointHoverRadius: 4, pointStyle: lineChartPatterns[i].pointStyle, borderDash: lineChartPatterns[i].lineBorderDash });
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
        chartRef.current = new Chart(ctx, __assign(__assign({}, chartConfig({ type: "line" })), { data: {
                labels: Array.isArray(data.labels)
                    ? data.labels.map(function (label) { return getText(t.locale, label); })
                    : getText(t.locale, data.labels),
                datasets: [],
            }, plugins: [
                {
                    afterDatasetsDraw: function (_a) {
                        var ctx = _a.ctx, tooltip = _a.tooltip, chart = _a.chart;
                        tooltipAxisYLine({
                            chart: chart,
                            ctx: ctx,
                            tooltip: tooltip,
                        });
                    },
                },
            ] }));
        var chart = chartRef.current;
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
            if (theme === TeamsTheme.HighContrast) {
                chart.data.datasets.map(function (dataset) {
                    dataset.borderColor = colorScheme.default.border;
                    dataset.borderWidth = 2;
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
                case "ArrowRight":
                    e.preventDefault();
                    selectedIndex = (selectedIndex + 1) % meta().data.length;
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    selectedIndex = (selectedIndex || meta().data.length) - 1;
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    e.preventDefault();
                    if (data.datasets.length > 1) {
                        // Get all values for the current data point
                        var values_1 = data.datasets.map(function (dataset) { return dataset.data[selectedIndex]; });
                        // Sort an array to define next available number
                        var sorted_1 = __spreadArrays(Array.from(new Set(values_1))).sort(function (a, b) { return Number(a) - Number(b); });
                        var nextValue_1 = sorted_1[sorted_1.findIndex(function (v) { return v === values_1[selectedDataSet]; }) +
                            (e.key === "ArrowUp" ? 1 : -1)];
                        // Find dataset ID by the next higher number after current
                        var nextDataSet = values_1.findIndex(function (v) { return v === nextValue_1; });
                        // If there is no next number that could selected, get number from oposite side
                        if (nextDataSet < 0) {
                            nextDataSet = values_1.findIndex(function (v) {
                                return v ===
                                    sorted_1[e.key === "ArrowUp" ? 0 : data.datasets.length - 1];
                            });
                        }
                        selectedDataSet = nextDataSet;
                        selectedIndex = selectedIndex % meta().data.length;
                    }
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
        chartRef.current.data.datasets = gradients
            ? createAreaChartDataPoints(ctx)
            : createDataPoints();
        // Update tooltip colors scheme
        setTooltipColorScheme({
            chart: chartRef.current,
            siteVariables: siteVariables,
            chartDataPointColors: chartDataPointColors,
        });
        // Update axeses
        axesConfig({ chart: chartRef.current, ctx: ctx, colorScheme: colorScheme });
        // Show style changes
        chartRef.current.update();
    }, [theme]);
    function onLegendClick(datasetIndex) {
        if (!chartRef.current)
            return;
        chartRef.current.data.datasets[datasetIndex].hidden = !chartRef.current
            .data.datasets[datasetIndex].hidden;
        chartRef.current.update();
    }
    return (React.createElement(ChartContainer, { siteVariables: siteVariables, data: data, chartDataPointColors: chartDataPointColors, onLegendClick: onLegendClick },
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
//# sourceMappingURL=Line.js.map