import {Context} from "./Context";
import {LatexStyle} from "../../LatexStyle/index";
import {Token} from "../../SyntaxTree/Token/index";
import {Parameter} from "../../LatexStyle/Item/Parameter";
import {EnvironmentToken} from "../../SyntaxTree/Token/EnvironmentToken";
import {EnvironmentBodyToken} from "../../SyntaxTree/Token/EnvironmentBodyToken";
import {EnvironmentAndPackage} from "../../LatexStyle/Item/Environment";
import {Command} from "../../LatexStyle/Item/Symbol/Command";
import {SpaceToken} from "../../SyntaxTree/Token/SpaceToken";
import {SymbolToken} from "../../SyntaxTree/Token/SymbolToken";
import {ParameterToken} from "../../SyntaxTree/Token/ParameterToken";
import {CommandToken} from "../../SyntaxTree/Token/CommandToken";
import {Lexeme} from "../Lexeme";
import {Symbol as SymbolItem} from "../../LatexStyle/Item/Symbol/index";
import {isNumber, isString, mustNotBeUndefined} from "../../../../src/Utils";

/**
 * Parse the next token
 * @param {!Context} context the parsing context
 * @param {!LatexStyle} latexStyle the latex style
 * @return {?Token} the parsed token or undefined if the token cannot be parsed
 * @private
 */
function parseToken_(context: Context, latexStyle: LatexStyle): Token | undefined {
    let token: Token | undefined = parseSpaceToken_(context); // collect comments and try to parse a space token
    if (!token) { // if cannot parse a space token
        if (context.position >= context.source.length) return undefined;

        const contextBackup = context.copy(); // backup the current context
        if (!(token = parseEnvironmentToken_(context, latexStyle))) { // if cannot parse an environment token
            contextBackup.copy(context); // restore the context
            if (!(token = parseCommandToken_(context, latexStyle))) { // if cannot parse a command token
                contextBackup.copy(context); // restore the context
                if (!(token = parseSymbolsToken_(context, latexStyle))) { // if cannot parse a symbol token
                    return undefined; // no token can be parsed
                }
            }
        }
    }
    //noinspection JSCheckFunctionSignatures
    processParsedToken_(context, token);
    //noinspection JSValidateTypes
    return token; // return the parsed token
}


/**
 * Parse a parameter token
 * @param {!Context} context the parsing context
 * @param {!LatexStyle} latexStyle the latex style
 * @param {!Parameter} parameter the symbol or command parameter description
 * @param {string=} opt_endLabel
 *        the parameter end label or undefined if there should be a single token
 * @return {?ParameterToken} the parsed parameter token or undefined if cannot parse
 * @private
 */
function parseParameterToken_(context: Context, latexStyle: LatexStyle, parameter: Parameter, opt_endLabel?: string) {
    const currentTokenBackup = context.currentToken; // store the current token
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    context.updateState(parameter.operations); // update the LaTeX state
    if (opt_endLabel === undefined) { // if the parameter must be parsed as a single token
        // has the param space prefix or not
        const spacePrefixState = parseSpaceToken_(context) !== undefined;
        if (context.source[context.position] === "{") { // if the parameter is bounded by brackets
            // create the parameter token
            context.currentToken =
                new ParameterToken({hasBrackets: true, hasSpacePrefix: spacePrefixState});
            ++context.position; // go to the sources next char
            ++context.charNumber; // go to the current line next char
            // exit if cannot parse until the closing bracket

            if (!parseUntilLabel_(context, latexStyle, "}", parameter.lexeme)) return undefined;
            ++context.position; // skip the bracket in the sources
            ++context.charNumber; // skip the bracket in the current line
        } else { // if the parameter is't bounded by brackets
            // create the parameter token
            context.currentToken =
                new ParameterToken({hasBrackets: false, hasSpacePrefix: spacePrefixState});
            // exit if cannot parse a parameter token
            if (parseToken_(context, latexStyle) === undefined) return undefined;
        }
    } else { // if the parameter must be parsed until the end label
        // create the parameter token
        context.currentToken =
            new ParameterToken({hasBrackets: false, hasSpacePrefix: false});

        // return if cannot parse
        if (!parseUntilLabel_(context, latexStyle, opt_endLabel, parameter.lexeme)) return undefined;
    }
    const parameterToken = context.currentToken; // the parsed parameter token
    context.currentToken = currentTokenBackup; // restore the current token
    //noinspection JSCheckFunctionSignatures
    processParsedToken_(context, parameterToken);
    //noinspection JSValidateTypes
    return parameterToken;
}


/**
 * Parse an environment token
 * @param {!Context} context the parsing context
 * @param {!LatexStyle} latexStyle latex style
 * @return {?EnvironmentToken} the parsed token or undefined if cannot parse
 * @private
 */
function parseEnvironmentToken_(context: Context, latexStyle: LatexStyle): EnvironmentToken | undefined {
    if (context.source.substring(context.position).indexOf("\\begin") !== 0) return undefined;
    context.position += 6; // just after "\begin"
    parseSpaceToken_(context); // skip spaces
    // try to obtain the environment name
    const nameMatch = context.source.substring(context.position).match(/^{([\w@]+\*?)}/);
    if (!nameMatch) return undefined; // exit if cannot bet the environment name
    const name = nameMatch[1]; // the environment name
    context.position += nameMatch[0].length; // skip the environment name in the sources
    context.charNumber += nameMatch[0].length; // skip the environment name in the current line
    const currentTokenBackup = context.currentToken; // store the current token
    // try to get the corresponding environment
    const environment: EnvironmentAndPackage = latexStyle.environments(context.currentState, name)[0];
    const environmentToken = context.currentToken = environment ? // the environment token
        new EnvironmentToken({environment: environment.environment}) :
        new EnvironmentToken({name: name});
    // TODO unknown environment notification
    // try to parse the environment begin command
    const symbols: Command[] = latexStyle.commands(context.currentState, name);
    let beginCommandToken: Token | undefined = parsePatterns_(context, latexStyle, symbols);
    if (beginCommandToken === undefined) { // if cannot parse a command
        // TODO notification about the unrecognized command
        // generate unrecognized command token
        beginCommandToken = new CommandToken({name: name});
    }
    //noinspection JSCheckFunctionSignatures
    processParsedToken_(context, beginCommandToken);
    const environmentBodyToken = context.currentToken = new EnvironmentBodyToken();
    const endFound = parseUntilLabel_(context, latexStyle, `\\end\{${name}}`); // try to get to the end
    context.currentToken = environmentToken;
    processParsedToken_(context, environmentBodyToken); // process the body token
    let endCommandToken: Token | undefined = undefined; // the environment end command token
    if (endFound) { // if the environment end was reached
        context.position += name.length + 6; // skip the environment name in the sources
        context.charNumber += name.length + 6; // skip the environment name in the current line
        endCommandToken = parsePatterns_(context, latexStyle, latexStyle.commands(context.currentState, `end${name}`));
    } else { // if cannot find the end of the environment
        // TODO no environment end notification
    }
    if (endCommandToken === undefined) { // if cannot parse a command
        // TODO notification about the unrecognized command
        // generate unrecognized command token
        endCommandToken = new CommandToken({name: "end" + name});
    }
    processParsedToken_(context, endCommandToken); // process the end command token
    context.currentToken = currentTokenBackup; // restore the current token
    return environmentToken;
}


/**
 * Parse a command token.
 *
 * By the rules of TeX syntax, the "name" of a macro that starts with a \ (backslash) character must either
 * - consist of a single non-alphabetical character.
 *   Some examples:
 *     \, (insert thin space),
 *     \% ( the % character),
 *     \\ (insert line break),
 *     \[ (open display math), and
 *     \) (close inline math).
 * or
 * - contain only uppercase and lowercase alphabetical characters: a-z and A-Z. No numerals, and no other characters
 *   belonging to non-letter categories either. (Well, there are certain ways of assigning "letter-category" status to
 *   non-letter characters, but that's a topic for a different discussion.)
 *   (https://tex.stackexchange.com/questions/66666/command-macro-name-cannot-include-numbers-and-symbols/66695#66695)
 *
 * @param {!Context} context the parsing context
 * @param {!LatexStyle} latexStyle latex style
 * @return {?CommandToken} the parsed token or undefined if cannot parse
 * @private
 *
 */
function parseCommandToken_(context: Context, latexStyle: LatexStyle): Token | undefined {
    // try to find a command name
    // TODO [a-zA-Z] instead of [\w]?
    const cmdMatch = context.source.substring(context.position).match(/^\\((?:[\w@]+\*?)|(?:[^\w]))/);

    if (!cmdMatch)
        return undefined; // exit if cannot find a command name

    context.position += cmdMatch[0].length; // set position just after the command name
    context.charNumber += cmdMatch[0].length; // skip all the command name chars

    // try to parse a command token

    let token: Token | undefined = parsePatterns_(context, latexStyle, latexStyle.commands(context.currentState, cmdMatch[1]));
    if (token === undefined) { // if cannot parse a command token
        // TODO notification about the unrecognized command
        // generate unrecognized command token
        token = new CommandToken({name: cmdMatch[1]});
    }
    //noinspection JSValidateTypes
    return token;
}


/**
 * Parse symbols for a token
 * @param {!Context} context the parsing context
 * @param {!LatexStyle} latexStyle latex style
 * @return {?Token} the parsed token or undefined if cannot parse
 * @private
 */
function parseSymbolsToken_(context: Context, latexStyle: LatexStyle): Token | undefined {
    // get the available symbols
    const sourceCharacter = context.source[context.position]; // the current sources character

    // get the symbols started with the current sources character
    let token = parsePatterns_(context, latexStyle, latexStyle.symbols(context.currentState, sourceCharacter));

    if (token === undefined) { // if cannot parse a symbol token
        // TODO notification about the unrecognized symbol
        ++context.position; // go to the next sources character

        // go to the next line character (the line is the same, \n was parsed for a space token)
        ++context.charNumber;

        // generate unrecognized symbol token
        token = new SymbolToken({pattern: sourceCharacter});
    } else { // if the token was parsed
        // TODO parse words and numbers
    }
    return token;
}


/**
 * Try to parse a symbol pattern
 * @param {!Context} context the parsing context// generate unrecognized symbol token
 * @param {!LatexStyle} latexStyle the latex style
 * @param {!Array.<!Symbol>} symbols the symbol or command descriptions in the priority descending order
 * @return {?Token} the parsed symbol or command token or undefined if cannot parse
 * @private
 */
function parsePatterns_(context: Context, latexStyle: LatexStyle, symbols: SymbolItem[]): Token | undefined {
    const contextBackup = context.copy(); // backup the current context
    let token: Token | undefined = undefined; // the parsed token

    // TODO not how some() is meant to be used...?
    symbols.some(symbol => { // for all the symbols until the parsing success
        // stop if the token was parsed
        if (token = parsePattern_(context, latexStyle, symbol)) {
            return true;
        } else {
            contextBackup.copy(context); // restore the context
            return false; // go to the next symbol
        }
    });
    return token;
}


/**
 * Try to parse a symbol pattern
 * @param {!Context} context the parsing context
 * @param {!LatexStyle} latexStyle latex style
 * @param {!Array.<!Symbol>} symbol the symbol or command description
 * @return {?Token} the parsed symbol or command token or undefined if cannot parse
 * @private
 */
function parsePattern_(context: Context, latexStyle: LatexStyle, symbol: SymbolItem): Token | undefined {
    const currentTokenBackup = context.currentToken; // store the current token
    // if a command description is given
    context.currentToken = symbol instanceof Command ?
        new CommandToken({command: symbol}) : // generate a command token
        new SymbolToken({symbol: symbol}); // generate a symbol token

    const patternComponents = symbol.patternComponents; // the symbol pattern components
    const nPatternComponents = patternComponents.length; // the pattern componen number
    let iPatternComponent = 0; // the pattern component iterator
    // for all the pattern components
    for (; iPatternComponent < nPatternComponents; ++iPatternComponent) {
        const patternComponent = patternComponents[iPatternComponent]; // the pattern component
        if (isNumber(patternComponent)) { // if a parameter is expected
            const parameter: Parameter | undefined = symbol.parameter(patternComponent); // the parameter description
            // try to get the end label for the parameter
            const parameterEndLabel = patternComponents[iPatternComponent + 1];
            if (typeof parameterEndLabel === "string") { // if there is a end label
                // if can parse the parameter token
                if (parseParameterToken_(context, latexStyle, mustNotBeUndefined(parameter), parameterEndLabel)) {
                    // exit if there is no the end label at the positions
                    if (context.source.substring(context.position).indexOf(parameterEndLabel) !== 0) return undefined;
                    context.position += parameterEndLabel.length; // skip the end label in the sources
                    context.charNumber += parameterEndLabel.length; // skip the end label in the line
                    ++iPatternComponent; // skip the end label in the pattern
                    continue; // go to the next pattern component
                }
            } else { // if there is no a end label
                // go to the next pattern char if can parse the parameter token
                if (parseParameterToken_(context, latexStyle, mustNotBeUndefined(parameter))) continue;
            }
        }
        else if (isString(patternComponent)) {
            while (parseCommentLine_(context)) {
            } // skip all the comments
            // if the sources fragment is equal the pattern component
            if (context.source.substring(context.position).indexOf(patternComponent) === 0) {
                context.position += patternComponent.length; // skip the pattern component in the sources
                context.charNumber += patternComponent.length; // skip the pattern component in the line
                continue; // go to the next pattern component
            }
        } else if (parseSpaceToken_(context))
            continue;
        break; // stop parsing if there was no continue call
    }
    // return if the pattern parsing was broken
    if (iPatternComponent < nPatternComponents) return undefined;
    const parsedToken = context.currentToken; // the parsed token to return
    context.currentToken = currentTokenBackup; // restore the current token
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    context.updateState(symbol.operations); // update the LaTeX state
    return parsedToken;
}


/**
 * Parse tokens until the label
 * @param {!Context} context the parsing context
 * @param {!LatexStyle} latexStyle latex style
 * @param {string} endLabel the label to parse until
 * @param {Lexeme=} opt_lexeme the lexeme of the single token to parse
 * @return {boolean} true if the parsing was successful, false otherwise
 * @private
 */
function parseUntilLabel_(context: Context, latexStyle: LatexStyle, endLabel: string, opt_lexeme?: Lexeme) {
    switch (opt_lexeme) {
        // TODO parse special lexemes
        default: {
            // while not reached the label
            while (context.source.substring(context.position).indexOf(endLabel) !== 0) {
                if (context.position >= context.source.length) { // if there is no more sources
                    // TODO notification about unexpected sources end
                    return false;
                }
                parseToken_(context, latexStyle);
            }
            return true;
        }
    }
}

/**
 * Parse a comment line
 * @param {!Context} context the parsing context
 * @return {boolean} true if there was a comment line, false otherwise
 * @private
 */
function parseCommentLine_(context: Context): boolean {
    // try to find a comment int the sources tail
    const commentMatch = context.source.substring(context.position).match(/^%([^\n]*)(\n[ \t]*)?/);
    if (!commentMatch) return false; // return if there is no comment at this position

    context.comments.push(commentMatch[1]); // store the comment string
    context.position += commentMatch[0].length; // position just after the comment
    if (!commentMatch[2]) { // if there were no line breaks
        context.charNumber += commentMatch[0].length; // go to the last char
    } else { // if there was a line break
        ++context.lineNumber; // one more line
        context.charNumber = commentMatch[2].length - 1; // skip all the space chars in the new line
    }
    return true;
}


/**
 * Fill the parsed token position, comments and parent
 * @param {!Context} context the parsing context
 * @param {!Token} token the token to process
 * @private
 */
function processParsedToken_(context: Context, token: Token) {
    // TODO process comments and position
    if (context.currentToken) { // if there is a current token

        // console.log(context.currentToken.toString())

        //noinspection JSUnresolvedFunction
        context.currentToken.insertChildSubtree(token); // store this token as a child of the current
    }
}

/**
 * Parse space for a token (space or paragraph separator)
 * @param {!Context} context the parsing context
 * @return {?SpaceToken} the parsed token or undefined if cannot parse a space token
 * @private
 */
function parseSpaceToken_(context: Context): SpaceToken | undefined {
    let isSpace = false; // true is the sources fragment is a space token, false otherwise
    let nLineBreaks = 0; // number of parsed line breaks
    while (context.position < context.source.length) { // while there is something to parse
        // go to the next iteration if there was a comment
        if (parseCommentLine_(context)) continue;
        switch (context.source[context.position]) { // depend on the sources current character
            case " ":
            case "\t": // if a space or a tabular
                isSpace = true; // and one more parsed char
                ++context.position; // go to the next sources char
                ++context.charNumber; // the next char of the sources line
                continue;
            case "\n": // if a line break
                isSpace = true; // and one more parsed char
                ++nLineBreaks; // one more parsed line
                ++context.position; // go to the next sources char
                ++context.lineNumber; // the next sources line
                context.charNumber = 0; // the first char of the line
                continue; // go to the next iteration
        }
        break; // stop if not a space char
    }
    // create a space token if needed
    return isSpace ? new SpaceToken({lineBreakCount: nLineBreaks}) : undefined;
}

/**
 * LaTeX parser structure
 * @class
 * @property {!LatexStyle} latexStyle latexStyle - The LaTeX style description to be used for parsing
 */
export class LatexParser {
    latexStyle: LatexStyle;

    /**
     * Constructor
     * @param {!LatexStyle} latexStyle latexStyle LaTeX style description to be used for parsing
     */
    constructor(latexStyle: LatexStyle) {
        if (!(latexStyle instanceof LatexStyle)) throw new TypeError(`"latexStyle" isn't a LatexStyle instance`);
        this.latexStyle = latexStyle;
    }


    /**
     * Parse LaTeX sources
     * @param {string} source the sources to parse
     * @param {(!Context|undefined)} opt_context the parsing context
     * @return {!Array.<!Token>} the list of the parsed tokens
     */
    parse(source: string, opt_context?: Context): Token[] {
        if (typeof source !== "string") throw new TypeError(`"sources" isn't a string`);
        let context;

        if (opt_context === undefined) { // if the parsing context isn't defined
            context = new Context(source); // create the context
        } else if (opt_context instanceof Context) { // if the parsing context is defined
            context = opt_context;
            context.source += source; // update the sources
        } else { // if unexpected context type
            throw new TypeError(`"context" isn't a LatexParser.Context instance`);
        }

        const parsedTokens: Token[] = []; // the list of the parsed tokens

        // store the parsed token, stop when cannot parse a token
        let parsedToken: Token | undefined;
        while (parsedToken = parseToken_(context, this.latexStyle))
            parsedTokens.push(parsedToken);

        return parsedTokens;
    }
}
