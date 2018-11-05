export declare type LatexMode = "Paragraph" | "Math" | "LR";
export declare function isLatexMode(x: any): x is LatexMode;
export declare function mustBeLatexMode(x: any, msg?: string): LatexMode;
