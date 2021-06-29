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
import React, { useState } from "react";
import CustomScrollArea from "react-perfect-scrollbar";
import { Box, Button, Dialog, Flex, Form as FluentUIForm, ProviderConsumer as FluentUIThemeConsumer, } from "@fluentui/react-northstar";
import { getText } from "../../translations";
import { TeamsTheme } from "../../themes";
import { Surface } from "../../types/types";
import { SignifiedOverflow } from "../../lib/SignifiedOverflow";
import { FormTheme } from "./FormTheme";
import { FormContent, MaxWidth, setInitialValue, } from "./FormContent";
var dialogStyles = {
    minWidth: "320px",
};
var initialFormState = function (sections) {
    return sections.reduce(function (acc_i, _a) {
        var inputBlocks = _a.inputBlocks;
        return inputBlocks
            ? inputBlocks.reduce(function (acc_j, inputGroup) {
                if (!inputGroup)
                    return acc_j;
                switch (inputGroup.type) {
                    case "inline-inputs":
                        return inputGroup.fields.reduce(setInitialValue, acc_j);
                    default:
                        return setInitialValue(acc_j, inputGroup);
                }
            }, acc_i)
            : acc_i;
    }, {});
};
/**
 * @public
 */
export var Form = function (_a) {
    var cancel = _a.cancel, errors = _a.errors, headerSection = _a.headerSection, sections = _a.sections, submit = _a.submit, topError = _a.topError, onInteraction = _a.onInteraction;
    var _b = useState(function () {
        return initialFormState(sections);
    }), formState = _b[0], setFormState = _b[1];
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (React.createElement(FormTheme, { globalTheme: globalTheme, surface: Surface.base },
                React.createElement(FluentUIForm, __assign({ styles: {
                        display: "block",
                        "& > *:not(:last-child)": { marginBottom: 0 },
                        "& > :last-child": { marginTop: 0 },
                        backgroundColor: "var(--surface-background)",
                    } }, (onInteraction && {
                    onSubmit: function () {
                        return onInteraction({
                            event: "submit",
                            target: "form",
                            formState: formState,
                        });
                    },
                })),
                    React.createElement(SignifiedOverflow, { body: React.createElement(FormContent, __assign({}, {
                            headerSection: headerSection,
                            sections: sections,
                            topError: topError,
                            errors: errors,
                            t: t,
                            formState: formState,
                            setFormState: setFormState,
                        })), footer: React.createElement(MaxWidth, { styles: {
                                display: "flex",
                                justifyContent: "flex-end",
                                padding: "1.25rem 2rem",
                            } },
                            cancel && (React.createElement(Button, __assign({ content: getText(t.locale, cancel), styles: { marginRight: ".5rem" } }, (onInteraction && {
                                onClick: function (e) {
                                    e.preventDefault();
                                    onInteraction({
                                        event: "cancel",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                            })))),
                            React.createElement(Button, { primary: true, type: "submit", content: getText(t.locale, submit) })) }))));
        } }));
};
/**
 * @internal
 */
export var FormDialog = function (_a) {
    var cancel = _a.cancel, errors = _a.errors, headerSection = _a.headerSection, sections = _a.sections, submit = _a.submit, topError = _a.topError, trigger = _a.trigger, onInteraction = _a.onInteraction;
    var _b = useState(initialFormState(sections)), formState = _b[0], setFormState = _b[1];
    return (React.createElement(Dialog, { trigger: trigger, trapFocus: true, content: React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
                var t = globalTheme.siteVariables.t;
                return (React.createElement(FormTheme, { globalTheme: globalTheme, surface: Surface.raised },
                    React.createElement(FluentUIForm, { styles: {
                            display: "block",
                            backgroundColor: "var(--surface-background)",
                        } },
                        React.createElement(FormContent, __assign({ flush: true }, {
                            headerSection: headerSection,
                            sections: sections,
                            topError: topError,
                            errors: errors,
                            t: t,
                            formState: formState,
                            setFormState: setFormState,
                            breakpointOffset: 28,
                        })))));
            } }), confirmButton: __assign({ content: submit }, (onInteraction && {
            onClick: function () {
                return onInteraction({
                    event: "submit",
                    target: "form",
                    formState: formState,
                });
            },
        })), cancelButton: __assign({ content: cancel }, (onInteraction && {
            onClick: function (e) {
                e.preventDefault();
                onInteraction({
                    event: "cancel",
                    target: "form",
                    formState: formState,
                });
            },
        })), styles: dialogStyles }));
};
export var FormWizardStep = function (_a) {
    var headerSection = _a.headerSection, sections = _a.sections, topError = _a.topError, errors = _a.errors, cancel = _a.cancel, submit = _a.submit, back = _a.back, onInteraction = _a.onInteraction;
    var _b = useState(initialFormState(sections)), formState = _b[0], setFormState = _b[1];
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (React.createElement(CustomScrollArea, { style: { height: "calc(100% - 6rem)" } },
                React.createElement(FormTheme, { globalTheme: globalTheme, surface: Surface.base },
                    React.createElement(FluentUIForm, __assign({ styles: {
                            display: "block",
                            "& > *:not(:last-child)": { marginBottom: 0 },
                            "& > :last-child": { marginTop: 0 },
                            backgroundColor: "var(--surface-background)",
                            "@media screen and (min-width: 34rem)": {
                                paddingLeft: "14rem",
                            },
                        } }, (onInteraction && {
                        onSubmit: function () {
                            return onInteraction({
                                event: "submit",
                                target: "form",
                                formState: formState,
                            });
                        },
                    })),
                        React.createElement(FormContent, __assign({}, {
                            headerSection: headerSection,
                            sections: sections,
                            topError: topError,
                            errors: errors,
                            t: t,
                            formState: formState,
                            setFormState: setFormState,
                            align: "left",
                            breakpointOffset: 14,
                        })),
                        React.createElement(Box, { styles: {
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "flex-end",
                                backgroundColor: "var(--overlay-background)",
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: "1.5rem 2rem 2rem 2.5rem",
                                zIndex: 2,
                                "@media screen and (min-width: 34rem)": {
                                    left: "14rem",
                                },
                                borderTopStyle: "solid",
                            }, variables: function (_a) {
                                var colorScheme = _a.colorScheme, theme = _a.theme;
                                return ({
                                    elevation: colorScheme.elevations[16],
                                    borderColor: colorScheme.default.foreground,
                                    borderWidth: (theme === TeamsTheme.HighContrast ? "1px" : 0) + " 0 0 0",
                                });
                            } },
                            cancel && (React.createElement(Button, __assign({ content: getText(t.locale, cancel), styles: { marginRight: ".5rem", marginTop: ".5rem" } }, (onInteraction && {
                                onClick: function (e) {
                                    e.preventDefault();
                                    onInteraction({
                                        event: "cancel",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                            })))),
                            React.createElement(Box, { role: "none", styles: { flex: "1 0 0", height: "1px" } }),
                            back && (React.createElement(Button, __assign({ content: getText(t.locale, back), styles: { marginRight: ".5rem", marginTop: ".5rem" } }, (onInteraction && {
                                onClick: function (e) {
                                    e.preventDefault();
                                    onInteraction({
                                        event: "back",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                            })))),
                            React.createElement(Button, { primary: true, type: "submit", content: getText(t.locale, submit), styles: { marginRight: ".5rem", marginTop: ".5rem" } }))))));
        } }));
};
export var FormWizardStepDialog = function (_a) {
    var cancel = _a.cancel, back = _a.back, errors = _a.errors, headerSection = _a.headerSection, sections = _a.sections, submit = _a.submit, topError = _a.topError, trigger = _a.trigger, onInteraction = _a.onInteraction;
    var _b = useState(initialFormState(sections)), formState = _b[0], setFormState = _b[1];
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (React.createElement(Dialog, { trigger: trigger, trapFocus: true, content: React.createElement(FormTheme, { globalTheme: globalTheme, surface: Surface.raised, styles: { marginRight: "-1rem" } },
                    React.createElement(CustomScrollArea, { options: { suppressScrollX: true }, style: { maxHeight: "74vh" } },
                        React.createElement(FluentUIForm, { styles: {
                                display: "block",
                                backgroundColor: "var(--surface-background)",
                                paddingRight: "1rem",
                            } },
                            React.createElement(FormContent, __assign({ flush: true }, {
                                headerSection: headerSection,
                                sections: sections,
                                topError: topError,
                                errors: errors,
                                t: t,
                                formState: formState,
                                setFormState: setFormState,
                                breakpointOffset: 28,
                            }))))), footer: {
                    children: function (Component, _a) {
                        var styles = _a.styles, props = __rest(_a, ["styles"]);
                        return (React.createElement(Flex, __assign({}, { styles: styles }),
                            React.createElement(Button, __assign({ content: getText(t.locale, cancel) }, (onInteraction && {
                                onClick: function () {
                                    onInteraction({
                                        event: "cancel",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                            }))),
                            React.createElement(Box, { styles: { flex: "1 0 0" } }),
                            back && (React.createElement(Button, __assign({ content: getText(t.locale, back) }, (onInteraction && {
                                onClick: function () {
                                    onInteraction({
                                        event: "back",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                                styles: { marginRight: ".5rem" },
                            })))),
                            React.createElement(Button, __assign({ primary: true, content: getText(t.locale, submit) }, (onInteraction && {
                                onClick: function () {
                                    onInteraction({
                                        event: "submit",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                                styles: { marginRight: ".5rem" },
                            })))));
                    },
                }, styles: dialogStyles }));
        } }));
};
//# sourceMappingURL=Form.js.map