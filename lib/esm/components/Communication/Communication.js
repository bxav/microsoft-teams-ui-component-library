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
import { Button, Flex, FlexItem, Text, Loader, ProviderConsumer as FluentUIThemeConsumer, } from "@fluentui/react-northstar";
import { TeamsTheme } from "../../themes";
import { CommunicationOptions, } from "./CommunicationTypes";
import { Illustration } from "./Illustration";
import { isImageOrNot } from "../../lib/isImage";
import { DEFAULT_MESSAGE, DEFAULT_ILLUSTRATIONS, EMPTY_MESSAGE, EMPTY_ILLUSTRATIONS, ERROR_ILLUSTRATIONS, ERROR_MESSAGE, HELLO_ILLUSTRATIONS, HELLO_MESSAGE, THANKS_ILLUSTRATIONS, THANKS_MESSAGE, WELCOME_MESSAGE, } from "./CommunicationOptions";
import { getText } from "../../translations";
/**
 * @public
 */
export function Communication(_a) {
    var option = _a.option, fields = _a.fields, onInteraction = _a.onInteraction;
    var _b = React.useState(TeamsTheme.Default), componentTheme = _b[0], setComponentTheme = _b[1];
    var _c = React.useState(), safeImageUrl = _c[0], setSafeImageUrl = _c[1];
    var _fields = {};
    var illustration;
    if (option) {
        switch (option) {
            case CommunicationOptions.Default:
                _fields = DEFAULT_MESSAGE;
                illustration = DEFAULT_ILLUSTRATIONS;
                break;
            case CommunicationOptions.Empty:
                _fields = EMPTY_MESSAGE;
                illustration = EMPTY_ILLUSTRATIONS;
                break;
            case CommunicationOptions.Error:
                _fields = ERROR_MESSAGE;
                illustration = ERROR_ILLUSTRATIONS;
                break;
            case CommunicationOptions.Hello:
                _fields = HELLO_MESSAGE;
                illustration = HELLO_ILLUSTRATIONS;
                break;
            case CommunicationOptions.Thanks:
                _fields = THANKS_MESSAGE;
                illustration = THANKS_ILLUSTRATIONS;
                break;
            case CommunicationOptions.Welcome:
                _fields = WELCOME_MESSAGE;
                illustration = DEFAULT_ILLUSTRATIONS;
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
        isImageOrNot(image.src).then(function () {
            setSafeImageUrl(image.src);
        });
    }
    var themedImage = _fields.themedImage;
    if (themedImage) {
        isImageOrNot(themedImage[componentTheme]).then(function () {
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
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            setComponentTheme(globalTheme.siteVariables.theme);
            var t = globalTheme.siteVariables.t;
            return (React.createElement(Flex, { vAlign: "center", hAlign: "center", styles: {
                    width: "100%",
                    height: "100vh",
                } },
                React.createElement(Flex, { hAlign: "center", gap: "gap.large", column: true, style: {
                        width: "100%",
                        maxWidth: "33.5rem",
                        margin: "3rem 1.25rem",
                    } },
                    // Show default illustrations if imageUrl not passed
                    illustration && !(image || themedImage) && (React.createElement(Illustration, { option: illustration[componentTheme] })),
                    // Render image if URL is safe
                    safeImageUrl && (image || themedImage) && (React.createElement("img", { src: safeImageUrl, style: {
                            width: "100%",
                            maxWidth: "20rem",
                            height: "12.5rem",
                            maxHeight: "12.5rem",
                            objectFit: "contain",
                        }, "aria-label": image ? image.ariaLabel : themedImage === null || themedImage === void 0 ? void 0 : themedImage.ariaLabel })),
                    // While an image is loading, show a loading indicator
                    !safeImageUrl && (image || themedImage) && (React.createElement(Flex, { vAlign: "center", hAlign: "center", styles: {
                            width: "100%",
                            maxWidth: "20rem",
                            height: "12.5rem",
                            maxHeight: "12.5rem",
                            objectFit: "cover",
                        } },
                        React.createElement(Loader, null))),
                    (title || desc) && (React.createElement(FlexItem, null,
                        React.createElement(Flex, { hAlign: "center", column: true },
                            title && (React.createElement(Text, { content: getText(t.locale, title), size: "large", align: "center", weight: "bold", as: "h1", styles: { marginTop: 0, marginBottom: ".5rem" } })),
                            desc && (React.createElement(Text, { content: getText(t.locale, desc), align: "center", as: "p", styles: { textAlign: "center", margin: 0 } }))))),
                    actions && (React.createElement(FlexItem, null,
                        React.createElement(Flex, { gap: "gap.small", column: true, styles: {
                                width: "100%",
                                maxWidth: "17.5rem",
                            } },
                            actions.primary && (React.createElement(Button, __assign({ content: getText(t.locale, actions.primary.label), "aria-label": getText(t.locale, actions.primary.label), styles: { width: "100%" }, primary: true }, onClick(actions.primary.target)))),
                            actions.secondary && (React.createElement(Button, __assign({ content: getText(t.locale, actions.secondary.label), "aria-label": getText(t.locale, actions.secondary.label), styles: { width: "100%" } }, onClick(actions.secondary.target)))),
                            actions.tertiary && (React.createElement(Button, { text: true, primary: true },
                                React.createElement(Text, __assign({ content: getText(t.locale, actions.tertiary.label), weight: "light" }, onClick(actions.tertiary.target)))))))))));
        } }));
}
//# sourceMappingURL=Communication.js.map