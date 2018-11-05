"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tieLetters(chars) {
    return tie2Letters(chars.charAt(0), chars.substring(1));
}
exports.tieLetters = tieLetters;
function tie2Letters(a, b) {
    return a + "͡" + b;
}
exports.tie2Letters = tie2Letters;
function isTieLetters(cmdName) {
    return cmdName === "t";
}
exports.isTieLetters = isTieLetters;
//# sourceMappingURL=tie-letters.js.map