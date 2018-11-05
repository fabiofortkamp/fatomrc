import {Token, TokenProperties} from "./index";
import {Lexeme, mustBeLexeme} from "../../Latex/Lexeme";
import {mustBeString} from "../../../../src/Utils";

/**
 * LaTeX source fragment token properties
 * @interface SourceTokenProperties
 * @extends TokenProperties
 * @property {Lexeme} lexeme - The logical lexeme
 * @property {string} source - The source fragment
 */
export interface SourceTokenProperties
    extends TokenProperties {
    lexeme: Lexeme;
    source: string;
}

/**
 * LaTeX source fragment token structure
 * @class
 * @extends Token
 * @property {string} source - The source fragment
 */
export class SourceToken extends Token {
    private source: string;

    /**
     * Constructor
     * @param {!SourceTokenProperties} initialProperties the initial property values
     */
    constructor(initialProperties: SourceTokenProperties) {
        super(initialProperties);

        this.lexeme = mustBeLexeme(initialProperties.lexeme, `"initialProperties.lexeme" isn't known`);
        this.source = mustBeString(initialProperties.source, `"initialProperties.sources" isn't a string`);
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false) {
        return skipNodeClass
            ? this.source
            : "SourceToken[" + this.lexeme + "]{" + this.source + "}";
    }
}