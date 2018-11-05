import {modes, ModeStates, mustBeKirillMode} from "./Mode";

/**
 * LaTeX state encapsulation
 * @class
 */
export class State {
    private modeStates_: ModeStates;


    /**
     * Constructor
     * @param {!Object.<KirillMode,boolean>=} opt_initialModeStates the initial mode states
     * @constructor
     */
    constructor(opt_initialModeStates: ModeStates = {}) {
        Object.defineProperty(this, "modeStates_", {value: {}, enumerable: false});

        this.modeStates_[modes.LIST] = false;
        this.modeStates_[modes.MATH] = false;
        this.modeStates_[modes.PICTURE] = false;
        this.modeStates_[modes.TABLE] = false;
        this.modeStates_[modes.TEXT] = true;
        this.modeStates_[modes.VERTICAL] = false;

        // update the mode states
        if (opt_initialModeStates !== undefined) this.update(opt_initialModeStates);
    }


    /**
     * Create a copy of this state.
     * @return {!State} the created copy
     */
    copy() {
        return new State(this.modeStates_);
    }


    /**
     * Update the state with states for modes
     * @param {!Object.<KirillMode,boolean>} modeStates the states for modes
     */
    update(modeStates: ModeStates) {
        for (const modeKey in modeStates) { // for all the given modes
            const mode = modes[mustBeKirillMode(modeKey)]; // verify the mode key
            if (mode === undefined) // if the mode is unknown
                throw new TypeError('"modeStates[' + modeKey + ']" isn\'t a Latex.KirillMode option');
            this.modeStates_[mode] = modeStates[modeKey]; // store the mode state
        }
    }


    /**
     * Test the state with mode states
     * @param {!Object.<KirillMode,boolean>} modeStates the states for modes
     * @return {boolean} true if the state fits the modes, false otherwise
     */
    test(modeStates: ModeStates) {
        for (const modeKey in modeStates) { // for all the given modes
            const mode = modes[mustBeKirillMode(modeKey)]; // verify the mode key
            if (mode === undefined) // if the mode is unknown
                throw new TypeError('"modeStates[' + modeKey + ']" isn\'t a Latex.KirillMode option');
            // exit if the mode has different states
            if (this.modeStates_[mode] !== modeStates[modeKey]) return false;
        }
        return true;
    }
}