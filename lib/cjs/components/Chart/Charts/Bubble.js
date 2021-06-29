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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleChart = void 0;
var react_1 = __importStar(require("react"));
var chart_js_1 = __importDefault(require("chart.js"));
var themes_1 = require("../../../themes");
var ChartUtils_1 = require("../ChartUtils");
var ChartContainer_1 = require("./ChartContainer");
var ChartPatterns_1 = require("../ChartPatterns");
var translations_1 = require("../../../translations");
exports.BubbleChart = function (_a) {
    var title = _a.title, data = _a.data, siteVariables = _a.siteVariables;
    var colorScheme = siteVariables.colorScheme, theme = siteVariables.theme, t = siteVariables.t;
    var canvasRef = react_1.default.useRef(null);
    var chartRef = react_1.default.useRef();
    var chartId = react_1.default.useMemo(function () { return Math.random().toString(36).substr(2, 9); }, []);
    var chartDataPointColors = react_1.default.useMemo(function () { return [
        colorScheme.brand.background,
        colorScheme.default.borderHover,
        colorScheme.brand.borderHover,
        colorScheme.default.foreground2,
        colorScheme.brand.background4,
        colorScheme.default.foreground,
    ]; }, [theme]);
    // Sort for kayboard access
    data.datasets.map(function (dataset) {
        dataset.data.sort(function (a, b) { return a.x - b.x; });
    });
    var createDataPoints = function () {
        return Array.from(data.datasets, function (set, i) {
            var dataPointConfig = {
                label: translations_1.getText(t.locale, set.label),
                data: set.data,
                borderWidth: 0,
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
            if (theme === themes_1.TeamsTheme.HighContrast) {
                dataPointConfig = __assign(__assign({}, dataPointConfig), { borderWidth: 1, hoverBorderColor: colorScheme.default.borderHover, hoverBorderWidth: 3, pointBorderColor: colorScheme.default.border, pointHoverBorderColor: colorScheme.default.borderHover, pointHoverRadius: 0, borderColor: colorScheme.brand.background, backgroundColor: ChartPatterns_1.buildPattern(__assign(__assign({}, ChartPatterns_1.chartBubbleDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background })), hoverBackgroundColor: ChartPatterns_1.buildPattern(__assign(__assign({}, ChartPatterns_1.chartBubbleDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.default.borderHover })) });
            }
            return dataPointConfig;
        });
    };
    react_1.useEffect(function () {
        var selectedIndex = -1;
        var selectedDataSet = 0;
        if (!canvasRef.current)
            return;
        var ctx = canvasRef.current.getContext("2d");
        if (!ctx)
            return;
        var config = ChartUtils_1.chartConfig({ type: "bubble" });
        config.options.hover.mode = "nearest";
        chartRef.current = new chart_js_1.default(ctx, __assign(__assign({}, config), { data: {
                labels: Array.isArray(data.labels)
                    ? data.labels.map(function (label) { return translations_1.getText(t.locale, label); })
                    : translations_1.getText(t.locale, data.labels),
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
            ChartUtils_1.tooltipTrigger({
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
            if (siteVariables.theme === themes_1.TeamsTheme.HighContrast) {
                chartRef.current.data.datasets.map(function (dataset, i) {
                    dataset.borderColor = siteVariables.colorScheme.default.border;
                    dataset.borderWidth = 2;
                    dataset.backgroundColor = ChartPatterns_1.buildPattern(__assign(__assign({}, ChartPatterns_1.chartBubbleDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background }));
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
                        var sorted_1 = __spreadArrays(Array.from(new Set(values_1))).sort(function (a, b) { return a.y - b.y; });
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
    react_1.useEffect(function () {
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
        ChartUtils_1.setTooltipColorScheme({
            chart: chartRef.current,
            siteVariables: siteVariables,
            chartDataPointColors: chartDataPointColors,
            patterns: ChartPatterns_1.chartBubbleDataPointPatterns,
        });
        // Update axeses
        ChartUtils_1.axesConfig({ chart: chartRef.current, ctx: ctx, colorScheme: colorScheme });
        chartRef.current.update();
    }, [theme]);
    function onLegendClick(datasetIndex) {
        if (!chartRef.current)
            return;
        chartRef.current.data.datasets[datasetIndex].hidden = !chartRef.current
            .data.datasets[datasetIndex].hidden;
        chartRef.current.update();
    }
    return (react_1.default.createElement(ChartContainer_1.ChartContainer, { siteVariables: siteVariables, data: data, chartDataPointColors: chartDataPointColors, patterns: ChartPatterns_1.chartBubbleDataPointPatterns, onLegendClick: onLegendClick },
        react_1.default.createElement("canvas", { id: chartId, ref: canvasRef, tabIndex: 0, style: {
                userSelect: "none",
            }, "aria-label": title }, data.datasets.map(function (set, setKey) {
            return set.data.forEach(function (item, itemKey) { return (
            // Generated tooltips for screen readers
            react_1.default.createElement("div", { key: itemKey, id: chartId + "-tooltip-" + setKey + "-" + itemKey },
                react_1.default.createElement("p", null, item.x),
                react_1.default.createElement("span", null,
                    translations_1.getText(t.locale, set.label),
                    ":",
                    " ",
                    set.data[itemKey].y))); });
        }))));
};
//# sourceMappingURL=Bubble.js.map