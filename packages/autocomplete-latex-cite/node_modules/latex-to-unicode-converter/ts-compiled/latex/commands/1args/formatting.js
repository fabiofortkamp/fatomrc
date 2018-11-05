"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattingText = {
    textbb: true,
    textbf: true,
    textfrak: true,
    textit: true,
    texttt: true,
    textcal: true,
    textsup: true,
    textsub: true,
    textsuperscript: true,
    textsubscript: true,
};
exports.formattingNoMode = {
    bb: true,
    bf: true,
    frak: true,
    it: true,
    tt: true,
    cal: true,
    mono: true,
    sup: true,
    sub: true,
    superscript: true,
    subscript: true,
};
exports.formattingMath = {
    mathbb: true,
    mathbf: true,
    mathfrak: true,
    mathit: true,
    mathtt: true,
    mathcal: true,
    mathsup: true,
    mathsub: true,
    mathsuperscript: true,
    mathsubscript: true,
};
function isBbCmd(x) {
    return x === "bb" || x === "mathbb" || x === "textbb";
}
exports.isBbCmd = isBbCmd;
function isBfCmd(x) {
    return x === "bf" || x === "mathbf" || x === "textbf";
}
exports.isBfCmd = isBfCmd;
function isMonoCmd(x) {
    return x === "mono";
}
exports.isMonoCmd = isMonoCmd;
function isFrakCmd(x) {
    return x === "frak" || x === "mathfrak" || x === "textfrak";
}
exports.isFrakCmd = isFrakCmd;
function isItCmd(x) {
    return x === "it" || x === "mathit" || x === "textit";
}
exports.isItCmd = isItCmd;
function isTtCmd(x) {
    return x === "tt" || x === "mathtt" || x === "texttt";
}
exports.isTtCmd = isTtCmd;
function isCalCmd(x) {
    return x === "cal" || x === "mathcal" || x === "textcal";
}
exports.isCalCmd = isCalCmd;
function isSupCmd(x) {
    return x === "sup"
        || x === "mathsup"
        || x === "textsup"
        || x === "superscript"
        || x === "mathsuperscript"
        || x === "textsuperscript";
}
exports.isSupCmd = isSupCmd;
function isSubCmd(x) {
    return x === "sub"
        || x === "mathsub"
        || x === "textsub"
        || x === "subscript"
        || x === "mathsubscript"
        || x === "textsubscript";
}
exports.isSubCmd = isSubCmd;
function isFormattingCmd(x) {
    return exports.formattingText.hasOwnProperty(x) ||
        exports.formattingMath.hasOwnProperty(x) ||
        exports.formattingNoMode.hasOwnProperty(x);
}
exports.isFormattingCmd = isFormattingCmd;
//# sourceMappingURL=formatting.js.map