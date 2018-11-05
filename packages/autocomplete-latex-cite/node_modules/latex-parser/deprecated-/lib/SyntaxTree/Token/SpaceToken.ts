import {Token, TokenProperties} from "./index";
import {Lexeme} from "../../Latex/Lexeme";

/**
 * LaTeX space token properties
 * @interface SpaceTokenProperties
 * @extends TokenProperties
 * @property {number|undefined} lineBreakCount - The number of line breaks
 */
export interface SpaceTokenProperties
    extends TokenProperties {
    lineBreakCount?: number;
}

/**
 * LaTeX space token structure
 * @class
 * @extends Token
 * @property {number} lineBreakCount The number of line breaks
 */
export class SpaceToken extends Token {
    lineBreakCount: number;

    /**
     * @param {!SpaceTokenProperties} initialProperties the initial property values
     */
    constructor(initialProperties: SpaceTokenProperties) {
        super(initialProperties);
        this.lineBreakCount = 0;

        if (initialProperties !== undefined) {
            if (initialProperties.lineBreakCount !== undefined) {
                if (!isFinite(initialProperties.lineBreakCount) || initialProperties.lineBreakCount < 0)
                    throw new TypeError(`"initialProperties.lineBreakCount" isn't a non-negative number`);
                this.lineBreakCount = initialProperties.lineBreakCount;
            }
        }
    }

    /**
     * Get the logical lexeme
     * @return {(Lexeme|undefined)} the lexeme or undefined if the lexeme isn't defined
     */
    get lexeme(): Lexeme {
        return this.lineBreakCount <= 1 ? "SPACE" : "PARAGRAPH_SEPARATOR";
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false): string {
        if (skipNodeClass) { // if the node class name must be skipped
            switch (this.lineBreakCount) {
                case 0:
                    return " ";
                case 1:
                    return "\n";
                default:
                    return "\n\n";
            }
        } else { // if the node class name must be included
            switch (this.lineBreakCount) {
                case 0:
                    return "SpaceToken{ }";
                case 1:
                    return "SpaceToken{\n}";
                default:
                    return "SpaceToken{\n\n}";
            }
        }
    }
}