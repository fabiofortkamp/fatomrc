import {SyntaxTree} from "./index";
import {isNumber, mustBeArray, mustBeObject, mustNotBeUndefined} from "../../../src/Utils";

/**
 * Syntax tree node properties
 * @interface NodeProperties
 * @property {(?Node|undefined)} parentNode - The parent node or undefined if there is no parent
 * @property {(!Array.<Node>|undefined)} childNodes - The list of the child nodes
 * @exports
 */
export interface NodeProperties {
    parentNode?: Node;
    childNodes?: Node[];
}


/**
 * Syntax tree node structure
 * @class
 * @property {?SyntaxTree} tree - The tree or undefined if this node isn't in any tree
 * @property {?Node} parentNode - The parent node or undefined if there is no parent
 * @property {!Array.<Node>} childNodes - The child node list
 * @property {number} subtreeSize - The size of the subtree formed by this node
 */
export class Node {
    tree: SyntaxTree;
    public parentNode: Node;
    private subtreeSize: number;
    private childNodes_: Node[];

    /**
     * Constructor
     * @param {!NodeProperties=} opt_initialProperties the initial property values
     */
    constructor(opt_initialProperties?: NodeProperties) {
        this.childNodes_ = [];

        if (opt_initialProperties !== undefined) { // if the initial properties are defined
            mustBeObject(opt_initialProperties, "initialProperties isn't an Object instance");
            if (opt_initialProperties.childNodes !== undefined) { // if the child node list is set

                mustBeArray(opt_initialProperties.childNodes, "initialProperties.childNodes isn't an Array instance");
                opt_initialProperties.childNodes.forEach(this.insertChildSubtree, this);

            }
            const optParentNode = opt_initialProperties.parentNode;
            if (optParentNode !== undefined) { // if the parent node is set
                if (!!optParentNode) {
                    //noinspection JSUnresolvedFunction
                    optParentNode.insertChildSubtree(this);
                } else {
                    throw new TypeError("initialProperties.parentNode isn't a SyntaxTree.Node instance");
                }
            }
        }
    }


    /**
     * Get the child nodes
     * @return {!Array.<Node>} the child node list
     */
    get childNodes(): Node[] {
        return this.childNodes_.slice();
    }


    /**
     * Get the child node
     * @param {(!Node|number)} node the child node or its child index
     * @return {?Node} the child node or undefined of there is no such a child node
     */
    childNode(node: Node | number): Node | undefined {
        if (isNumber(node)) // if the node child index is given
            return this.childNodes_[node] || undefined;
        if (node instanceof Node) // if the child node is given
            return node.parentNode === this ? node : undefined;
        throw new TypeError('"node" is neither a number nor a SyntaxTree.Node instance');
    }


    /**
     * Get the child node index
     * @param {(!Node|number)} node the child node or its child index
     * @return {(number|undefined)} the child node or undefined of there is no such a child node
     */
    childIndex(node: Node | number): number | undefined {
        if (isNumber(node)) // if the node child index is given
            return this.childNodes_[node] ? node : undefined;
        if (node instanceof Node) // if the child node is given
            return node.parentNode === this ? this.childNodes_.indexOf(node) : undefined;
        throw new TypeError('"node" is neither a number nor a SyntaxTree.Node instance');
    }


    /**
     * Insert a node to this child node list
     * @param {!Node} node the node to insert (must have no parent and no child nodes)
     * @param {number=undefined} childIndex
     *        the position of the node for this child node list, the last by default
     * @param {number=0} childNodesToCover
     *        the number of this child nodes to become the child nodes of the new node
     * @return {?Node} the inserted node or undefined if cannot insert
     */
    insertChildNode(node: Node, childIndex: number, childNodesToCover: number): Node {
        if (!(node instanceof Node)) throw new TypeError('"node" isn\'t a SyntaxTree.Node instance');
        if (node.parentNode) throw new TypeError('"node" has a parent');
        if (node.tree) throw new TypeError('"node" is a tree root');

        // TODO
        // if (!(this instanceof node.parentNodeClass_))
        //   throw new TypeError('"this" isn\'t a suitable class instance');

        if (node.childNodes_.length) throw new TypeError('"node" has child nodes');
        if (!this.hasOwnProperty("childNodes_")) // if there was no child nodes
        // init the property
            this.childNodes_ = [];
        // use the last position by default
        if (childIndex === undefined) childIndex = this.childNodes_.length;
        // do not cover any child nodes by default
        if (childNodesToCover === undefined) childNodesToCover = 0;
        // replace the child nodes by the new node
        const nodeChildNodes = this.childNodes_.splice(childIndex, childNodesToCover, node);
        // update the size of the subtree formed by this node
        this.subtreeSize = this.subtreeSize + 1;
        // for all the parent nodes
        for (let parentNode = this.parentNode; parentNode; parentNode = parentNode.parentNode) {
            // update the size of the subtree formed by the parent node
            parentNode.subtreeSize = parentNode.subtreeSize + 1;
        }
        // update the parent node of the new node
        Object.defineProperty(node, "parentNode", {
            value: this,
            enumerable: true,
            configurable: true
        });
        if (nodeChildNodes.length) { // if there are child nodes for the new node
            // store the child nodes
            Object.defineProperty(node, "childNodes_", {value: nodeChildNodes, configurable: true});
            let subtreeSize = 1; // initiate the size of the subtree formed by the new node
            // for all the child nodes of the new node
            nodeChildNodes.forEach(nodeChildNode => {
                subtreeSize += nodeChildNode.subtreeSize;
            });
            // store the subtree size
            Object.defineProperty(node, "subtreeSize", {
                value: subtreeSize,
                enumerable: true,
                configurable: true
            });
        }
        return node;
    }


    /**
     * Insert a subtree to this child node list.
     * @param {!Node} node the subtree to insert root node (must have no parent)
     * @param {number=} childIndex
     *        the position of the subtree root for this child node list, the last by default
     */
    insertChildSubtree(node: Node, childIndex?: number) {
        if (!(node instanceof Node))
            throw new TypeError('"node" isn\'t a SyntaxTree.Node instance');
        if (node.parentNode) throw new TypeError('"node" has a parent');
        if (node.tree) throw new TypeError('"node" is a tree root');

        // todo check
        // if (!(this instanceof node.parentNodeClass_))
        //   throw new TypeError('"this" isn\'t a suitable class instance');
        // init child nodes property if not exists
        if (!this.hasOwnProperty("childNodes_")) // if there was no child nodes
        // init the property
            Object.defineProperty(this, "childNodes_", {value: [], configurable: true});
        // use the last position by default
        if (childIndex === undefined)
            childIndex = this.childNodes_.length;

        this.childNodes_.splice(childIndex, 0, node); // insert the new node to the child list
        const nodeSubtreeSize = node.subtreeSize; // the size of the subtree formed by the node
        // update the size of the subtree formed by this node
        Object.defineProperty(this, "subtreeSize", {
            value: this.subtreeSize + nodeSubtreeSize, enumerable: true, configurable: true
        });
        // for all the parent nodes
        for (let parentNode = this.parentNode; parentNode; parentNode = parentNode.parentNode) {
            // update the size of the subtree formed by the parent node
            Object.defineProperty(parentNode, "subtreeSize", {
                value: parentNode.subtreeSize + nodeSubtreeSize
            });
        }
        // update the parent node of the new node
        Object.defineProperty(node, "parentNode", {
            value: this,
            enumerable: true,
            configurable: true
        });
    }


    /**
     * Remove a child node of this node. All its child nodes become the child nodes of this node
     * @param {(!Node|number)} nodeOrNodeIndex the subtree root or its child index
     * @return {?Node} the removed node or undefined of there is no such a child node
     */
    removeChildNode(nodeOrNodeIndex: number | Node): Node | undefined {
        const nodeChildIndex: number | undefined = this.childIndex(nodeOrNodeIndex); // the child index of the node
        if (nodeChildIndex === undefined) return undefined; // return if there is no such a child

        const node: Node = this.childNodes_[nodeChildIndex]; // the child node to remove

        // replace the node with its child nodes at this child node list
        // todo could be more efficient?
        this.childNodes_.splice(nodeChildIndex, 1, ...node.childNodes_);

        if (this.childNodes_.length) { // if there are child nodes
            // update this node subtree size
            this.subtreeSize = this.subtreeSize - 1;
        } else { // if there are no child nodes
            delete this.childNodes_; // this node has no child nodes anymore
            delete this.subtreeSize; // this node has node subtree anymore
        }
        // for all the parent nodes
        for (let parentNode = this.parentNode; parentNode; parentNode = parentNode.parentNode) {
            // update the size of the subtree formed by the parent node
            parentNode.subtreeSize = parentNode.subtreeSize - 1;
        }
        delete node.parentNode; // the node has no parent node anymore

        delete node.childNodes_; // the node has no child nodes anymore
        delete node.subtreeSize; // the node has no subtree anymore
        return node;
    }


    /**
     * Remove a subtree formed by a child node of this node
     * @param {(!Node|number)} node the subtree root or its child index
     * @return {?Node} the removed subtree root node or undefined of there is no such a child node
     */
    removeChildSubtree(node: Node | number): Node | undefined {
        const nodeChildIndex: number | undefined = this.childIndex(node); // the child index of the node

        if (nodeChildIndex === undefined)
            return undefined; // return if there is no such a child

        const theNode: Node = mustNotBeUndefined(this.childNodes_.splice(nodeChildIndex, 1)[0]); // remove the node from the child list
        const nodeSubtreeSize = theNode.subtreeSize; // the size of the subtree formed by the node
        if (this.childNodes_.length) { // if there are child nodes
            // update this node subtree size
            Object.defineProperty(this, "subtreeSize", {value: this.subtreeSize - nodeSubtreeSize});
        } else { // if there are no child nodes
            delete this.childNodes_; // this node has no child nodes anymore
            delete this.subtreeSize; // this node has node subtree anymore
        }
        // for all the parent nodes
        for (let parentNode = this.parentNode; parentNode; parentNode = parentNode.parentNode) {
            // update the size of the subtree formed by the parent node
            Object.defineProperty(parentNode, "subtreeSize", {
                value: parentNode.subtreeSize - nodeSubtreeSize
            });
        }
        delete theNode.parentNode; // the node has no parent node anymore
        return theNode;
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false): string {
        let source = ""; // the sources
        // for all the child nodes
        this.childNodes_.forEach(childNode => {
            source += childNode.toString(true);
        });
        return skipNodeClass ? source : "SourceTree.Node{" + source + "}";
    }
}
