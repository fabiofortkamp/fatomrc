"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../../src/Utils");
exports.modes = {
    LIST: "LIST",
    MATH: "MATH",
    PICTURE: "PICTURE",
    TABLE: "TABLE",
    TEXT: "TEXT",
    VERTICAL: "VERTICAL"
};
function isKirillMode(x) {
    return exports.modes.hasOwnProperty(x);
}
exports.isKirillMode = isKirillMode;
function mustBeKirillMode(x, msg) {
    if (!isKirillMode(x))
        throw new Error(msg);
    return x;
}
exports.mustBeKirillMode = mustBeKirillMode;
function isLatexMode(x) {
    if (!Utils_1.isString(x))
        return false;
    switch (x) {
        case "Paragraph":
        case "Math":
        case "LR":
            return true;
        default:
            return false;
    }
}
exports.isLatexMode = isLatexMode;
function mustBeLatexMode(x, msg) {
    if (!isLatexMode(x))
        throw new Error(msg);
    return x;
}
exports.mustBeLatexMode = mustBeLatexMode;
//# sourceMappingURL=Mode.js.map