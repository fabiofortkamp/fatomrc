"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parsimmon_1 = require("parsimmon");
var Syntax_1 = require("./Syntax");
var Syntax_2 = require("./Syntax");
var Utils_1 = require("../../../Utils");
var parsimmon_2 = require("parsimmon");
exports.defaultParserConf = {
    verbatimEnvironments: ["verbatim"]
};
exports.takeTill = function (predicate) { return parsimmon_1.takeWhile(function (c) { return !predicate(c); }); };
var takeTillNewline = parsimmon_1.regexp(/[^\n]*/);
var maybeNewline = parsimmon_1.regexp(/\n?/);
var whitespace = parsimmon_1.regexp(/\s*/m);
var commentSymbol = parsimmon_1.string("%");
function unsafeUnion(xs, ys) {
    var xn = xs.length;
    var yn = ys.length;
    if (xn === 0) {
        return ys;
    }
    else if (yn === 0) {
        return xs;
    }
    var obj = {};
    for (var i = 0; i < xn; i++) {
        obj[xs[i]] = true;
    }
    for (var j = 0; j < yn; j++) {
        obj[ys[j]] = true;
    }
    var keys = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    keys.sort();
    return keys;
}
function mergeReplies(result, last) {
    if (!last) {
        return result;
    }
    if (result.furthest > last.furthest) {
        return result;
    }
    var expected = (result.furthest === last.furthest)
        ? unsafeUnion(result.expected, last.expected)
        : last.expected;
    return {
        status: result.status,
        index: result.index,
        value: result.value,
        furthest: last.furthest,
        expected: expected
    };
}
function manyTillAndMap(manyOf, till, map, initial) {
    return parsimmon_1.Parser(function (input, i) {
        var accum = initial;
        var j = 0;
        var result = undefined;
        while (i < input.length) {
            var endCodonFound = till._(input, i);
            if (endCodonFound.status) {
                i = Utils_1.mustBeNumber(endCodonFound.index);
                break;
            }
            var bigParse = manyOf._(input, i);
            if (isNotOk(bigParse))
                return bigParse;
            result = Utils_1.mustNotBeUndefined(mergeReplies(bigParse, result));
            if (isNotOk(result)) {
                return result;
            }
            j++;
            var value = Utils_1.mustNotBeUndefined(result.value);
            accum = map(accum, value);
            i = Utils_1.mustBeNumber(result.index);
        }
        var result2 = parsimmon_1.makeSuccess(i, accum);
        return mustBeOk(mergeReplies(result2, result));
    });
}
function manyTill(manyOf, till) {
    return manyTillAndMap(manyOf, till, function (a, el) { return a.concat([el]); }, []);
}
function token(parser) {
    return parser.skip(whitespace);
}
function word(str) {
    return parsimmon_1.string(str).thru(token);
}
var lbrace = "{";
var rbrace = "}";
var lbracket = "[";
var rbracket = "]";
var comma = ",";
var colon = ":";
var openingBracket = parsimmon_1.string(lbracket);
var closingBracket = parsimmon_1.string(rbracket);
var isClosingbracket = function (str) { return str === (rbracket); };
exports.notTextDefault = {
    "$": true,
    "%": true,
    "\\": true,
    "{": true,
    "]": true,
    "}": true
};
exports.notTextMathMode = {
    "^": true,
    "_": true,
    "$": true,
    "%": true,
    "\\": true,
    "{": true,
    "]": true,
    "}": true
};
exports.notTextMathModeAndNotClosingBracket = {
    "^": true,
    "_": true,
    "$": true,
    "%": true,
    "\\": true,
    "{": true,
    "}": true
};
exports.notTextDefaultAndNotClosingBracket = {
    "$": true,
    "%": true,
    "\\": true,
    "{": true,
    "}": true
};
function takeAtLeastOneTill(till) {
    return parsimmon_1.Parser(function (str, i) {
        var firstChar = str.charAt(i);
        if (i >= str.length || till(firstChar)) {
            return parsimmon_2.makeFailure(i, "text character");
        }
        else {
            var strz = [firstChar];
            i++;
            var char = str.charAt(i);
            while (!till(char) && i < str.length) {
                strz.push(char);
                i++;
                char = str.charAt(i);
            }
            return parsimmon_1.makeSuccess(i, strz.join(""));
        }
    });
}
function textParser(notText) {
    return takeAtLeastOneTill(isNotText(notText))
        .map(function (match) { return Syntax_2.newTeXRaw(match); });
}
exports.textParser = textParser;
var text = textParser(exports.notTextDefault);
var text2 = textParser(exports.notTextDefaultAndNotClosingBracket);
var spaces = parsimmon_1.regexp(/ */)
    .map(Syntax_2.newTeXRaw);
exports.comment = commentSymbol
    .then(takeTillNewline)
    .skip(maybeNewline)
    .map(Syntax_1.newTeXComment);
exports.specialCharsDefault = {
    "'": true,
    "(": true,
    ")": true,
    ",": true,
    ".": true,
    "-": true,
    '"': true,
    "!": true,
    "^": true,
    "$": true,
    "&": true,
    "#": true,
    "{": true,
    "}": true,
    "%": true,
    "~": true,
    "|": true,
    "/": true,
    ":": true,
    ";": true,
    "=": true,
    "[": true,
    "]": true,
    "\\": true,
    "`": true,
    " ": true
};
function isSpecialCharacter(char, specialChars) {
    var chars = specialChars === undefined ? exports.specialCharsDefault : specialChars;
    return chars.hasOwnProperty(char);
}
exports.isSpecialCharacter = isSpecialCharacter;
function isNotText(notText) {
    return function (char) { return notText.hasOwnProperty(char); };
}
exports.isNotText = isNotText;
exports.mathSymbol = parsimmon_1.string("$");
exports.commandSymbol = parsimmon_1.string("\\");
function latexBlockParser(mode, sub, sup) {
    if (sub === void 0) { sub = "_"; }
    if (sup === void 0) { sup = "^"; }
    switch (mode) {
        case "Math":
            return exports.latexBlockParserMathMode(sub, sup);
        default:
            return exports.latexBlockParserTextMode;
    }
}
exports.latexBlockParser = latexBlockParser;
exports.latexBlockParserTextMode = parsimmon_1.lazy(function () { return parsimmon_1.alt(parsimmon_1.alt(textParser(exports.notTextDefault), exports.dolMath, exports.comment, textParser(exports.notTextDefaultAndNotClosingBracket), exports.environment, command("Paragraph"))); });
exports.latexBlockParserMathMode = function (sub, sup) {
    return parsimmon_1.lazy(function () { return parsimmon_1.alt(parsimmon_1.alt(shiftedScript("Math", sub, sup), textParser(exports.notTextMathMode), exports.dolMath, exports.comment, textParser(exports.notTextMathModeAndNotClosingBracket), exports.environment, command("Math"))); });
};
exports.latexParser = exports.latexBlockParserTextMode.many();
var anonym = parsimmon_1.string(lbrace)
    .then(exports.latexBlockParserTextMode.many())
    .skip(parsimmon_1.string(rbrace));
exports.env = parsimmon_1.Parser(function (input, i) {
    var beginFound = parsimmon_1.string("\\begin")
        .then(parsimmon_1.string(lbrace))
        .then(spaces)
        .then(parsimmon_1.regexp(/[a-zA-Z]+/))
        .skip(spaces)
        .skip(parsimmon_1.string(rbrace))
        ._(input, i);
    if (isNotOk(beginFound))
        return beginFound;
    i = Utils_1.mustBeNumber(beginFound.index);
    var envName = beginFound.value;
    return manyTill(exports.latexBlockParserTextMode, parsimmon_1.string("\\end")
        .then(parsimmon_1.string(lbrace))
        .then(spaces)
        .then(parsimmon_1.string(envName))
        .then(spaces)
        .then(parsimmon_1.string(rbrace))).map(function (latex) { return Syntax_1.newTeXEnv(envName, latex); })._(input, i);
});
exports.environment = parsimmon_1.alt(anonym, exports.env);
exports.specialChar = parsimmon_1.test(isSpecialCharacter);
function isUppercaseAlph(c) {
    return c >= "A" && c <= "Z";
}
function isLowercaseAlph(c) {
    return c >= "a" && c <= "z";
}
exports.endCmd = function (c) { return !isLowercaseAlph(c) && !isUppercaseAlph(c); };
var openingBrace = parsimmon_1.string("{");
var closingBrace = parsimmon_1.string("}");
var isClosingBrace = function (str) { return str === ("}"); };
function fixArg(mode) {
    return openingBrace
        .then(manyTill(latexBlockParser(mode, "_"), closingBrace)).map(Syntax_1.newFixArg);
}
exports.fixArg = fixArg;
function optArg(mode) {
    return openingBracket
        .then(manyTill(latexBlockParser(mode), closingBracket))
        .map(Syntax_1.newOptArg);
}
exports.optArg = optArg;
function cmdArg(mode) {
    return parsimmon_1.alt(fixArg(mode), optArg(mode));
}
exports.cmdArg = cmdArg;
function cmdArgs(mode) {
    return parsimmon_1.alt(parsimmon_1.string("{}").map(function () { return []; }), cmdArg(mode).map(function (s) { return s; }).atLeast(0)).map(function (e) { return e; });
}
exports.cmdArgs = cmdArgs;
function command(mode) {
    return parsimmon_1.seqMap(exports.commandSymbol, parsimmon_1.alt(exports.specialChar, exports.takeTill(exports.endCmd)), cmdArgs(mode), function (ignored, name, argz) {
        return argz !== undefined ? Syntax_1.newTeXComm.apply(void 0, [name].concat(argz)) : Syntax_1.newTeXComm(name);
    }).map(function (res) {
        return res;
    });
}
exports.command = command;
exports.subOrSuperscriptSymbolParser = function (subscriptSymbol, superscriptSymbol) {
    return parsimmon_1.alt(parsimmon_1.string(subscriptSymbol), parsimmon_1.string(superscriptSymbol)).map(function (parsedStr) { return (parsedStr === subscriptSymbol ? Syntax_1.SubOrSuperSymbol.SUB : Syntax_1.SubOrSuperSymbol.SUP); });
};
function shiftedScript(mode, sub, sup) {
    return parsimmon_1.seqMap(exports.subOrSuperscriptSymbolParser(sub, sup), cmdArgs(mode), function (symbol, argz) {
        return Syntax_1.newSubOrSuperScript(symbol, symbol === Syntax_1.SubOrSuperSymbol.SUB ? sub : sup, argz);
    }).map(function (res) {
        return res;
    });
}
exports.shiftedScript = shiftedScript;
exports.dolMath = math();
function math(mathType, sMath, eMath) {
    if (mathType === void 0) { mathType = "Dollar"; }
    if (sMath === void 0) { sMath = "$"; }
    if (eMath === void 0) { eMath = "$"; }
    return parsimmon_1.string(sMath)
        .then(latexBlockParser("Math", "_")
        .many()
        .map(function (str) { return Syntax_1.newTeXMath(mathType, sMath, eMath, str); }))
        .skip(parsimmon_1.string(eMath));
}
function isOk(parse) {
    return parse !== undefined && parse.status === true;
}
exports.isOk = isOk;
function isNotOk(parse) {
    return parse !== undefined && parse.status === false;
}
exports.isNotOk = isNotOk;
function mustBeOk(parse) {
    if (!isOk(parse))
        throw new Error("Expected parse to be success: " + JSON.stringify(parse));
    return parse;
}
exports.mustBeOk = mustBeOk;
//# sourceMappingURL=Parser.js.map