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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from "react";
import { Popup, Button, MoreIcon, Menu, mergeThemes, Provider as FluentUIThemeProvider, EyeSlashIcon, } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../themes";
import Icon from "../../lib/Icon";
import { getText } from "../../translations";
var getLocalTheme = function () {
    return {
        componentVariables: {
            PopupContent: function (_a) {
                var colorScheme = _a.colorScheme, borderRadius = _a.borderRadius, borderWidth = _a.borderWidth, shadowLevel1 = _a.shadowLevel1, shadowLevel4 = _a.shadowLevel4, theme = _a.theme;
                return ({
                    backgroundColor: colorScheme.grey.background,
                    backgroundColorHover: colorScheme.grey.background,
                    boxShadow: shadowLevel1 + ", " + shadowLevel4,
                    borderRadius: borderRadius,
                    borderSize: borderWidth,
                    borderColor: theme === TeamsTheme.HighContrast
                        ? colorScheme.grey.backgroundFocus
                        : "transparent",
                    borderColorHover: theme === TeamsTheme.HighContrast
                        ? colorScheme.grey.backgroundFocus
                        : "transparent",
                });
            },
        },
        componentStyles: {
            Menu: {
                root: {
                    width: "100%",
                    marginRight: "0",
                    marginLeft: "0",
                    border: "none",
                    padding: "0 0.25rem",
                },
            },
            MenuDivider: {
                root: { margin: "0.25rem 0" },
            },
            PopupContent: {
                content: {
                    width: "12.5rem",
                    padding: "0",
                    boxShadow: " 0px 1.2px 3.6px rgba(0, 0, 0, 0.11), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)",
                },
            },
        },
    };
};
export var DashboardCallout = function (_a) {
    var widgetId = _a.widgetId, open = _a.open, onOpenChange = _a.onOpenChange, menuProps = _a.menuProps, globalTheme = _a.globalTheme, widgetActionGroup = _a.widgetActionGroup, hideWidget = _a.hideWidget, t = _a.t, onInteraction = _a.onInteraction;
    var theme = mergeThemes(globalTheme, getLocalTheme());
    var hideWidgetAction = {
        id: "hide_widget",
        content: t["hide widget"],
        icon: React.createElement(EyeSlashIcon, null),
        onClick: function () { return hideWidget(widgetId); },
    };
    return (React.createElement(FluentUIThemeProvider, { theme: theme },
        React.createElement(Popup, __assign({}, menuProps, { open: open, onOpenChange: onOpenChange, trigger: React.createElement(Button, { text: true, iconOnly: true, "aria-label": t["more"], icon: React.createElement(MoreIcon, null), styles: {
                    margin: "0 -0.35rem",
                } }), content: {
                styles: { width: "12.5rem" },
                content: (React.createElement(Menu, { items: widgetActionGroup
                        ? __spreadArrays(widgetActionGroup.map(function (_a) {
                            var id = _a.id, icon = _a.icon, title = _a.title;
                            return __assign({ key: id, icon: React.createElement(Icon, { icon: icon }), content: getText(t.locale, title) }, (onInteraction && {
                                onClick: function () {
                                    return onInteraction({
                                        event: "click",
                                        target: "action",
                                        widget: widgetId,
                                        action: id,
                                    });
                                },
                            }));
                        }), [
                            { kind: "divider" },
                            hideWidgetAction,
                        ]) : [hideWidgetAction], vertical: true })),
            }, trapFocus: {
                firstFocusableSelector: ".extended-toolbar__filters-menu__tree [data-is-focusable=true]",
            } }))));
};
//# sourceMappingURL=DashboardCallout.js.map