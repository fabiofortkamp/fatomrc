"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mathSpace = "\u8287";
exports.spaceCharactersUnicode = {
    ",": "\u2009",
    "quad": "\u2003",
    "qquad": "\u2003\u2003",
    " ": " ",
    "space": " ",
    ";": "　",
    ":": "　",
    "hfill": "\t"
};
function isSpaceCharactersUnicode(x) {
    return exports.spaceCharactersUnicode.hasOwnProperty(x);
}
exports.isSpaceCharactersUnicode = isSpaceCharactersUnicode;
exports.spaceUnicode = function (name) { return isSpaceCharactersUnicode(name) ? exports.spaceCharactersUnicode[name] : undefined; };
//# sourceMappingURL=space.js.map