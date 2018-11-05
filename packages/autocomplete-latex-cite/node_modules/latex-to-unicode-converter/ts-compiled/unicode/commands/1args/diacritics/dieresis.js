"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_expander_1 = require("../../command-expander");
exports.dieresis = command_expander_1.lookupOrAppend({
    e: "ë",
    y: "ÿ",
    u: "ü",
    i: "ï",
    o: "ö",
    a: "ä",
    E: "Ë",
    Y: "Ÿ",
    U: "Ü",
    I: "Ï",
    O: "Ö",
    A: "Ä"
}, "\u0308");
//# sourceMappingURL=dieresis.js.map