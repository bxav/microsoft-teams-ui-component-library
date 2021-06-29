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
exports.Communication = void 0;
var react_1 = __importDefault(require("react"));
var react_northstar_1 = require("@fluentui/react-northstar");
var themes_1 = require("../../themes");
var CommunicationTypes_1 = require("./CommunicationTypes");
var Illustration_1 = require("./Illustration");
var isImage_1 = require("../../lib/isImage");
var CommunicationOptions_1 = require("./CommunicationOptions");
var translations_1 = require("../../translations");
/**
 * @public
 */
function Communication(_a) {
    var option = _a.option, fields = _a.fields, onInteraction = _a.onInteraction;
    var _b = react_1.default.useState(themes_1.TeamsTheme.Default), componentTheme = _b[0], setComponentTheme = _b[1];
    var _c = react_1.default.useState(), safeImageUrl = _c[0], setSafeImageUrl = _c[1];
    var _fields = {};
    var illustration;
    if (option) {
        switch (option) {
            case CommunicationTypes_1.CommunicationOptions.Default:
                _fields = CommunicationOptions_1.DEFAULT_MESSAGE;
                illustration = CommunicationOptions_1.DEFAULT_ILLUSTRATIONS;
                break;
            case CommunicationTypes_1.CommunicationOptions.Empty:
                _fields = CommunicationOptions_1.EMPTY_MESSAGE;
                illustration = CommunicationOptions_1.EMPTY_ILLUSTRATIONS;
                break;
            case CommunicationTypes_1.CommunicationOptions.Error:
                _fields = CommunicationOptions_1.ERROR_MESSAGE;
                illustration = CommunicationOptions_1.ERROR_ILLUSTRATIONS;
                break;
            case CommunicationTypes_1.CommunicationOptions.Hello:
                _fields = CommunicationOptions_1.HELLO_MESSAGE;
                illustration = CommunicationOptions_1.HELLO_ILLUSTRATIONS;
                break;
            case CommunicationTypes_1.CommunicationOptions.Thanks:
                _fields = CommunicationOptions_1.THANKS_MESSAGE;
                illustration = CommunicationOptions_1.THANKS_ILLUSTRATIONS;
                break;
            case CommunicationTypes_1.CommunicationOptions.Welcome:
                _fields = CommunicationOptions_1.WELCOME_MESSAGE;
                illustration = CommunicationOptions_1.DEFAULT_ILLUSTRATIONS;
                break;
        }
    }
    if (fields) {
        _fields = __assign(__assign({}, _fields), fields);
    }
    var title = _fields.title, desc = _fields.desc, actions = _fields.actions;
    var image = _fields.image;
    if (image) {
        // Check if URL contains image and image in supported formats
        isImage_1.isImageOrNot(image.src).then(function () {
            setSafeImageUrl(image.src);
        });
    }
    var themedImage = _fields.themedImage;
    if (themedImage) {
        isImage_1.isImageOrNot(themedImage[componentTheme]).then(function () {
            setSafeImageUrl(themedImage[componentTheme]);
        });
    }
    var onClick = onInteraction
        ? function (target) { return ({
            onClick: function () {
                return onInteraction({
                    event: "click",
                    target: target,
                });
            },
        }); }
        : function () { return ({}); };
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            setComponentTheme(globalTheme.siteVariables.theme);
            var t = globalTheme.siteVariables.t;
            return (react_1.default.createElement(react_northstar_1.Flex, { vAlign: "center", hAlign: "center", styles: {
                    width: "100%",
                    height: "100vh",
                } },
                react_1.default.createElement(react_northstar_1.Flex, { hAlign: "center", gap: "gap.large", column: true, style: {
                        width: "100%",
                        maxWidth: "33.5rem",
                        margin: "3rem 1.25rem",
                    } },
                    // Show default illustrations if imageUrl not passed
                    illustration && !(image || themedImage) && (react_1.default.createElement(Illustration_1.Illustration, { option: illustration[componentTheme] })),
                    // Render image if URL is safe
                    safeImageUrl && (image || themedImage) && (react_1.default.createElement("img", { src: safeImageUrl, style: {
                            width: "100%",
                            maxWidth: "20rem",
                            height: "12.5rem",
                            maxHeight: "12.5rem",
                            objectFit: "contain",
                        }, "aria-label": image ? image.ariaLabel : themedImage === null || themedImage === void 0 ? void 0 : themedImage.ariaLabel })),
                    // While an image is loading, show a loading indicator
                    !safeImageUrl && (image || themedImage) && (react_1.default.createElement(react_northstar_1.Flex, { vAlign: "center", hAlign: "center", styles: {
                            width: "100%",
                            maxWidth: "20rem",
                            height: "12.5rem",
                            maxHeight: "12.5rem",
                            objectFit: "cover",
                        } },
                        react_1.default.createElement(react_northstar_1.Loader, null))),
                    (title || desc) && (react_1.default.createElement(react_northstar_1.FlexItem, null,
                        react_1.default.createElement(react_northstar_1.Flex, { hAlign: "center", column: true },
                            title && (react_1.default.createElement(react_northstar_1.Text, { content: translations_1.getText(t.locale, title), size: "large", align: "center", weight: "bold", as: "h1", styles: { marginTop: 0, marginBottom: ".5rem" } })),
                            desc && (react_1.default.createElement(react_northstar_1.Text, { content: translations_1.getText(t.locale, desc), align: "center", as: "p", styles: { textAlign: "center", margin: 0 } }))))),
                    actions && (react_1.default.createElement(react_northstar_1.FlexItem, null,
                        react_1.default.createElement(react_northstar_1.Flex, { gap: "gap.small", column: true, styles: {
                                width: "100%",
                                maxWidth: "17.5rem",
                            } },
                            actions.primary && (react_1.default.createElement(react_northstar_1.Button, __assign({ content: translations_1.getText(t.locale, actions.primary.label), "aria-label": translations_1.getText(t.locale, actions.primary.label), styles: { width: "100%" }, primary: true }, onClick(actions.primary.target)))),
                            actions.secondary && (react_1.default.createElement(react_northstar_1.Button, __assign({ content: translations_1.getText(t.locale, actions.secondary.label), "aria-label": translations_1.getText(t.locale, actions.secondary.label), styles: { width: "100%" } }, onClick(actions.secondary.target)))),
                            actions.tertiary && (react_1.default.createElement(react_northstar_1.Button, { text: true, primary: true },
                                react_1.default.createElement(react_northstar_1.Text, __assign({ content: translations_1.getText(t.locale, actions.tertiary.label), weight: "light" }, onClick(actions.tertiary.target)))))))))));
        } }));
}
exports.Communication = Communication;
//# sourceMappingURL=Communication.js.map