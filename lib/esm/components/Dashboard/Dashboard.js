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
import React, { useEffect, useState } from "react";
import get from "lodash/get";
import set from "lodash/set";
import produce from "immer";
import { ProviderConsumer as FluentUIThemeConsumer, Box, } from "@fluentui/react-northstar";
import { Widget, WidgetTitle, WidgetBody, WidgetFooter, } from "./DashboardWidget";
import { DashboardTheme } from "./DashboardTheme";
import { Sidebar } from "./Sidebar";
import { Toolbar } from "../Toolbar/Toolbar";
var emptyPrefs = { widgetSettings: {} };
/*
 * This method returns the same stored preferences for any Dashboard.
 */
var getStoredPrefs = function (cacheKey) {
    return cacheKey
        ? (function () {
            var storedPrefs = window.localStorage.getItem(cacheKey);
            return storedPrefs ? JSON.parse(storedPrefs) : false;
        })() || emptyPrefs
        : emptyPrefs;
};
/**
 * @public
 */
export function Dashboard(_a) {
    var widgets = _a.widgets, preferences = _a.preferences, cacheKey = _a.cacheKey, onInteraction = _a.onInteraction;
    var _b = useState(false), sidebarOpen = _b[0], setSidebarOpen = _b[1];
    var closeSidebar = function () { return setSidebarOpen(false); };
    var localStorageKey = cacheKey
        ? "@fluentui/react-teams__" + cacheKey
        : undefined;
    var initializePreferencesState = function () {
        return produce(preferences || getStoredPrefs(localStorageKey), function (draft) {
            widgets.reduce(function (draft, _a) {
                var id = _a.id;
                return set(draft, "widgetSettings." + id + ".display", get(draft, "widgetSettings." + id + ".display", true));
            }, draft);
        });
    };
    var _c = useState(initializePreferencesState), preferencesState = _c[0], setPreferencesState = _c[1];
    useEffect(function () {
        localStorageKey &&
            window.localStorage.setItem(localStorageKey, JSON.stringify(preferencesState));
    }, [preferencesState]);
    var updatePreferences = function (nextPreferences) {
        setPreferencesState(nextPreferences);
        onInteraction &&
            onInteraction({
                event: "update",
                target: "preferences",
                preferences: nextPreferences,
            });
    };
    var hideWidget = function (widgetId) {
        updatePreferences(produce(preferencesState, function (draft) {
            set(draft, "widgetSettings." + widgetId + ".display", false);
        }));
    };
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var _a = globalTheme.siteVariables, t = _a.t, rtl = _a.rtl;
            return (React.createElement(DashboardTheme, { globalTheme: globalTheme },
                React.createElement(Toolbar, __assign({}, {
                    actionGroups: {
                        h1: {
                            edit: { title: t["edit dashboard"], icon: "Edit" },
                        },
                    },
                    filters: [],
                    find: false,
                }, { onInteraction: function (_a) {
                        var action = _a.action;
                        switch (action) {
                            case "edit":
                                setSidebarOpen(true);
                                break;
                        }
                    } })),
                React.createElement(Sidebar, __assign({ open: sidebarOpen, onClose: closeSidebar }, { t: t, widgets: widgets, preferencesState: preferencesState, updatePreferences: updatePreferences })),
                React.createElement(Box, { styles: {
                        display: "grid",
                        gridGap: ".5rem",
                        gridTemplate: "repeat(auto-fill, 25rem) / repeat(auto-fill, minmax(18.75rem, 1fr))",
                        gridAutoFlow: "dense",
                        gridAutoRows: "25rem",
                        padding: "0 1rem 1.25rem",
                        minWidth: "20rem",
                        "@media (max-width: 986px)": {
                            gridTemplate: "repeat(auto-fill, 25rem) / repeat(auto-fill, minmax(15.75rem, 1fr))",
                        },
                    } }, widgets &&
                    widgets.map(function (_a, key) {
                        var id = _a.id, title = _a.title, desc = _a.desc, widgetActionGroup = _a.widgetActionGroup, size = _a.size, body = _a.body, link = _a.link;
                        return get(preferencesState, "widgetSettings." + id + ".display", true) && (React.createElement(Widget, { key: key, size: size },
                            React.createElement(WidgetTitle, __assign({}, {
                                widgetId: id,
                                title: title,
                                desc: desc,
                                globalTheme: globalTheme,
                                widgetActionGroup: widgetActionGroup,
                                onInteraction: onInteraction,
                                hideWidget: hideWidget,
                                t: t,
                            })),
                            React.createElement(WidgetBody, __assign({}, { body: body, t: t }, { siteVariables: globalTheme.siteVariables })),
                            link && (React.createElement(WidgetFooter, __assign({}, { link: link, t: t, rtl: rtl }, { siteVariables: globalTheme.siteVariables })))));
                    }))));
        } }));
}
//# sourceMappingURL=Dashboard.js.map