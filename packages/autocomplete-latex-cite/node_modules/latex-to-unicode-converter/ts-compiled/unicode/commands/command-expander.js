"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lookupOrAppend(conversionTable, _default_append) {
    return function (string) {
        if (conversionTable.hasOwnProperty(string))
            return conversionTable[string];
        if (!_default_append)
            throw new Error("I do not know how to modify the following string: "
                + string +
                ". "
                + "Change your TeX file or submit a feature request at "
                + "https://github.com/digitalheir/tex-to-unicode/issues.");
        return string + _default_append;
    };
}
exports.lookupOrAppend = lookupOrAppend;
//# sourceMappingURL=command-expander.js.map