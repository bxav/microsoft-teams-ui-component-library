import React from "react";
import uniqueId from "lodash/uniqueId";
import cloneDeep from "lodash/cloneDeep";
import { getText } from "../../translations";
import { FormDialog } from "../Form/Form";
import { EInlineInputType, EInputBlockType } from "../Form/FormContent";
export var BoardItemDialogAction;
(function (BoardItemDialogAction) {
    BoardItemDialogAction[BoardItemDialogAction["Create"] = 0] = "Create";
    BoardItemDialogAction[BoardItemDialogAction["Edit"] = 1] = "Edit";
})(BoardItemDialogAction || (BoardItemDialogAction = {}));
export var BoardItemDialog = function (_a) {
    var action = _a.action, trigger = _a.trigger, initialState = _a.initialState, arrangedLanes = _a.arrangedLanes, setArrangedItems = _a.setArrangedItems, arrangedItems = _a.arrangedItems, users = _a.users, t = _a.t;
    return (React.createElement(FormDialog, { trigger: trigger, headerSection: {
            title: (function () {
                switch (action) {
                    case BoardItemDialogAction.Create:
                        return t["add board item"];
                    case BoardItemDialogAction.Edit:
                        return t["edit board item"];
                }
            })(),
        }, sections: [
            {
                inputBlocks: [
                    {
                        type: EInputBlockType.inlineInputs,
                        fields: [
                            {
                                type: EInlineInputType.text,
                                title: t["title"],
                                inputId: "board-item__title",
                                initialValue: getText(t.locale, initialState["title"]),
                            },
                        ],
                    },
                    {
                        type: EInputBlockType.inlineInputs,
                        fields: [
                            {
                                type: EInlineInputType.text,
                                title: t["subtitle"],
                                inputId: "board-item__subtitle",
                                initialValue: getText(t.locale, initialState["subtitle"]),
                            },
                        ],
                    },
                    {
                        type: EInputBlockType.multilineText,
                        title: t["board item body"],
                        inputId: "board-item__body",
                        initialValue: getText(t.locale, initialState.body
                            ? Array.isArray(initialState.body)
                                ? initialState.body[0]
                                : initialState.body
                            : ""),
                    },
                    {
                        type: EInputBlockType.dropdown,
                        title: t["board lane"],
                        inputId: "board-item__lane",
                        multiple: false,
                        options: Object.keys(arrangedLanes).map(function (laneKey) { return ({
                            title: arrangedLanes[laneKey].title,
                            value: laneKey,
                        }); }),
                        initialValue: initialState.lane,
                    },
                    {
                        type: EInputBlockType.dropdown,
                        title: t["board item users"],
                        inputId: "board-item__users",
                        multiple: true,
                        options: Object.keys(users).map(function (userKey) { return ({
                            title: users[userKey].name,
                            value: userKey,
                        }); }),
                        initialValues: initialState.users,
                    },
                ],
            },
        ], submit: t["save"], cancel: (function () {
            switch (action) {
                case BoardItemDialogAction.Create:
                    return t["discard"];
                case BoardItemDialogAction.Edit:
                    return t["cancel"];
            }
        })(), onInteraction: function (_a) {
            var formState = _a.formState;
            if (!formState)
                return;
            var boardItem = Object.keys(formState).reduce(function (boardItem, inputId) {
                var _a = inputId.split("__"), _prefix = _a[0], boardItemProperty = _a[1];
                var value = formState[inputId];
                if (value)
                    boardItem[boardItemProperty] = value;
                return boardItem;
            }, (function () {
                switch (action) {
                    case BoardItemDialogAction.Create:
                        return {
                            order: -1,
                            itemKey: uniqueId("nbi"),
                        };
                    case BoardItemDialogAction.Edit:
                        return cloneDeep(initialState);
                }
            })());
            switch (action) {
                case BoardItemDialogAction.Create:
                    arrangedItems[boardItem.lane].push(boardItem);
                    break;
                case BoardItemDialogAction.Edit:
                    var fromPos = arrangedItems[initialState.lane].findIndex(function (laneItem) { return laneItem.itemKey === initialState.itemKey; });
                    if (boardItem.lane !== initialState.lane) {
                        arrangedItems[initialState.lane].splice(fromPos, 1);
                        arrangedItems[boardItem.lane].push(boardItem);
                    }
                    else {
                        arrangedItems[boardItem.lane][fromPos] = boardItem;
                    }
            }
            setArrangedItems(cloneDeep(arrangedItems));
        } }));
};
//# sourceMappingURL=BoardItemDialog.js.map