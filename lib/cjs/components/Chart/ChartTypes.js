"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EShapes = exports.EPointStyles = exports.EChartTypes = void 0;
/**
 * Each chart type can be previewed in the [Data visualizations page of the Microsoft Teams UI Kit](https://www.figma.com/file/EOsbapNvZgEwcA1mShswfh/Microsoft-Teams-UI-Kit-Community?node-id=3789%3A4091),
 * or in [this library’s Storybook](https://dev-int.teams.microsoft.com/storybook/main/index.html?path=/story/components-charts--line-chart).
 * @public
 */
var EChartTypes;
(function (EChartTypes) {
    EChartTypes["Line"] = "line";
    EChartTypes["LineStacked"] = "lineStacked";
    EChartTypes["LineArea"] = "lineArea";
    EChartTypes["Bar"] = "bar";
    EChartTypes["BarStacked"] = "barStacked";
    EChartTypes["BarHorizontal"] = "barHorizontal";
    EChartTypes["BarHorizontalStacked"] = "barHorizontalStacked";
    EChartTypes["Pie"] = "pie";
    EChartTypes["Doughnut"] = "doughnut";
    EChartTypes["Bubble"] = "bubble";
})(EChartTypes = exports.EChartTypes || (exports.EChartTypes = {}));
var EPointStyles;
(function (EPointStyles) {
    EPointStyles["Circle"] = "circle";
    EPointStyles["Rectangle"] = "rect";
    EPointStyles["Triangle"] = "triangle";
    EPointStyles["RectangleRotated"] = "rectRot";
})(EPointStyles = exports.EPointStyles || (exports.EPointStyles = {}));
var EShapes;
(function (EShapes) {
    EShapes["Square"] = "square";
    EShapes["DiagonalRightLeft"] = "diagonalRightLeft";
    EShapes["Grid"] = "grid";
    EShapes["Diagonal"] = "diagonal";
    EShapes["VerticalLine"] = "verticalLine";
    EShapes["GridRightLeft"] = "gridRightLeft";
})(EShapes = exports.EShapes || (exports.EShapes = {}));
//# sourceMappingURL=ChartTypes.js.map