"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardItemDialog = exports.BoardItemDialogAction = void 0;
var react_1 = __importDefault(require("react"));
var uniqueId_1 = __importDefault(require("lodash/uniqueId"));
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var translations_1 = require("../../translations");
var Form_1 = require("../Form/Form");
var FormContent_1 = require("../Form/FormContent");
var BoardItemDialogAction;
(function (BoardItemDialogAction) {
    BoardItemDialogAction[BoardItemDialogAction["Create"] = 0] = "Create";
    BoardItemDialogAction[BoardItemDialogAction["Edit"] = 1] = "Edit";
})(BoardItemDialogAction = exports.BoardItemDialogAction || (exports.BoardItemDialogAction = {}));
exports.BoardItemDialog = function (_a) {
    var action = _a.action, trigger = _a.trigger, initialState = _a.initialState, arrangedLanes = _a.arrangedLanes, setArrangedItems = _a.setArrangedItems, arrangedItems = _a.arrangedItems, users = _a.users, t = _a.t;
    return (react_1.default.createElement(Form_1.FormDialog, { trigger: trigger, headerSection: {
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
                        type: FormContent_1.EInputBlockType.inlineInputs,
                        fields: [
                            {
                                type: FormContent_1.EInlineInputType.text,
                                title: t["title"],
                                inputId: "board-item__title",
                                initialValue: translations_1.getText(t.locale, initialState["title"]),
                            },
                        ],
                    },
                    {
                        type: FormContent_1.EInputBlockType.inlineInputs,
                        fields: [
                            {
                                type: FormContent_1.EInlineInputType.text,
                                title: t["subtitle"],
                                inputId: "board-item__subtitle",
                                initialValue: translations_1.getText(t.locale, initialState["subtitle"]),
                            },
                        ],
                    },
                    {
                        type: FormContent_1.EInputBlockType.multilineText,
                        title: t["board item body"],
                        inputId: "board-item__body",
                        initialValue: translations_1.getText(t.locale, initialState.body
                            ? Array.isArray(initialState.body)
                                ? initialState.body[0]
                                : initialState.body
                            : ""),
                    },
                    {
                        type: FormContent_1.EInputBlockType.dropdown,
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
                        type: FormContent_1.EInputBlockType.dropdown,
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
                            itemKey: uniqueId_1.default("nbi"),
                        };
                    case BoardItemDialogAction.Edit:
                        return cloneDeep_1.default(initialState);
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
            setArrangedItems(cloneDeep_1.default(arrangedItems));
        } }));
};
//# sourceMappingURL=BoardItemDialog.js.map