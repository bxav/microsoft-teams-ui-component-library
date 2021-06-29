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
exports.FormContent = exports.setInitialValue = exports.MaxWidth = exports.EInputBlockType = exports.EInlineInputType = exports.EInputWidth = void 0;
var react_1 = __importDefault(require("react"));
var immer_1 = __importDefault(require("immer"));
var get_1 = __importDefault(require("lodash/get"));
var chunk_1 = __importDefault(require("lodash/chunk"));
var react_northstar_1 = require("@fluentui/react-northstar");
var react_icons_northstar_1 = require("@fluentui/react-icons-northstar");
var translations_1 = require("../../translations");
/**
 * An inline input’s width.
 * @public
 */
var EInputWidth;
(function (EInputWidth) {
    /**
     * The input should share the width with the other inline inputs.
     */
    EInputWidth["split"] = "split";
    /**
     * The input should occupy the full width of the Form
     */
    EInputWidth["full"] = "full";
})(EInputWidth = exports.EInputWidth || (exports.EInputWidth = {}));
/**
 * The types of inline inputs.
 * @public
 */
var EInlineInputType;
(function (EInlineInputType) {
    EInlineInputType["text"] = "text";
    EInlineInputType["dropdown"] = "dropdown";
})(EInlineInputType = exports.EInlineInputType || (exports.EInlineInputType = {}));
/**
 * The types of input blocks.
 * @public
 */
var EInputBlockType;
(function (EInputBlockType) {
    EInputBlockType["inlineInputs"] = "inline-inputs";
    EInputBlockType["dropdown"] = "dropdown";
    EInputBlockType["multilineText"] = "multiline-text";
    EInputBlockType["radioButtons"] = "radio-buttons";
    EInputBlockType["checkboxes"] = "checkboxes";
})(EInputBlockType = exports.EInputBlockType || (exports.EInputBlockType = {}));
exports.MaxWidth = function (_a) {
    var children = _a.children, styles = _a.styles, flush = _a.flush, _b = _a.align, align = _b === void 0 ? "center" : _b;
    return (react_1.default.createElement(react_northstar_1.Box, { styles: __assign({ margin: (function () {
                switch (align) {
                    case "left":
                        return "0 auto 0 0";
                    default:
                        return "0 auto";
                }
            })(), maxWidth: flush ? "none" : "29.75rem", padding: flush ? 0 : "2rem" }, styles) }, children));
};
var errorId = function (describesId) { return describesId + "__error"; };
var labelId = function (describesId) { return describesId + "__label"; };
var fullInputId = function (inputId) { return "input_" + inputId; };
var ErrorMessage = function (_a) {
    var excludeIcon = _a.excludeIcon, message = _a.message, id = _a.id, t = _a.t, styles = _a.styles;
    return (react_1.default.createElement(react_northstar_1.Box, __assign({ variables: function (_a) {
            var colorScheme = _a.colorScheme;
            return ({
                color: colorScheme.red.foreground,
            });
        } }, (id && { id: id }), { styles: __assign({ paddingLeft: ".375rem" }, styles) }),
        !excludeIcon && (react_1.default.createElement(react_icons_northstar_1.ExclamationCircleIcon, { outline: true, size: "small", styles: { marginRight: ".25rem" } })),
        react_1.default.createElement(react_northstar_1.Text, { size: "small", content: translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, message) })));
};
var DropdownBlock = function (props) {
    var options = props.options, t = props.t, inputId = props.inputId, title = props.title, errors = props.errors, formState = props.formState, setFormState = props.setFormState;
    var id = fullInputId(inputId);
    var error = get_1.default(errors, inputId, false);
    var selectedValues = Array.isArray(formState[inputId])
        ? formState[inputId]
        : formState[inputId]
            ? [formState[inputId]]
            : [];
    var items = options.map(function (_a) {
        var title = _a.title, value = _a.value;
        return ({
            key: inputId + "__" + value,
            selected: selectedValues.includes(value),
            header: translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title),
            "data-value": value,
        });
    });
    return (react_1.default.createElement(react_northstar_1.FormDropdown, __assign({ fluid: true, id: id, label: translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title), styles: { marginBottom: ".75rem" }, onChange: function (_e, props) {
            setFormState(immer_1.default(formState, function (draft) {
                if (props.multiple) {
                    var values = get_1.default(props, "value", []).map(function (selectedItemProps) {
                        return get_1.default(selectedItemProps, "data-value");
                    });
                    values.length ? (draft[inputId] = values) : delete draft[inputId];
                }
                else {
                    draft[inputId] = get_1.default(props, ["value", "data-value"]);
                }
            }));
        }, defaultValue: props.multiple
            ? items.filter(function (_a) {
                var value = _a["data-value"];
                return selectedValues.includes(value);
            })
            : items.find(function (_a) {
                var value = _a["data-value"];
                return selectedValues.includes(value);
            }), items: items }, (props.multiple && { multiple: true }), (error && {
        error: true,
        errorMessage: react_1.default.createElement(ErrorMessage, { message: error, t: t }),
    }))));
};
var splitQuery = function (rowSize, breakpointOffset) {
    return "@media (min-width: " + (16 * 8.25 * rowSize + 16 * breakpointOffset) + "px)";
};
var textInputStyles = function (rowSize, group, breakpointOffset) {
    var _a;
    if (breakpointOffset === void 0) { breakpointOffset = 0; }
    return (__assign((_a = { flex: "1 0 auto", marginRight: ".75rem", marginBottom: group === 0 ? ".25rem" : ".75rem", width: "100%" }, _a[splitQuery(rowSize, breakpointOffset)] = {
        order: group,
        width: "calc(" + (100 / rowSize).toFixed(1) + "% - .75rem)",
    }, _a), (group === 0 && { alignSelf: "flex-end" })));
};
var InlineInputsBlock = function (_a) {
    var _b, _c;
    var fields = _a.fields, t = _a.t, errors = _a.errors, formState = _a.formState, setFormState = _a.setFormState, breakpointOffset = _a.breakpointOffset;
    var rows = [];
    var i = 0;
    while (i < fields.length) {
        switch ((_b = fields[i]) === null || _b === void 0 ? void 0 : _b.width) {
            case "split":
                var j = i + 1;
                while (((_c = fields[j]) === null || _c === void 0 ? void 0 : _c.width) === "split") {
                    j += 1;
                }
                Array.prototype.push.apply(rows, chunk_1.default(fields.slice(i, j + 1), 3));
                i = j;
                break;
            default:
                rows.push([fields[i]]);
                i += 1;
                break;
        }
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, rows.map(function (rowFields, r) {
        var _a;
        // TODO: row should have a stable field to use as the key, since the key
        // will be incorrect if the rows are shuffled. I've used the index for
        // now since it's more (but not totally) correct than the previous
        // behavior of using a generated id that changed on each render.
        return (react_1.default.createElement(react_northstar_1.Box, { key: "form-content__row-" + r, styles: (_a = {
                    display: "flex",
                    flexFlow: "row wrap"
                },
                _a[splitQuery(rowFields.length, breakpointOffset || 0)] = {
                    marginRight: "-.75rem",
                },
                _a) }, rowFields.map(function (field) {
            var inputId = field.inputId, title = field.title, type = field.type;
            var id = fullInputId(inputId);
            var error = get_1.default(errors, inputId, false);
            return (react_1.default.createElement(react_1.default.Fragment, { key: "form-content__" + inputId },
                react_1.default.createElement(react_northstar_1.Input.Label, { htmlFor: id, id: labelId(id), styles: textInputStyles(rowFields.length, 0, breakpointOffset) }, translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title)),
                (function () {
                    switch (type) {
                        case "dropdown":
                            var _a = field, options = _a.options, multiple = _a.multiple;
                            var selectedValues_1 = Array.isArray(formState[inputId])
                                ? formState[inputId]
                                : formState[inputId]
                                    ? [formState[inputId]]
                                    : [];
                            var items = options.map(function (_a) {
                                var title = _a.title, value = _a.value;
                                return ({
                                    key: inputId + "__" + value,
                                    selected: selectedValues_1.includes(value),
                                    header: translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title),
                                    "data-value": value,
                                });
                            });
                            return (react_1.default.createElement(react_northstar_1.Dropdown, __assign({ fluid: true, id: id, label: translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title), styles: __assign(__assign({}, textInputStyles(rowFields.length, 1, breakpointOffset)), (error && { marginBottom: 0 })), onChange: function (_e, props) {
                                    setFormState(immer_1.default(formState, function (draft) {
                                        if (props.multiple) {
                                            var values = get_1.default(props, "value", []).map(function (selectedItemProps) {
                                                return get_1.default(selectedItemProps, "data-value");
                                            });
                                            values.length
                                                ? (draft[inputId] = values)
                                                : delete draft[inputId];
                                        }
                                        else {
                                            draft[inputId] = get_1.default(props, [
                                                "value",
                                                "data-value",
                                            ]);
                                        }
                                    }));
                                }, defaultValue: multiple
                                    ? items.filter(function (_a) {
                                        var value = _a["data-value"];
                                        return selectedValues_1.includes(value);
                                    })
                                    : items.find(function (_a) {
                                        var value = _a["data-value"];
                                        return selectedValues_1.includes(value);
                                    }), items: items }, (multiple && { multiple: true }), (error && { error: true }))));
                        case "text":
                            var placeholder = field.placeholder;
                            return (react_1.default.createElement(react_northstar_1.Input, __assign({ fluid: true, id: id }, (placeholder && {
                                placeholder: translations_1.getText(t.locale, placeholder),
                            }), (error && { error: true }), { styles: __assign(__assign({}, textInputStyles(rowFields.length, 1, breakpointOffset)), (error && { marginBottom: 0 })), "aria-labelledby": [labelId(id)]
                                    .concat(error ? errorId(id) : [])
                                    .join(" "), value: formState[inputId], onChange: function (_e, props) {
                                    if (props && "value" in props) {
                                        setFormState(immer_1.default(formState, function (draft) {
                                            draft[inputId] = props.value.toString();
                                        }));
                                    }
                                } })));
                        default:
                            return null;
                    }
                })(),
                error ? (react_1.default.createElement(ErrorMessage, { message: error, t: t, id: errorId(id), styles: textInputStyles(rowFields.length, 2, breakpointOffset) })) : (react_1.default.createElement(react_northstar_1.Box, { styles: __assign(__assign({}, textInputStyles(rowFields.length, 2, breakpointOffset)), { marginBottom: 0 }) }))));
        })));
    })));
};
var CheckboxesBlock = function (_a) {
    var options = _a.options, title = _a.title, t = _a.t, inputId = _a.inputId, errors = _a.errors, formState = _a.formState, setFormState = _a.setFormState;
    var id = fullInputId(inputId);
    var error = get_1.default(errors, inputId, false);
    return (react_1.default.createElement(react_northstar_1.Box, { styles: { marginBottom: ".75rem" } },
        react_1.default.createElement(react_northstar_1.Input.Label, { htmlFor: id, id: labelId(id) }, translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title)),
        react_1.default.createElement(react_northstar_1.Box, { id: id, accessibility: react_northstar_1.selectableListBehavior, "aria-labelledby": [labelId(id)]
                .concat(error ? errorId(id) : [])
                .join(" "), "aria-multiselectable": "true" }, options.map(function (_a) {
            var _b;
            var title = _a.title, value = _a.value;
            var selected = (_b = formState[inputId]) === null || _b === void 0 ? void 0 : _b.includes(value);
            return (react_1.default.createElement(react_northstar_1.Box, { key: id + "__" + value },
                react_1.default.createElement(react_northstar_1.Checkbox, { role: "option", "aria-selected": selected ? "true" : "false", checked: selected, variables: { layout: "radio-like" }, label: translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title), "data-value": value, onChange: function (e, props) {
                        setFormState(immer_1.default(formState, function (draft) {
                            var value = get_1.default(props, "data-value");
                            if (props === null || props === void 0 ? void 0 : props.checked) {
                                Array.isArray(draft[inputId])
                                    ? draft[inputId].push(value)
                                    : (draft[inputId] = [value]);
                            }
                            else {
                                var next_values = draft[inputId].filter(function (v) { return v !== value; });
                                next_values.length > 0
                                    ? (draft[inputId] = next_values)
                                    : delete draft[inputId];
                            }
                        }));
                    } })));
        })),
        error && react_1.default.createElement(ErrorMessage, { message: error, t: t, id: errorId(id) })));
};
var MultilineTextBlock = function (_a) {
    var title = _a.title, placeholder = _a.placeholder, t = _a.t, inputId = _a.inputId, errors = _a.errors, formState = _a.formState, setFormState = _a.setFormState;
    var id = fullInputId(inputId);
    var error = get_1.default(errors, inputId, false);
    return (react_1.default.createElement(react_northstar_1.Box, { styles: { marginBottom: ".75rem" } },
        react_1.default.createElement(react_northstar_1.Input.Label, { htmlFor: id, id: labelId(id) }, translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title)),
        react_1.default.createElement(react_northstar_1.TextArea, __assign({ fluid: true, resize: "vertical", id: id, value: formState[inputId] || "" }, (placeholder && { placeholder: translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, placeholder) }), { onChange: function (e, props) {
                setFormState(immer_1.default(formState, function (draft) {
                    props && props.value
                        ? (draft[inputId] = props.value)
                        : delete draft[inputId];
                }));
            } })),
        error && react_1.default.createElement(ErrorMessage, { message: error, t: t })));
};
var RadioButtonsBlock = function (_a) {
    var options = _a.options, t = _a.t, inputId = _a.inputId, title = _a.title, errors = _a.errors, formState = _a.formState, setFormState = _a.setFormState;
    var id = fullInputId(inputId);
    var error = get_1.default(errors, inputId, false);
    return (react_1.default.createElement(react_northstar_1.FormRadioGroup, __assign({ id: id, vertical: true, styles: { marginBottom: ".75rem" }, label: translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title) }, (error && { errorMessage: react_1.default.createElement(ErrorMessage, { message: error, t: t }) }), { items: options.map(function (_a) {
            var title = _a.title, value = _a.value;
            var label = translations_1.getText(t === null || t === void 0 ? void 0 : t.locale, title);
            var key = inputId + "__" + value;
            var name = label;
            var checked = formState[inputId] === value;
            var onChange = function (_e, props) {
                if (props && props.checked && props.value)
                    setFormState(immer_1.default(formState, function (draft) {
                        draft[inputId] = props.value.toString();
                    }));
            };
            return { key: key, value: value, label: label, name: name, checked: checked, onChange: onChange };
        }) })));
};
var FormInputBlock = function (props) {
    switch (props.type) {
        case "inline-inputs":
            return react_1.default.createElement(InlineInputsBlock, __assign({}, props));
        case "multiline-text":
            return react_1.default.createElement(MultilineTextBlock, __assign({}, props));
        case "dropdown":
            return react_1.default.createElement(DropdownBlock, __assign({}, props));
        case "checkboxes":
            return react_1.default.createElement(CheckboxesBlock, __assign({}, props));
        case "radio-buttons":
            return react_1.default.createElement(RadioButtonsBlock, __assign({}, props));
        default:
            return null;
    }
};
var FormSection = function (props) {
    var _a;
    var errors = props.errors, header = props.header, section = props.section, t = props.t;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        section.title && (react_1.default.createElement(react_northstar_1.Text, { as: header ? "h1" : "h2", weight: header ? "bold" : "semibold", size: header ? "large" : "medium" }, translations_1.getText(t.locale, section.title))),
        section.preface && (react_1.default.createElement(react_northstar_1.Text, { as: "p", variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    color: colorScheme.default.foreground2,
                });
            } }, translations_1.getText(t.locale, section.preface))),
        ((_a = section.inputBlocks) === null || _a === void 0 ? void 0 : _a.length) &&
            section.inputBlocks.map(function (inputBlock, gi) { return (react_1.default.createElement(FormInputBlock, __assign({}, inputBlock, {
                t: t,
                errors: errors,
                formState: props.formState,
                setFormState: props.setFormState,
                breakpointOffset: props.breakpointOffset,
            }, { key: props.keyPrefix + "__Group-" + gi }))); })));
};
exports.setInitialValue = function (acc, field) {
    if (field.hasOwnProperty("initialValue") &&
        field.initialValue)
        acc[field.inputId] = field.initialValue;
    else if (field.hasOwnProperty("initialValues"))
        acc[field.inputId] =
            field.initialValues || [];
    return acc;
};
exports.FormContent = react_1.default.memo(function (_a) {
    var topError = _a.topError, flush = _a.flush, t = _a.t, headerSection = _a.headerSection, sections = _a.sections, errors = _a.errors, formState = _a.formState, setFormState = _a.setFormState, align = _a.align, breakpointOffset = _a.breakpointOffset;
    return (react_1.default.createElement(exports.MaxWidth, __assign({}, { flush: flush, align: align }),
        topError && (react_1.default.createElement(react_northstar_1.Alert, { danger: true, visible: true, dismissible: true, content: react_1.default.createElement(react_northstar_1.Flex, { vAlign: "center" },
                react_1.default.createElement(react_icons_northstar_1.ExclamationTriangleIcon, { outline: true, styles: { marginRight: ".25rem" } }),
                react_1.default.createElement(react_northstar_1.Text, { styles: { margin: ".25rem 0" }, content: translations_1.getText(t.locale, topError) })) })),
        headerSection && (react_1.default.createElement(FormSection, __assign({ header: true, section: headerSection }, { t: t, errors: errors }))),
        sections.map(function (section, si) {
            var key = "Form__Section-" + si;
            return (react_1.default.createElement(FormSection, __assign({}, {
                section: section,
                t: t,
                key: key,
                keyPrefix: key,
                errors: errors,
                formState: formState,
                setFormState: setFormState,
                breakpointOffset: breakpointOffset,
            })));
        })));
});
//# sourceMappingURL=FormContent.js.map