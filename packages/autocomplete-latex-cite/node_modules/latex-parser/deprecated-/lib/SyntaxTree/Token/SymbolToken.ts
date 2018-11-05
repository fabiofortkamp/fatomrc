

import {Token, TokenProperties} from "./index";
import {Symbol} from "../../LatexStyle/Item/Symbol/index";
import {Lexeme} from "../../Latex/Lexeme";
import {mustNotBeUndefined} from "../../../../src/Utils";


/**
 * LaTeX symbol token properties
 * @interface SymbolTokenProperties
 * @extends TokenProperties
 * @property {!Symbol|undefined} symbol - The LaTeX symbol or undefined if the symbol is unrecognized
 * @property {string|undefined} pattern - The pattern that corresponds to the unrecognized symbol
 */
export interface SymbolTokenProperties extends TokenProperties {
    symbol?: Symbol;
    pattern?: string;
}


/**
 * LaTeX symbol token structure
 * @class
 * @extends Token
 * @property {?Symbol} symbol - The corresponding LaTeX symbol or undefined if the symbol is unrecognized
 * @property {string} pattern - The symbol LaTeX pattern
 */
export class SymbolToken extends Token {
    symbol?: Symbol;

    /**
     * Constructor
     * @param {!SymbolTokenProperties} initialProperties the initial property values
     */
    constructor(initialProperties: SymbolTokenProperties) {
        if (!(initialProperties instanceof Object))
            throw new TypeError('"initialProperties" isn\'t an Object instance');
        super(initialProperties); // the superclass constructor
        if (initialProperties.symbol) { // if the symbol is defined
            if (!(initialProperties.symbol instanceof Symbol))
                throw new TypeError('"initialProperties.symbol" isn\'t a Symbol instance');
            // store the symbol
            Object.defineProperty(this, "symbol", {value: initialProperties.symbol, enumerable: true});
        } else { // if the symbol isn't defined
            if (typeof initialProperties.pattern !== "string")
                throw new TypeError('"initialProperties.pattern" isn\'t a string');
            // store the unrecognized pattern
            Object.defineProperty(this, "pattern", {value: initialProperties.pattern});
        }
    }


    /**
     * Get the logical lexeme
     * @return {(Lexeme|undefined)} the lexeme or undefined if the lexeme isn't defined
     */
    get lexeme(): Lexeme | undefined {

        return this.symbol ? this.symbol.lexeme : undefined;
    }


    /**
     * Get the symbol LaTeX pattern
     * @return {string} the symbol pattern
     */
    get pattern(): string {
        return mustNotBeUndefined(this.symbol).pattern;
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false) {
        let source = "";
        let iParameter = 0; // the parameter iterator

        const pattern = this.pattern; // LaTeX input pattern
        // for all the pattern chars
        for (
            let nPatternChars = pattern.length, iPatternChar = 0;
            iPatternChar < nPatternChars;
            ++iPatternChar
        ) {
            const patternChar = pattern[iPatternChar]; // the pattern char
            if (patternChar === "#") { // if a parameter place
                ++iPatternChar; // go to the next pattern char
                const parameterToken = this.childNode(iParameter++); // try to get the parameter token
                source += parameterToken ? parameterToken.toString(true) : "??";
            } else { // if the ordinary pattern char
                source += patternChar;
            }
        }
        return skipNodeClass ?
            source :
            "SymbolToken" + (this.symbol ? "" : "[?]") + "{" + source + "}";
    }
}

Object.defineProperties(SymbolToken.prototype, { // default properties
    symbol: {value: undefined, enumerable: true} // no symbol token
});

Object.defineProperties(SymbolToken.prototype, { // make getters and setters enumerable
    pattern: {enumerable: true}
});