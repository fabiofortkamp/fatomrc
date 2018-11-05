"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var latex_parser_1 = require("latex-parser");
var unknown_command_1 = require("../unknown-command");
var index_1 = require("./commands/0args/index");
var KnownCommand_1 = require("../tex/KnownCommand");
var index_2 = require("./commands/1args/index");
var index_3 = require("../latex/commands/1args/index");
var sqrt_1 = require("./commands/sqrt/sqrt");
var index_4 = require("./commands/2args/index");
var index_5 = require("../latex/commands/2args/index");
var CategoryCode_1 = require("latex-parser/ts-compiled/Text/TeX/CategoryCode");
function isString(x) {
    return typeof x === "string";
}
function convertChars(blockIndex, latex) {
    var start = blockIndex;
    do
        blockIndex++;
    while (latex_parser_1.isTeXChar(latex[blockIndex]));
    var chars = latex.slice(start, blockIndex);
    var result = chars.map(function (s) { return s.string; }).join("");
    return {
        result: result,
        blockIndex: blockIndex
    };
}
var regexStartingWhitespace = /^\s*/;
function convertTeXCommand(options, blockIndex, latex, current) {
    var value = convertCommand(options, current);
    if (isString(value)) {
        return {
            result: value,
            blockIndex: blockIndex + 1
        };
    }
    else {
        var gobbledArguments = [];
        var rest = [];
        while (gobbledArguments.length < value.argumentCount && blockIndex < latex.length - 1) {
            blockIndex++;
            var nextWordToGobble = blockIndex;
            if (latex.length < nextWordToGobble - 1)
                throw new Error("Could not gobble " + value.argumentCount + " arguments for " + current.name);
            var nextLaTeXBlock = latex[nextWordToGobble];
            if (latex_parser_1.isTeXRaw(nextLaTeXBlock)) {
                var whitespaces = /\s+/g;
                var followingText = nextLaTeXBlock.text.replace(regexStartingWhitespace, "");
                var restIndex = -1;
                var lastIndex = 0;
                while (gobbledArguments.length < value.argumentCount) {
                    var argMatch = whitespaces.exec(followingText);
                    if (argMatch) {
                        var match = followingText.substring(lastIndex, argMatch.index);
                        restIndex = argMatch.index;
                        lastIndex = argMatch.index + match.length;
                        gobbledArguments.push.apply(gobbledArguments, CategoryCode_1.convertToTeXCharsDefault(match));
                    }
                    else {
                        gobbledArguments.push.apply(gobbledArguments, CategoryCode_1.convertToTeXCharsDefault(followingText));
                        break;
                    }
                }
                if (restIndex >= 0)
                    rest.push((followingText.substring(restIndex)));
            }
            else
                gobbledArguments.push(nextLaTeXBlock);
        }
        blockIndex++;
        var argumentsToApply = gobbledArguments
            .map(function (lll) { return convertLaTeXBlocksToUnicode(options, [lll]).result; })
            .map(latex_parser_1.newTeXRaw)
            .map(function (latex) { return latex_parser_1.newFixArg([latex]); });
        if (argumentsToApply.length < value.argumentCount)
            throw new Error("Could not find enough arguments for command \\" + value.name + ". Expected " + value.argumentCount + ", but found " + argumentsToApply.length);
        if (!value.apply)
            throw new Error("Can't apply " + JSON.stringify(value));
        var result = [
            value.apply(function () {
            }, argumentsToApply)
        ];
        if (rest.length > 0)
            result.push(rest.join(""));
        return {
            result: result.join(""),
            blockIndex: blockIndex
        };
    }
}
function isTeXChar2(x) {
    return x !== undefined
        && typeof x.string === "string"
        && typeof x.category === "number";
}
exports.isTeXChar2 = isTeXChar2;
function convertLaTeXBlocksToUnicode(options, latex) {
    var blockIndex = 0;
    if (latex.length <= 0)
        return {
            result: "",
            blockIndex: blockIndex
        };
    var finalConversion = [];
    while (blockIndex < latex.length) {
        var l = latex[blockIndex];
        try {
            if (isTeXChar2(l)) {
                var convertedChars = convertChars(blockIndex, latex);
                blockIndex = convertedChars.blockIndex;
                finalConversion.push(convertedChars.result);
            }
            else if (latex_parser_1.isTeXComm(l)) {
                var res = convertTeXCommand(options, blockIndex, latex, l);
                blockIndex = res.blockIndex;
                finalConversion.push(res.result);
            }
            else if (latex_parser_1.isFixArg(l) || latex_parser_1.isOptArg(l)) {
                var res = convertLaTeXBlocksToUnicode(options, l.latex);
                finalConversion.push(res.result);
                blockIndex++;
            }
            else if (latex_parser_1.isTextHaving(l)) {
                finalConversion.push(l.text);
                blockIndex++;
            }
            else if (latex_parser_1.isTeXMath(l)) {
                return convertLaTeXBlocksToUnicode(options, l.latex);
            }
            else if (latex_parser_1.isTeXRaw(l)) {
                finalConversion.push(l.text);
                blockIndex++;
            }
            else if (latex_parser_1.isSubOrSuperScript(l)) {
                var args = l.arguments ? l.arguments : [];
                var res = convertTeXCommand(options, blockIndex, latex, latex_parser_1.newTeXComm.apply(void 0, [l.type === latex_parser_1.SubOrSuperSymbol.SUB ? "mathsubscript" : "mathsuperscript"].concat(args)));
                blockIndex = res.blockIndex;
                finalConversion.push(res.result);
            }
            else if (latex_parser_1.isArray(l)) {
                var res = convertLaTeXBlocksToUnicode(options, l);
                finalConversion.push(res.result);
                blockIndex++;
            }
            else {
                throw new Error("Can't handle LaTeX block yet: " + (JSON.stringify(l)) + ". Leave an issue at https://github.com/digitalheir/tex-to-unicode/issues");
            }
        }
        catch (e) {
            if (options.onError !== undefined) {
                var saved = options.onError(e, l);
                if (saved !== undefined) {
                    finalConversion.push(saved);
                    blockIndex++;
                }
                else
                    throw e;
            }
            else
                throw e;
        }
    }
    return {
        result: finalConversion.join(""),
        blockIndex: blockIndex
    };
}
exports.convertLaTeXBlocksToUnicode = convertLaTeXBlocksToUnicode;
function convert1ArgCommand(options, cmd) {
    if (cmd.arguments.length > 0) {
        var expanded = index_2.expand1argsCommand(cmd.name, convertLaTeXBlocksToUnicode(options, [cmd.arguments[0]]).result || "");
        if (cmd.arguments.length > 1)
            return expanded + convertLaTeXBlocksToUnicode(options, cmd.arguments.slice(1)).result;
        else
            return expanded;
    }
    else
        return KnownCommand_1.createCommandHandler(cmd.name, 0, 1, function (cb, texArgs) {
            var firstArg = texArgs[0];
            var rest = texArgs.slice(1);
            var a = index_2.expand1argsCommand(cmd.name, convertLaTeXBlocksToUnicode(options, [firstArg]).result);
            var b = convertLaTeXBlocksToUnicode(options, rest).result;
            return a + b;
        });
}
function convert2ArgCommand(options, cmd) {
    if (cmd.arguments.length > 1) {
        var expanded = index_4.expand2argsCommand(cmd.name, convertLaTeXBlocksToUnicode(options, [cmd.arguments[0]]).result || "", convertLaTeXBlocksToUnicode(options, [cmd.arguments[1]]).result || "");
        if (cmd.arguments.length > 2)
            return expanded + convertLaTeXBlocksToUnicode(options, cmd.arguments.slice(1)).result;
        else
            return expanded;
    }
    else
        return KnownCommand_1.createCommandHandler(cmd.name, 0, 2, function (cb, texArgs) {
            var firstArg = texArgs[0];
            var secondArg = texArgs[1];
            var rest = texArgs.slice(2);
            var a = index_4.expand2argsCommand(cmd.name, convertLaTeXBlocksToUnicode(options, [firstArg]).result, convertLaTeXBlocksToUnicode(options, [secondArg]).result);
            var b = convertLaTeXBlocksToUnicode(options, rest).result;
            return a + b;
        });
}
function convertSqrt(options, cmd) {
    var base = undefined;
    var nucleus = undefined;
    var argIndex = 0;
    while (nucleus === undefined && argIndex < cmd.arguments.length) {
        var arg = cmd.arguments[argIndex];
        var argAsString = convertLaTeXBlocksToUnicode(options, [arg]).result;
        if (latex_parser_1.isOptArg(arg) && !base) {
            base = argAsString;
        }
        else {
            nucleus = argAsString;
        }
        argIndex++;
    }
    if (nucleus)
        return sqrt_1.convertSqrtToUnicode(nucleus, base);
    else
        return KnownCommand_1.createCommandHandler(cmd.name, 1, 1, function (cb, texArgs) {
            var firstArg = texArgs[0];
            var a = sqrt_1.convertSqrtToUnicode(convertLaTeXBlocksToUnicode(options, [firstArg]).result);
            if (texArgs.length > 1) {
                var rest = texArgs.slice(1);
                var b = convertLaTeXBlocksToUnicode(options, rest).result;
                return a + b;
            }
            return a;
        });
}
function convertCommand(options, cmd) {
    var commandName = cmd.name;
    var expanded0args = index_1.expand0argsCommand(commandName);
    if (!!expanded0args)
        if (cmd.arguments && cmd.arguments.length > 0)
            return expanded0args + convertLaTeXBlocksToUnicode(options, cmd.arguments).result;
        else
            return expanded0args;
    else if (index_3.is1argsCommand(commandName)) {
        return convert1ArgCommand(options, cmd);
    }
    else if (index_5.is2argsCommand(commandName)) {
        return convert2ArgCommand(options, cmd);
    }
    else if (commandName === "sqrt") {
        return convertSqrt(options, cmd);
    }
    else {
        throw unknown_command_1.unknownCommandError(commandName);
    }
}
exports.convertCommand = convertCommand;
//# sourceMappingURL=convert.js.map