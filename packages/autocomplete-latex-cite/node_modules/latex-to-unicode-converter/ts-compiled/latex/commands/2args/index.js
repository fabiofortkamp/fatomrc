"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frac_1 = require("./frac");
exports.twoArgsCommands = Object.assign({}, frac_1.fracCmds, {
    "binom": true
});
function is2argsCommand(name) {
    return exports.twoArgsCommands.hasOwnProperty(name);
}
exports.is2argsCommand = is2argsCommand;
//# sourceMappingURL=index.js.map