import { CommandOptions } from "./options";
import { LaTeX } from "latex-parser";
export declare function convertLaTeX(options: CommandOptions, src: string): string;
export declare function convertLaTeXToUnicode(src: string): string;
export declare function convertLaTeXBlocks(options: CommandOptions, latex: LaTeX[]): string;
