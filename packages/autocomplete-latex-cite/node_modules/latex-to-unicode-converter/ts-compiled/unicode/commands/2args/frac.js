"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../util");
var zeroWidthNonJoiner = "\u200C";
var regExpDigit = /^[0-9]*$/;
function convertFracToUnicode(n, d) {
    if (n === "1" && d === "2")
        return "½";
    if (n === "1" && d === "3")
        return "⅓";
    if (n === "1" && d === "4")
        return "¼";
    if (n === "1" && d === "5")
        return "⅕";
    if (n === "1" && d === "6")
        return "⅙";
    if (n === "1" && d === "8")
        return "⅛";
    if (n === "2" && d === "3")
        return "⅔";
    if (n === "2" && d === "5")
        return "⅖";
    if (n === "3" && d === "4")
        return "¾";
    if (n === "3" && d === "5")
        return "⅗";
    if (n === "3" && d === "8")
        return "⅜";
    if (n === "4" && d === "5")
        return "⅘";
    if (n === "5" && d === "6")
        return "⅚";
    if (n === "5" && d === "8")
        return "⅝";
    if (n === "7" && d === "8")
        return "⅞";
    if (regExpDigit.test(n) && regExpDigit.test(d)) {
        return zeroWidthNonJoiner + n + "⁄" + d + zeroWidthNonJoiner;
    }
    n = util_1.isSingleTerm.test(n) ? n : util_1.addParenthesis(n);
    d = util_1.isSingleTerm.test(d) ? d : util_1.addParenthesis(d);
    return "(" + n + " / " + d + ")";
}
exports.convertFracToUnicode = convertFracToUnicode;
//# sourceMappingURL=frac.js.map