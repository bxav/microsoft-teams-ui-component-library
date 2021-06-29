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
import { Flex, Card, Text, Box, tabListBehavior, Menu, ArrowRightIcon, ArrowLeftIcon, } from "@fluentui/react-northstar";
import { DashboardCallout } from "./DashboardCallout";
import { Chart } from "../Chart/Chart";
import { Placeholder } from "./Placeholder";
import { getText } from "../../translations";
/**
 * The widget’s target size in the Dashboard’s grid layout.
 * @public
 */
export var EWidgetSize;
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
})(EWidgetSize || (EWidgetSize = {}));
export var Widget = function (_a) {
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
    return (React.createElement(Card, { styles: cardStyle, fluid: true }, children));
};
export var WidgetTitle = function (_a) {
    var widgetId = _a.widgetId, title = _a.title, desc = _a.desc, globalTheme = _a.globalTheme, widgetActionGroup = _a.widgetActionGroup, hideWidget = _a.hideWidget, t = _a.t, onInteraction = _a.onInteraction;
    var _b = React.useState(false), calloutOpen = _b[0], setCalloutOpen = _b[1];
    return (React.createElement(Card.Header, null,
        React.createElement(Flex, { gap: "gap.small", space: "between", style: { minHeight: "2rem" } },
            React.createElement(Flex, { gap: "gap.small", column: true },
                React.createElement(Text, { content: getText(t.locale, title), style: { margin: 0 }, weight: "bold" }),
                desc && React.createElement(Text, { content: getText(t.locale, desc), size: "small" })),
            React.createElement(DashboardCallout, __assign({ open: calloutOpen, onOpenChange: function (_a, props) {
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
    return (React.createElement(Box, { styles: {
            height: "100%",
            border: "1px dashed " + borderColor,
        } }));
};
export var WidgetBody = function (_a) {
    var body = _a.body, siteVariables = _a.siteVariables, t = _a.t;
    var _b = React.useState(0), activeTabId = _b[0], setActiveTabId = _b[1];
    return (React.createElement(Card.Body, { style: {
            marginBottom: "0.75rem",
            height: "100%",
            overflow: "hidden",
        }, fitted: true }, body ? (React.createElement(React.Fragment, null,
        body.length > 1 && (React.createElement(Menu, { style: {
                border: "none",
                background: "none",
                marginBottom: "1.25rem",
            }, items: Array.from(body, function (_a) {
                var id = _a.id, title = _a.title;
                return Object.assign({ key: id, content: getText(t.locale, title) });
            }), activeIndex: activeTabId, onItemClick: function (_a, props) {
                var currentTarget = _a.currentTarget;
                return setActiveTabId(props && props.index ? props.index : 0);
            }, accessibility: tabListBehavior, underlined: true, primary: true })),
        body.map(function (_a, i) {
            var id = _a.id, content = _a.content;
            return (React.createElement(Flex, { key: id, styles: {
                    height: "100%",
                    display: activeTabId === i ? "flex" : "none",
                }, column: true }, (function () {
                switch (content.type) {
                    case "chart":
                        return (React.createElement(Chart, __assign({}, content.chart)));
                    case "placeholder":
                        return (React.createElement(Placeholder, { message: content.message }));
                    default:
                        return content;
                }
            })()));
        }))) : (React.createElement(EmptyState, { borderColor: siteVariables.colors.grey["300"] }))));
};
export var WidgetFooter = function (_a) {
    var link = _a.link, siteVariables = _a.siteVariables, t = _a.t, rtl = _a.rtl;
    return (React.createElement(Card.Footer, { fitted: true },
        React.createElement(Flex, { space: "between", vAlign: "center" },
            React.createElement(Text, { as: "a", href: link.href, target: "_blank", size: "small", color: "brand", styles: {
                    textDecoration: "none",
                    "&:focus": {
                        outlineColor: siteVariables.colorScheme.default.foregroundActive,
                    },
                } },
                link.title ? getText(t.locale, link.title) : t["view more"],
                rtl ? (React.createElement(ArrowLeftIcon, { size: "small", styles: { margin: "0 .4rem" } })) : (React.createElement(ArrowRightIcon, { size: "small", styles: { margin: "0 .4rem" } }))))));
};
//# sourceMappingURL=DashboardWidget.js.map