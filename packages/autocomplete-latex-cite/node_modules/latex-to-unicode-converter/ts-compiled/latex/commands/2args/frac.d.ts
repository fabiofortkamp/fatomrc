export declare const fracCmds: {
    "frac": boolean;
    "nfrac": boolean;
    "cfrac": boolean;
    "xfrac": boolean;
    "sfrac": boolean;
};
export declare type FracCmd = keyof typeof fracCmds;
export declare function isFracCmd(x: string): x is FracCmd;
