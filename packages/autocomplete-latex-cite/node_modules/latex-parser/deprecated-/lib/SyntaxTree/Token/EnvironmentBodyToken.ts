
import {Token} from "./index";
import {CommandToken, isCommandToken} from "./CommandToken";
import {Environment, isEnvironment} from "../../LatexStyle/Item/Environment";
import {EnvironmentToken, mustBeEnvironmentToken} from "./EnvironmentToken";


function getBeginCommandToken(x: any): CommandToken | undefined {
    if (isCommandToken(x.beginCommandToken))
        return x.beginCommandToken;
}

function getEndCommandToken(x: any): CommandToken | undefined {
    if (isCommandToken(x.endCommandToken))
        return x.endCommandToken;
}

function getEnvironment(x: any): Environment | undefined {
    if (x.environment && isEnvironment(x.environment))
        return x.environment;
}


/**
 * LaTeX environment body token structure
 * @class
 * @extends Token
 * @property {?Environment} environment -
 *           The LaTeX environment or undefined if there is no parent environment
 * @property {?EnvironmentToken} environmentToken - The parent environment token
 * @property {?CommandToken} beginCommandToken -
 *           The environment begin command token or undefined is there is no such a token
 * @property {?CommandToken} endCommandToken -
 *           The environment end command token or undefined is there is no such a token
 */
export class EnvironmentBodyToken extends Token {

    /**
     * Get the LaTeX environment
     * @return {?Environment} the environment or undefined if there is no parent environment
     */
    get environment(): Environment | undefined {
        return this.parentNode && getEnvironment(this.parentNode);
    }


    //noinspection JSUnusedGlobalSymbols
    /**
     * Get the parent environment token
     * @return {?EnvironmentToken} the environment or undefined if there is no parent environment
     */
    get environmentToken(): EnvironmentToken | undefined {
        return this.parentNode && mustBeEnvironmentToken(this.parentNode);
    }


    /**
     * Get the environment begin command token
     * @return {?CommandToken} the command token or undefined if there is no begin command
     */
    get beginCommandToken() {
        return this.parentNode && getBeginCommandToken(this.parentNode);
    }


    /**
     * Get the environment end command token
     * @return {(CommandToken|undefined)} the command token or undefined if there is no end command
     */
    get endCommandToken() {
        return this.parentNode && getEndCommandToken(this.parentNode);
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false) {
        return skipNodeClass ?
            super.toString(true) :
            "EnvironmentBodyToken{" + super.toString(true) + "}";
    }
}

// todo remove
Object.defineProperties(EnvironmentBodyToken.prototype, { // default properties
    // parent node must be an EnvironmentToken instance
    parentNodeClass_: {value: EnvironmentToken}
});
