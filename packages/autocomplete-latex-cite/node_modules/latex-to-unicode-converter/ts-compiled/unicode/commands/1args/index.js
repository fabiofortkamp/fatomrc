"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./diacritics/index");
var index_2 = require("./formatting/index");
var cyrillic_1 = require("./letters/cyrillic");
var dingbats_1 = require("./symbols/dingbats");
var elsevier_1 = require("./symbols/elsevier");
var runes_1 = require("./symbols/runes");
function expand1argsCommand(name, arg) {
    switch (name) {
        case "cyrchar":
            var c = cyrillic_1.translateCharToCyrillic(arg);
            if (!!c)
                return c;
            break;
        case "ding":
        case "dingbat":
            var d = dingbats_1.translateCharToDingbat(arg);
            if (!!d)
                return d;
            break;
        case "ElsevierGlyph":
        case "elsevierglyph":
        case "elsevier":
        case "Elsevier":
            var e = elsevier_1.translateCharToElsevier(arg);
            if (!!e)
                return e;
            break;
        default:
            for (var _i = 0, _a = [
                index_1.diacriticUnicode,
                index_2.formattingUnicode,
                runes_1.runeUnicode,
            ]; _i < _a.length; _i++) {
                var fn = _a[_i];
                var result = fn(name, arg);
                if (!!result)
                    return result;
            }
    }
    throw new Error("No implementation found to expand \\" + name + " with argument {" + arg + "}");
}
exports.expand1argsCommand = expand1argsCommand;
//# sourceMappingURL=index.js.map