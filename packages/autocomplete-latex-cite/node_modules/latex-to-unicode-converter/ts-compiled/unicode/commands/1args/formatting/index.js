"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blackboard_1 = require("./blackboard");
var boldfont_1 = require("./boldfont");
var fraktur_1 = require("./fraktur");
var italic_1 = require("./italic");
var monospace_1 = require("./monospace");
var textcal_1 = require("./textcal");
var formatting_1 = require("../../../../latex/commands/1args/formatting");
var subscript_1 = require("./subscript");
var superscript_1 = require("./superscript");
var mono_1 = require("./mono");
exports.formattingUnicode = function (cmdName, arg) {
    var fn = undefined;
    if (formatting_1.isBbCmd(cmdName))
        fn = blackboard_1.translateCharToBlackboard;
    else if (formatting_1.isBfCmd(cmdName))
        fn = boldfont_1.translateCharToBold;
    else if (formatting_1.isFrakCmd(cmdName))
        fn = fraktur_1.translateCharToFraktur;
    else if (formatting_1.isItCmd(cmdName))
        fn = italic_1.translateCharToItalic;
    else if (formatting_1.isTtCmd(cmdName))
        fn = monospace_1.translateCharToMonospace;
    else if (formatting_1.isCalCmd(cmdName))
        fn = textcal_1.translateCharToCalligraphic;
    else if (formatting_1.isSubCmd(cmdName))
        fn = subscript_1.translateCharToSubscript;
    else if (formatting_1.isSupCmd(cmdName))
        fn = superscript_1.translateCharToSuperscript;
    else if (formatting_1.isMonoCmd(cmdName))
        fn = mono_1.translateCharToMono;
    if (!!fn) {
        var fun_1 = fn;
        return arg.split("").map(function (char) { return (fun_1(char) || char); }).join("");
    }
    else
        return undefined;
};
//# sourceMappingURL=index.js.map