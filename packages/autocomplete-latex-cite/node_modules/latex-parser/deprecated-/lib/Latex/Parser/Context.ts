import {State} from "../State";
import {Token} from "../../SyntaxTree/Token/index";
import {Operation} from "../Operation";
import {ModeStates} from "../Mode";
import {GROUP} from "../Directive/GROUP";
import {mustBeArray, mustNotBeUndefined} from "../../../../src/Utils";

/**
 * The parsing context
 *
 * @struct
 * @property {string} source - The source to parse
 * @property {number} position - The current position in the source
 * @property {?Token} currentToken - The currently parsing token
 * @property {!State} currentState - The current LaTeX state
 * @property {!Array.<!State>} stateStack - The stack of LaTeX sates
 * @property {!Array.<string>} comments - The comment list for the nex token
 * @property {number} lineNumber - The current line number
 * @property {number} charNumber - The current char number in the current line
 * @property {function} copy
 */
export class Context {
    source: string;
    position: number;
    currentToken?: Token;
    currentState: State;
    stateStack: State[];
    comments: string[];
    lineNumber: number;
    charNumber: number;


    /**
     * Constructor
     * @param {string=} opt_source the sources to parse (empty string by default)
     */
    constructor(opt_source = "") {
        this.source = opt_source; // store the sources
        this.position = 0;        // start from the beginning
        this.lineNumber = 0;      // start from the line 0
        this.charNumber = 0;      // start from the char 0
        this.currentToken = undefined;   // no tokens were parsed
        this.currentState = new State(); // initial LaTeX state
        this.stateStack = [];     // no stored states
        this.comments = [];       // no comments for the next token
    }


    /**
     * Copy this context
     * @param {!Context=} opt_target the context to copy to or undefined to create a new one
     * @return {!Context} the context copy
     */
    copy(opt_target?: Context): Context {
        const target = opt_target || new Context(); // the context to copy this context in

        target.source = this.source;
        target.position = this.position;
        target.lineNumber = this.lineNumber;
        target.charNumber = this.charNumber;
        target.currentToken = this.currentToken;
        target.currentState = this.currentState.copy();
        target.stateStack = this.stateStack.slice();
        target.comments = this.comments.slice();

        return target;
    }


    /**
     * Update the LaTeX state
     * @param {!Array.<!Operation>} operations the LaTeX operation list
     */
    updateState(operations: Operation[]) {
        mustBeArray(operations, `"operations" isn't an Array instance`);

        let newModeStates: ModeStates = {}; // the modes to update

        operations.forEach((operation: Operation) => {

            switch (operation.directive) {
                case "BEGIN":
                    switch (operation.operand) {
                        case "GROUP":
                            this.currentState.update(newModeStates); // store the mode states
                            newModeStates = {}; // no more states to update
                            this.stateStack.push(this.currentState.copy()); // store the current state
                            break;
                        default:

                            newModeStates[operation.operand] = true; // turn the state on
                    }
                    break;
                case "END":
                    switch (operation.operand) {
                        case GROUP:
                            newModeStates = {}; // no need to store the states
                            if (this.stateStack.length < 1) throw new Error("state stack is empty");
                            this.currentState = mustNotBeUndefined(this.stateStack.pop()); // restore the current state
                            break;
                        default:

                            newModeStates[operation.operand] = false; // turn the state off
                    }
                    break;
                default:
                    throw new Error();
            }
        });
        this.currentState.update(newModeStates); // store the mode states
    }
}