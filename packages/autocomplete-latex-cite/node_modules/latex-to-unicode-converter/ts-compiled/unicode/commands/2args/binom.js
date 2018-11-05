"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../util");
var isSingleTerm = /^.$|^[0-9]+$/;
function convertBinom(n, d) {
    n = isSingleTerm.test(n) ? n : util_1.addParenthesis(n);
    d = isSingleTerm.test(d) ? d : util_1.addParenthesis(d);
    return "(" + n + " \u00A6 " + d + ")";
}
exports.convertBinom = convertBinom;
//# sourceMappingURL=binom.js.map