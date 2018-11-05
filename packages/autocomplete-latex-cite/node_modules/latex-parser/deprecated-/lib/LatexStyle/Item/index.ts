import {Lexeme} from "../../Latex/Lexeme";
import {modes, KirillMode, mustBeKirillMode} from "../../Latex/Mode";
import {testProperties} from "../../../../src/Utils";

/**
 * LaTeX style item properties
 * @interface ItemProperties
 * @property {(Lexeme|undefined)} lexeme - The logical lexeme
 * @property {(!Object.<KirillMode, boolean>|undefined)} modes -
 *           The modes where the item is defined or not
 */
export interface ItemProperties {
    lexeme?: Lexeme;
    modes?: { [mode: string]: boolean };
}


/**
 * LaTeX style item encapsulation
 * @class
 * @property {(?Lexeme)} lexeme - The logical lexeme
 * @property {!Object.<KirillMode, boolean>} modes - The modes where the item is defined or not
 */
export class Item {
    lexeme?: Lexeme;
    modes: { [mode: string]: boolean };

    /**
     * Constructor.
     * @param {!ItemProperties=} opt_initialProperties the initial property values
     */
    constructor(opt_initialProperties: ItemProperties = {}) {
        // do nothing if there are no initial properties
        if (opt_initialProperties === undefined) return;
        if (!(opt_initialProperties instanceof Object))
            throw new TypeError('"initialProperties" isn\'t an Object instance');
        switch (opt_initialProperties.lexeme) {
            case undefined:
                break; // do nothing if no lexeme defined
            default:
                const lexeme = Lexeme[opt_initialProperties.lexeme]; // verify the lexeme
                if (lexeme === undefined)
                    throw new TypeError('"initialProperties.lexeme" isn\'t a Lexeme option');
                Object.defineProperty(this, "lexeme", {value: lexeme});
        }
        if (opt_initialProperties.modes !== undefined) {// if the mode states are set
            if (!(opt_initialProperties.modes instanceof Object))
                throw new TypeError('"initialProperties.modes" isn\'t an Object instance');
            Object.defineProperty(this, "modes", {value: {}}); // create the mode state storage
            for (const modeKey in opt_initialProperties.modes) { // for all the given modes // TODO better loop
                const mode: KirillMode = mustBeKirillMode(modeKey); // verify the mode key
                if (mode === undefined) // if the mode is unknown
                    throw new TypeError(`"initialProperties.modes[${modeKey}]" isn't a Mode option`);
                // store the mode state
                //noinspection JSUnfilteredForInLoop
                Object.defineProperty(this.modes, mode, {
                    value: opt_initialProperties.modes[modeKey],
                    enumerable: true
                });
            }
        }
    }


    /**
     * Compare this item with the other one
     * @param {?Item} other the item to compare with
     * @return {boolean} true if the items are equal, false otherwise
     */
    equals(other: any) {
        if (!(other instanceof Item)) return false;
        return this.lexeme === other.lexeme &&
            testProperties(this.modes, other.modes, modes, false);
    }
}

Object.defineProperties(Item.prototype, { // default property values
    lexeme: {value: undefined, enumerable: true}, // no lexeme by default
    modes: {value: {}, enumerable: true} // no mode mask by default
});
