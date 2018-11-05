"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superscript_1 = require("../1args/formatting/superscript");
function determineSqrtSymbol(base) {
    var trimmd = base ? base.trim() : undefined;
    if (!trimmd)
        return "√";
    switch (trimmd) {
        case "2":
            return "√";
        case "3":
            return "∛";
        case "4":
            return "∜";
        default:
            var chars = [];
            for (var i = 0; i < trimmd.length; i++) {
                var char = superscript_1.translateCharToSuperscript(trimmd.charAt(i));
                if (!char)
                    throw new Error("Could not translate \"" + char + "\" to superscript");
                chars.push(char);
            }
            return chars.join("") + "√";
    }
}
function convertSqrtToUnicode(nucleus, base) {
    var sqrt = determineSqrtSymbol(base);
    var trimmedNucleus = nucleus.trim();
    if (trimmedNucleus === "") {
        return sqrt;
    }
    else {
        return sqrt + "(" + trimmedNucleus + ")";
    }
}
exports.convertSqrtToUnicode = convertSqrtToUnicode;
//# sourceMappingURL=sqrt.js.map