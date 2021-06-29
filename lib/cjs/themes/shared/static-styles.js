"use strict";
/**
 * Custom static styles.
 *
 * ! Avoid adding anything to this export, unless absolutely necessary.
 * ! Rather, refactor these definitions into component-specific styles.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticStyles = void 0;
var focusableSelectors = [
    ":focus",
    ".ui-dropdown__container",
    ".ui-dropdown__item",
];
exports.staticStyles = [
    focusableSelectors
        .map(function (selector) {
        return "html[data-whatinput=\"keyboard\"] " + selector + "::before, html[data-whatinput=\"keyboard\"] " + selector + "::after";
    })
        .join(", ") + " {\n    border-width: 2px !important;\n    border-radius: 4px !important;\n  }",
];
//# sourceMappingURL=static-styles.js.map