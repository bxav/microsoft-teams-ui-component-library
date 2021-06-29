var _a;
import React from "react";
import ChartJS from "chart.js";
import { ProviderConsumer as FluentUIThemeConsumer, Loader, } from "@fluentui/react-northstar";
import { ChartTheme } from "./ChartTheme";
import { EChartTypes } from "./ChartTypes";
import { BarChart, PieChart, LineChart, LineAreaChart, DoughnutChart, LineStackedChart, BarStackedChart, ChartEmptyState, ChartErrorState, BarHorizontalChart, BarHorizontalStackedChart, BubbleChart, } from "./Charts";
import { getText } from "../../translations";
ChartJS.defaults.global.legend.display = false;
ChartJS.defaults.global.defaultFontFamily = "Segoe UI, system-ui, sans-serif";
var CHARTS = (_a = {},
    _a[EChartTypes.Line] = LineChart,
    _a[EChartTypes.LineArea] = LineAreaChart,
    _a[EChartTypes.LineStacked] = LineStackedChart,
    _a[EChartTypes.Bar] = BarChart,
    _a[EChartTypes.BarStacked] = BarStackedChart,
    _a[EChartTypes.BarHorizontal] = BarHorizontalChart,
    _a[EChartTypes.BarHorizontalStacked] = BarHorizontalStackedChart,
    _a[EChartTypes.Pie] = PieChart,
    _a[EChartTypes.Doughnut] = DoughnutChart,
    _a[EChartTypes.Bubble] = BubbleChart,
    _a);
/**
 * @public
 */
export function Chart(_a) {
    var title = _a.title, type = _a.type, data = _a.data;
    if (data && data.datasets && data.datasets.length > 6) {
        data.datasets = data.datasets.slice(0, 6);
        console.warn("Please follow design guidance and apply 6 or fewer data points per one chart.");
    }
    var ChartContainer = CHARTS[type];
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var _a;
            var t = globalTheme.siteVariables.t;
            return (React.createElement(ChartTheme, { globalTheme: globalTheme },
                React.createElement(React.Suspense, { fallback: React.createElement(Loader, null) }, data ? ((data === null || data === void 0 ? void 0 : data.datasets.length) || ((_a = data === null || data === void 0 ? void 0 : data.labels) === null || _a === void 0 ? void 0 : _a.length) ? (React.createElement(ChartContainer, { title: getText(t.locale, title), data: data, siteVariables: globalTheme.siteVariables })) : (React.createElement(ChartEmptyState, { siteVariables: globalTheme.siteVariables }))) : (React.createElement(ChartErrorState, { siteVariables: globalTheme.siteVariables })))));
        } }));
}
//# sourceMappingURL=Chart.js.map