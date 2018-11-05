"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../../Utils");
var CategoryCode_1 = require("../../TeX/CategoryCode");
function isMeasure(x) {
    return isBuiltInMeasure(x) || isCustomMeasure(x);
}
exports.isMeasure = isMeasure;
exports.measureTypes = {
    "pt": true,
    "mm": true,
    "cm": true,
    "in": true,
    "ex": true,
    "em": true,
};
function isMeasureType(x) {
    return exports.measureTypes.hasOwnProperty(x);
}
exports.isMeasureType = isMeasureType;
function isBuiltInMeasure(x) {
    return isMeasureType(x.type) && Utils_1.isNumber(x.value);
}
exports.isBuiltInMeasure = isBuiltInMeasure;
function isCustomMeasure(x) {
    return isLaTeXBlock(x.expression);
}
exports.isCustomMeasure = isCustomMeasure;
exports.mathTypes = {
    Parentheses: "Parentheses",
    Square: "Square",
    Dollar: "Dollar"
};
function isMathType(x) {
    if (x === undefined)
        return false;
    else
        switch (x) {
            case "Parentheses":
            case "Square":
            case "Dollar":
                return true;
            default:
                return false;
        }
}
exports.isMathType = isMathType;
function isNameHaving(x, name) {
    return x !== undefined && (name === undefined
        ? typeof x.name === "string"
        : name === x.name);
}
exports.isNameHaving = isNameHaving;
function isTextHaving(x) {
    return x !== undefined && typeof x.text === "string";
}
exports.isTextHaving = isTextHaving;
function isLaTeXHaving(x) {
    return x !== undefined && Utils_1.isArray(x.latex);
}
exports.isLaTeXHaving = isLaTeXHaving;
function isArgumentHaving(x) {
    return x.arguments instanceof Array;
}
exports.isArgumentHaving = isArgumentHaving;
exports.typeTeXSeq = "TeXSeq";
exports.typeTeXEnv = "TeXEnv";
exports.typeTeXBraces = "TeXBraces";
exports.typeTeXComment = "TeXComment";
exports.typeTeXRaw = "TeXRaw";
exports.typeTeXComm = "TeXComm";
exports.typeTeXCommS = "TeXCommS";
var SubOrSuperSymbol;
(function (SubOrSuperSymbol) {
    SubOrSuperSymbol[SubOrSuperSymbol["SUP"] = 0] = "SUP";
    SubOrSuperSymbol[SubOrSuperSymbol["SUB"] = 1] = "SUB";
})(SubOrSuperSymbol = exports.SubOrSuperSymbol || (exports.SubOrSuperSymbol = {}));
function isSubOrSuperSymbol(x) {
    return x === SubOrSuperSymbol.SUP || x === SubOrSuperSymbol.SUB;
}
exports.isSubOrSuperSymbol = isSubOrSuperSymbol;
exports.fromStringLaTeX = function (x) { return newTeXRaw(exports.protectString(x)); };
exports.protectString = function (s) {
    var newString = [];
    for (var i = 0; i < s.length; i++)
        newString.push(protectChar(s.charAt(i)));
    return newString.join();
};
function protectChar(c) {
    switch (c) {
        case "#":
            return "\\#";
        case "$":
            return "\\$";
        case "%":
            return "\\%";
        case "^":
            return "\\^{}";
        case "&":
            return "\\&";
        case "{":
            return "\\{";
        case "}":
            return "\\}";
        case "~":
            return "\\~{}";
        case "\\":
            return "\\textbackslash{}";
        case "_":
            return "\\_{}";
        default:
            return c;
    }
}
exports.protectChar = protectChar;
function isTypeHaving(x) {
    var anyOfTypes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        anyOfTypes[_i - 1] = arguments[_i];
    }
    return anyOfTypes.length === 0 ? typeof x.type === "string" : anyOfTypes.some(function (type) { return x.type === type; });
}
exports.isTypeHaving = isTypeHaving;
function isLaTeXBlock(x) {
    return isLaTeXRaw(x) || isLaTeXNoRaw(x);
}
exports.isLaTeXBlock = isLaTeXBlock;
function isLaTeXNoRaw(x) {
    return isTeXEmpty(x)
        || isTeXChar(x)
        || isTeXComm(x)
        || isTeXEnv(x)
        || isTeXMath(x)
        || isTeXLineBreak(x)
        || isTeXBraces(x)
        || isTeXComment(x);
}
exports.isLaTeXNoRaw = isLaTeXNoRaw;
function isLaTeXRaw(x) {
    return isTeXEmpty(x)
        || isTeXRaw(x)
        || isTeXComm(x)
        || isTeXEnv(x)
        || isTeXMath(x)
        || isTeXLineBreak(x)
        || isTeXBraces(x)
        || isTeXComment(x);
}
exports.isLaTeXRaw = isLaTeXRaw;
function isTeXRaw(x) {
    return x !== undefined
        && x.type !== undefined
        && isTextHaving(x) && isTypeHaving(x, exports.typeTeXRaw);
}
exports.isTeXRaw = isTeXRaw;
function isTeXChar(x) {
    return x !== undefined
        && typeof x.string === "string"
        && typeof x.category === "number";
}
exports.isTeXChar = isTeXChar;
function isTeXComm(x) {
    return isNameHaving(x)
        && isArgumentHaving(x)
        && isTypeHaving(x, exports.typeTeXComm, exports.typeTeXCommS);
}
exports.isTeXComm = isTeXComm;
function isTeXCommS(x) {
    return isTeXComm(x) && x.arguments.length === 0;
}
exports.isTeXCommS = isTeXCommS;
function isTeXEnv(x, name) {
    return isTypeHaving(x, exports.typeTeXEnv);
}
exports.isTeXEnv = isTeXEnv;
function isTeXMath(x) {
    return isLaTeXHaving(x) && isTypeHaving(x) && isMathType(x.type);
}
exports.isTeXMath = isTeXMath;
function isTeXLineBreak(x) {
    return x !== undefined && typeof x.noNewPage === "boolean" && (x.measure === undefined || isMeasure(x.measure));
}
exports.isTeXLineBreak = isTeXLineBreak;
function isSubOrSuperScript(x) {
    return isSubOrSuperSymbol(x.type);
}
exports.isSubOrSuperScript = isSubOrSuperScript;
function isTeXBraces(x) {
    return isLaTeXHaving(x) && isTypeHaving(x, exports.typeTeXBraces);
}
exports.isTeXBraces = isTeXBraces;
function isFixArg(x) {
    return isTypeHaving(x, "FixArg");
}
exports.isFixArg = isFixArg;
function isOptArg(x) {
    return isTypeHaving(x, "OptArg");
}
exports.isOptArg = isOptArg;
function isTeXComment(x) {
    return isTextHaving(x) && isTypeHaving(x, exports.typeTeXComment);
}
exports.isTeXComment = isTeXComment;
function isTeXEmpty(e) {
    return e !== undefined && Object.keys(e).length === 0;
}
exports.isTeXEmpty = isTeXEmpty;
function newFixArg(l) {
    return { type: "FixArg", latex: l };
}
exports.newFixArg = newFixArg;
function newOptArg(l) {
    return l.length === 1 ? { type: "OptArg", latex: l } : { type: "MOptArg", latex: l };
}
exports.newOptArg = newOptArg;
function newSymArg(l) {
    return { type: "SymArg", latex: [l] };
}
exports.newSymArg = newSymArg;
function newParArg(l) {
    return { type: "ParArg", latex: [l] };
}
exports.newParArg = newParArg;
function newMOptArg(l) {
    return { type: "MOptArg", latex: l };
}
exports.newMOptArg = newMOptArg;
function newMSymArg(l) {
    return { type: "MSymArg", latex: l };
}
exports.newMSymArg = newMSymArg;
function newMParArg(l) {
    return { type: "MParArg", latex: l };
}
exports.newMParArg = newMParArg;
function newCommandS(name) {
    return {
        name: name,
        arguments: [],
        type: exports.typeTeXCommS
    };
}
exports.newCommandS = newCommandS;
function newTeXRaw(text) {
    return {
        text: text,
        type: exports.typeTeXRaw,
        characterCategories: CategoryCode_1.convertToTeXCharsDefault(text)
    };
}
exports.newTeXRaw = newTeXRaw;
function newTeXMath(type, startSymbol, endSymbol, latex) {
    return {
        latex: latex,
        type: type,
        startSymbol: startSymbol,
        endSymbol: endSymbol
    };
}
exports.newTeXMath = newTeXMath;
function newTeXBraces(latex) {
    return {
        latex: [latex],
        type: exports.typeTeXBraces
    };
}
exports.newTeXBraces = newTeXBraces;
exports.newTeXMathDol = function (latex) {
    return newTeXMath("Dollar", "$", "$", latex);
};
function newTeXComment(text) {
    return {
        text: text,
        type: exports.typeTeXComment
    };
}
exports.newTeXComment = newTeXComment;
function newTeXComm(name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return {
        name: name,
        arguments: args,
        type: exports.typeTeXComm
    };
}
exports.newTeXComm = newTeXComm;
function newSubOrSuperScript(type, symbol, args) {
    return {
        type: type,
        symbol: symbol,
        arguments: args
    };
}
exports.newSubOrSuperScript = newSubOrSuperScript;
function newTeXEnv(name, latex) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return {
        name: name,
        latex: latex,
        arguments: args,
        type: exports.typeTeXEnv
    };
}
exports.newTeXEnv = newTeXEnv;
function stringifyLaTeX(tex) {
    var arr = [];
    (stringifyLaTeXInner(tex, arr));
    return arr.join("");
}
exports.stringifyLaTeX = stringifyLaTeX;
function stringifyLaTeXInner(tex, soFar) {
    if (isTeXComm(tex)) {
        soFar.push("\\", tex.name);
        tex.arguments.forEach(function (l) { return stringifyLaTeXInner(l, soFar); });
    }
    else if (isTeXEnv(tex))
        throw new Error("not supported yet");
    else if (isTeXMath(tex)) {
        soFar.push(tex.startSymbol);
        tex.latex.forEach(function (t) { return stringifyLaTeXInner(t, soFar); });
        soFar.push(tex.endSymbol);
    }
    else if (isTeXLineBreak(tex))
        soFar.push("\n");
    else if (isSubOrSuperScript(tex)) {
        soFar.push(tex.symbol);
        if (tex.arguments)
            tex.arguments.forEach(function (arg) { return (stringifyLaTeXInner(arg, soFar)); });
    }
    else if (isTeXBraces(tex)) {
        soFar.push("{");
        tex.latex.forEach(function (t) { return stringifyLaTeXInner(t, soFar); });
        soFar.push("}");
    }
    else if (isTeXComment(tex)) {
        soFar.push("%" + tex.text + "\n");
    }
    else if (isTeXRaw(tex))
        soFar.push(tex.text);
    else if (isTeXChar(tex))
        throw new Error("not supported yet");
    else if (isFixArg(tex)) {
        soFar.push("{");
        tex.latex.forEach(function (t) { return stringifyLaTeXInner(t, soFar); });
        soFar.push("}");
    }
    else if (isOptArg(tex)) {
        soFar.push("[");
        tex.latex.forEach(function (t) { return stringifyLaTeXInner(t, soFar); });
        soFar.push("]");
    }
    else
        throw new Error("Did not recognize " + JSON.stringify(tex));
}
//# sourceMappingURL=Syntax.js.map