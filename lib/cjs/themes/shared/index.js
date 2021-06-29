"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSharedComponentStyles = exports.sharedComponentStyles = void 0;
var react_northstar_1 = require("@fluentui/react-northstar");
var mergeWith_1 = __importDefault(require("lodash/mergeWith"));
var avatar_styles_1 = require("./components/Avatar/avatar-styles");
var button_styles_1 = require("./components/Button/button-styles");
var buttonContent_styles_1 = require("./components/Button/buttonContent-styles");
var checkbox_styles_1 = require("./components/Checkbox/checkbox-styles");
var card_styles_1 = require("./components/Card/card-styles");
var dialog_styles_1 = require("./components/Dialog/dialog-styles");
var dropdown_styles_1 = require("./components/Dropdown/dropdown-styles");
var formMessage_styles_1 = require("./components/Form/formMessage-styles");
var input_styles_1 = require("./components/Input/input-styles");
var radiogroupItem_styles_1 = require("./components/Radiogroup/radiogroupItem-styles");
var tableCell_styles_1 = require("./components/Table/tableCell-styles");
var tableRow_styles_1 = require("./components/Table/tableRow-styles");
exports.sharedComponentStyles = {
    Avatar: avatar_styles_1.avatarStyles,
    Button: button_styles_1.buttonStyles,
    ButtonContent: buttonContent_styles_1.buttonContentStyles,
    Card: card_styles_1.cardStyles,
    Checkbox: checkbox_styles_1.checkboxStyles,
    Dialog: dialog_styles_1.dialogStyles,
    Dropdown: dropdown_styles_1.dropdownStyles,
    FormMessage: formMessage_styles_1.formMessageStyles,
    Input: input_styles_1.inputStyles,
    RadioGroupItem: radiogroupItem_styles_1.radiogroupItemStyles,
    TableCell: tableCell_styles_1.tableCellStyles,
    TableRow: tableRow_styles_1.tableRowStyles,
};
exports.mergeSharedComponentStyles = function (componentStyles) {
    return mergeWith_1.default(componentStyles, exports.sharedComponentStyles, function (styles, sharedStyles) {
        if (styles && sharedStyles) {
            return react_northstar_1.mergeComponentStyles(sharedStyles, styles);
        }
        else
            return styles || sharedStyles;
    });
};
var static_styles_1 = require("./static-styles");
Object.defineProperty(exports, "sharedStaticStyles", { enumerable: true, get: function () { return static_styles_1.staticStyles; } });
//# sourceMappingURL=index.js.map