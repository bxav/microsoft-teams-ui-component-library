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
exports.BoardItem = void 0;
var react_1 = __importStar(require("react"));
var range_1 = __importDefault(require("lodash/range"));
var react_northstar_1 = require("@fluentui/react-northstar");
var keyboard_key_1 = require("@fluentui/keyboard-key");
var react_icons_northstar_1 = require("@fluentui/react-icons-northstar");
var translations_1 = require("../../translations");
var Avatar_1 = __importDefault(require("../../lib/Avatar"));
var setMultiple_1 = __importDefault(require("../../lib/setMultiple"));
var react_bindings_1 = require("@fluentui/react-bindings");
var boardItemBehavior = function (_props) {
    return setMultiple_1.default(react_northstar_1.gridCellWithFocusableElementBehavior(), {
        "focusZone.props": {
            handleTabKey: react_northstar_1.FocusZoneTabbableElements.all,
            isCircularNavigation: true,
            shouldEnterInnerZone: function (event) {
                return keyboard_key_1.getCode(event) === keyboard_key_1.keyboardKey.Enter;
            },
        },
        "keyActions.root.focus.keyCombinations": [{ keyCode: keyboard_key_1.keyboardKey.Escape }],
    });
};
var BoardItemBadges = function (_a) {
    var badges = _a.badges;
    return (react_1.default.createElement(react_northstar_1.Box, null, Object.keys(badges).map(function (badgeKey) {
        switch (badgeKey) {
            case "attachments":
                return (react_1.default.createElement(react_northstar_1.Flex, { styles: {
                        height: "1.75rem",
                        color: "var(--content-color-secondary)",
                    }, hAlign: "center", vAlign: "center", key: "BoardItem__Badge__" + badgeKey },
                    react_1.default.createElement(react_icons_northstar_1.PaperclipIcon, { outline: true }),
                    react_1.default.createElement(react_northstar_1.Text, { size: "small", content: badges[badgeKey], styles: { marginLeft: ".25rem" } })));
        }
    })));
};
var BoardItemUsers = function (_a) {
    var associatedUserKeys = _a.associatedUserKeys, users = _a.users, locale = _a.locale;
    // [v-wishow] todo: replace with AvatarGroup compoment to be released in Fluent UI
    // spec in Figma: https://www.figma.com/file/p5tprlOerFyzQ9YH4aMQBl/Avatar-Group-Fluent-UI?node-id=3%3A123
    return (react_1.default.createElement(react_1.default.Fragment, null, range_1.default(0, Math.min(associatedUserKeys.length, 3))
        .reverse()
        .map(function (i) {
        var userKey = associatedUserKeys[i];
        var user = users[userKey];
        return associatedUserKeys.length > 3 && i === 2 ? (react_1.default.createElement(Avatar_1.default, { key: "BoardItemUserAvatar__overflow", name: "+" + (associatedUserKeys.length - 2), getInitials: function (name) { return name; }, variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    borderColor: colorScheme.default.background,
                });
            }, styles: { marginLeft: "-.375rem", order: i } })) : (react_1.default.createElement(Avatar_1.default, __assign({ key: "BoardItemUserAvatar__" + userKey, name: translations_1.getText(locale, user.name), variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    borderColor: colorScheme.default.background,
                });
            } }, (user.image ? { image: user.image } : {}), { styles: __assign({ order: i }, (i > 0 ? { marginLeft: "-.375rem" } : {})) })));
    })));
};
var BoardItemBody = function (_a) {
    var locale = _a.locale, textObject = _a.textObject;
    return react_1.default.createElement(react_northstar_1.Text, null, translations_1.getText(locale, textObject));
};
var BoardItemPreview = function (_a) {
    var preview = _a.preview;
    return (react_1.default.createElement(react_northstar_1.Box, { styles: {
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "100%",
            height: "6.625rem",
            marginBottom: ".75rem",
        }, style: {
            backgroundImage: "url(" + preview + ")",
        } }));
};
exports.BoardItem = react_1.default.memo(function (props) {
    var isDragging = props.isDragging, draggableProps = props.draggableProps, dragHandleProps = props.dragHandleProps, boardItemCardLayout = props.boardItemCardLayout, t = props.t, item = props.item, users = props.users, editItemDialog = props.editItemDialog;
    var _a = react_1.useState(null), itemNode = _a[0], setItemNode = _a[1];
    var getA11Props = react_bindings_1.useAccessibility(boardItemBehavior, {
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
    return (react_1.default.createElement(react_northstar_1.Ref, { innerRef: setItemNode }, getA11Props.unstable_wrapWithFocusZone(react_1.default.createElement(react_northstar_1.Card, __assign({}, getA11Props("root", __assign(__assign(__assign(__assign(__assign({ elevated: true, variables: function (_a) {
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
        } }, draggableProps), dragHandleProps), { "aria-label": t["board item"] + ", " + translations_1.getText(t.locale, item.title) }), (isDragging ? { "data-isdragging": true } : {})), { tabIndex: -1 }))),
        react_1.default.createElement(react_northstar_1.Box, { styles: {
                borderRadius: "4px",
                overflow: "hidden",
            } },
            item.preview && boardItemCardLayout.previewPosition === "top" && (react_1.default.createElement(BoardItemPreview, { preview: item.preview })),
            react_1.default.createElement(react_northstar_1.Card.Body, __assign({}, (!item.preview ||
                boardItemCardLayout.previewPosition !== "top"
                ? { styles: { marginTop: "1.25rem" } }
                : {})),
                react_1.default.createElement(react_northstar_1.Flex, null,
                    react_1.default.createElement(react_northstar_1.Box, { styles: { flex: "1 0 0" } },
                        react_1.default.createElement(react_northstar_1.Text, { weight: "semibold", as: "h2", styles: { margin: 0, fontSize: "inherit" } }, translations_1.getText(t.locale, item.title)),
                        item.subtitle && (react_1.default.createElement(react_northstar_1.Text, { size: "small", variables: function (_a) {
                                var colorScheme = _a.colorScheme;
                                return ({
                                    color: colorScheme.foreground1,
                                });
                            } }, translations_1.getText(t.locale, item.subtitle)))),
                    react_1.default.createElement(react_northstar_1.Popup, { content: editItemDialog, trigger: react_1.default.createElement(react_northstar_1.Button, { text: true, iconOnly: true, "data-is-focusable": "true", "aria-label": t["board item options"], icon: react_1.default.createElement(react_icons_northstar_1.MoreIcon, { size: "small", outline: true }), styles: { minWidth: "1.25rem", height: "1.25rem" } }), position: "below", accessibility: react_northstar_1.dialogBehavior, autoFocus: true }))),
            item.preview &&
                boardItemCardLayout.previewPosition === "afterHeader" && (react_1.default.createElement(BoardItemPreview, { preview: item.preview })),
            item.body && (react_1.default.createElement(react_northstar_1.Card.Body, null, Array.isArray(item.body) ? (item.body.map(function (bodyItem, bi) { return (react_1.default.createElement(BoardItemBody, { locale: t.locale, textObject: bodyItem, key: "BoardItem__" + item.itemKey + "__" + bi })); })) : (react_1.default.createElement(BoardItemBody, { locale: t.locale, textObject: item.body })))),
            (item.users || item.badges) && (react_1.default.createElement(react_northstar_1.Card.Footer, null,
                react_1.default.createElement(react_northstar_1.Flex, null,
                    react_1.default.createElement(react_northstar_1.Box, { styles: {
                            flex: "1 0 auto",
                            display: "flex",
                        } }, item.users && (react_1.default.createElement(BoardItemUsers, { locale: t.locale, associatedUserKeys: item.users, users: users }))),
                    item.badges && (react_1.default.createElement(BoardItemBadges, { t: t, badges: item.badges }))))),
            react_1.default.createElement("b", { style: {
                    display: "block",
                    marginTop: "1.25rem",
                }, role: "presentation" }))))));
});
//# sourceMappingURL=BoardItem.js.map