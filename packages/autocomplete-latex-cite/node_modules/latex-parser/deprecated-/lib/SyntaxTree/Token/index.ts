import {Node} from "../Node";
import {Lexeme} from "../../Latex/Lexeme";

/**
 * LaTeX syntax tree token base properties
 * @interface TokenProperties
 * @property {(?Token|undefined)} parentToken - The parent token or undefined if there is no parent
 * @property {(!Array.<Token>|undefined)} childTokens - The list of the child tokens
 */
export interface TokenProperties {
    parentToken?: Token;
    childTokens?: Token[];
}

export function isToken(x: any): x is Token {
    return x instanceof Token;
}

export function mustBeToken(x: any, msg?: string): Token {
    if (!isToken(x)) throw new Error(msg);
    return x;
}

/**
 * LaTeX syntax tree token base structure
 * @class
 * @extends Node
 * @property {(Lexeme|undefined)} lexeme - The logical lexeme of the token
 */
export class Token extends Node {
    public lexeme?: Lexeme;

    /**
     * Constructor
     * @param {!TokenProperties=} opt_initialProperties the initial property values
     */
    constructor(opt_initialProperties: TokenProperties = {}) {
        if (opt_initialProperties === undefined) { // if the initial properties are not set
            super(); // superclass constructor
        } else if (opt_initialProperties instanceof Object) { // if the initial properties are set
            // superclass constructor
            // superclass initial properties
            const superInitialProperties = Object.create(opt_initialProperties);
            superInitialProperties.parentNode = opt_initialProperties.parentToken;
            superInitialProperties.childNodes = opt_initialProperties.childTokens;
            super(superInitialProperties);
        } else { // if the initial properties are in unsupported type
            throw new TypeError('"initialProperties" isn\'t an Object instance');
        }
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false) {
        return skipNodeClass ? super.toString(true) : "Token{" + super.toString(true) + "}";
    }
}

// Object.defineProperties(Token.prototype, { // default properties
//     parentNodeClass_: {value: Token} // parent node must be an EnvironmentToken instance
// });