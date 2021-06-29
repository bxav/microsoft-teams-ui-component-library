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
import CustomScrollArea from "react-perfect-scrollbar";
import { AutoFocusZone, Box, Button, Flex, FocusZoneTabbableElements, Input, MenuButton, Ref, Text, gridRowNestedBehavior, } from "@fluentui/react-northstar";
import { ArrowLeftIcon, ArrowRightIcon, MoreIcon, TrashCanIcon, } from "@fluentui/react-icons-northstar";
import { useAccessibility } from "@fluentui/react-bindings";
import { getCode, keyboardKey } from "@fluentui/keyboard-key";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getText } from "../../translations";
import { BoardItem, } from "./BoardItem";
import setMultiple from "../../lib/setMultiple";
var boardLaneBehavior = function (props) {
    return setMultiple(gridRowNestedBehavior(props), {
        "focusZone.props": {
            handleTabKey: FocusZoneTabbableElements.all,
            isCircularNavigation: true,
            shouldEnterInnerZone: function (event) {
                return getCode(event) === keyboardKey.Enter;
            },
        },
        "attributes.root": {
            role: "group",
            "data-is-focusable": true,
            tabIndex: -1,
        },
        "keyActions.root.focus.keyCombinations": [{ keyCode: keyboardKey.Escape }],
        "keyActions.root.ignore.keyCombinations": [
            { keyCode: keyboardKey.ArrowRight },
            { keyCode: keyboardKey.ArrowDown },
            { keyCode: keyboardKey.ArrowLeft },
            { keyCode: keyboardKey.ArrowUp },
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
    return position && (React.createElement(Box, { variables: function (_a) {
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
export var BoardLane = function (props) {
    var users = props.users, lane = props.lane, preparedItems = props.preparedItems, t = props.t, rtl = props.rtl, laneKey = props.laneKey, last = props.last, first = props.first, addItemDialog = props.addItemDialog, editItemDialog = props.editItemDialog, boardItemCardLayout = props.boardItemCardLayout, placeholderPosition = props.placeholderPosition, exitPendingLane = props.exitPendingLane, deleteLane = props.deleteLane, moveLane = props.moveLane;
    var _a = useState(null), laneNode = _a[0], setLaneNode = _a[1];
    var getA11Props = useAccessibility(boardLaneBehavior, {
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
    return (React.createElement(Ref, { innerRef: setLaneNode }, getA11Props.unstable_wrapWithFocusZone(React.createElement(Box, __assign({}, getA11Props("root", {
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
        "aria-label": (lane ? getText(t.locale, lane.title) : t["lane pending"]) + ", " + t["board lane instructions"],
    })),
        props.pending ? (React.createElement(AutoFocusZone, null,
            React.createElement(Input, { placeholder: t["name lane"], onBlur: function (e) {
                    exitPendingLane(e.target.value);
                }, onKeyDown: function (e) {
                    switch (e.key) {
                        case "Escape":
                            return exitPendingLane("");
                        case "Enter":
                            return exitPendingLane(e.target.value);
                    }
                }, fluid: true, styles: { padding: ".05rem 1.25rem .25rem 1.25rem" } }))) : (React.createElement(Flex, null,
            React.createElement(Text, { weight: "bold", content: getText(t.locale, lane.title), style: {
                    flex: "1 0 auto",
                    padding: ".375rem 1.25rem .75rem 1.25rem",
                    fontSize: "inherit",
                    margin: "inherit",
                }, as: "h1" }),
            React.createElement(MenuButton, { trigger: React.createElement(Button, { text: true, iconOnly: true, icon: React.createElement(MoreIcon, { outline: true }), styles: { marginRight: "1.25rem" }, "aria-label": t["lane options"] }), menu: [
                    {
                        content: t["move lane nearer"],
                        icon: rtl ? (React.createElement(ArrowRightIcon, { outline: true })) : (React.createElement(ArrowLeftIcon, { outline: true })),
                        disabled: first,
                        onClick: function () {
                            moveLane && moveLane(laneKey, -1);
                        },
                    },
                    {
                        content: t["move lane further"],
                        icon: rtl ? (React.createElement(ArrowLeftIcon, { outline: true })) : (React.createElement(ArrowRightIcon, { outline: true })),
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
                        icon: React.createElement(TrashCanIcon, { outline: true }),
                        disabled: preparedItems === null || preparedItems === void 0 ? void 0 : preparedItems.length,
                        onClick: function () {
                            deleteLane && deleteLane(laneKey);
                        },
                    },
                ] }))),
        React.createElement(Box, { variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    backgroundColor: colorScheme.default.background2,
                    separatorColor: colorScheme.default.border2,
                });
            }, styles: __assign({ flex: "0 0 auto", padding: "0 1.25rem .75rem 1.25rem" }, (last ? {} : separatorStyles)) }, addItemDialog),
        React.createElement(Box, { variables: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    separatorColor: colorScheme.default.border2,
                });
            }, styles: __assign({ flex: "1 0 0", overflow: "hidden" }, (last ? {} : separatorStyles)) },
            React.createElement(Droppable, { droppableId: laneKey }, function (provided, snapshot) { return (React.createElement(CustomScrollArea, __assign({ style: { position: "relative" }, containerRef: function (container) {
                    provided.innerRef(container);
                } }, provided.droppableProps),
                (preparedItems === null || preparedItems === void 0 ? void 0 : preparedItems.length) ? preparedItems.map(function (item) { return (React.createElement(Draggable, { draggableId: item.itemKey, key: "Board__DraggableItem__" + item.itemKey, index: item.order }, function (provided, snapshot) { return (React.createElement(Ref, { innerRef: provided.innerRef },
                    React.createElement(BoardItem, __assign({ isDragging: snapshot.isDragging, draggableProps: provided.draggableProps, dragHandleProps: provided.dragHandleProps }, {
                        item: item,
                        users: users,
                        t: t,
                        boardItemCardLayout: boardItemCardLayout,
                    }, (editItemDialog && {
                        editItemDialog: editItemDialog(item),
                    }))))); })); })
                    : null,
                provided.placeholder,
                snapshot.isDraggingOver && (React.createElement(Placeholder, { position: placeholderPosition })))); }))))));
};
//# sourceMappingURL=BoardLane.js.map