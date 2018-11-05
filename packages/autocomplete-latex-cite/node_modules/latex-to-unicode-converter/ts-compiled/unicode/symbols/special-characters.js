"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialChars = {
    "i": "ı",
    "j": "ȷ",
    "oe": "œ",
    "OE": "Œ",
    "ae": "æ",
    "AE": "Æ",
    "aa": "å",
    "AA": "Å",
    "o": "ø",
    "O": "Ø",
    "ss": "ß",
    "l": "ł",
    "L": "Ł"
};
function isSpecialChar(c) {
    return exports.specialChars.hasOwnProperty(c);
}
exports.isSpecialChar = isSpecialChar;
//# sourceMappingURL=special-characters.js.map