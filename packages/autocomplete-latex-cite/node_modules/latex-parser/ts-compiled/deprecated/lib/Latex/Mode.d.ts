export declare const modes: {
    LIST: string;
    MATH: string;
    PICTURE: string;
    TABLE: string;
    TEXT: string;
    VERTICAL: string;
};
export declare type KirillMode = keyof typeof modes;
export declare function isKirillMode(x: any): x is KirillMode;
export declare function mustBeKirillMode(x: any, msg?: string): KirillMode;
export declare type LatexMode = "Paragraph" | "Math" | "LR";
export declare function isLatexMode(x: any): x is LatexMode;
export declare function mustBeLatexMode(x: any, msg?: string): LatexMode;
export declare type ModeStates = {
    [mode: string]: boolean;
};
