"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var space_1 = require("./space");
var diacritic_1 = require("./diacritic");
var formatting_1 = require("./formatting");
var runes_1 = require("../../../unicode/commands/1args/symbols/runes");
exports.oneArgsCommands = Object.assign({}, space_1.spaceCmds1arg, formatting_1.formattingText, formatting_1.formattingMath, formatting_1.formattingNoMode, diacritic_1.diacriticsTextMode, diacritic_1.diacriticsMathMode, runes_1.runesMap, {
    "cyrchar": true,
    "vec": true,
    "mono": true,
    "ding": true,
    "dingbat": true,
    "ElsevierGlyph": true,
    "elsevierglyph": true,
    "elsevier": true,
    "Elsevier": true,
});
function is1argsCommand(name) {
    return exports.oneArgsCommands.hasOwnProperty(name);
}
exports.is1argsCommand = is1argsCommand;
//# sourceMappingURL=index.js.map