import {Symbol, SymbolProperties} from "./index";

/**
 * LaTeX command properties
 * @interface CommandProperties
 * @extends SymbolProperties
 * @property {(string|undefined)} name - The command name (a sequence of letters and optional star)
 */
export interface CommandProperties extends SymbolProperties {
    name?: string;
}

export interface CommandAndPackage {
    command: Command;
    packageName: string;
}

/**
 * LaTeX command encapsulation
 * @class
 * @extends Symbol
 * @property {string} name - The command name (a sequence of letters and optional star)
 */
export class Command extends Symbol {
    name: string;


    /**
     * Constructor
     * @param {!CommandProperties=} opt_initialProperties the initial property values
     */
    constructor(opt_initialProperties: CommandProperties = {}) {
        super(opt_initialProperties); // the superclass constructor
        // do nothing if there are no initial properties
        if (opt_initialProperties === undefined) return;
        if (opt_initialProperties.name !== undefined) { // if the name is set
            if (typeof opt_initialProperties.name !== "string")
                throw new TypeError('"initialProperties.name" isn\'t a string');
            // store the name
            Object.defineProperty(this, "name", {value: opt_initialProperties.name});
        }
    }


    /**
     * Compare this command with the other one
     * @param {?Command} other the command to compare with
     * @return {boolean} true if the commands are equal, false otherwise
     * @override
     */
    equals(other: any) {
        if (!(other instanceof Command)) return false; // type test
        if (!super.equals(other)) return false; // superclass test
        return this.name === other.name;
    }
}

Object.defineProperties(Command.prototype, { // default property values
    name: {value: "", enumerable: true} // empty name
});
export function isCommand(c: any): c is Command {
    return c instanceof Command;
}
export function mustBeCommand(c: any): Command {
    if (!isCommand(c)) throw new Error();
    return c;
}