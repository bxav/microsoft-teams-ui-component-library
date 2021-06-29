import set from "lodash/set";
export default (function (target, setMultiple) {
    return Object.keys(setMultiple).reduce(function (acc, path) {
        return set(acc, path, setMultiple[path]);
    }, target);
});
//# sourceMappingURL=setMultiple.js.map