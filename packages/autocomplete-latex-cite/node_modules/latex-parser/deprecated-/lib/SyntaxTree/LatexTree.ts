import {SyntaxTree} from "./index";
import {mustBeToken, Token} from "./Token/index";

/**
 * LaTeX syntax tree structure
 * @class
 * @extends SyntaxTree
 */
export class LatexTree extends SyntaxTree {

    /**
     * @param {!Token} rootToken the root token (must have no parent and no tree)
     * @param {string} source the source code that represents this syntax tree
     */
    constructor(rootToken: Token, source: string) {
        const token = mustBeToken(rootToken, `"rootToken" isn't a Token instance`);

        // TODO must have no parent and no tree
        // if(token.parentNode)

        super(
            token,
            source
        );
    }
}