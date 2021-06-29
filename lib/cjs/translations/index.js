"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getText = exports.interpolate = void 0;
exports.interpolate = function (template, interpolationArgs) {
    if (interpolationArgs.length) {
        var t = typeof interpolationArgs[0];
        var key = void 0;
        var args = "string" === t || "number" === t
            ? Array.prototype.slice.call(interpolationArgs)
            : interpolationArgs[0];
        for (key in args) {
            template = template.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }
    return template;
};
exports.getText = function (currentLocale, textObject) {
    var interpolationArgs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        interpolationArgs[_i - 2] = arguments[_i];
    }
    if (!textObject)
        return "";
    if (typeof textObject === "string")
        return exports.interpolate(textObject, interpolationArgs);
    if (currentLocale && textObject.hasOwnProperty(currentLocale))
        return exports.interpolate(textObject[currentLocale], interpolationArgs);
    else
        return exports.interpolate(textObject[Object.keys(textObject)[0]], interpolationArgs);
};
exports.default = (_a = {},
    _a["en-US"] = {
        locale: "en-US",
        hello: "Hello",
        "add lane": "Add column",
        "add board item": "Add item to board",
        "edit board item": "Edit item",
        "board lane": "Board column",
        "board item": "Board item",
        "name lane": "Name this column…",
        "lane pending": "New column",
        "move lane nearer": "Move left",
        "move lane further": "Move right",
        delete: "Delete",
        "confirm delete": "Are you sure you want to delete “{title}”?",
        "lane options": "Column options",
        "sort-order alphabetical descending": "A-Z",
        "sort-order alphabetical ascending": "Z-A",
        cancel: "Cancel",
        confirm: "Confirm",
        discard: "Discard",
        save: "Save",
        title: "Title",
        subtitle: "Subtitle",
        "board item body": "Description",
        "board item users": "Tagged users",
        "board item options": "Board item options",
        "on drag start board item": "You have lifted the item called {itemTitle} in position {itemPosition} of {laneLength} in the {laneTitle} column.",
        "on drag update board item same lane": "You have moved the item called {itemTitle} to position {itemPosition} of {laneLength}.",
        "on drag update board item different lane": "You have moved the item called {itemTitle} to position {itemPosition} of {laneLength} in the {laneTitle} column.",
        "on drag end board item": "You have placed the item called {itemTitle} in position {itemPosition} of {laneLength} in the {laneTitle} column.",
        "on drag cancel board item": "You have cancelled dragging the item called {itemTitle}.",
        "board lane instructions": "Press Enter to explore board lane items, then use Escape to shift focus back to the board lane.",
        "toolbar overflow menu": "Toolbar overflow menu",
        "could not load data": "Could not load data.",
        "no data": "No data available.",
        "list empty header": "Create your first list item",
        "list empty body": "Get started with the ‘Add’ button in the toolbar above.",
        "board empty header": "Create your first column",
        "board empty body": "Get started by adding a column in the toolbar above.",
        close: "Close",
        "edit dashboard coaching": "Enable or disable the data you want to see on the dashboard.",
        find: "Find",
        ok: "OK",
        more: "More",
        filter: "Filter",
        clear: "Clear",
        "hide widget": "Hide widget",
        "view more": "View more",
        "edit dashboard": "Edit dashboard",
    },
    _a);
//# sourceMappingURL=index.js.map