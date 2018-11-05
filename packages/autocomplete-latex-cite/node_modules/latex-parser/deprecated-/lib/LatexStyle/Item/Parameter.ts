import {Item, ItemProperties} from "./index";
import {Operation, OperationProperties} from "../../Latex/Operation";

/**
 * LaTeX symbol or command parameter properties
 * @interface ParameterProperties
 * @extends ItemProperties
 * @property {(!Array.<!Operation|!OperationProperties>|undefined)} operations -
 *           The LaTeX operations that are performed before the parameter
 */
export interface ParameterProperties extends ItemProperties {
    operations?: (Operation | OperationProperties)[];
}

export function isParameterProperties(ignored: any): ignored is ParameterProperties {
    return true; // todo fields are all optional
}

export function mustBeParameterProperties(x: any): ParameterProperties {
    if (!isParameterProperties) throw new Error();
    return x;
}

/**
 * LaTeX symbol or command parameter encapsulation
 * @class
 * @extends Item
 * @property {!Array.<!Operation>} operations -
 *           The LaTeX operations that are performed before this parameter
 */
export class Parameter extends Item {
    //noinspection JSMismatchedCollectionQueryUpdate TODO
    private operations_: Operation[];


    /**
     * Constructor
     * @param {!ParameterProperties=} opt_initialProperties the initial property values
     */
    constructor(opt_initialProperties: ParameterProperties = {}) {
        super(opt_initialProperties); // the superclass constructor
        // do nothing if there are no initial properties
        if (opt_initialProperties === undefined) return;
        if (opt_initialProperties.operations !== undefined) { // if the operation list is set
            if (!(opt_initialProperties.operations instanceof Array))
                throw new TypeError('"initialProperties.operations" isn\'t an Array instance');
            Object.defineProperty(this, "operations_", { // generate and store the operations list
                value: opt_initialProperties.operations.map(operation => new Operation(operation))
            });
        }
    }


    /**
     * Get the LaTeX operations that are performed before this parameter
     * @return {!Array.<!Operation>} the operation list
     */
    get operations(): Operation[] {
        return this.operations_.slice();
    }


    /**
     * Compare this parameter with the other one
     * @param {?Parameter} other the parameter to compare with
     * @return {boolean} true if the parameters are equal, false otherwise
     * @override
     */
    equals(other: any) {
        if (!(other instanceof Parameter)) return false; // type test
        if (!super.equals(other)) return false; // superclass test

        if (this.operations_.length !== other.operations_.length) return false;
        // test all the operations

        return this.operations_.every((operation, iOperation) =>
            operation.equals(other.operations_[iOperation]));
    }
}

Object.defineProperties(Parameter.prototype, { // make getters and setters enumerable
    operations: {enumerable: true}
});
Object.defineProperties(Parameter.prototype, { // default property values
    operations_: {value: [], enumerable: false} // empty operation list by default
});

