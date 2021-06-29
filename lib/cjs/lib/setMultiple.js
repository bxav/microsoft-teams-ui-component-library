"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var set_1 = __importDefault(require("lodash/set"));
exports.default = (function (target, setMultiple) {
    return Object.keys(setMultiple).reduce(function (acc, path) {
        return set_1.default(acc, path, setMultiple[path]);
    }, target);
});
//# sourceMappingURL=setMultiple.js.map