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
exports.FormWizardStepDialog = exports.FormWizardStep = exports.FormDialog = exports.Form = void 0;
var react_1 = __importStar(require("react"));
var react_perfect_scrollbar_1 = __importDefault(require("react-perfect-scrollbar"));
var react_northstar_1 = require("@fluentui/react-northstar");
var translations_1 = require("../../translations");
var themes_1 = require("../../themes");
var types_1 = require("../../types/types");
var SignifiedOverflow_1 = require("../../lib/SignifiedOverflow");
var FormTheme_1 = require("./FormTheme");
var FormContent_1 = require("./FormContent");
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
                        return inputGroup.fields.reduce(FormContent_1.setInitialValue, acc_j);
                    default:
                        return FormContent_1.setInitialValue(acc_j, inputGroup);
                }
            }, acc_i)
            : acc_i;
    }, {});
};
/**
 * @public
 */
exports.Form = function (_a) {
    var cancel = _a.cancel, errors = _a.errors, headerSection = _a.headerSection, sections = _a.sections, submit = _a.submit, topError = _a.topError, onInteraction = _a.onInteraction;
    var _b = react_1.useState(function () {
        return initialFormState(sections);
    }), formState = _b[0], setFormState = _b[1];
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (react_1.default.createElement(FormTheme_1.FormTheme, { globalTheme: globalTheme, surface: types_1.Surface.base },
                react_1.default.createElement(react_northstar_1.Form, __assign({ styles: {
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
                    react_1.default.createElement(SignifiedOverflow_1.SignifiedOverflow, { body: react_1.default.createElement(FormContent_1.FormContent, __assign({}, {
                            headerSection: headerSection,
                            sections: sections,
                            topError: topError,
                            errors: errors,
                            t: t,
                            formState: formState,
                            setFormState: setFormState,
                        })), footer: react_1.default.createElement(FormContent_1.MaxWidth, { styles: {
                                display: "flex",
                                justifyContent: "flex-end",
                                padding: "1.25rem 2rem",
                            } },
                            cancel && (react_1.default.createElement(react_northstar_1.Button, __assign({ content: translations_1.getText(t.locale, cancel), styles: { marginRight: ".5rem" } }, (onInteraction && {
                                onClick: function (e) {
                                    e.preventDefault();
                                    onInteraction({
                                        event: "cancel",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                            })))),
                            react_1.default.createElement(react_northstar_1.Button, { primary: true, type: "submit", content: translations_1.getText(t.locale, submit) })) }))));
        } }));
};
/**
 * @internal
 */
exports.FormDialog = function (_a) {
    var cancel = _a.cancel, errors = _a.errors, headerSection = _a.headerSection, sections = _a.sections, submit = _a.submit, topError = _a.topError, trigger = _a.trigger, onInteraction = _a.onInteraction;
    var _b = react_1.useState(initialFormState(sections)), formState = _b[0], setFormState = _b[1];
    return (react_1.default.createElement(react_northstar_1.Dialog, { trigger: trigger, trapFocus: true, content: react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
                var t = globalTheme.siteVariables.t;
                return (react_1.default.createElement(FormTheme_1.FormTheme, { globalTheme: globalTheme, surface: types_1.Surface.raised },
                    react_1.default.createElement(react_northstar_1.Form, { styles: {
                            display: "block",
                            backgroundColor: "var(--surface-background)",
                        } },
                        react_1.default.createElement(FormContent_1.FormContent, __assign({ flush: true }, {
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
exports.FormWizardStep = function (_a) {
    var headerSection = _a.headerSection, sections = _a.sections, topError = _a.topError, errors = _a.errors, cancel = _a.cancel, submit = _a.submit, back = _a.back, onInteraction = _a.onInteraction;
    var _b = react_1.useState(initialFormState(sections)), formState = _b[0], setFormState = _b[1];
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (react_1.default.createElement(react_perfect_scrollbar_1.default, { style: { height: "calc(100% - 6rem)" } },
                react_1.default.createElement(FormTheme_1.FormTheme, { globalTheme: globalTheme, surface: types_1.Surface.base },
                    react_1.default.createElement(react_northstar_1.Form, __assign({ styles: {
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
                        react_1.default.createElement(FormContent_1.FormContent, __assign({}, {
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
                        react_1.default.createElement(react_northstar_1.Box, { styles: {
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
                                    borderWidth: (theme === themes_1.TeamsTheme.HighContrast ? "1px" : 0) + " 0 0 0",
                                });
                            } },
                            cancel && (react_1.default.createElement(react_northstar_1.Button, __assign({ content: translations_1.getText(t.locale, cancel), styles: { marginRight: ".5rem", marginTop: ".5rem" } }, (onInteraction && {
                                onClick: function (e) {
                                    e.preventDefault();
                                    onInteraction({
                                        event: "cancel",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                            })))),
                            react_1.default.createElement(react_northstar_1.Box, { role: "none", styles: { flex: "1 0 0", height: "1px" } }),
                            back && (react_1.default.createElement(react_northstar_1.Button, __assign({ content: translations_1.getText(t.locale, back), styles: { marginRight: ".5rem", marginTop: ".5rem" } }, (onInteraction && {
                                onClick: function (e) {
                                    e.preventDefault();
                                    onInteraction({
                                        event: "back",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                            })))),
                            react_1.default.createElement(react_northstar_1.Button, { primary: true, type: "submit", content: translations_1.getText(t.locale, submit), styles: { marginRight: ".5rem", marginTop: ".5rem" } }))))));
        } }));
};
exports.FormWizardStepDialog = function (_a) {
    var cancel = _a.cancel, back = _a.back, errors = _a.errors, headerSection = _a.headerSection, sections = _a.sections, submit = _a.submit, topError = _a.topError, trigger = _a.trigger, onInteraction = _a.onInteraction;
    var _b = react_1.useState(initialFormState(sections)), formState = _b[0], setFormState = _b[1];
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            var t = globalTheme.siteVariables.t;
            return (react_1.default.createElement(react_northstar_1.Dialog, { trigger: trigger, trapFocus: true, content: react_1.default.createElement(FormTheme_1.FormTheme, { globalTheme: globalTheme, surface: types_1.Surface.raised, styles: { marginRight: "-1rem" } },
                    react_1.default.createElement(react_perfect_scrollbar_1.default, { options: { suppressScrollX: true }, style: { maxHeight: "74vh" } },
                        react_1.default.createElement(react_northstar_1.Form, { styles: {
                                display: "block",
                                backgroundColor: "var(--surface-background)",
                                paddingRight: "1rem",
                            } },
                            react_1.default.createElement(FormContent_1.FormContent, __assign({ flush: true }, {
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
                        return (react_1.default.createElement(react_northstar_1.Flex, __assign({}, { styles: styles }),
                            react_1.default.createElement(react_northstar_1.Button, __assign({ content: translations_1.getText(t.locale, cancel) }, (onInteraction && {
                                onClick: function () {
                                    onInteraction({
                                        event: "cancel",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                            }))),
                            react_1.default.createElement(react_northstar_1.Box, { styles: { flex: "1 0 0" } }),
                            back && (react_1.default.createElement(react_northstar_1.Button, __assign({ content: translations_1.getText(t.locale, back) }, (onInteraction && {
                                onClick: function () {
                                    onInteraction({
                                        event: "back",
                                        target: "form",
                                        formState: formState,
                                    });
                                },
                                styles: { marginRight: ".5rem" },
                            })))),
                            react_1.default.createElement(react_northstar_1.Button, __assign({ primary: true, content: translations_1.getText(t.locale, submit) }, (onInteraction && {
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