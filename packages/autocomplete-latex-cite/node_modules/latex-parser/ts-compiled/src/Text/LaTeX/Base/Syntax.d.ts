import { TeXChar } from "../../TeX/CategoryCode";
export declare type Measure = BuiltInMeasure | CustomMeasure;
export declare function isMeasure(x: any): x is Measure;
export declare const measureTypes: {
    "pt": boolean;
    "mm": boolean;
    "cm": boolean;
    "in": boolean;
    "ex": boolean;
    "em": boolean;
};
export declare type MeasureType = keyof typeof measureTypes;
export declare function isMeasureType(x: any): x is MeasureType;
export interface BuiltInMeasure {
    type: MeasureType;
    value: number;
}
export declare function isBuiltInMeasure(x: any): x is BuiltInMeasure;
export interface CustomMeasure {
    expression: LaTeXRaw;
}
export declare function isCustomMeasure(x: any): x is CustomMeasure;
export declare const mathTypes: {
    Parentheses: string;
    Square: string;
    Dollar: string;
};
export declare type MathType = keyof typeof mathTypes;
export declare function isMathType(x: any): x is MathType;
export interface NameHaving {
    name: string;
}
export declare function isNameHaving(x: any, name?: string): x is NameHaving;
export interface CharCodeHaving {
    charCode: number;
}
export interface CharacterCatergiesHaving {
    characterCategories: TeXChar[];
}
export interface TextHaving {
    text: string;
}
export declare function isTextHaving(x: any): x is TextHaving;
export interface LaTeXHaving {
    latex: LaTeXTxt[];
}
export declare type MultipleLaTeXHaving = LaTeXHaving;
export declare function isLaTeXHaving(x: any): x is LaTeXHaving;
export interface MathTypeHaving {
    type: MathType;
}
export interface ArgumentHaving {
    arguments: TeXArg[];
}
export declare function isArgumentHaving(x: any): x is ArgumentHaving;
export declare type LaTeX = LaTeXRaw | LaTeXNoRaw;
export declare type LaTeXRaw = TeXBuildingBlocks | TeXRaw;
export declare type LaTeXNoRaw = TeXBuildingBlocks | TeXChar;
export declare type TeXBuildingBlocks = TeXComm | TeXEnv | TeXMath | TeXLineBreak | SubOrSuperScript | TeXBraces | TeXComment;
export interface TypeHaving {
    type: string;
}
export declare type TypeTeXSeq = "TeXSeq";
export declare const typeTeXSeq: TypeTeXSeq;
export interface TypeHavingTeXSeq extends TypeHaving {
    type: TypeTeXSeq;
}
export declare type TypeTeXEnv = "TeXEnv";
export declare const typeTeXEnv: TypeTeXEnv;
export interface TypeHavingTeXEnv extends TypeHaving {
    type: TypeTeXEnv;
}
export declare type TypeTeXBraces = "TeXBraces";
export declare const typeTeXBraces: TypeTeXBraces;
export interface TypeHavingTeXBraces extends TypeHaving {
    type: TypeTeXBraces;
}
export declare type TypeTeXComment = "TeXComment";
export declare const typeTeXComment: TypeTeXComment;
export interface TypeHavingTeXComment extends TypeHaving {
    type: TypeTeXComment;
}
export declare type TypeTeXRaw = "TeXRaw";
export declare const typeTeXRaw: TypeTeXRaw;
export interface TypeHavingTeXRaw extends TypeHaving {
    type: TypeTeXRaw;
}
export declare type TypeTeXComm = "TeXComm" | TypeTeXCommS;
export declare const typeTeXComm: TypeTeXComm;
export interface TypeHavingTeXComm extends TypeHaving {
    type: TypeTeXComm;
}
export declare type TypeTeXCommS = "TeXCommS";
export declare const typeTeXCommS: TypeTeXCommS;
export interface TypeHavingTeXCommS extends TypeHaving {
    type: TypeTeXCommS;
}
export declare type TeXRaw = TextHaving & TypeHavingTeXRaw & CharacterCatergiesHaving;
export declare type TeXComment = TextHaving & TypeHavingTeXComment;
export declare type TeXComm = NameHaving & ArgumentHaving & TypeHavingTeXComm;
export declare type TeXEnv = MultipleLaTeXHaving & NameHaving & ArgumentHaving & TypeHavingTeXEnv;
export interface TeXMath extends MultipleLaTeXHaving, MathTypeHaving {
    startSymbol: string;
    endSymbol: string;
}
export declare type TeXBraces = LaTeXHaving & TypeHavingTeXBraces;
export declare enum SubOrSuperSymbol {
    SUP = 0,
    SUB = 1,
}
export declare function isSubOrSuperSymbol(x: any): x is SubOrSuperSymbol;
export interface SubOrSuperScript {
    type: SubOrSuperSymbol;
    symbol: string;
    arguments?: TeXArg[];
}
export interface TeXLineBreak {
    measure?: Measure;
    noNewPage: boolean;
}
export interface TeXCommS extends TeXComm {
    type: TypeTeXCommS;
}
export declare type TeXArg = FixArg | OptArg | MOptArg | SymArg | MSymArg | ParArg | MParArg;
export declare type FixArg = MultipleLaTeXHaving & TypeHavingFixArg;
export declare type OptArg = LaTeXHaving & TypeHavingOptArg;
export declare type SymArg = LaTeXHaving & TypeHavingSymArg;
export declare type ParArg = LaTeXHaving & TypeHavingParArg;
export declare type MOptArg = MultipleLaTeXHaving & TypeHavingMOptArg;
export declare type MSymArg = MultipleLaTeXHaving & TypeHavingMSymArg;
export declare type MParArg = MultipleLaTeXHaving & TypeHavingMParArg;
export interface TypeHavingFixArg extends TypeHaving {
    type: "FixArg";
}
export interface TypeHavingOptArg extends TypeHaving {
    type: "OptArg";
}
export interface TypeHavingMOptArg extends TypeHaving {
    type: "MOptArg";
}
export interface TypeHavingSymArg extends TypeHaving {
    type: "SymArg";
}
export interface TypeHavingMSymArg extends TypeHaving {
    type: "MSymArg";
}
export interface TypeHavingParArg extends TypeHaving {
    type: "ParArg";
}
export interface TypeHavingMParArg extends TypeHaving {
    type: "MParArg";
}
export declare const fromStringLaTeX: (x: string) => TeXRaw;
export declare const protectString: (s: string) => string;
export declare function protectChar(c: string): string;
export declare function isTypeHaving(x: any, ...anyOfTypes: string[]): x is TypeHaving;
export declare function isLaTeXBlock(x: any): x is (LaTeXRaw | LaTeXNoRaw);
export declare function isLaTeXNoRaw(x: any): x is LaTeXNoRaw;
export declare function isLaTeXRaw(x: any): x is LaTeXRaw;
export declare function isTeXRaw(x: any): x is TeXRaw;
export declare function isTeXChar(x: any): x is TeXChar;
export declare function isTeXComm(x: any): x is TeXComm;
export declare function isTeXCommS(x: any): x is TeXCommS;
export declare function isTeXEnv(x: any, name?: string): x is TeXEnv;
export declare function isTeXMath(x: any): x is TeXMath;
export declare function isTeXLineBreak(x: any): x is TeXLineBreak;
export declare function isSubOrSuperScript(x: any): x is SubOrSuperScript;
export declare function isTeXBraces(x: any): x is TeXBraces;
export declare function isFixArg(x: any): x is FixArg;
export declare function isOptArg(x: any): x is OptArg;
export declare function isTeXComment(x: any): x is TeXComment;
export declare function isTeXEmpty(e: any): boolean;
export declare type LaTeXTxt = LaTeXRaw | TeXChar;
export declare function newFixArg(l: LaTeXTxt[]): FixArg;
export declare function newOptArg(l: LaTeXTxt[]): MOptArg | OptArg;
export declare function newSymArg(l: LaTeXRaw): SymArg;
export declare function newParArg(l: LaTeXRaw): ParArg;
export declare function newMOptArg(l: LaTeXRaw[]): MOptArg;
export declare function newMSymArg(l: LaTeXRaw[]): MSymArg;
export declare function newMParArg(l: LaTeXRaw[]): MParArg;
export declare function newCommandS(name: string): TeXCommS;
export declare function newTeXRaw(text: string): TeXRaw;
export declare function newTeXMath(type: MathType, startSymbol: string, endSymbol: string, latex: LaTeXRaw[]): TeXMath;
export declare function newTeXBraces(latex: LaTeXRaw): TeXBraces;
export declare const newTeXMathDol: (l: LaTeXRaw[]) => TeXMath;
export declare function newTeXComment(text: string): TeXComment;
export declare function newTeXComm(name: string, ...args: TeXArg[]): TeXComm;
export declare function newSubOrSuperScript(type: SubOrSuperSymbol, symbol: string, args?: TeXArg[]): SubOrSuperScript;
export declare function newTeXEnv(name: string, latex: LaTeXRaw[], ...args: TeXArg[]): TeXEnv;
export declare function stringifyLaTeX(tex: LaTeX | TeXArg): string;
