import {Node} from "./Node";
import {mustBeString} from "../../../src/Utils";

/**
 * Syntax tree structure
 * @class
 * @property {!Node} rootNode - The root node
 * @property {string} source - The source text
 */
export class SyntaxTree {
    //noinspection JSUnusedGlobalSymbols // TODO
    readonly rootNode: Node;
    readonly source: string;


    /**
     * Constructor
     * @param {!Node} rootNode the root node (must have no parent and no tree)
     * @param {string} source the sources text that represents this syntax tree
     */
    constructor(rootNode: Node, source: string) {
        if (!(rootNode instanceof Node)) throw new TypeError(`"rootNode" isn't a SyntaxTree.Node instance`);
        if (!!rootNode.parentNode) throw new TypeError('"rootNode" has a parent node');
        if (!!rootNode.tree) throw new TypeError('"rootNode" is a tree root');

        this.rootNode = rootNode;
        this.source = mustBeString(source, `"sources" isn't a string`);

        // Note reflective relation, naturally
        rootNode.tree = this;
    }
}