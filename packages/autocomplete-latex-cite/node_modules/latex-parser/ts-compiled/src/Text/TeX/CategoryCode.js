"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCategories = function (char) {
    switch (char) {
        case "\\":
            return 0;
        case "{":
            return 1;
        case "}":
            return 2;
        case "$":
            return 3;
        case "&":
            return 4;
        case "\r":
            return 5;
        case "#":
            return 6;
        case "^":
            return 7;
        case "_":
            return 8;
        case "\0":
            return 9;
        case " ":
            return 10;
        case "~":
            return 13;
        case "%":
            return 14;
        case "\d":
            return 15;
        default:
            return 11;
    }
};
function convertToTeXCharsDefault(str) {
    return convertToTeXChars(exports.defaultCategories, str);
}
exports.convertToTeXCharsDefault = convertToTeXCharsDefault;
function convertToTeXChars(categoryMap, str) {
    var chars = [];
    for (var i = 0; i < str.length; i++) {
        var charAt = str.charAt(i);
        chars.push({
            string: charAt,
            category: categoryMap(charAt)
        });
    }
    return chars;
}
exports.convertToTeXChars = convertToTeXChars;
//# sourceMappingURL=CategoryCode.js.map