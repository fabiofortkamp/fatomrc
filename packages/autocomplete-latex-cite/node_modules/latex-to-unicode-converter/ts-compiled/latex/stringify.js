"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latex_parser_1 = require("latex-parser");
function stringifyLaTeX() {
    var tex = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tex[_i] = arguments[_i];
    }
    return tex.map(function (t) { return latex_parser_1.stringifyLaTeX(t); }).join("");
}
exports.stringifyLaTeX = stringifyLaTeX;
//# sourceMappingURL=stringify.js.map