"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var space_1 = require("./space");
var symbols_1 = require("./symbols");
var barred_letter_1 = require("./barred-letter");
var slashed_1 = require("./slashed");
var cyrillic_1 = require("./cyrillic");
var specialchars_1 = require("./specialchars");
exports.expand0argsCommand = function (name) {
    for (var _i = 0, _a = [
        barred_letter_1.barredLUnicode,
        space_1.spaceUnicode,
        slashed_1.slashedOUnicode,
        symbols_1.characterUnicode,
        specialchars_1.specialCharacter,
        cyrillic_1.cyrillicUnicode
    ]; _i < _a.length; _i++) {
        var fn = _a[_i];
        var result = fn(name);
        if (!!result)
            return result;
    }
};
//# sourceMappingURL=index.js.map