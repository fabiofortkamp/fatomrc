export declare type CharacterCategory = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export declare const defaultCategories: (char: string) => CharacterCategory;
export interface TeXChar {
    string: string;
    category: CharacterCategory;
}
export declare function convertToTeXCharsDefault(str: string): TeXChar[];
export declare function convertToTeXChars(categoryMap: (unicode: string) => CharacterCategory, str: string): TeXChar[];
