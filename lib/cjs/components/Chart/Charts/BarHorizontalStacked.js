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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarHorizontalStackedChart = void 0;
var react_1 = __importDefault(require("react"));
var BarHorizontal_1 = require("./BarHorizontal");
exports.BarHorizontalStackedChart = function (_a) {
    var title = _a.title, data = _a.data, siteVariables = _a.siteVariables;
    return (react_1.default.createElement(BarHorizontal_1.BarHorizontalChart, __assign({}, {
        title: title,
        data: data,
        siteVariables: siteVariables,
        stacked: true,
    })));
};
//# sourceMappingURL=BarHorizontalStacked.js.map