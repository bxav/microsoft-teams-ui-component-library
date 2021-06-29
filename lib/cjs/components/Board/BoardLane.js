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
exports.BoardLane = void 0;
var react_1 = __importStar(require("react"));
var react_perfect_scrollbar_1 = __importDefault(require("react-perfect-scrollbar"));
var react_northstar_1 = require("@fluentui/react-northstar");
var react_icons_northstar_1 = require("@fluentui/react-icons-northstar");
var react_bindings_1 = require("@fluentui/react-bindings");
var keyboard_key_1 = require("@fluentui/keyboard-key");
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var translations_1 = require("../../translations");
var BoardItem_1 = require("./BoardItem");
var setMultiple_1 = __importDefault(require("../../lib/setMultiple"));
var boardLaneBehavior = function (props) {
    return setMultiple_1.default(react_northstar_1.gridRowNestedBehavior(props), {
        "focusZone.props": {
            handleTabKey: react_northstar_1.FocusZoneTabbableElements.all,
            isCircularNavigation: true,
            shouldEnterInnerZone: function (event) {
                return keyboard_key_1.getCode(event) === keyboard_key_1.keyboardKey.Enter;
            },
        },
        "attributes.root": {
            role: "group",
            "data-is-focusable": true,
            tabIndex: -1,
        },
        "keyActions.root.focus.keyCombinations": [{ keyCode: keyboard_key_1.keyboardKey.Escape }],
        "keyActions.root.ignore.keyCombinations": [
            { keyCode: keyboard_key_1.keyboardKey.ArrowRight },
            { keyCode: keyboard_key_1.keyboardKey.ArrowDown },
            { keyCode: keyboard_key_1.keyboardKey.ArrowLeft },
            { keyCode: keyboard_key_1.keyboardKey.ArrowUp },
        ],
    });
};
var separatorStyles = {
    position: "relative",
    "&::after": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        width: "1px",
    },
};
var Placeholder = function (_a) {
    var position = _a.position;
    return position && (react_1.default.createElement(react_northstar_1.Box, { variables: function (_a) {
            var colorScheme = _a.colorScheme;
            return ({
                backgroundColor: colorScheme.brand.background1,
                borderColor: colorScheme.brand.foreground3,
            });
        }, styles: {
            left: position[0] + "px",
            top: position[1] + "px",
            width: position[2] + "px",
            height: position[3] + "px",
            position: "absolute",
            borderRadius: "4px",
            borderWidth: "1px",
            zIndex: 0,
        } }));
};
var laneFocusBorderStyles = {
    content: '""',
    display: "block",
    position: "absolute",
    borderStyle: "solid",
    borderWidth: 0,
    top: 0,
    bottom: 0,
    left: "1px",
    right: "2px",
    borderRadius: "4px",
    pointerEvents: "none",
};
exports.BoardLane = function (props) {
    var users = props.users, lane = props.lane, preparedItems = props.preparedItems, t = props.t, rtl = props.rtl, laneKey = props.laneKey, last = props.last, first = props.first, addItemDialog = props.addItemDialog, editItemDialog = props.editItemDialog, boardItemCardLayout = props.boardItemCardLayout, placeholderPosition = props.placeholderPosition, exitPendingLane = props.exitPendingLane, deleteLane = props.deleteLane, moveLane = props.moveLane;
    var _a = react_1.useState(null), laneNode = _a[0], setLaneNode = _a[1];
    var getA11Props = react_bindings_1.useAccessibility(boardLaneBehavior, {
        actionHandlers: {
            preventDefault: function (event) {
                // preventDefault only if event coming from inside the lane
                if (event.currentTarget !== event.target) {
                    event.preventDefault();
                }
            },
            focus: function (event) {
                if (laneNode && event.target !== event.currentTarget) {
                    laneNode.focus();
                    event.stopPropagation();
                }
            },
            ignore: function (event) {
                event.preventDefault();
                event.stopPropagation();
            },
        },
    });
    return (react_1.default.createElement(react_northstar_1.Ref, { innerRef: setLaneNode }, getA11Props.unstable_wrapWithFocusZone(react_1.default.createElement(react_northstar_1.Box, __assign({}, getA11Props("root", {
        className: "board__lane",
        styles: {
            display: "flex",
            flexFlow: "column nowrap",
            minWidth: "15rem",
            maxWidth: "22.5rem",
            borderRight: "1px solid transparent",
            flex: "1 0 0",
            position: "relative",
            ":focus": { outline: "none" },
            "&::before": laneFocusBorderStyles,
            "&::after": laneFocusBorderStyles,
        },
        variables: function (_a) {
            var colorScheme = _a.colorScheme;
            return ({
                borderFocus: colorScheme.default.borderFocus,
                borderFocusWithin: colorScheme.default.borderFocusWithin,
            });
        },
        "aria-label": (lane ? translations_1.getText(t.locale, lane.title) : t["lane pending"]) + ", " + t["board lane instructions"],
    })),
        props.pending ? (react_1.default.createElement(react_northstar_1.AutoFocusZone, null,
            react_1.default.createElement(react_northstar_1.Input, { placeholder: t["name lane"], onBlur: function (e) {
                    exitPendingLane(e.target.value);
                }, onKeyDown: function (e) {
                    switch (e.key) {
                        case "Escape":
                            return exitPendingLane("");
                        case "Enter":
                            return exitPendingLane(e.target.value);
                    }
                }, fluid: true, styles: { padding: ".05rem 1.25rem .25rem 1.25rem" } }))) : (react_1.default.createElement(react_northstar_1.Flex, null,
            react_1.default.createElement(react_northstar_1.Text, { weight: "bold", content: translations_1.getText(t.locale, lane.title), style: {
                    flex: "1 0 auto",
                    padding: ".375rem 1.25rem .75rem 1.25rem",
                    fontSize: "inherit",
                    margin: "inherit",
                }, as: "h1" }),
            react_1.default.createElement(react_northstar_1.MenuButton, { trigger: react_1.default.createElement(react_northstar_1.Button, { text: true, iconOnly: true, icon: react_1.default.createElement(react_icons_northstar_1.MoreIcon, { outline: true }), styles: { marginRight: "1.25rem" }, "aria-label": t["lane options"] }), menu: [
                    {
                        content: t["move lane nearer"],
                        icon: rtl ? (react_1.default.createElement(react_icons_northstar_1.ArrowRightIcon, { outline: true })) : (react_1.default.createElement(react_icons_northstar_1.ArrowLeftIcon, { outline: true })),
                        disabled: first,
                        onClick: function () {
                            moveLane && moveLane(laneKey, -1);
                        },
                    },
                    {
                        content: t["move lane further"],
                        icon: rtl ? (react_1.default.createElement(react_icons_northstar_1.ArrowLeftIcon, { outline: true })) : (react_1.default.createElement(react_icons_northstar_1.ArrowRightIcon, { outline: true })),
                        disabled: last,
                        onClick: function () {
                            moveLane && moveLane(laneKey, 1);
                        },
                    },
                    {
                        kind: "divider",
                    },
                    {
                        content: t["delete"],
                        icon: react_1.default.createElement(react_icons_northstar_1.TrashCanIcon, { outline: true }),
                        disabled: preparedItems === null || preparedItems === void 0 ? void 0 : preparedItems.length,
                        onClick: function () {
                            deleteLane && deleteLane(laneKey);
                        },
                    },
                ] }))),
        react_1.default.createElement(react_northstar_1.Box, { variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    backgroundColor: colorScheme.default.background2,
                    separatorColor: colorScheme.default.border2,
                });
            }, styles: __assign({ flex: "0 0 auto", padding: "0 1.25rem .75rem 1.25rem" }, (last ? {} : separatorStyles)) }, addItemDialog),
        react_1.default.createElement(react_northstar_1.Box, { variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    separatorColor: colorScheme.default.border2,
                });
            }, styles: __assign({ flex: "1 0 0", overflow: "hidden" }, (last ? {} : separatorStyles)) },
            react_1.default.createElement(react_beautiful_dnd_1.Droppable, { droppableId: laneKey }, function (provided, snapshot) { return (react_1.default.createElement(react_perfect_scrollbar_1.default, __assign({ style: { position: "relative" }, containerRef: function (container) {
                    provided.innerRef(container);
                } }, provided.droppableProps),
                (preparedItems === null || preparedItems === void 0 ? void 0 : preparedItems.length) ? preparedItems.map(function (item) { return (react_1.default.createElement(react_beautiful_dnd_1.Draggable, { draggableId: item.itemKey, key: "Board__DraggableItem__" + item.itemKey, index: item.order }, function (provided, snapshot) { return (react_1.default.createElement(react_northstar_1.Ref, { innerRef: provided.innerRef },
                    react_1.default.createElement(BoardItem_1.BoardItem, __assign({ isDragging: snapshot.isDragging, draggableProps: provided.draggableProps, dragHandleProps: provided.dragHandleProps }, {
                        item: item,
                        users: users,
                        t: t,
                        boardItemCardLayout: boardItemCardLayout,
                    }, (editItemDialog && {
                        editItemDialog: editItemDialog(item),
                    }))))); })); })
                    : null,
                provided.placeholder,
                snapshot.isDraggingOver && (react_1.default.createElement(Placeholder, { position: placeholderPosition })))); }))))));
};
//# sourceMappingURL=BoardLane.js.map