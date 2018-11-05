"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromCodePoint = function () {
    var argz = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argz[_i] = arguments[_i];
    }
    var MAX_SIZE = 0x4000;
    var codeUnits = [];
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
        return "";
    }
    var result = "";
    while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (!isFinite(codePoint) ||
            codePoint < 0 ||
            codePoint > 0x10FFFF ||
            Math.floor(codePoint) != codePoint) {
            throw RangeError("Invalid code point: " + codePoint);
        }
        if (codePoint <= 0xFFFF) {
            codeUnits.push(codePoint);
        }
        else {
            codePoint -= 0x10000;
            highSurrogate = (codePoint >> 10) + 0xD800;
            lowSurrogate = (codePoint % 0x400) + 0xDC00;
            codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
            result += String.fromCharCode.apply(undefined, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};
function getAsString(hexaDecimals) {
    return exports.fromCodePoint.apply(void 0, hexaDecimals);
}
exports.getAsString = getAsString;
//# sourceMappingURL=char-util.js.map