var _a;
import React from "react";
import { TeamsTheme } from "../../../themes";
export var ERROR_MESSAGE = {
    title: "Something went wrong.",
    desc: "Looks like there is a glitch in our system. You can refresh or start over if that doesn’t seem to fix the issue.",
    actions: {
        primary: {
            label: "Refresh",
            target: "refresh",
        },
        tertiary: {
            label: "Start over",
            target: "start-over",
        },
    },
};
export var ERROR_ILLUSTRATIONS = (_a = {},
    _a[TeamsTheme.Default] = (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 121.6 122.2" },
        React.createElement("defs", null),
        React.createElement("path", { fill: "#C8C6C4", d: "M121.6 69.2l-7.3-3.6c.3-3.4 0-6.7-1-9.8l6.2-5.1-6-9.3-7.2 3.5c-2.2-2-4.8-3.7-7.6-5l.1-8-11-1.4-1.9 7.8c-3.4.4-6.6 1.5-9.4 3.1l-6.3-5-7.9 7.7 5 6.3c-1.7 2.8-2.9 6-3.4 9.4l-7.8 1.8 1.2 11h8c1.3 3.2 3 6 5.4 8.4l-3.4 7.3 9.4 5.8 5-6.3a25.6 25.6 0 009 1l3.4 7.3 10.5-3.5-1.7-7.9c2.8-1.8 5.2-4.2 7.1-7l7.9 1.9 3.7-10.4z" }),
        React.createElement("circle", { cx: "89", cy: "63.5", r: "12.5", fill: "#B3B0AD" }),
        React.createElement("path", { fill: "#E1DFDD", d: "M53.7 97.6c.1-1.3.2-2.7 0-4l7-3.3-4.6-11-7.3 2.4c-1.7-2-3.8-3.6-6.2-4.8l.6-7.7-11.9-1.6-1.5 7.6c-2.6.5-5 1.5-7.3 3l-6.3-4.3-7.3 9.5 5.7 5a20.2 20.2 0 00-1 7.8l-6.9 3.4 4.6 11 7.2-2.4c1.8 2 3.9 3.6 6.3 4.8l-.6 7.7 11.9 1.5 1.5-7.5c2.6-.5 5-1.6 7.3-3l6.3 4.3 7.3-9.5-5.7-5c.4-1.3.7-2.6.9-4z" }),
        React.createElement("circle", { cx: "33.7", cy: "94.9", r: "10.2", fill: "#C8C6C4" }),
        React.createElement("path", { fill: "#E2E2F6", d: "M46.8 19.5a23.6 23.6 0 10-15.2 26.3l8 6.7c.8.7 2.2 0 2-1.1l-1.3-11.1c5.2-5.3 8-13 6.5-20.8z" }),
        React.createElement("circle", { cx: "25.8", cy: "35.2", r: "3", fill: "#FFF" }),
        React.createElement("path", { fill: "#FFF", d: "M24.8 29.9c-1.4.2-2.7-.7-2.9-2L19 11.5a2.5 2.5 0 115-.8L26.7 27c.3 1.4-.6 2.7-2 2.9z" }))),
    _a[TeamsTheme.Dark] = (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 121.6 122.2" },
        React.createElement("defs", null),
        React.createElement("path", { fill: "#B3B0AD", d: "M121.6 69.2l-7.3-3.6c.3-3.4 0-6.7-1-9.8l6.2-5.1-6-9.3-7.2 3.5c-2.2-2-4.8-3.7-7.6-5l.1-8-11-1.4-1.9 7.8c-3.4.4-6.6 1.5-9.4 3.1l-6.3-5-7.9 7.7 5 6.3c-1.7 2.8-2.9 6-3.4 9.4l-7.8 1.8 1.2 11h8c1.3 3.2 3 6 5.4 8.4l-3.4 7.3 9.4 5.8 5-6.3a25.6 25.6 0 009 1l3.4 7.3 10.5-3.5-1.7-7.9c2.8-1.8 5.2-4.2 7.1-7l7.9 1.9 3.7-10.4z" }),
        React.createElement("circle", { cx: "89", cy: "63.5", r: "12.5", fill: "#979593" }),
        React.createElement("path", { fill: "#8A8886", d: "M53.7 97.6c.1-1.3.2-2.7 0-4l7-3.3-4.6-11-7.3 2.4c-1.7-2-3.8-3.6-6.2-4.8l.6-7.7-11.9-1.6-1.5 7.6c-2.6.5-5 1.5-7.3 3l-6.3-4.3-7.3 9.5 5.7 5a20.2 20.2 0 00-1 7.8l-6.9 3.4 4.6 11 7.2-2.4c1.8 2 3.9 3.6 6.3 4.8l-.6 7.7 11.9 1.5 1.5-7.5c2.6-.5 5-1.6 7.3-3l6.3 4.3 7.3-9.5-5.7-5c.4-1.3.7-2.6.9-4z" }),
        React.createElement("circle", { cx: "33.7", cy: "94.9", r: "10.2", fill: "#605E5C" }),
        React.createElement("path", { fill: "#A6A7DC", d: "M46.8 19.5a23.6 23.6 0 10-15.2 26.3l8 6.7c.8.7 2.2 0 2-1.1l-1.3-11.1c5.2-5.3 8-13 6.5-20.8z" }),
        React.createElement("circle", { cx: "25.8", cy: "35.2", r: "3", fill: "#E2E2F6" }),
        React.createElement("path", { fill: "#E2E2F6", d: "M24.8 29.9c-1.4.2-2.7-.7-2.9-2L19 11.5a2.5 2.5 0 115-.8L26.7 27c.3 1.4-.6 2.7-2 2.9z" }))),
    _a[TeamsTheme.HighContrast] = (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 121.6 122.2" },
        React.createElement("defs", null),
        React.createElement("path", { fill: "#FFF", stroke: "#000", strokeMiterlimit: "10", strokeWidth: "1.5", d: "M121.6 69.2l-7.3-3.6c.3-3.4 0-6.7-1-9.8l6.2-5.1-6-9.3-7.2 3.5c-2.2-2-4.8-3.7-7.6-5l.1-8-11-1.4-1.9 7.8c-3.4.4-6.6 1.5-9.4 3.1l-6.3-5-7.9 7.7 5 6.3c-1.7 2.8-2.9 6-3.4 9.4l-7.8 1.8 1.2 11h8c1.3 3.2 3 6 5.4 8.4l-3.4 7.3 9.4 5.8 5-6.3a25.6 25.6 0 009 1l3.4 7.3 10.5-3.5-1.7-7.9c2.8-1.8 5.2-4.2 7.1-7l7.9 1.9 3.7-10.4z" }),
        React.createElement("circle", { cx: "89", cy: "63.5", r: "12.5" }),
        React.createElement("path", { fill: "#FFF", stroke: "#000", strokeMiterlimit: "10", strokeWidth: "1.5", d: "M53.7 97.6c.1-1.3.2-2.7 0-4l7-3.3-4.6-11-7.3 2.4c-1.7-2-3.8-3.6-6.2-4.8l.6-7.7-11.9-1.6-1.5 7.6c-2.6.5-5 1.5-7.3 3l-6.3-4.3-7.3 9.5 5.7 5a20.2 20.2 0 00-1 7.8l-6.9 3.4 4.6 11 7.2-2.4c1.8 2 3.9 3.6 6.3 4.8l-.6 7.7 11.9 1.5 1.5-7.5c2.6-.5 5-1.6 7.3-3l6.3 4.3 7.3-9.5-5.7-5c.4-1.3.7-2.6.9-4z" }),
        React.createElement("circle", { cx: "33.7", cy: "94.9", r: "10.2" }),
        React.createElement("path", { fill: "#FFF", stroke: "#000", strokeMiterlimit: "10", strokeWidth: "1.5", d: "M46.8 19.5a23.6 23.6 0 10-15.2 26.3l8 6.7c.8.7 2.2 0 2-1.1l-1.3-11.1c5.2-5.3 8-13 6.5-20.8z" }),
        React.createElement("circle", { cx: "25.8", cy: "35.2", r: "3" }),
        React.createElement("path", { d: "M24.8 29.9c-1.4.2-2.7-.7-2.9-2L19 11.5a2.5 2.5 0 115-.8L26.7 27c.3 1.4-.6 2.7-2 2.9z" }))),
    _a);
//# sourceMappingURL=Error.js.map