"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleSuffix = function (modifier) {
    return function (char) {
        return char + modifier;
    };
};
exports.isSingleTerm = /^.$|^[0-9]+$/;
function addParenthesis(n) {
    return "(" + n + ")";
}
exports.addParenthesis = addParenthesis;
//# sourceMappingURL=util.js.map