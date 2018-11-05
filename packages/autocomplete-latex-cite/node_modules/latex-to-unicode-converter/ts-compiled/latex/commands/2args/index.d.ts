export declare const twoArgsCommands: {
    "frac": boolean;
    "nfrac": boolean;
    "cfrac": boolean;
    "xfrac": boolean;
    "sfrac": boolean;
} & {
    "binom": boolean;
};
export declare function is2argsCommand(name: string): name is keyof typeof twoArgsCommands;
