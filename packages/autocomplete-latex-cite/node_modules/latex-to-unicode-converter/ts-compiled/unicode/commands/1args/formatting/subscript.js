"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptCharacters = {
    "0": "₀",
    "1": "₁",
    "2": "₂",
    "3": "₃",
    "4": "₄",
    "5": "₅",
    "6": "₆",
    "7": "₇",
    "8": "₈",
    "9": "₉",
    "+": "₊",
    "-": "₋",
    "=": "₌",
    "(": "₍",
    ")": "₎",
    "a": "ₐ",
    "e": "ₑ",
    "h": "ₕ",
    "i": "ᵢ",
    "j": "ⱼ",
    k: "ₖ",
    l: "ₗ",
    m: "ₘ",
    n: "ₙ",
    "o": "ₒ",
    p: "ₚ",
    "r": "ᵣ",
    s: "ₛ",
    t: "ₜ",
    "u": "ᵤ",
    "v": "ᵥ",
    "x": "ₓ",
    "β": "ᵦ",
    "γ": "ᵧ",
    "ρ": "ᵨ",
    "φ": "ᵩ",
    "χ": "ᵪ"
};
function isSubscriptCharacter(x) {
    return exports.subscriptCharacters.hasOwnProperty(x);
}
exports.isSubscriptCharacter = isSubscriptCharacter;
exports.translateCharToSubscript = function (char) { return isSubscriptCharacter(char) ? exports.subscriptCharacters[char] : undefined; };
//# sourceMappingURL=subscript.js.map