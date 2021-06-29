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
import React, { useState } from "react";
import range from "lodash/range";
import { Box, Button, Card, Flex, FocusZoneTabbableElements, Popup, Ref, Text, dialogBehavior, gridCellWithFocusableElementBehavior, } from "@fluentui/react-northstar";
import { getCode, keyboardKey } from "@fluentui/keyboard-key";
import { MoreIcon, PaperclipIcon } from "@fluentui/react-icons-northstar";
import { getText, } from "../../translations";
import Avatar from "../../lib/Avatar";
import setMultiple from "../../lib/setMultiple";
import { useAccessibility } from "@fluentui/react-bindings";
var boardItemBehavior = function (_props) {
    return setMultiple(gridCellWithFocusableElementBehavior(), {
        "focusZone.props": {
            handleTabKey: FocusZoneTabbableElements.all,
            isCircularNavigation: true,
            shouldEnterInnerZone: function (event) {
                return getCode(event) === keyboardKey.Enter;
            },
        },
        "keyActions.root.focus.keyCombinations": [{ keyCode: keyboardKey.Escape }],
    });
};
var BoardItemBadges = function (_a) {
    var badges = _a.badges;
    return (React.createElement(Box, null, Object.keys(badges).map(function (badgeKey) {
        switch (badgeKey) {
            case "attachments":
                return (React.createElement(Flex, { styles: {
                        height: "1.75rem",
                        color: "var(--content-color-secondary)",
                    }, hAlign: "center", vAlign: "center", key: "BoardItem__Badge__" + badgeKey },
                    React.createElement(PaperclipIcon, { outline: true }),
                    React.createElement(Text, { size: "small", content: badges[badgeKey], styles: { marginLeft: ".25rem" } })));
        }
    })));
};
var BoardItemUsers = function (_a) {
    var associatedUserKeys = _a.associatedUserKeys, users = _a.users, locale = _a.locale;
    // [v-wishow] todo: replace with AvatarGroup compoment to be released in Fluent UI
    // spec in Figma: https://www.figma.com/file/p5tprlOerFyzQ9YH4aMQBl/Avatar-Group-Fluent-UI?node-id=3%3A123
    return (React.createElement(React.Fragment, null, range(0, Math.min(associatedUserKeys.length, 3))
        .reverse()
        .map(function (i) {
        var userKey = associatedUserKeys[i];
        var user = users[userKey];
        return associatedUserKeys.length > 3 && i === 2 ? (React.createElement(Avatar, { key: "BoardItemUserAvatar__overflow", name: "+" + (associatedUserKeys.length - 2), getInitials: function (name) { return name; }, variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    borderColor: colorScheme.default.background,
                });
            }, styles: { marginLeft: "-.375rem", order: i } })) : (React.createElement(Avatar, __assign({ key: "BoardItemUserAvatar__" + userKey, name: getText(locale, user.name), variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    borderColor: colorScheme.default.background,
                });
            } }, (user.image ? { image: user.image } : {}), { styles: __assign({ order: i }, (i > 0 ? { marginLeft: "-.375rem" } : {})) })));
    })));
};
var BoardItemBody = function (_a) {
    var locale = _a.locale, textObject = _a.textObject;
    return React.createElement(Text, null, getText(locale, textObject));
};
var BoardItemPreview = function (_a) {
    var preview = _a.preview;
    return (React.createElement(Box, { styles: {
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "100%",
            height: "6.625rem",
            marginBottom: ".75rem",
        }, style: {
            backgroundImage: "url(" + preview + ")",
        } }));
};
export var BoardItem = React.memo(function (props) {
    var isDragging = props.isDragging, draggableProps = props.draggableProps, dragHandleProps = props.dragHandleProps, boardItemCardLayout = props.boardItemCardLayout, t = props.t, item = props.item, users = props.users, editItemDialog = props.editItemDialog;
    var _a = useState(null), itemNode = _a[0], setItemNode = _a[1];
    var getA11Props = useAccessibility(boardItemBehavior, {
        actionHandlers: {
            preventDefault: function (event) {
                // preventDefault only if event coming from inside the lane
                if (event.currentTarget !== event.target) {
                    event.preventDefault();
                }
            },
            focus: function (event) {
                if (itemNode && event.target !== event.currentTarget) {
                    itemNode.focus();
                    event.stopPropagation();
                }
            },
        },
    });
    return (React.createElement(Ref, { innerRef: setItemNode }, getA11Props.unstable_wrapWithFocusZone(React.createElement(Card, __assign({}, getA11Props("root", __assign(__assign(__assign(__assign(__assign({ elevated: true, variables: function (_a) {
            var colorScheme = _a.colorScheme;
            return ({
                elevation: isDragging
                    ? colorScheme.elevations[8]
                    : colorScheme.elevations[4],
                hoverElevation: colorScheme.elevations[8],
                backgroundColor: colorScheme.default.background,
                borderColor: isDragging
                    ? colorScheme.default.borderHover
                    : colorScheme.default.border,
            });
        }, styles: {
            position: "relative",
            zIndex: 1,
            margin: "0 1.25rem .5rem 1.25rem",
            width: "auto",
            height: "auto",
        } }, draggableProps), dragHandleProps), { "aria-label": t["board item"] + ", " + getText(t.locale, item.title) }), (isDragging ? { "data-isdragging": true } : {})), { tabIndex: -1 }))),
        React.createElement(Box, { styles: {
                borderRadius: "4px",
                overflow: "hidden",
            } },
            item.preview && boardItemCardLayout.previewPosition === "top" && (React.createElement(BoardItemPreview, { preview: item.preview })),
            React.createElement(Card.Body, __assign({}, (!item.preview ||
                boardItemCardLayout.previewPosition !== "top"
                ? { styles: { marginTop: "1.25rem" } }
                : {})),
                React.createElement(Flex, null,
                    React.createElement(Box, { styles: { flex: "1 0 0" } },
                        React.createElement(Text, { weight: "semibold", as: "h2", styles: { margin: 0, fontSize: "inherit" } }, getText(t.locale, item.title)),
                        item.subtitle && (React.createElement(Text, { size: "small", variables: function (_a) {
                                var colorScheme = _a.colorScheme;
                                return ({
                                    color: colorScheme.foreground1,
                                });
                            } }, getText(t.locale, item.subtitle)))),
                    React.createElement(Popup, { content: editItemDialog, trigger: React.createElement(Button, { text: true, iconOnly: true, "data-is-focusable": "true", "aria-label": t["board item options"], icon: React.createElement(MoreIcon, { size: "small", outline: true }), styles: { minWidth: "1.25rem", height: "1.25rem" } }), position: "below", accessibility: dialogBehavior, autoFocus: true }))),
            item.preview &&
                boardItemCardLayout.previewPosition === "afterHeader" && (React.createElement(BoardItemPreview, { preview: item.preview })),
            item.body && (React.createElement(Card.Body, null, Array.isArray(item.body) ? (item.body.map(function (bodyItem, bi) { return (React.createElement(BoardItemBody, { locale: t.locale, textObject: bodyItem, key: "BoardItem__" + item.itemKey + "__" + bi })); })) : (React.createElement(BoardItemBody, { locale: t.locale, textObject: item.body })))),
            (item.users || item.badges) && (React.createElement(Card.Footer, null,
                React.createElement(Flex, null,
                    React.createElement(Box, { styles: {
                            flex: "1 0 auto",
                            display: "flex",
                        } }, item.users && (React.createElement(BoardItemUsers, { locale: t.locale, associatedUserKeys: item.users, users: users }))),
                    item.badges && (React.createElement(BoardItemBadges, { t: t, badges: item.badges }))))),
            React.createElement("b", { style: {
                    display: "block",
                    marginTop: "1.25rem",
                }, role: "presentation" }))))));
});
//# sourceMappingURL=BoardItem.js.map