import { Parser, Success, ResultInterface, Failure } from "parsimmon";
import { FixArg, LaTeXRaw, MOptArg, OptArg, SubOrSuperScript, SubOrSuperSymbol, TeXArg, TeXComm, TeXComment, TeXEnv, TeXMath } from "./Syntax";
import { TeXRaw } from "./Syntax";
import { LatexMode } from "../../../../deprecated/lib/Latex/Mode";
export interface ParserConf {
    verbatimEnvironments: String[];
}
export declare const defaultParserConf: ParserConf;
export declare const takeTill: (predicate: (c: string) => boolean) => Parser<string>;
export declare const notTextDefault: {
    "$": boolean;
    "%": boolean;
    "\\": boolean;
    "{": boolean;
    "]": boolean;
    "}": boolean;
};
export declare const notTextMathMode: {
    "^": boolean;
    "_": boolean;
    "$": boolean;
    "%": boolean;
    "\\": boolean;
    "{": boolean;
    "]": boolean;
    "}": boolean;
};
export declare const notTextMathModeAndNotClosingBracket: {
    "^": boolean;
    "_": boolean;
    "$": boolean;
    "%": boolean;
    "\\": boolean;
    "{": boolean;
    "}": boolean;
};
export declare const notTextDefaultAndNotClosingBracket: {
    "$": boolean;
    "%": boolean;
    "\\": boolean;
    "{": boolean;
    "}": boolean;
};
export declare function textParser(notText: {
    [k: string]: boolean;
}): Parser<TeXRaw>;
export declare const comment: Parser<TeXComment>;
export declare const specialCharsDefault: {
    "'": boolean;
    "(": boolean;
    ")": boolean;
    ",": boolean;
    ".": boolean;
    "-": boolean;
    '"': boolean;
    "!": boolean;
    "^": boolean;
    "$": boolean;
    "&": boolean;
    "#": boolean;
    "{": boolean;
    "}": boolean;
    "%": boolean;
    "~": boolean;
    "|": boolean;
    "/": boolean;
    ":": boolean;
    ";": boolean;
    "=": boolean;
    "[": boolean;
    "]": boolean;
    "\\": boolean;
    "`": boolean;
    " ": boolean;
};
export declare function isSpecialCharacter(char: string, specialChars?: {
    [k: string]: boolean;
}): boolean;
export declare function isNotText(notText: {
    [k: string]: boolean;
}): (char: string) => boolean;
export declare const mathSymbol: Parser<string>;
export declare const commandSymbol: Parser<string>;
export declare function latexBlockParser(mode: LatexMode, sub?: string, sup?: string): Parser<LaTeXRaw>;
export declare const latexBlockParserTextMode: Parser<LaTeXRaw>;
export declare const latexBlockParserMathMode: (sub: string, sup: string) => Parser<LaTeXRaw>;
export declare const latexParser: Parser<LaTeXRaw[]>;
export declare const env: Parser<TeXEnv>;
export declare const environment: Parser<any>;
export declare const specialChar: Parser<string>;
export declare const endCmd: (c: string) => boolean;
export declare function fixArg(mode: LatexMode): Parser<FixArg>;
export declare function optArg(mode: LatexMode): Parser<MOptArg | OptArg>;
export declare function cmdArg(mode: LatexMode): Parser<TeXArg>;
export declare function cmdArgs(mode: LatexMode): Parser<TeXArg[] | undefined>;
export declare function command(mode: LatexMode): Parser<TeXComm>;
export declare const subOrSuperscriptSymbolParser: (a: string, b: string) => Parser<SubOrSuperSymbol>;
export declare function shiftedScript(mode: LatexMode, sub: string, sup: string): Parser<SubOrSuperScript>;
export declare const dolMath: Parser<TeXMath>;
export declare function isOk<T>(parse?: ResultInterface<T>): parse is Success<T>;
export declare function isNotOk<T>(parse?: any): parse is Failure;
export declare function mustBeOk<T>(parse?: ResultInterface<T>): Success<T>;
