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
exports.Board = void 0;
var react_1 = __importStar(require("react"));
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var pick_1 = __importDefault(require("lodash/pick"));
var omit_1 = __importDefault(require("lodash/omit"));
var uniqueId_1 = __importDefault(require("lodash/uniqueId"));
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var react_northstar_1 = require("@fluentui/react-northstar");
var react_icons_northstar_1 = require("@fluentui/react-icons-northstar");
var keyboard_key_1 = require("@fluentui/keyboard-key");
var BoardTheme_1 = require("./BoardTheme");
var __1 = require("../..");
var translations_1 = require("../../translations");
var BoardLane_1 = require("./BoardLane");
var BoardItemDialog_1 = require("./BoardItemDialog");
var Communication_1 = require("../Communication");
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
                shouldEnterInnerZone: function (event) { return keyboard_key_1.getCode(event) === keyboard_key_1.keyboardKey.Enter; },
                handleTabKey: react_northstar_1.FocusZoneTabbableElements.all,
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
    var _a = react_1.useState(null), placeholderPosition = _a[0], setPlaceholderPosition = _a[1];
    var onDragStart = function (event, provided) {
        var laneKey = event.source.droppableId;
        var itemKey = event.draggableId;
        var boardLane = arrangedLanes[laneKey];
        var boardItem = arrangedItems[laneKey].find(function (boardItem) { return boardItem.itemKey === itemKey; });
        var announcement = translations_1.interpolate(t["on drag start board item"], [
            {
                itemTitle: translations_1.getText(t.locale, boardItem.title),
                itemPosition: arrangedItems[laneKey].indexOf(boardItem) + 1,
                laneLength: arrangedItems[laneKey].length,
                laneTitle: translations_1.getText(t.locale, boardLane.title),
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
        var announcement = translations_1.interpolate(t[destinationLaneKey === event.source.droppableId
            ? "on drag update board item same lane"
            : "on drag update board item different lane"], [
            {
                itemTitle: translations_1.getText(t.locale, boardItem.title),
                itemPosition: event.destination.index + 1,
                laneLength: arrangedItems[destinationLaneKey].length,
                laneTitle: translations_1.getText(t.locale, boardLane.title),
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
            announcement = translations_1.interpolate(t["on drag end board item"], [
                {
                    itemTitle: translations_1.getText(t.locale, boardItem.title),
                    itemPosition: Math.max(1, destination.index + 1),
                    laneLength: arrangedItems[laneKey].length,
                    laneTitle: translations_1.getText(t.locale, boardLane.title),
                },
            ]);
        }
        else {
            announcement = translations_1.interpolate(t["on drag cancel board item"], [
                {
                    itemTitle: translations_1.getText(t.locale, boardItem.title),
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
            return setArrangedItems(cloneDeep_1.default(arrangedItems));
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
        setArrangedLanes(omit_1.default(arrangedLanes, [laneKey]));
    };
    return (react_1.default.createElement(react_beautiful_dnd_1.DragDropContext, __assign({}, { onDragStart: onDragStart, onDragUpdate: onDragUpdate, onDragEnd: onDragEnd }),
        react_1.default.createElement(react_northstar_1.Box, { styles: {
                overflowX: "auto",
                flexGrow: 1,
            } },
            react_1.default.createElement(react_northstar_1.Box, { styles: { height: "100%", display: "flex" }, accessibility: boardBehavior },
                Object.keys(arrangedLanes).map(function (laneKey, laneIndex, laneKeys) {
                    var last = laneIndex === laneKeys.length - 1;
                    return (react_1.default.createElement(BoardLane_1.BoardLane, { first: laneIndex === 0, last: addingLane ? false : last, laneKey: laneKey, lane: arrangedLanes[laneKey], addItemDialog: react_1.default.createElement(BoardItemDialog_1.BoardItemDialog, __assign({ action: BoardItemDialog_1.BoardItemDialogAction.Create, trigger: react_1.default.createElement(react_northstar_1.Button, { icon: react_1.default.createElement(react_icons_northstar_1.AddIcon, { outline: true }), iconOnly: true, fluid: true, title: t["add board item"], "aria-label": t["add board item"] }), initialState: { lane: laneKey } }, {
                            arrangedLanes: arrangedLanes,
                            users: users,
                            t: t,
                            setArrangedItems: setArrangedItems,
                            arrangedItems: arrangedItems,
                        })), editItemDialog: function (boardItem) { return (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(BoardItemDialog_1.BoardItemDialog, __assign({ action: BoardItemDialog_1.BoardItemDialogAction.Edit, trigger: react_1.default.createElement(react_northstar_1.MenuItem, { vertical: true, icon: react_1.default.createElement(react_icons_northstar_1.EditIcon, { outline: true, size: "small" }), content: t["edit board item"] }), initialState: boardItem }, {
                                arrangedLanes: arrangedLanes,
                                users: users,
                                t: t,
                                setArrangedItems: setArrangedItems,
                                arrangedItems: arrangedItems,
                            })),
                            react_1.default.createElement(react_northstar_1.Dialog, { trigger: react_1.default.createElement(react_northstar_1.MenuItem, { vertical: true, icon: react_1.default.createElement(react_icons_northstar_1.TrashCanIcon, { outline: true, size: "small" }), content: t["delete"] }), content: translations_1.getText(t.locale, t["confirm delete"], {
                                    title: translations_1.getText(t.locale, boardItem.title),
                                }), confirmButton: { content: t["delete"] }, cancelButton: { content: t["cancel"] }, onConfirm: function () {
                                    var pos = arrangedItems[boardItem.lane].findIndex(function (laneItem) {
                                        return laneItem.itemKey ===
                                            boardItem.itemKey;
                                    });
                                    arrangedItems[boardItem.lane].splice(pos, 1);
                                    setArrangedItems(cloneDeep_1.default(arrangedItems));
                                } }))); }, key: "BoardLane__" + laneKey, preparedItems: arrangedItems[laneKey], users: users, t: t, rtl: rtl, boardItemCardLayout: props.boardItemCardLayout || defaultBoardItemCardLayout, placeholderPosition: placeholderPosition, moveLane: moveLane, deleteLane: deleteLane }));
                }),
                addingLane && (react_1.default.createElement(BoardLane_1.BoardLane, { last: true, pending: true, laneKey: uniqueId_1.default("pl"), key: "BoardLane__pending_lane", preparedItems: [], users: users, t: t, rtl: rtl, boardItemCardLayout: props.boardItemCardLayout || defaultBoardItemCardLayout, placeholderPosition: null, exitPendingLane: function (value) {
                        var _a, _b;
                        if (value.length > 0) {
                            var newLaneKey = uniqueId_1.default("sl");
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
exports.Board = function (props) {
    var _a = react_1.useState(props.lanes), arrangedLanes = _a[0], setStateArrangedLanes = _a[1];
    var _b = react_1.useState(prepareBoardItems(props.items, props.lanes)), arrangedItems = _b[0], setStateArrangedItems = _b[1];
    var _c = react_1.useState(false), addingLane = _c[0], setAddingLane = _c[1];
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
    return (react_1.default.createElement(react_northstar_1.ProviderConsumer, { render: function (globalTheme) {
            var _a = globalTheme.siteVariables, t = _a.t, rtl = _a.rtl;
            return (react_1.default.createElement(BoardTheme_1.BoardTheme, { globalTheme: globalTheme, style: {
                    display: "flex",
                    flexDirection: "column",
                    height: "calc(100vh - 1.25rem)",
                } },
                react_1.default.createElement(react_northstar_1.Flex, { column: true, variables: function (_a) {
                        var colorScheme = _a.colorScheme;
                        return ({
                            backgroundColor: colorScheme.default.background2,
                        });
                    }, styles: {
                        height: "100%",
                    } },
                    react_1.default.createElement(__1.Toolbar, { actionGroups: {
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
                    Object.keys(arrangedLanes).length > 0 || addingLane ? (react_1.default.createElement(BoardStandalone, __assign({}, {
                        t: t,
                        rtl: rtl,
                        arrangedLanes: arrangedLanes,
                        arrangedItems: arrangedItems,
                        setArrangedItems: setArrangedItems,
                        addingLane: addingLane,
                        setAddingLane: setAddingLane,
                        setArrangedLanes: setArrangedLanes,
                    }, pick_1.default(props, ["users", "boardItemCardLayout"])))) : (react_1.default.createElement(__1.Communication, __assign({}, (props.emptyState || {
                        option: Communication_1.CommunicationOptions.Empty,
                        fields: {
                            title: translations_1.getText(t.locale, t["board empty header"]),
                            desc: translations_1.getText(t.locale, t["board empty body"]),
                        },
                    })))))));
        } }));
};
//# sourceMappingURL=Board.js.map