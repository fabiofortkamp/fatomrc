"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = require("./options");
var latex_parser_1 = require("latex-parser");
var convert_1 = require("./unicode/convert");
function convertLaTeX(options, src) {
    return convertLaTeXBlocks(options, latex_parser_1.mustNotBeUndefined(latex_parser_1.mustBeOk(latex_parser_1.latexParser.parse(src)).value));
}
exports.convertLaTeX = convertLaTeX;
function convertLaTeXToUnicode(src) {
    return convertLaTeXBlocks({
        translateTo: "unicode",
        mode: "Any",
    }, latex_parser_1.mustNotBeUndefined(latex_parser_1.mustBeOk(latex_parser_1.latexParser.parse(src)).value));
}
exports.convertLaTeXToUnicode = convertLaTeXToUnicode;
function convertLaTeXBlocks(options, latex) {
    var translateTo = options.translateTo;
    switch (translateTo) {
        case "html":
            throw new Error("Unsupported format: '"
                + translateTo
                + "'. Use one of: "
                + Object.keys(options_1.supportedMarkups));
        case "unicode":
        default:
            return convert_1.convertLaTeXBlocksToUnicode(options, latex).result;
    }
}
exports.convertLaTeXBlocks = convertLaTeXBlocks;
//# sourceMappingURL=convert.js.map