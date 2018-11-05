
import {Item, ItemProperties} from "./index";


export interface EnvironmentAndPackage {
    environment: Environment;
    packageName?: string;
}

/**
 * LaTeX command properties
 * @interface EnvironmentProperties
 * @extends ItemProperties
 * @property {(string|undefined)} name - The command name (a sequence of letters and optional star)
 */
export interface EnvironmentProperties extends ItemProperties {
    name?: string;
}

/**
 * LaTeX environment encapsulation
 * @class
 * @extends Item
 * @property {string} name - The environment name (a sequence of letters and optional star)
 */
export class Environment extends Item {
    name: string;


    /**
     * Constructor
     * @param {!EnvironmentProperties=} opt_initialProperties the initial property values
     */
    constructor(opt_initialProperties: EnvironmentProperties = {}) {
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
     * Compare this environment with the other one
     * @param {?Environment} other the environment to compare with
     * @return {boolean} true if the environments are equal, false otherwise
     * @override
     */
    equals(other: any) {
        if (!(other instanceof Environment)) return false; // type test
        if (!super.equals(other)) return false; // superclass test
        return this.name === other.name;
    }
}

Object.defineProperties(Environment.prototype, { // default property values
    name: {value: "", enumerable: true} // empty name
});



export function isEnvironment(x: any): x is Environment {
    return x instanceof Environment;
}