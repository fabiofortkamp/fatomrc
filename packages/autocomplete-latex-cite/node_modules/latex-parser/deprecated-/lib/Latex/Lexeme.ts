/**
 * LaTeX lexeme
 * @enum {string}
 */
export const Lexeme = {
    CELL_SEPARATOR: "CELL_SEPARATOR",           // table cell separator
    BRACKETS: "BRACKETS",                       // logical brackets
    BINARY_OPERATOR: "BINARY_OPERATOR",         // mathematical binary operator
    CHAR: "CHAR",                               // character
    DIGIT: "DIGIT",                             // digit
    DIRECTIVE: "DIRECTIVE",                     // LaTeX directive
    DISPLAY_EQUATION: "DISPLAY_EQUATION",       // mathematical equation for display mode
    FILE_PATH: "FILE_PATH",                     // file system path
    FLOATING_BOX: "FLOATING_BOX",               // floating box
    HORIZONTAL_SKIP: "HORIZONTAL_SKIP",         // any type of horizontal skip but not space
    INLINE_EQUATION: "INLINE_EQUATION",         // mathematical equation for inline mode
    LABEL: "LABEL",                             // label identifier
    LENGTH: "LENGTH",                           // linear dimension
    LETTER: "LETTER",                           // word letter
    LINE_BREAK: "LINE_BREAK",                   // text line break
    NUMBER: "NUMBER",                           // sequence of digits
    LIST: "LIST",                               // list of items
    LIST_ITEM: "LIST_ITEM",                     // list item
    PARAGRAPH_SEPARATOR: "PARAGRAPH_SEPARATOR", // paragraph separator
    PICTURE: "PICTURE",                         // picture
    POST_OPERATOR: "POST_OPERATOR",             // mathematical post-operator
    PRE_OPERATOR: "PRE_OPERATOR",               // mathematical pre-operator
    RAW: "RAW",                                 // unprocessable or raw sources
    SPACE: "SPACE",                             // any type of space equivalent
    SUBSCRIPT: "SUBSCRIPT",                     // subscript text
    SUPERSCRIPT: "SUPERSCRIPT",                 // subscript text
    TABLE: "TABLE",                             // table
    TABULAR_PARAMETERS: "TABULAR_PARAMETERS",   // LaTeX tabular parameters
    TAG: "TAG",                                 // formatting tag
    UNKNOWN: "UNKNOWN",                         // unrecognized element
    VERTICAL_SKIP: "VERTICAL_SKIP",             // any type of vertical skip
    WORD: "WORD",                               // sequence of letters
    WRAPPER: "WRAPPER"                          // wrapper for something
};
export type Lexeme = keyof typeof Lexeme;
export function isLexeme(x: any): x is Lexeme {
    return Lexeme.hasOwnProperty(x);
}
export function mustBeLexeme(x: any, msg: string): Lexeme {
    if (!isLexeme(x)) throw new Error(msg);
    return x;
}
