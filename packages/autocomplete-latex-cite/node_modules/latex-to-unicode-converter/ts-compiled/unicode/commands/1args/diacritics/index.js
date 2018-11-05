"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mathring_1 = require("./mathring");
var acute_1 = require("./acute");
var grave_1 = require("./grave");
var circumflex_1 = require("./circumflex");
var tilde_1 = require("./tilde");
var dieresis_1 = require("./dieresis");
var cedilla_1 = require("./cedilla");
var caron_1 = require("./caron");
var util_1 = require("../../../../util");
var ogonek_1 = require("./ogonek");
var tie_letters_1 = require("./tie-letters");
var vectorArrow_1 = require("./vectorArrow");
var long_hungarian_umlaut_1 = require("./long-hungarian-umlaut");
exports.barUnderLetter = util_1.simpleSuffix("\u0331");
exports.dotUnderLetter = util_1.simpleSuffix("\u0323");
exports.breve = util_1.simpleSuffix("\u0306");
exports.macrron = util_1.simpleSuffix("\u0304");
exports.dotOverLetter = util_1.simpleSuffix("\u0307");
exports.modifiersTextModeUnicodeChart = {
    "`": grave_1.graveAccent,
    "'": acute_1.acuteAccent,
    "^": circumflex_1.circumflex,
    "~": tilde_1.tilde,
    "=": exports.macrron,
    ".": exports.dotOverLetter,
    '"': dieresis_1.dieresis,
    "H": long_hungarian_umlaut_1.longHungarianUmlaut,
    "c": cedilla_1.cedilla,
    "k": ogonek_1.ogonek,
    "b": exports.barUnderLetter,
    "d": exports.dotUnderLetter,
    "r": mathring_1.ringOverLetter,
    "u": exports.breve,
    "v": caron_1.caron,
    "t": tie_letters_1.tieLetters,
};
exports.modifiersMathModeUnicodeChart = {
    "check": caron_1.caron,
    "acute": acute_1.acuteAccent,
    "grave": acute_1.acuteAccent,
    "breve": exports.breve,
    "vec": vectorArrow_1.vectorArrow,
    "mathring": mathring_1.ringOverLetter,
};
exports.diacriticUnicode = function (str, arg) {
    var fun = exports.modifiersTextModeUnicodeChart[str];
    if (!fun)
        fun = exports.modifiersMathModeUnicodeChart[str];
    return fun && fun(arg);
};
//# sourceMappingURL=index.js.map