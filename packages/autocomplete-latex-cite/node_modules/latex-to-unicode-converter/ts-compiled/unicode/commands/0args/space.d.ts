import { ZeroArgsExpander } from "./expander";
export declare const mathSpace = "芇";
export declare const spaceCharactersUnicode: {
    ",": string;
    "quad": string;
    "qquad": string;
    " ": string;
    "space": string;
    ";": string;
    ":": string;
    "hfill": string;
};
export declare type SpaceCharactersUnicode = keyof typeof spaceCharactersUnicode;
export declare function isSpaceCharactersUnicode(x: string): x is SpaceCharactersUnicode;
export declare const spaceUnicode: ZeroArgsExpander;
