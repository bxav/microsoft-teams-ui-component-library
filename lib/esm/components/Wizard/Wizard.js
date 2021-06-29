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
import React from "react";
import CustomScrollArea from "react-perfect-scrollbar";
import omit from "lodash/omit";
import { Box, List, ProviderConsumer as FluentUIThemeConsumer, } from "@fluentui/react-northstar";
import { AcceptIcon } from "@fluentui/react-icons-northstar";
import { FormWizardStep, FormWizardStepDialog, } from "../Form/Form";
import { getText } from "../../translations";
import { TeamsTheme } from "../../themes";
var WizardSidebar = function (_a) {
    var stepTitles = _a.stepTitles, activeStepIndex = _a.activeStepIndex, onInteraction = _a.onInteraction;
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (React.createElement(Box, { styles: {
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
                React.createElement(CustomScrollArea, null,
                    React.createElement(List, { navigable: true, items: stepTitles.map(function (stepTitle, si) { return (__assign({ key: "wizard-step__" + si, content: (React.createElement(React.Fragment, null,
                                React.createElement(Box, { styles: {
                                        display: "inline-block",
                                        marginRight: ".5rem",
                                    }, variables: function (_a) {
                                        var colorScheme = _a.colorScheme, theme = _a.theme;
                                        return theme === TeamsTheme.HighContrast
                                            ? {}
                                            : {
                                                color: colorScheme.green.foreground,
                                            };
                                    } },
                                    React.createElement(AcceptIcon, { styles: __assign({ fill: "currentcolor" }, (si >= activeStepIndex && {
                                            visibility: "hidden",
                                        })), outline: true })),
                                getText(t.locale, stepTitle))), variables: function (_a) {
                                var colorScheme = _a.colorScheme, theme = _a.theme;
                                return (__assign({ color: si > activeStepIndex
                                        ? theme === TeamsTheme.HighContrast
                                            ? colorScheme.default.foregroundDisabled1
                                            : colorScheme.default.foregroundDisabled
                                        : theme === TeamsTheme.HighContrast &&
                                            si === activeStepIndex
                                            ? colorScheme.default.foregroundActive1
                                            : colorScheme.default.foreground1 }, (si === activeStepIndex
                                    ? {
                                        backgroundColor: theme === TeamsTheme.HighContrast
                                            ? colorScheme.default.backgroundActive1
                                            : colorScheme.default.background,
                                        hoverBackgroundColor: theme === TeamsTheme.HighContrast
                                            ? colorScheme.default.backgroundActive1
                                            : colorScheme.default.background,
                                        fontWeight: 600,
                                    }
                                    : {
                                        hoverBackgroundColor: theme === TeamsTheme.HighContrast
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
export var Wizard = function (_a) {
    var stepTitles = _a.stepTitles, activeStepIndex = _a.activeStepIndex, activeStep = _a.activeStep, onInteraction = _a.onInteraction;
    return (React.createElement(React.Fragment, null,
        React.createElement(WizardSidebar, __assign({}, { stepTitles: stepTitles, activeStepIndex: activeStepIndex, onInteraction: onInteraction })),
        React.createElement(FormWizardStep, __assign({}, { onInteraction: onInteraction }, omit(activeStep, activeStepIndex === 0 ? ["back"] : [])))));
};
export var WizardDialog = function (_a) {
    var formProps = _a.activeStep, props = __rest(_a, ["activeStep"]);
    return React.createElement(FormWizardStepDialog, __assign({}, formProps, props));
};
//# sourceMappingURL=Wizard.js.map