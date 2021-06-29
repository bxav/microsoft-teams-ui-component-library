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
exports.WidgetFooter = exports.WidgetBody = exports.WidgetTitle = exports.Widget = exports.EWidgetSize = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var DashboardCallout_1 = require("./DashboardCallout");
var Chart_1 = require("../Chart/Chart");
var Placeholder_1 = require("./Placeholder");
var translations_1 = require("../../translations");
/**
 * The widget’s target size in the Dashboard’s grid layout.
 * @public
 */
var EWidgetSize;
(function (EWidgetSize) {
    /**
     * The widget will occupy 1×1 grid cells.
     */
    EWidgetSize["Single"] = "single";
    /**
     * The widget will occupy 2×1 grid cells.
     */
    EWidgetSize["Double"] = "double";
    /**
     * The widget will occupy 3×1 grid cells.
     */
    EWidgetSize["Triple"] = "triple";
    /**
     * The widget will occupy 2×2 grid cells.
     */
    EWidgetSize["Box"] = "box";
})(EWidgetSize = exports.EWidgetSize || (exports.EWidgetSize = {}));
exports.Widget = function (_a) {
    var children = _a.children, size = _a.size;
    var cardStyle = {
        gridColumnEnd: "auto",
        gridRowEnd: "auto",
        "@media (max-width: 842px)": {
            gridColumnEnd: "span 3",
        },
    };
    if (size === EWidgetSize.Double) {
        cardStyle.gridColumnEnd = "span 2";
    }
    if (size === EWidgetSize.Box) {
        cardStyle.gridColumnEnd = "span 2";
        cardStyle.gridRowEnd = "span 2";
    }
    if (size === EWidgetSize.Triple) {
        cardStyle.gridColumnEnd = "span 3";
    }
    return (react_1.default.createElement(react_northstar_1.Card, { styles: cardStyle, fluid: true }, children));
};
exports.WidgetTitle = function (_a) {
    var widgetId = _a.widgetId, title = _a.title, desc = _a.desc, globalTheme = _a.globalTheme, widgetActionGroup = _a.widgetActionGroup, hideWidget = _a.hideWidget, t = _a.t, onInteraction = _a.onInteraction;
    var _b = react_1.default.useState(false), calloutOpen = _b[0], setCalloutOpen = _b[1];
    return (react_1.default.createElement(react_northstar_1.Card.Header, null,
        react_1.default.createElement(react_northstar_1.Flex, { gap: "gap.small", space: "between", style: { minHeight: "2rem" } },
            react_1.default.createElement(react_northstar_1.Flex, { gap: "gap.small", column: true },
                react_1.default.createElement(react_northstar_1.Text, { content: translations_1.getText(t.locale, title), style: { margin: 0 }, weight: "bold" }),
                desc && react_1.default.createElement(react_northstar_1.Text, { content: translations_1.getText(t.locale, desc), size: "small" })),
            react_1.default.createElement(DashboardCallout_1.DashboardCallout, __assign({ open: calloutOpen, onOpenChange: function (_a, props) {
                    var currentTarget = _a.currentTarget;
                    var open = !!(props === null || props === void 0 ? void 0 : props.open);
                    setCalloutOpen(open);
                }, menuProps: {
                    offset: [0, 0],
                    position: "below",
                } }, {
                widgetId: widgetId,
                globalTheme: globalTheme,
                widgetActionGroup: widgetActionGroup,
                hideWidget: hideWidget,
                t: t,
                onInteraction: onInteraction,
            })))));
};
var EmptyState = function (_a) {
    var borderColor = _a.borderColor;
    return (react_1.default.createElement(react_northstar_1.Box, { styles: {
            height: "100%",
            border: "1px dashed " + borderColor,
        } }));
};
exports.WidgetBody = function (_a) {
    var body = _a.body, siteVariables = _a.siteVariables, t = _a.t;
    var _b = react_1.default.useState(0), activeTabId = _b[0], setActiveTabId = _b[1];
    return (react_1.default.createElement(react_northstar_1.Card.Body, { style: {
            marginBottom: "0.75rem",
            height: "100%",
            overflow: "hidden",
        }, fitted: true }, body ? (react_1.default.createElement(react_1.default.Fragment, null,
        body.length > 1 && (react_1.default.createElement(react_northstar_1.Menu, { style: {
                border: "none",
                background: "none",
                marginBottom: "1.25rem",
            }, items: Array.from(body, function (_a) {
                var id = _a.id, title = _a.title;
                return Object.assign({ key: id, content: translations_1.getText(t.locale, title) });
            }), activeIndex: activeTabId, onItemClick: function (_a, props) {
                var currentTarget = _a.currentTarget;
                return setActiveTabId(props && props.index ? props.index : 0);
            }, accessibility: react_northstar_1.tabListBehavior, underlined: true, primary: true })),
        body.map(function (_a, i) {
            var id = _a.id, content = _a.content;
            return (react_1.default.createElement(react_northstar_1.Flex, { key: id, styles: {
                    height: "100%",
                    display: activeTabId === i ? "flex" : "none",
                }, column: true }, (function () {
                switch (content.type) {
                    case "chart":
                        return (react_1.default.createElement(Chart_1.Chart, __assign({}, content.chart)));
                    case "placeholder":
                        return (react_1.default.createElement(Placeholder_1.Placeholder, { message: content.message }));
                    default:
                        return content;
                }
            })()));
        }))) : (react_1.default.createElement(EmptyState, { borderColor: siteVariables.colors.grey["300"] }))));
};
exports.WidgetFooter = function (_a) {
    var link = _a.link, siteVariables = _a.siteVariables, t = _a.t, rtl = _a.rtl;
    return (react_1.default.createElement(react_northstar_1.Card.Footer, { fitted: true },
        react_1.default.createElement(react_northstar_1.Flex, { space: "between", vAlign: "center" },
            react_1.default.createElement(react_northstar_1.Text, { as: "a", href: link.href, target: "_blank", size: "small", color: "brand", styles: {
                    textDecoration: "none",
                    "&:focus": {
                        outlineColor: siteVariables.colorScheme.default.foregroundActive,
                    },
                } },
                link.title ? translations_1.getText(t.locale, link.title) : t["view more"],
                rtl ? (react_1.default.createElement(react_northstar_1.ArrowLeftIcon, { size: "small", styles: { margin: "0 .4rem" } })) : (react_1.default.createElement(react_northstar_1.ArrowRightIcon, { size: "small", styles: { margin: "0 .4rem" } }))))));
};
//# sourceMappingURL=DashboardWidget.js.map