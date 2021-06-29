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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieChart = void 0;
var react_1 = __importStar(require("react"));
var chart_js_1 = __importDefault(require("chart.js"));
var themes_1 = require("../../../themes");
var ChartUtils_1 = require("../ChartUtils");
var ChartContainer_1 = require("./ChartContainer");
var ChartPatterns_1 = require("../ChartPatterns");
var translations_1 = require("../../../translations");
exports.PieChart = function (_a) {
    var title = _a.title, data = _a.data, siteVariables = _a.siteVariables, cutoutPercentage = _a.cutoutPercentage;
    if (data && data.datasets && data.datasets[0].data.length > 6) {
        data.datasets[0].data = data.datasets[0].data.slice(0, 6);
        console.warn("Please follow design guidence and apply 6 or less data points per one chart.");
    }
    var colorScheme = siteVariables.colorScheme, theme = siteVariables.theme, colors = siteVariables.colors, t = siteVariables.t;
    var canvasRef = react_1.default.useRef(null);
    var chartRef = react_1.default.useRef();
    var chartId = react_1.default.useMemo(function () { return Math.random().toString(36).substr(2, 9); }, []);
    var chartDataPointColors = react_1.default.useMemo(function () { return [
        colorScheme.brand.backgroundFocus2,
        colorScheme.brand.foreground3,
        colorScheme.brand.background,
        colorScheme.default.borderHover,
        colorScheme.default.foreground2,
        colorScheme.default.foreground,
    ]; }, [theme]);
    var pieChartPatterns = Array.from({ length: 6 }, function (v, i) {
        return ChartPatterns_1.buildPattern(__assign(__assign({}, ChartPatterns_1.chartBarDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background }));
    });
    var pieChartHoverPatterns = Array.from({ length: 6 }, function (v, i) {
        return ChartPatterns_1.buildPattern(__assign(__assign({}, ChartPatterns_1.chartBarDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.default.borderHover }));
    });
    var createDataPoints = function () {
        var dataPointConfig = {
            label: translations_1.getText(t.locale, data.datasets[0].label),
            data: data.datasets[0].data,
            borderWidth: 2,
            borderColor: colorScheme.default.background,
            hoverBorderColor: colorScheme.default.background,
            backgroundColor: chartDataPointColors,
            hoverBackgroundColor: chartDataPointColors,
        };
        if (theme === themes_1.TeamsTheme.HighContrast) {
            dataPointConfig = __assign(__assign({}, dataPointConfig), { borderWidth: 3, hoverBorderColor: colorScheme.default.borderHover, borderColor: colorScheme.brand.background, backgroundColor: pieChartPatterns, hoverBackgroundColor: pieChartHoverPatterns });
        }
        return [dataPointConfig];
    };
    react_1.useEffect(function () {
        var selectedIndex = -1;
        var selectedDataSet = 0;
        if (!canvasRef.current)
            return;
        var ctx = canvasRef.current.getContext("2d");
        if (!ctx)
            return;
        var config = ChartUtils_1.chartConfig({ type: "pie" });
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
            return translations_1.getText(t.locale, data.labels[tooltipItem.index]);
        };
        config.options.tooltips.callbacks.labelColor = function (tooltipItem) { return ({
            backgroundColor: chartDataPointColors[tooltipItem.index],
        }); };
        config.options.tooltips.callbacks.title = function (tooltipItems) {
            return ((Number(data.datasets[0].data[tooltipItems[0].index]) /
                data.datasets[0].data.reduce(function (a, b) { return a + b; })) *
                100).toPrecision(2) + "% (" + ChartUtils_1.usNumberFormat(Number(data.datasets[0].data[tooltipItems[0].index])) + ")";
        };
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
                    dataset.backgroundColor = ChartPatterns_1.buildPattern(__assign(__assign({}, ChartPatterns_1.chartBarDataPointPatterns(colorScheme)[i]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background }));
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
            patterns: ChartPatterns_1.chartBarDataPointPatterns,
            verticalDataAlignment: true,
        });
        // Update axeses
        ChartUtils_1.axesConfig({ chart: chartRef.current, ctx: ctx, colorScheme: colorScheme });
        chartRef.current.update();
    }, [theme]);
    function onLegendClick(datasetIndex) {
        if (!chartRef.current)
            return;
        // chartRef.current.data.datasets![0].data![datasetIndex].hidden = !chartRef
        //   .current.data.datasets![0].data![datasetIndex].hidden;
        chartRef.current.update();
    }
    return (react_1.default.createElement(ChartContainer_1.ChartContainer, { siteVariables: siteVariables, data: data, chartDataPointColors: chartDataPointColors, patterns: ChartPatterns_1.chartBarDataPointPatterns, onLegendClick: onLegendClick, verticalDataAlignment: true },
        react_1.default.createElement("canvas", { id: chartId, ref: canvasRef, tabIndex: 0, style: {
                userSelect: "none",
            }, "aria-label": title }, data.datasets.map(function (set, setKey) {
            return set.data.forEach(function (item, itemKey) { return (
            // Generated tooltips for screen readers
            react_1.default.createElement("div", { key: itemKey, id: chartId + "-tooltip-" + setKey + "-" + itemKey },
                react_1.default.createElement("p", null, item),
                react_1.default.createElement("span", null,
                    data.labels && Array.isArray(data.labels)
                        ? translations_1.getText(t.locale, data.labels[setKey])
                        : translations_1.getText(t.locale, data.labels),
                    ": ",
                    set.data[itemKey]))); });
        }))));
};
//# sourceMappingURL=Pie.js.map