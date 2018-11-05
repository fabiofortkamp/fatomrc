"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frac_1 = require("./frac");
var binom_1 = require("./binom");
function expand2argsCommand(name, arg1, arg2) {
    switch (name) {
        case "frac":
        case "nfrac":
        case "cfrac":
        case "xfrac":
        case "sfrac":
            return frac_1.convertFracToUnicode(arg1, arg2);
        case "binom":
            return binom_1.convertBinom(arg1, arg2);
    }
    throw new Error("No implementation found to expand \\" + name + " with arguments {" + arg1 + ", " + arg2);
}
exports.expand2argsCommand = expand2argsCommand;
//# sourceMappingURL=index.js.map