"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fracCmds = {
    "frac": true,
    "nfrac": true,
    "cfrac": true,
    "xfrac": true,
    "sfrac": true,
};
function isFracCmd(x) {
    return exports.fracCmds.hasOwnProperty(x);
}
exports.isFracCmd = isFracCmd;
//# sourceMappingURL=frac.js.map