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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
var react_1 = __importStar(require("react"));
var get_1 = __importDefault(require("lodash/get"));
var set_1 = __importDefault(require("lodash/set"));
var immer_1 = __importDefault(require("immer"));
var react_northstar_1 = require("@fluentui/react-northstar");
var DashboardWidget_1 = require("./DashboardWidget");
var DashboardTheme_1 = require("./DashboardTheme");
var Sidebar_1 = require("./Sidebar");
var Toolbar_1 = require("../Toolbar/Toolbar");
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
function Dashboard(_a) {
    var widgets = _a.widgets, preferences = _a.preferences, cacheKey = _a.cacheKey, onInteraction = _a.onInteraction;
    var _b = react_1.useState(false), sidebarOpen = _b[0], setSidebarOpen = _b[1];
    var closeSidebar = function () { return setSidebarOpen(false); };
    var localStorageKey = cacheKey
        ? "@fluentui/react-teams__" + cacheKey
        : undefined;
    var initializePreferencesState = function () {
        return immer_1.default(preferences || getStoredPrefs(localStorageKey), function (draft) {
            widgets.reduce(function (draft, _a) {
                var id = _a.id;
                return set_1.default(draft, "widgetSettings." + id + ".display", get_1.default(draft, "widgetSettings." + id + ".display", true));
            }, draft);
        });
    };
    var _c = react_1.useState(initializePreferencesState), preferencesState = _c[0], setPreferencesState = _c[1];
    react_1.useEffect(function () {
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
        updatePreferences(immer_1.default(preferencesState, function (draft) {
            set_1.default(draft, "widgetSettings." + widgetId + ".display", false);
        }));
    };
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            var _a = globalTheme.siteVariables, t = _a.t, rtl = _a.rtl;
            return (react_1.default.createElement(DashboardTheme_1.DashboardTheme, { globalTheme: globalTheme },
                react_1.default.createElement(Toolbar_1.Toolbar, __assign({}, {
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
                react_1.default.createElement(Sidebar_1.Sidebar, __assign({ open: sidebarOpen, onClose: closeSidebar }, { t: t, widgets: widgets, preferencesState: preferencesState, updatePreferences: updatePreferences })),
                react_1.default.createElement(react_northstar_1.Box, { styles: {
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
                        return get_1.default(preferencesState, "widgetSettings." + id + ".display", true) && (react_1.default.createElement(DashboardWidget_1.Widget, { key: key, size: size },
                            react_1.default.createElement(DashboardWidget_1.WidgetTitle, __assign({}, {
                                widgetId: id,
                                title: title,
                                desc: desc,
                                globalTheme: globalTheme,
                                widgetActionGroup: widgetActionGroup,
                                onInteraction: onInteraction,
                                hideWidget: hideWidget,
                                t: t,
                            })),
                            react_1.default.createElement(DashboardWidget_1.WidgetBody, __assign({}, { body: body, t: t }, { siteVariables: globalTheme.siteVariables })),
                            link && (react_1.default.createElement(DashboardWidget_1.WidgetFooter, __assign({}, { link: link, t: t, rtl: rtl }, { siteVariables: globalTheme.siteVariables })))));
                    }))));
        } }));
}
exports.Dashboard = Dashboard;
//# sourceMappingURL=Dashboard.js.map