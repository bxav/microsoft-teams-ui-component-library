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
import { TeamsTheme } from "../../themes";
import { buildPattern } from "./ChartPatterns";
export var random = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};
// TODO: Localization
var suffixes = ["K", "M", "G", "T", "P", "E"];
export var chartAxisCallback = function (value) {
    if (typeof value === "number") {
        if (value < 1000) {
            return String(value);
        }
        var exp = Math.floor(Math.log(Number(value)) / Math.log(1000));
        value = "" + Number(value) / Math.pow(1000, exp) + suffixes[exp - 1];
        // There is no support for label aligment in Chart.js,
        // to be able align axis labels by left (right is by default)
        // add an additional spaces depends on label length
        switch (value.length) {
            case 2:
                return value + "  ";
            case 1:
                return value + "   ";
            case 3:
            default:
                return value;
        }
    }
    else {
        return value;
    }
};
export var hexToRgb = function (hex) {
    if (hex.length < 6) {
        hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16)
        : null;
};
export var usNumberFormat = function (value) {
    return String(value)
        .split("")
        .reverse()
        .join("")
        .replace(/(\d{3})/g, "$1,")
        .replace(/\,$/, "")
        .split("")
        .reverse()
        .join("");
};
export function tooltipTrigger(_a) {
    var chart = _a.chart, data = _a.data, set = _a.set, index = _a.index, siteVariables = _a.siteVariables, mergeDuplicates = _a.mergeDuplicates, patterns = _a.patterns;
    var theme = siteVariables.theme, colorScheme = siteVariables.colorScheme;
    if (mergeDuplicates) {
        var duplicates_1 = [];
        var segments_1 = [];
        // Check for equal data points
        data.datasets.filter(function (dataset, i) {
            if (dataset.data[index] === data.datasets[set].data[index]) {
                duplicates_1.push(i);
            }
            if (theme === TeamsTheme.HighContrast) {
                chart.data.datasets[i].borderColor = colorScheme.default.border;
                chart.data.datasets[i].borderWidth = 2;
            }
        });
        duplicates_1.forEach(function (segmentId) {
            segments_1.push(chart.getDatasetMeta(segmentId).data[index]);
            if (theme === TeamsTheme.HighContrast) {
                chart.data.datasets[segmentId].borderColor =
                    colorScheme.default.borderHover;
                chart.data.datasets[segmentId].borderWidth = 4;
            }
        });
        if (theme === TeamsTheme.HighContrast) {
            chart.update();
        }
        chart.tooltip._active = segments_1;
    }
    else {
        var segment = chart.getDatasetMeta(set).data[index];
        chart.tooltip._active = [segment];
        if (theme === TeamsTheme.HighContrast && patterns) {
            chart.data.datasets.map(function (dataset, i) {
                dataset.borderColor = colorScheme.default.border;
                dataset.borderWidth = 2;
                dataset.backgroundColor = buildPattern(__assign(__assign({}, patterns(colorScheme)[index]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.brand.background }));
            });
            chart.data.datasets[set].borderColor =
                siteVariables.colorScheme.default.borderHover;
            chart.data.datasets[set].borderWidth = 4;
            chart.data.datasets[set].backgroundColor = chart.data.datasets[set].backgroundColor = buildPattern(__assign(__assign({}, patterns(siteVariables.colorScheme)[set]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.default.borderHover }));
            chart.update();
        }
    }
    chart.tooltip.update();
    chart.draw();
}
export var tooltipAxisYLine = function (_a) {
    var chart = _a.chart, ctx = _a.ctx, tooltip = _a.tooltip;
    if (tooltip._active && tooltip._active.length) {
        var activePoint = tooltip._active[0], y = activePoint.tooltipPosition().y, x = activePoint.tooltipPosition().x, y_axis = chart.scales["y-axis-0"], topY = y_axis.top, bottomY = y_axis.bottom;
        ctx.save();
        // Line
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color;
        ctx.stroke();
        // Point
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
        ctx.lineWidth = 2;
        ctx.fillStyle = "white";
        ctx.strokeStyle =
            chart.data.datasets[activePoint._datasetIndex].hoverBorderColor;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
};
export var tooltipAxisXLine = function (_a) {
    var chart = _a.chart, ctx = _a.ctx, tooltip = _a.tooltip;
    if (tooltip._active && tooltip._active.length) {
        var activePoint = tooltip._active[0], y = activePoint.tooltipPosition().y, x = activePoint.tooltipPosition().x, x_axis = chart.scales["x-axis-0"], leftX = x_axis.left, rightX = x_axis.right;
        ctx.save();
        // Line
        ctx.beginPath();
        ctx.moveTo(leftX - 20, y);
        ctx.lineTo(rightX, y);
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = chart.options.scales.yAxes[0].gridLines.color;
        ctx.stroke();
        ctx.restore();
    }
};
export var horizontalBarValue = function (_a) {
    var chart = _a.chart, ctx = _a.ctx, stacked = _a.stacked;
    ctx.font = "bold 11px Segoe UI";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = chart.options.defaultColor;
    if (stacked) {
        var meta = chart.controller.getDatasetMeta(chart.data.datasets.length - 1);
        meta.data.forEach(function (bar, index) {
            var data = 0;
            chart.data.datasets.map(function (dataset) {
                var value = dataset.data[index];
                if (typeof value === "number") {
                    return (data += value);
                }
            });
            ctx.fillText(data, bar._model.x + 8, bar._model.y);
        });
    }
    else {
        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x + 8, bar._model.y);
            });
        });
    }
};
export var chartConfig = function (_a) {
    var type = _a.type;
    return ({
        type: type,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
            },
            layout: {
                padding: {
                    left: 0,
                    right: 16,
                    top: 0,
                    bottom: 0,
                },
            },
            scaleLabel: {
                display: false,
            },
            elements: {
                line: {
                    tension: 0.4,
                },
            },
            hover: {
                mode: "dataset",
                intersect: false,
            },
            tooltips: tooltipConfig(),
            scales: {
                xAxes: [
                    {
                        ticks: {
                            fontSize: 10,
                            padding: 0,
                            labelOffset: 4,
                            maxRotation: 0,
                            minRotation: 0,
                            callback: chartAxisCallback,
                        },
                        gridLines: {
                            borderDash: [5, 9999],
                            zeroLineBorderDash: [5, 9999],
                        },
                    },
                ],
                yAxes: [
                    {
                        stacked: false,
                        ticks: {
                            callback: chartAxisCallback,
                            fontSize: 10,
                            padding: -16,
                            labelOffset: 10,
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            lineWidth: 1,
                            drawBorder: false,
                            drawTicks: true,
                            tickMarkLength: 44,
                        },
                    },
                ],
            },
        },
    });
};
export var axesConfig = function (_a) {
    var chart = _a.chart, ctx = _a.ctx, colorScheme = _a.colorScheme;
    var axesXGridLines = ctx.createLinearGradient(100, 100, 100, 0);
    axesXGridLines.addColorStop(0.01, colorScheme.grey.border);
    axesXGridLines.addColorStop(0.01, "transparent");
    chart.options.scales.xAxes.forEach(function (xAxes, index) {
        xAxes.ticks.fontColor = colorScheme.default.foreground2;
        if (index < 1) {
            xAxes.gridLines.color = axesXGridLines;
            xAxes.gridLines.zeroLineColor = axesXGridLines;
        }
        else {
            xAxes.gridLines.color = "transparent";
        }
    });
    chart.options.scales.yAxes.forEach(function (yAxes, index) {
        yAxes.ticks.fontColor = colorScheme.default.foreground2;
        if (index < 1) {
            yAxes.gridLines.color = colorScheme.grey.border;
            yAxes.gridLines.zeroLineColor = colorScheme.grey.border;
        }
        else {
            yAxes.gridLines.color = "transparent";
        }
    });
};
export var setTooltipColorScheme = function (_a) {
    var _b;
    var chart = _a.chart, siteVariables = _a.siteVariables, chartDataPointColors = _a.chartDataPointColors, patterns = _a.patterns, verticalDataAlignment = _a.verticalDataAlignment;
    var colorScheme = siteVariables.colorScheme, theme = siteVariables.theme;
    chart.options.tooltips = __assign(__assign({}, chart.options.tooltips), { backgroundColor: theme === TeamsTheme.Dark
            ? colorScheme.default.border2
            : colorScheme.default.foregroundFocus, borderColor: colorScheme.default.borderHover, multiKeyBackground: colorScheme.white.foreground, titleFontColor: colorScheme.default.foreground3, bodyFontColor: colorScheme.default.foreground3, footerFontColor: colorScheme.default.foreground3, borderWidth: theme === TeamsTheme.HighContrast ? 2 : 0, callbacks: __assign(__assign({}, (_b = chart.options.tooltips) === null || _b === void 0 ? void 0 : _b.callbacks), { labelColor: patterns && theme === TeamsTheme.HighContrast
                ? function (tooltipItem) { return ({
                    borderColor: "transparent",
                    backgroundColor: buildPattern(__assign(__assign({}, patterns(colorScheme)[verticalDataAlignment
                        ? tooltipItem.index
                        : tooltipItem.datasetIndex]), { backgroundColor: colorScheme.default.background, patternColor: colorScheme.default.borderHover })),
                }); }
                : function (tooltipItem) { return ({
                    borderColor: "transparent",
                    backgroundColor: chartDataPointColors[verticalDataAlignment
                        ? tooltipItem.index
                        : tooltipItem.datasetIndex],
                }); } }) });
    if (siteVariables.theme === TeamsTheme.HighContrast) {
        chart.options.scales.yAxes[0].gridLines.lineWidth = 0.25;
    }
    else {
        chart.options.scales.yAxes[0].gridLines.lineWidth = 1;
    }
};
export var tooltipConfig = function () { return ({
    yPadding: 12,
    xPadding: 20,
    caretPadding: 10,
    // Tooltip Title
    titleFontStyle: "200",
    titleFontSize: 20,
    // Tooltip Body
    bodySpacing: 4,
    bodyFontSize: 11.5,
    bodyFontStyle: "400",
    // Tooltip Footer
    footerFontStyle: "300",
    footerFontSize: 10,
    callbacks: {
        title: function (tooltipItems) {
            var value = tooltipItems[0].yLabel;
            return typeof value === "number" && value > 999
                ? usNumberFormat(value)
                : value;
        },
        label: function (tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label;
        },
        footer: function (tooltipItems) {
            var value = tooltipItems[0].xLabel;
            return typeof value === "number" && value > 999
                ? usNumberFormat(value)
                : value;
        },
    },
}); };
//# sourceMappingURL=ChartUtils.js.map