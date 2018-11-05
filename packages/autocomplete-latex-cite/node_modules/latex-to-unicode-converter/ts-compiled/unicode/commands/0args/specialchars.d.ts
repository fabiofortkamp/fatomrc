import { ZeroArgsExpander } from "./expander";
export declare const specialCharacters: {
    "i": string;
    "j": string;
    "oe": string;
    "OE": string;
    "ae": string;
    "AE": string;
    "aa": string;
    "AA": string;
    "o": string;
    "O": string;
    "ss": string;
    "l": string;
    "L": string;
};
export declare type SpecialCharacter = keyof typeof specialCharacters;
export declare function isSpecialCharacter(x: string): x is SpecialCharacter;
export declare const specialCharacter: ZeroArgsExpander;
