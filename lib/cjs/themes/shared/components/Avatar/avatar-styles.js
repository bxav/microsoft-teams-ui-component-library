"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarStyles = void 0;
exports.avatarStyles = {
    image: function () {
        return {
            borderColor: "var(--surface-background-color, transparent)",
            borderRadius: "var(--avatar__border-radius, 9999px)",
            clipPath: "var(--avatar__clip-path, none)",
        };
    },
    label: function () {
        return {
            borderColor: "var(--surface-background-color, transparent)",
        };
    },
    root: function () {
        return {
            backgroundColor: "var(--surface-background-color, transparent)",
        };
    },
};
//# sourceMappingURL=avatar-styles.js.map