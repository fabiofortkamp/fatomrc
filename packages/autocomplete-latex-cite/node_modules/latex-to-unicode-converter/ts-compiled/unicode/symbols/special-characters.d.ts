export declare const specialChars: {
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
export declare type SpecialChar = (keyof typeof specialChars);
export declare function isSpecialChar(c: string): c is SpecialChar;
