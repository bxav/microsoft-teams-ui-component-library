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
import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";
import omit from "lodash/omit";
import uniqueId from "lodash/uniqueId";
import { DragDropContext, } from "react-beautiful-dnd";
import { Box, Button, Dialog, Flex, FocusZoneTabbableElements, MenuItem, ProviderConsumer as FluentUIThemeConsumer, } from "@fluentui/react-northstar";
import { AddIcon, EditIcon, TrashCanIcon, } from "@fluentui/react-icons-northstar";
import { getCode, keyboardKey } from "@fluentui/keyboard-key";
import { BoardTheme } from "./BoardTheme";
import { Toolbar, Communication } from "../..";
import { getText, interpolate } from "../../translations";
import { BoardLane, } from "./BoardLane";
import { BoardItemDialog, BoardItemDialogAction } from "./BoardItemDialog";
import { CommunicationOptions } from "../Communication";
var boardBehavior = function () {
    return ({
        attributes: {
            root: {
                role: "region",
                "aria-label": "Board lanes",
            },
        },
        focusZone: {
            props: {
                shouldEnterInnerZone: function (event) { return getCode(event) === keyboardKey.Enter; },
                handleTabKey: FocusZoneTabbableElements.all,
            },
        },
    });
};
var defaultBoardItemCardLayout = {
    previewPosition: "top",
    overflowPosition: "footer",
};
var prepareBoardItems = function (items, lanes) {
    var unsortedPreparedBoardItems = Object.keys(items).reduce(function (acc, itemKey) {
        var item = items[itemKey];
        item.itemKey = itemKey;
        if (acc.hasOwnProperty(item.lane))
            acc[item.lane].push(item);
        else
            acc[item.lane] = [item];
        return acc;
    }, {});
    return Object.keys(lanes).reduce(function (acc, laneKey) {
        acc[laneKey] = unsortedPreparedBoardItems.hasOwnProperty(laneKey)
            ? unsortedPreparedBoardItems[laneKey].sort(function (a, b) { return a.order - b.order; })
            : [];
        return acc;
    }, {});
};
var resetOrder = function (item, newOrder) {
    item.order = newOrder;
    return item;
};
var getDraggable = function (draggableId) {
    return document.querySelector("[data-rbd-drag-handle-draggable-id='" + draggableId + "']");
};
var getDroppable = function (droppableId) {
    return document.querySelector("[data-rbd-droppable-id='" + droppableId + "']");
};
var getClientYChildren = function ($parent, draggableId, endIndex) {
    return Array.from($parent.children)
        .filter(function ($child) {
        var childDraggableId = $child.getAttribute("data-rbd-draggable-id");
        return (typeof childDraggableId === "string" && childDraggableId !== draggableId);
    })
        .slice(0, endIndex);
};
var getPlaceholderPosition = function ($draggable, clientYChildren) {
    if (!$draggable || !$draggable.parentNode)
        return null;
    var clientHeight = $draggable.clientHeight, clientWidth = $draggable.clientWidth;
    var clientY = clientYChildren.reduce(function (acc, $child) {
        return acc + $child.clientHeight + 8;
    }, 2);
    var clientX = 20;
    return [clientX, clientY, clientWidth, clientHeight];
};
var BoardStandalone = function (props) {
    var users = props.users, arrangedLanes = props.arrangedLanes, setArrangedLanes = props.setArrangedLanes, arrangedItems = props.arrangedItems, setArrangedItems = props.setArrangedItems, addingLane = props.addingLane, setAddingLane = props.setAddingLane, t = props.t, rtl = props.rtl;
    var _a = useState(null), placeholderPosition = _a[0], setPlaceholderPosition = _a[1];
    var onDragStart = function (event, provided) {
        var laneKey = event.source.droppableId;
        var itemKey = event.draggableId;
        var boardLane = arrangedLanes[laneKey];
        var boardItem = arrangedItems[laneKey].find(function (boardItem) { return boardItem.itemKey === itemKey; });
        var announcement = interpolate(t["on drag start board item"], [
            {
                itemTitle: getText(t.locale, boardItem.title),
                itemPosition: arrangedItems[laneKey].indexOf(boardItem) + 1,
                laneLength: arrangedItems[laneKey].length,
                laneTitle: getText(t.locale, boardLane.title),
            },
        ]);
        provided.announce(announcement);
        var $draggable = getDraggable(event.draggableId);
        if (!$draggable || !$draggable.parentNode)
            return;
        setPlaceholderPosition(getPlaceholderPosition($draggable, getClientYChildren($draggable.parentNode, event.draggableId, event.source.index)));
    };
    var onDragUpdate = function (event, provided) {
        if (!event.destination)
            return;
        var $draggable = getDraggable(event.draggableId);
        var $droppable = getDroppable(event.destination.droppableId);
        if (!$draggable || !$droppable)
            return;
        var destinationLaneKey = event.destination.droppableId;
        var itemKey = event.draggableId;
        var boardLane = arrangedLanes[destinationLaneKey];
        var boardItem = arrangedItems[event.source.droppableId].find(function (boardItem) { return boardItem.itemKey === itemKey; });
        var announcement = interpolate(t[destinationLaneKey === event.source.droppableId
            ? "on drag update board item same lane"
            : "on drag update board item different lane"], [
            {
                itemTitle: getText(t.locale, boardItem.title),
                itemPosition: event.destination.index + 1,
                laneLength: arrangedItems[destinationLaneKey].length,
                laneTitle: getText(t.locale, boardLane.title),
            },
        ]);
        provided.announce(announcement);
        setPlaceholderPosition(getPlaceholderPosition($draggable, getClientYChildren($droppable, event.draggableId, event.destination.index)));
    };
    var onDragEnd = function (_a, provided) {
        var draggableId = _a.draggableId, reason = _a.reason, source = _a.source, destination = _a.destination;
        var announcement;
        var boardItem = arrangedItems[source.droppableId].find(function (boardItem) { return boardItem.itemKey === draggableId; });
        if (destination) {
            var laneKey = destination.droppableId;
            var boardLane = laneKey && arrangedLanes[laneKey];
            announcement = interpolate(t["on drag end board item"], [
                {
                    itemTitle: getText(t.locale, boardItem.title),
                    itemPosition: Math.max(1, destination.index + 1),
                    laneLength: arrangedItems[laneKey].length,
                    laneTitle: getText(t.locale, boardLane.title),
                },
            ]);
        }
        else {
            announcement = interpolate(t["on drag cancel board item"], [
                {
                    itemTitle: getText(t.locale, boardItem.title),
                },
            ]);
        }
        provided.announce(announcement);
        if (destination) {
            var sourceLaneKey = source.droppableId;
            var destinationLaneKey = destination.droppableId;
            var movingItems = arrangedItems[sourceLaneKey].splice(source.index, 1);
            arrangedItems[sourceLaneKey].map(resetOrder);
            arrangedItems[destinationLaneKey].splice(destination.index, 0, movingItems[0]);
            arrangedItems[destinationLaneKey].map(resetOrder);
            setPlaceholderPosition(null);
            return setArrangedItems(cloneDeep(arrangedItems));
        }
    };
    var moveLane = function (laneKey, delta) {
        var laneKeys = Object.keys(arrangedLanes);
        var from = laneKeys.indexOf(laneKey);
        laneKeys.splice(from + delta, 0, laneKeys.splice(from, 1)[0]);
        setArrangedLanes(laneKeys.reduce(function (nextArrangedLanes, currentLaneKey) {
            nextArrangedLanes[currentLaneKey] = arrangedLanes[currentLaneKey];
            return nextArrangedLanes;
        }, {}));
    };
    var deleteLane = function (laneKey) {
        setArrangedLanes(omit(arrangedLanes, [laneKey]));
    };
    return (React.createElement(DragDropContext, __assign({}, { onDragStart: onDragStart, onDragUpdate: onDragUpdate, onDragEnd: onDragEnd }),
        React.createElement(Box, { styles: {
                overflowX: "auto",
                flexGrow: 1,
            } },
            React.createElement(Box, { styles: { height: "100%", display: "flex" }, accessibility: boardBehavior },
                Object.keys(arrangedLanes).map(function (laneKey, laneIndex, laneKeys) {
                    var last = laneIndex === laneKeys.length - 1;
                    return (React.createElement(BoardLane, { first: laneIndex === 0, last: addingLane ? false : last, laneKey: laneKey, lane: arrangedLanes[laneKey], addItemDialog: React.createElement(BoardItemDialog, __assign({ action: BoardItemDialogAction.Create, trigger: React.createElement(Button, { icon: React.createElement(AddIcon, { outline: true }), iconOnly: true, fluid: true, title: t["add board item"], "aria-label": t["add board item"] }), initialState: { lane: laneKey } }, {
                            arrangedLanes: arrangedLanes,
                            users: users,
                            t: t,
                            setArrangedItems: setArrangedItems,
                            arrangedItems: arrangedItems,
                        })), editItemDialog: function (boardItem) { return (React.createElement(React.Fragment, null,
                            React.createElement(BoardItemDialog, __assign({ action: BoardItemDialogAction.Edit, trigger: React.createElement(MenuItem, { vertical: true, icon: React.createElement(EditIcon, { outline: true, size: "small" }), content: t["edit board item"] }), initialState: boardItem }, {
                                arrangedLanes: arrangedLanes,
                                users: users,
                                t: t,
                                setArrangedItems: setArrangedItems,
                                arrangedItems: arrangedItems,
                            })),
                            React.createElement(Dialog, { trigger: React.createElement(MenuItem, { vertical: true, icon: React.createElement(TrashCanIcon, { outline: true, size: "small" }), content: t["delete"] }), content: getText(t.locale, t["confirm delete"], {
                                    title: getText(t.locale, boardItem.title),
                                }), confirmButton: { content: t["delete"] }, cancelButton: { content: t["cancel"] }, onConfirm: function () {
                                    var pos = arrangedItems[boardItem.lane].findIndex(function (laneItem) {
                                        return laneItem.itemKey ===
                                            boardItem.itemKey;
                                    });
                                    arrangedItems[boardItem.lane].splice(pos, 1);
                                    setArrangedItems(cloneDeep(arrangedItems));
                                } }))); }, key: "BoardLane__" + laneKey, preparedItems: arrangedItems[laneKey], users: users, t: t, rtl: rtl, boardItemCardLayout: props.boardItemCardLayout || defaultBoardItemCardLayout, placeholderPosition: placeholderPosition, moveLane: moveLane, deleteLane: deleteLane }));
                }),
                addingLane && (React.createElement(BoardLane, { last: true, pending: true, laneKey: uniqueId("pl"), key: "BoardLane__pending_lane", preparedItems: [], users: users, t: t, rtl: rtl, boardItemCardLayout: props.boardItemCardLayout || defaultBoardItemCardLayout, placeholderPosition: null, exitPendingLane: function (value) {
                        var _a, _b;
                        if (value.length > 0) {
                            var newLaneKey = uniqueId("sl");
                            setArrangedLanes(Object.assign(arrangedLanes, (_a = {},
                                _a[newLaneKey] = { title: value },
                                _a)));
                            setArrangedItems(Object.assign(arrangedItems, (_b = {}, _b[newLaneKey] = [], _b)));
                        }
                        setAddingLane(false);
                    } }))))));
};
/**
 * @public
 */
export var Board = function (props) {
    var _a = useState(props.lanes), arrangedLanes = _a[0], setStateArrangedLanes = _a[1];
    var _b = useState(prepareBoardItems(props.items, props.lanes)), arrangedItems = _b[0], setStateArrangedItems = _b[1];
    var _c = useState(false), addingLane = _c[0], setAddingLane = _c[1];
    var setArrangedLanes = function (lanes) {
        if (props.onInteraction)
            props.onInteraction({ event: "update", target: "lanes", lanes: lanes });
        return setStateArrangedLanes(lanes);
    };
    var setArrangedItems = function (items) {
        if (props.onInteraction)
            props.onInteraction({ event: "update", target: "items", items: items });
        return setStateArrangedItems(items);
    };
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            var _a = globalTheme.siteVariables, t = _a.t, rtl = _a.rtl;
            return (React.createElement(BoardTheme, { globalTheme: globalTheme, style: {
                    display: "flex",
                    flexDirection: "column",
                    height: "calc(100vh - 1.25rem)",
                } },
                React.createElement(Flex, { column: true, variables: function (_a) {
                        var colorScheme = _a.colorScheme;
                        return ({
                            backgroundColor: colorScheme.default.background2,
                        });
                    }, styles: {
                        height: "100%",
                    } },
                    React.createElement(Toolbar, { actionGroups: {
                            g1: {
                                a1: {
                                    icon: "Add",
                                    title: t["add lane"],
                                    subject: "add_column",
                                },
                            },
                        }, onInteraction: function (_a) {
                            var subject = _a.subject;
                            if (subject === "add_column")
                                setAddingLane(true);
                        } }),
                    Object.keys(arrangedLanes).length > 0 || addingLane ? (React.createElement(BoardStandalone, __assign({}, {
                        t: t,
                        rtl: rtl,
                        arrangedLanes: arrangedLanes,
                        arrangedItems: arrangedItems,
                        setArrangedItems: setArrangedItems,
                        addingLane: addingLane,
                        setAddingLane: setAddingLane,
                        setArrangedLanes: setArrangedLanes,
                    }, pick(props, ["users", "boardItemCardLayout"])))) : (React.createElement(Communication, __assign({}, (props.emptyState || {
                        option: CommunicationOptions.Empty,
                        fields: {
                            title: getText(t.locale, t["board empty header"]),
                            desc: getText(t.locale, t["board empty body"]),
                        },
                    })))))));
        } }));
};
//# sourceMappingURL=Board.js.map