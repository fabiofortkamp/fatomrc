"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../../Utils");
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
//# sourceMappingURL=LatexMode.js.map