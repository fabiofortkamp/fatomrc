import { LaTeX, TeXArg } from "latex-parser";
export declare const supportedMarkups: {
    "ascii": boolean;
    "unicode": boolean;
    "html": boolean;
};
export declare type SupportedMarkup = keyof typeof supportedMarkups;
export declare type LaTeXMode = "Text" | "Math" | "Any";
export interface CommandOptions {
    translateTo?: SupportedMarkup;
    mode?: LaTeXMode;
    onError?: (e: Error, l: LaTeX | TeXArg) => string | undefined;
}
