"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.radiogroupItemStyles = void 0;
var get_1 = __importDefault(require("lodash/get"));
exports.radiogroupItemStyles = {
    indicator: function (componentStyleParameters) {
        var colorScheme = componentStyleParameters.theme.siteVariables.colorScheme, props = componentStyleParameters.props;
        var checked = get_1.default(props, "checked");
        return {
            width: "1rem",
            height: "1rem",
            background: "transparent",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "var(--radiogroup__item__indicator-color--outer)",
            borderRadius: "99px",
            "&::before": {
                content: '""',
                display: "block",
                borderRadius: "9999px",
                width: "100%",
                height: "100%",
                padding: "var(--radiogroup__item__indicator-padding--inner, 2px)",
                backgroundClip: "content-box !important",
                background: "var(--radiogroup__item__indicator-color--inner)",
            },
            "& .ui-icon": { display: "none" },
        };
    },
    root: function (componentStyleParameters) {
        var colorScheme = componentStyleParameters.theme.siteVariables.colorScheme, props = componentStyleParameters.props;
        var checked = get_1.default(props, "checked");
        return {
            borderWidth: 0,
            marginLeft: 0,
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
            padding: ".25rem .3125rem",
            "--radiogroup__item__indicator-color--outer": checked
                ? colorScheme.brand.borderFocus1
                : colorScheme.default.foreground2,
            "--radiogroup__item__indicator-color--inner": checked
                ? colorScheme.brand.borderFocus1
                : "transparent",
            "&:hover": checked
                ? {
                    "--radiogroup__item__indicator-color--outer": colorScheme.brand.backgroundHover,
                    "--radiogroup__item__indicator-color--inner": colorScheme.brand.backgroundHover,
                }
                : {
                    "--radiogroup__item__indicator-color--outer": colorScheme.default.foreground1,
                },
            "&:active": {
                "--radiogroup__item__indicator-padding--inner": "3px",
                "--radiogroup__item__indicator-color--outer": checked
                    ? colorScheme.brand.backgroundPressed
                    : colorScheme.default.foregroundPressed,
                "--radiogroup__item__indicator-color--inner": checked
                    ? colorScheme.brand.backgroundPressed
                    : colorScheme.default.foreground2,
            },
        };
    },
};
//# sourceMappingURL=radiogroupItem-styles.js.map