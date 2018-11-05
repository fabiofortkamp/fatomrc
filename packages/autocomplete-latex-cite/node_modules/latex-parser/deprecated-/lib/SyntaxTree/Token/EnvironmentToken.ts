
import {Token, TokenProperties} from "./index";
import {Environment} from "../../LatexStyle/Item/Environment";
import {CommandToken} from "./CommandToken";
import {EnvironmentBodyToken} from "./EnvironmentBodyToken";
import {SymbolToken} from "./SymbolToken";

/**
 * LaTeX environment token properties
 * @interface EnvironmentTokenProperties
 * @extends TokenProperties
 * @property {!Environment} environment - The LaTeX environment
 * @property
 */

export interface EnvironmentTokenPropertiesWithEnvironment
    extends EnvironmentTokenProperties {
    environment: Environment;
    name: undefined;
}

export interface EnvironmentTokenPropertiesWithName
    extends EnvironmentTokenProperties {
    environment: undefined;
    name: string;
}

export interface EnvironmentTokenProperties
    extends TokenProperties {
    environment?: Environment;
    name?: string;
}


export function mustBeEnvironmentToken(x: any): EnvironmentToken {
    if (!isEnvironmentToken(x)) throw new Error();
    return x;
}

export function isEnvironmentToken(x: any): x is EnvironmentToken {
    return x instanceof EnvironmentToken;
}

/**
 * LaTeX environment token structure
 * @class
 * @extends Token
 * @property {!Environment} environment - The corresponding LaTeX environment
 * @property {?CommandToken} beginCommandToken -
 *           The environment begin command token or undefined is there is no such a token
 * @property {?CommandToken} endCommandToken -
 *           The environment end command token or undefined is there is no such a token
 * @property {?EnvironmentBodyToken} bodyToken -
 *           The environment body token or undefined is there is no such a token
 */
export class EnvironmentToken extends Token {
    environment: Environment;

    /**
     * Constructor
     * @param {!EnvironmentTokenProperties} initialProperties the initial property values
     */
    constructor(initialProperties: EnvironmentTokenProperties) {
        if (!(initialProperties instanceof Object))
            throw new TypeError('"initialProperties" isn\'t an Object instance');
        super(initialProperties); // the superclass constructor
        if (!(initialProperties.environment instanceof Environment))
            throw new TypeError(
                '"initialProperties.environment" isn\'t a LatexStyle.Environment instance');
        // store the environment
        Object.defineProperty(this, "environment", {
            value: initialProperties.environment,
            enumerable: true
        });
    }


    /**
     * Get the logical lexeme
     * @return {(Lexeme|undefined)} the lexeme or undefined if the lexeme isn't defined
     */
    get lexeme() {
        return this.environment.lexeme;
    }


    /**
     * Get the begin command token
     * @return {?CommandToken} the command token or undefined if there is no begin command
     */
    get beginCommandToken() {
        const beginCommandToken = this.childNode(0);
        return beginCommandToken instanceof CommandToken ? beginCommandToken : undefined;
    }


    /**
     * Get the end command token
     * @return {?CommandToken} the command token or undefined if there is no end command
     */
    get endCommandToken() {
        const endCommandToken = this.childNode(2);
        return endCommandToken instanceof CommandToken ? endCommandToken : undefined;
    }


    /**
     * Get the environment body token
     * @return {?EnvironmentBodyToken} the body or undefined if there is no body
     */
    get bodyToken() {
        const bodyToken = this.childNode(1);
        return bodyToken instanceof EnvironmentBodyToken ? bodyToken : undefined;
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false) {
        const beginCommandToken = this.beginCommandToken; // the begin command token
        const endCommandToken = this.endCommandToken; // the end command token
        const bodyToken = this.bodyToken; // the environment body token
        let source = "\\begin{" + this.environment.name + "}";
        source += beginCommandToken ?
            SymbolToken.prototype.toString.call(beginCommandToken, true) :
            "??";
        source += bodyToken ? bodyToken.toString(true) : "??";
        source += "\\end{" + this.environment.name + "}";
        source += endCommandToken ? SymbolToken.prototype.toString.call(endCommandToken, true) : "??";
        return skipNodeClass ? source : "EnvironmentToken{" + source + "}";
    }
}

Object.defineProperties(EnvironmentToken.prototype, { // make getters and setters enumerable
    beginToken: {enumerable: true},
    endToken: {enumerable: true}
});
