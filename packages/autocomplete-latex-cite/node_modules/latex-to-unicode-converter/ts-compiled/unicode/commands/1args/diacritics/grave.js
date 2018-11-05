"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_expander_1 = require("../../command-expander");
exports.graveAccent = command_expander_1.lookupOrAppend({
    e: "è",
    u: "ù",
    i: "ì",
    o: "ò",
    a: "à",
    E: "È",
    U: "Ù",
    I: "Ì",
    O: "Ò",
    A: "À"
}, "\u0300");
//# sourceMappingURL=grave.js.map