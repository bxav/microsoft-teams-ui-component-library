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
import { tooltipTrigger, chartConfig, axesConfig, setTooltipColorScheme, usNumberFormat, } from "../ChartUtils";
import { ChartContainer } from "./ChartContainer";
import { buildPattern, chartBarDataPointPatterns } from "../ChartPatterns";
import { getText } from "../../../translations";
export var PieChart = function (_a) {
    var title = _a.title, data = _a.data, siteVariables = _a.siteVariables, cutoutPercentage = _a.cutoutPercentage;
    if (data && data.datasets && data.datasets[0].data.length > 6) {
        data.datasets[0].data = data.datasets[0].data.slice(0, 6);
        console.warn("Please follow design guidence and apply 6 or less data points per one chart.");
    }
    var colorScheme = siteVariables.colorScheme, theme = siteVariables.theme, colors = siteVariables.colors, t = siteVariables.t;
    var canvasRef = React.useRef(null);
    var chartRef = React.useRef();
    var chartId = React.useMemo(function () { return Math.random().toString(36).substr(2, 9); }, []);
    var chartDataPointColors = React.useMemo(function () { return [
        colorScheme.brand.backgroundFocus2,
        colorScheme.brand.foreground3,
        colorScheme.brand.background,
        colorScheme.default.borderHover,
        colorScheme.default.foreground2,
        colorScheme.default.foreground,
    ]; }, [theme]);
    var pieChartPatterns = Array.from({ length: 6 }, function (v, i) {
        return buildPattern(__assign(__assign({}, chartBarDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background }));
    });
    var pieChartHoverPatterns = Array.from({ length: 6 }, function (v, i) {
        return buildPattern(__assign(__assign({}, chartBarDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.default.borderHover }));
    });
    var createDataPoints = function () {
        var dataPointConfig = {
            label: getText(t.locale, data.datasets[0].label),
            data: data.datasets[0].data,
            borderWidth: 2,
            borderColor: colorScheme.default.background,
            hoverBorderColor: colorScheme.default.background,
            backgroundColor: chartDataPointColors,
            hoverBackgroundColor: chartDataPointColors,
        };
        if (theme === TeamsTheme.HighContrast) {
            dataPointConfig = __assign(__assign({}, dataPointConfig), { borderWidth: 3, hoverBorderColor: colorScheme.default.borderHover, borderColor: colorScheme.brand.background, backgroundColor: pieChartPatterns, hoverBackgroundColor: pieChartHoverPatterns });
        }
        return [dataPointConfig];
    };
    useEffect(function () {
        var selectedIndex = -1;
        var selectedDataSet = 0;
        if (!canvasRef.current)
            return;
        var ctx = canvasRef.current.getContext("2d");
        if (!ctx)
            return;
        var config = chartConfig({ type: "pie" });
        config.options.hover.mode = "point";
        config.options.layout.padding.top = 32;
        config.options.layout.padding.left = -16;
        config.options.layout.padding.right = 32;
        config.options.layout.padding.bottom = 32;
        config.options.scales.xAxes[0].ticks.display = false;
        config.options.scales.xAxes[0].gridLines.display = false;
        config.options.scales.yAxes[0].ticks.display = false;
        config.options.scales.yAxes[0].gridLines.display = false;
        if (cutoutPercentage) {
            config.options.cutoutPercentage = cutoutPercentage;
        }
        // Pie chart custom settings
        config.options.tooltips.callbacks.label = function (tooltipItem, data) {
            return getText(t.locale, data.labels[tooltipItem.index]);
        };
        config.options.tooltips.callbacks.labelColor = function (tooltipItem) { return ({
            backgroundColor: chartDataPointColors[tooltipItem.index],
        }); };
        config.options.tooltips.callbacks.title = function (tooltipItems) {
            return ((Number(data.datasets[0].data[tooltipItems[0].index]) /
                data.datasets[0].data.reduce(function (a, b) { return a + b; })) *
                100).toPrecision(2) + "% (" + usNumberFormat(Number(data.datasets[0].data[tooltipItems[0].index])) + ")";
        };
        chartRef.current = new Chart(ctx, __assign(__assign({}, config), { data: {
                labels: Array.isArray(data.labels)
                    ? data.labels.map(function (label) { return getText(t.locale, label); })
                    : getText(t.locale, data.labels),
                datasets: [],
            } }));
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
                case "ArrowRight":
                case "ArrowUp":
                    e.preventDefault();
                    selectedIndex = (selectedIndex + 1) % meta().data.length;
                    break;
                case "ArrowLeft":
                case "ArrowDown":
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
            verticalDataAlignment: true,
        });
        // Update axeses
        axesConfig({ chart: chartRef.current, ctx: ctx, colorScheme: colorScheme });
        chartRef.current.update();
    }, [theme]);
    function onLegendClick(datasetIndex) {
        if (!chartRef.current)
            return;
        // chartRef.current.data.datasets![0].data![datasetIndex].hidden = !chartRef
        //   .current.data.datasets![0].data![datasetIndex].hidden;
        chartRef.current.update();
    }
    return (React.createElement(ChartContainer, { siteVariables: siteVariables, data: data, chartDataPointColors: chartDataPointColors, patterns: chartBarDataPointPatterns, onLegendClick: onLegendClick, verticalDataAlignment: true },
        React.createElement("canvas", { id: chartId, ref: canvasRef, tabIndex: 0, style: {
                userSelect: "none",
            }, "aria-label": title }, data.datasets.map(function (set, setKey) {
            return set.data.forEach(function (item, itemKey) { return (
            // Generated tooltips for screen readers
            React.createElement("div", { key: itemKey, id: chartId + "-tooltip-" + setKey + "-" + itemKey },
                React.createElement("p", null, item),
                React.createElement("span", null,
                    data.labels && Array.isArray(data.labels)
                        ? getText(t.locale, data.labels[setKey])
                        : getText(t.locale, data.labels),
                    ": ",
                    set.data[itemKey]))); });
        }))));
};
//# sourceMappingURL=Pie.js.map