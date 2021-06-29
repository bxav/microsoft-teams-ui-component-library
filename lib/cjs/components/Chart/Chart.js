"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
var react_1 = __importDefault(require("react"));
var chart_js_1 = __importDefault(require("chart.js"));
var react_northstar_1 = require("@fluentui/react-northstar");
var ChartTheme_1 = require("./ChartTheme");
var ChartTypes_1 = require("./ChartTypes");
var Charts_1 = require("./Charts");
var translations_1 = require("../../translations");
chart_js_1.default.defaults.global.legend.display = false;
chart_js_1.default.defaults.global.defaultFontFamily = "Segoe UI, system-ui, sans-serif";
var CHARTS = (_a = {},
    _a[ChartTypes_1.EChartTypes.Line] = Charts_1.LineChart,
    _a[ChartTypes_1.EChartTypes.LineArea] = Charts_1.LineAreaChart,
    _a[ChartTypes_1.EChartTypes.LineStacked] = Charts_1.LineStackedChart,
    _a[ChartTypes_1.EChartTypes.Bar] = Charts_1.BarChart,
    _a[ChartTypes_1.EChartTypes.BarStacked] = Charts_1.BarStackedChart,
    _a[ChartTypes_1.EChartTypes.BarHorizontal] = Charts_1.BarHorizontalChart,
    _a[ChartTypes_1.EChartTypes.BarHorizontalStacked] = Charts_1.BarHorizontalStackedChart,
    _a[ChartTypes_1.EChartTypes.Pie] = Charts_1.PieChart,
    _a[ChartTypes_1.EChartTypes.Doughnut] = Charts_1.DoughnutChart,
    _a[ChartTypes_1.EChartTypes.Bubble] = Charts_1.BubbleChart,
    _a);
/**
 * @public
 */
function Chart(_a) {
    var title = _a.title, type = _a.type, data = _a.data;
    if (data && data.datasets && data.datasets.length > 6) {
        data.datasets = data.datasets.slice(0, 6);
        console.warn("Please follow design guidance and apply 6 or fewer data points per one chart.");
    }
    var ChartContainer = CHARTS[type];
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            var _a;
            var t = globalTheme.siteVariables.t;
            return (react_1.default.createElement(ChartTheme_1.ChartTheme, { globalTheme: globalTheme },
                react_1.default.createElement(react_1.default.Suspense, { fallback: react_1.default.createElement(react_northstar_1.Loader, null) }, data ? ((data === null || data === void 0 ? void 0 : data.datasets.length) || ((_a = data === null || data === void 0 ? void 0 : data.labels) === null || _a === void 0 ? void 0 : _a.length) ? (react_1.default.createElement(ChartContainer, { title: translations_1.getText(t.locale, title), data: data, siteVariables: globalTheme.siteVariables })) : (react_1.default.createElement(Charts_1.ChartEmptyState, { siteVariables: globalTheme.siteVariables }))) : (react_1.default.createElement(Charts_1.ChartErrorState, { siteVariables: globalTheme.siteVariables })))));
        } }));
}
exports.Chart = Chart;
//# sourceMappingURL=Chart.js.map