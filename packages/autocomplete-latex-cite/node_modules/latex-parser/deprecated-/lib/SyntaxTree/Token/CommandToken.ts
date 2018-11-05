import {Command, isCommand, mustBeCommand} from "../../LatexStyle/Item/Symbol/Command";
import {TokenProperties} from "./index";
import {SymbolToken} from "./SymbolToken";

/**
 * LaTeX command token properties
 * @interface CommandTokenProperties
 * @extends TokenProperties
 * @property {!Command|undefined} command -
 *           The LaTeX command or undefined if the command is unrecognized
 * @property {string|undefined} name - The name that corresponds to the unrecognized command
 */
export interface CommandTokenProperties extends TokenProperties {
    command?: Command;
    name?: string;
}


/**
 * LaTeX command token structure
 * @class
 * @extends SymbolToken
 * @property {!Command} command -
 *           The corresponding LaTeX command or undefined if the command is unrecognized
 * @property {string|undefined} name - The LaTeX command name
 */
export class CommandToken extends SymbolToken {
    /**
     * LaTeX command
     */
    readonly command: Command;
    /**
     * Command name
     */
    readonly name: string;

    /**
     * Constructor
     * @param {!CommandTokenProperties} initialProperties the initial property values
     */
    constructor(initialProperties: CommandTokenProperties) {
        if (!(initialProperties instanceof Object))
            throw new TypeError('"initialProperties" isn\'t an Object instance');
        // copy the initial properties for the superclass
        const superInitialProperties = Object.create(initialProperties);

        if (initialProperties.command) { // if the command is defined
            if (!(initialProperties.command instanceof Command))
                throw new TypeError('"initialProperties.command" isn\'t a LatexStyle.Command instance');
            // the command is the symbol for the superclass
            superInitialProperties.symbol = initialProperties.command;
            super(superInitialProperties); // the superclass constructor

            this.command = mustBeCommand(initialProperties.command);
            this.name = this.command.name;
        } else { // if the command isn't defined
            if (typeof initialProperties.name !== "string")
                throw new TypeError('"initialProperties.name" isn\'t a string');
            superInitialProperties.pattern = "";
            super(superInitialProperties); // the superclass constructor

            // store the unrecognized name
            this.name = initialProperties.name;
        }
    }


    /**
     * Get the string representation of this node
     * @param {boolean=false} skipNodeClass
     *        true to not include the node class name into the output, false otherwise
     * @return {string} the sources string
     * @override
     */
    toString(skipNodeClass = false) {
        const source = "\\" + this.name + super.toString(true);
        return skipNodeClass ?
            source :
            `CommandToken${(isCommand(this.symbol) ? "" : "[?]")}`
            + `\{${source}}`;
    }
}


// Object.defineProperties(CommandToken.prototype, { // make getters and setters enumerable
//     command: {enumerable: true},
//     name: {enumerable: true}
// });

export function isCommandToken(x: any): x is CommandToken {
    return x && x instanceof CommandToken;
}
