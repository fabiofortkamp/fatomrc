"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialCharacters = {
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
function isSpecialCharacter(x) {
    return exports.specialCharacters.hasOwnProperty(x);
}
exports.isSpecialCharacter = isSpecialCharacter;
exports.specialCharacter = function (name) { return isSpecialCharacter(name) ? exports.specialCharacters[name] : undefined; };
//# sourceMappingURL=specialchars.js.map