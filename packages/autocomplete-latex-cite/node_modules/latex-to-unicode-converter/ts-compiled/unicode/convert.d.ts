import { TeXChar, TeXComm, LaTeX, TeXArg } from "latex-parser";
import { CommandOptions } from "../options";
import { ArgumentNeeded } from "../tex/KnownCommand";
export interface ConversionResult {
    result: string;
    blockIndex: number;
}
export declare function isTeXChar2(x: any): x is TeXChar;
export declare function convertLaTeXBlocksToUnicode(options: CommandOptions, latex: (LaTeX | TeXArg)[]): ConversionResult;
export declare function convertCommand(options: CommandOptions, cmd: TeXComm): string | ArgumentNeeded;
