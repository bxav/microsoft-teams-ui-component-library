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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizardDialog = exports.Wizard = void 0;
var react_1 = __importDefault(require("react"));
var react_perfect_scrollbar_1 = __importDefault(require("react-perfect-scrollbar"));
var omit_1 = __importDefault(require("lodash/omit"));
var react_northstar_1 = require("@fluentui/react-northstar");
var react_icons_northstar_1 = require("@fluentui/react-icons-northstar");
var Form_1 = require("../Form/Form");
var translations_1 = require("../../translations");
var themes_1 = require("../../themes");
var WizardSidebar = function (_a) {
    var stepTitles = _a.stepTitles, activeStepIndex = _a.activeStepIndex, onInteraction = _a.onInteraction;
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (react_1.default.createElement(react_northstar_1.Box, { styles: {
                    display: "none",
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: "14rem",
                    overflowY: "auto",
                    borderRightWidth: "1px",
                    borderRightStyle: "solid",
                    zIndex: 3,
                    "@media screen and (min-width: 34rem)": {
                        display: "block",
                    },
                }, variables: function (_a) {
                    var colorScheme = _a.colorScheme;
                    return ({
                        borderColor: colorScheme.default.border2,
                        backgroundColor: colorScheme.default.background2,
                    });
                } },
                react_1.default.createElement(react_perfect_scrollbar_1.default, null,
                    react_1.default.createElement(react_northstar_1.List, { navigable: true, items: stepTitles.map(function (stepTitle, si) { return (__assign({ key: "wizard-step__" + si, content: (react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(react_northstar_1.Box, { styles: {
                                        display: "inline-block",
                                        marginRight: ".5rem",
                                    }, variables: function (_a) {
                                        var colorScheme = _a.colorScheme, theme = _a.theme;
                                        return theme === themes_1.TeamsTheme.HighContrast
                                            ? {}
                                            : {
                                                color: colorScheme.green.foreground,
                                            };
                                    } },
                                    react_1.default.createElement(react_icons_northstar_1.AcceptIcon, { styles: __assign({ fill: "currentcolor" }, (si >= activeStepIndex && {
                                            visibility: "hidden",
                                        })), outline: true })),
                                translations_1.getText(t.locale, stepTitle))), variables: function (_a) {
                                var colorScheme = _a.colorScheme, theme = _a.theme;
                                return (__assign({ color: si > activeStepIndex
                                        ? theme === themes_1.TeamsTheme.HighContrast
                                            ? colorScheme.default.foregroundDisabled1
                                            : colorScheme.default.foregroundDisabled
                                        : theme === themes_1.TeamsTheme.HighContrast &&
                                            si === activeStepIndex
                                            ? colorScheme.default.foregroundActive1
                                            : colorScheme.default.foreground1 }, (si === activeStepIndex
                                    ? {
                                        backgroundColor: theme === themes_1.TeamsTheme.HighContrast
                                            ? colorScheme.default.backgroundActive1
                                            : colorScheme.default.background,
                                        hoverBackgroundColor: theme === themes_1.TeamsTheme.HighContrast
                                            ? colorScheme.default.backgroundActive1
                                            : colorScheme.default.background,
                                        fontWeight: 600,
                                    }
                                    : {
                                        hoverBackgroundColor: theme === themes_1.TeamsTheme.HighContrast
                                            ? colorScheme.default.background5
                                            : colorScheme.default.background,
                                    })));
                            }, styles: __assign({ minHeight: "none", paddingTop: ".4375rem", paddingBottom: ".4375rem", borderRadius: ".1875rem" }, (si > activeStepIndex && { pointerEvents: "none" })) }, (onInteraction && {
                            onClick: function () {
                                return onInteraction({
                                    event: "click",
                                    target: "wizard-sidebar",
                                    subject: "wizard-step__" + si,
                                });
                            },
                        }))); }), styles: {
                            padding: "1.5rem .5rem",
                        } }))));
        } }));
};
/**
 * @public
 */
exports.Wizard = function (_a) {
    var stepTitles = _a.stepTitles, activeStepIndex = _a.activeStepIndex, activeStep = _a.activeStep, onInteraction = _a.onInteraction;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(WizardSidebar, __assign({}, { stepTitles: stepTitles, activeStepIndex: activeStepIndex, onInteraction: onInteraction })),
        react_1.default.createElement(Form_1.FormWizardStep, __assign({}, { onInteraction: onInteraction }, omit_1.default(activeStep, activeStepIndex === 0 ? ["back"] : [])))));
};
exports.WizardDialog = function (_a) {
    var formProps = _a.activeStep, props = __rest(_a, ["activeStep"]);
    return react_1.default.createElement(Form_1.FormWizardStepDialog, __assign({}, formProps, props));
};
//# sourceMappingURL=Wizard.js.map