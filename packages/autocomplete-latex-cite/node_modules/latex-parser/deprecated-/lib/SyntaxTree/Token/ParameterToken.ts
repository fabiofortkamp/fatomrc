
import {SymbolToken} from "./SymbolToken";
import {Token, TokenProperties} from "./index";
import {Lexeme} from "../../Latex/Lexeme";
import {Parameter} from "../../LatexStyle/Item/Parameter";
import {mustNotBeUndefined} from "../../../../src/Utils";


/**
 * LaTeX parameter token properties
 * @interface ParameterTokenProperties
 * @extends TokenProperties
 * @property {boolean} hasBrackets - True if the parameter is bounded by the logical brackets, false otherwise
 * @property {boolean} hasSpacePrefix - True if the parameter is prefixed by a space, false otherwise
 */
export interface ParameterTokenProperties extends TokenProperties {
    hasBrackets: boolean;
    hasSpacePrefix: boolean;
}


/**
 * LaTeX parameter token structure
 * @class
 * @extends Token
 * @property {boolean} hasBrackets -
 *           True if the parameter is bounded by the logical brackets, false otherwise
 * @property {boolean} hasSpacePrefix -
 *           True if the parameter is prefixed by a space, false otherwise
 * @property {?Parameter} parameter - The corresponding LaTeX parameter
 */
export class ParameterToken extends Token {
    public parentNode: SymbolToken;

    private hasBrackets: boolean;
    hasSpacePrefix: boolean;

    /**
     * Constructor
     * @param {!ParameterTokenProperties} initialProperties the initial property values
     */
    constructor(initialProperties: ParameterTokenProperties) {
        if (!(initialProperties instanceof Object))
            throw new TypeError('"initialProperties" isn\'t an Object instance');
        super(initialProperties); // the superclass constructor
        if (!initialProperties.hasBrackets) // if there are no bounding brackets
        // store this fact
            Object.defineProperty(this, "hasBrackets", {value: false, enumerable: true});
        if (initialProperties.hasSpacePrefix) // if there is a space before
        // store this fact
            Object.defineProperty(this, "hasSpacePrefix", {value: true, enumerable: true});
    }


    /**
     * Get the logical lexeme
     * @return {(Lexeme|undefined)} the lexeme or undefined if the lexeme isn't defined
     */
    get lexeme(): Lexeme | undefined {
        if (this.parameter && this.parameter.lexeme) return this.parameter.lexeme;
    }


    /**
     * Get the corresponding LaTeX parameter description
     * @return {?Parameter}
     *         the LaTeX parameter or undefined of there is parent symbol or such a parameter
     */
    get parameter(): Parameter | undefined {
        /** @type {?SymbolToken} */
        const symbolToken: SymbolToken = this.parentNode; // get the symbol token
        const symbol = mustNotBeUndefined(symbolToken.symbol);
        const parameterIndex = symbolToken.childIndex(this);
        if (symbolToken !== undefined && parameterIndex !== undefined && parameterIndex >= 0)
            return symbol.parameter(parameterIndex);
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false) {
        let source = this.hasSpacePrefix ? " " : "";
        source += this.hasBrackets ? "{" + super.toString(true) + "}" : super.toString(true);
        return skipNodeClass ? source : "ParameterToken{" + source + "}";
    }
}

Object.defineProperties(ParameterToken.prototype, { // default properties
    hasBrackets: {value: true, enumerable: true}, // there are bounding brackets
    hasSpacePrefix: {value: false, enumerable: true}, // there is no space before
    parentNodeClass_: {value: SymbolToken} // parent node must be a SymbolToken instance
});
Object.defineProperties(ParameterToken.prototype, { // make getters and setters enumerable
    parameter: {enumerable: true}
});

