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
import React from "react";
import { LineChart } from "./Line";
export var LineAreaChart = function (_a) {
    var title = _a.title, data = _a.data, siteVariables = _a.siteVariables;
    return (React.createElement(LineChart, __assign({}, {
        title: title,
        data: data,
        siteVariables: siteVariables,
        gradients: true,
    })));
};
//# sourceMappingURL=LineArea.js.map