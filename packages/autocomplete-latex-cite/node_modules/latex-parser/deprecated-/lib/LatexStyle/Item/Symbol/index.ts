
import {mustBeParameterProperties, Parameter, ParameterProperties} from "../Parameter";
import {Item, ItemProperties} from "../index";
import {mustBeOperationProperties, Operation, OperationProperties} from "../../../Latex/Operation";
import {isNumber, mustNotBeUndefined} from "../../../../../src/Utils";
/**
 * LaTeX symbol properties
 * @interface SymbolProperties
 * @extends ItemProperties
 * @property {(!Array.<!Operation|!OperationProperties>|undefined)} operations - The LaTeX operations that
 * @property {(!Array.<!Parameter|!ParameterProperties>|undefined)} parameters - The parameters description list
 * @property {(string|undefined)} pattern - The LaTeX input pattern
 * @property {(string|undefined)} html - The HTML output pattern
 * are performed after the symbol
 */
export interface SymbolProperties extends ItemProperties {
    operations?: (Operation | OperationProperties)[];
    parameters?: (Parameter | ParameterProperties)[];
    pattern?: string;
    html?: string;
}

export interface SymbolAndPackage {
    symbol: Symbol;
    packageName: string;
}

/**
 * LaTeX symbol encapsulation
 * @class
 * @extends Item
 * @property {!Array.<!Operation>} operations -
 *           The LaTeX operations that are performed after this symbol
 * @property {!Array.<!Parameter>} parameters - The parameters description list
 * @property {!Array.<undefined|string|number>} patternComponents - The LaTeX input pattern components
 * @property {string} pattern - The LaTeX input pattern
 * @property {string} html - The HTML output pattern
 */
export class Symbol extends Item {
    //noinspection JSMismatchedCollectionQueryUpdate // TODO
    private operations_: Operation[];
    //noinspection JSMismatchedCollectionQueryUpdate // TODO
    private parameters_: Parameter[];
    //noinspection JSMismatchedCollectionQueryUpdate // TODO
    private patternComponents_: (undefined | string | number)[];

    html: string;


    /**
     * Constructor
     * @param {!SymbolProperties=} opt_initialProperties the initial property values
     */
    constructor(opt_initialProperties: SymbolProperties = {}) {
        super(opt_initialProperties); // the superclass constructor
        // do nothing if there are no initial properties
        if (opt_initialProperties === undefined) return;
        if (opt_initialProperties.operations !== undefined) { // if the operation list is set
            if (!(opt_initialProperties.operations instanceof Array))
                throw new TypeError('"initialProperties.operations" isn\'t an Array instance');
            Object.defineProperty(this, "operations_", { // generate and store the operations list
                value: opt_initialProperties.operations.map(operation => new Operation(mustBeOperationProperties(operation)))
            });
        }
        if (opt_initialProperties.parameters !== undefined) { // if the parameters list is set
            if (!(opt_initialProperties.parameters instanceof Array))
                throw new TypeError('"initialProperties.parameters" isn\'t an Array instance');
            // generate and store the parameters list
            this.parameters_ = opt_initialProperties.parameters.map(parameter => new Parameter(mustBeParameterProperties(parameter)));
        }
        if (opt_initialProperties.pattern !== undefined) { // if the LaTeX pattern is set
            if (typeof opt_initialProperties.pattern !== "string")
                throw new TypeError('"initialProperties.pattern" isn\'t a string');
            // try to parse the pattern
            const patternComponents = opt_initialProperties.pattern.match(/([ \t]+|#\d+|[^ \t#]+)/g);
            if (!!patternComponents) { // if there is a non-trivial pattern

                // store the pattern components
                this.patternComponents_ = patternComponents.map((patternPart: string): string | undefined | number => {
                    switch (patternPart[0]) {
                        case " ":
                        case "\t": // if a space part
                            return undefined; // undefined is a mark for spaces
                        case "#": // if a parameter part
                            const parameterIndex = Number(patternPart.substring(1)) - 1; // the index of a parameter
                            if (!this.parameters_[parameterIndex])
                                throw new TypeError(
                                    '"initialProperties.pattern" contains the incorrect parameter number ' +
                                    patternPart.substring(1)
                                );
                            return parameterIndex;
                        default: // raw pattern part
                            return patternPart;
                    }
                });
            }
        }
        if (opt_initialProperties.html !== undefined) { // if the LaTeX pattern is set
            if (typeof opt_initialProperties.html !== "string")
                throw new TypeError('"initialProperties.html" isn\'t a string');
            // store the pattern
            Object.defineProperty(this, "html", {value: opt_initialProperties.html, enumerable: true});
        }
    }

    /**
     * Get the LaTeX operations that are performed after this symbol
     * @return {!Array.<!Operation>} the operation list
     */
    get operations(): Operation[] {
        return this.operations_.slice();
    }

    /**
     * Get the parameters description list
     * @return {!Array.<!Parameter>} the parameter list
     */
    get parameters(): Parameter[] {
        return this.parameters_.slice();
    }

    /**
     * Get the parameter description
     * @param {number} parameterIndex the index of the parameter
     * @return {?Parameter} the parameter or undefined if there is no parameter with such an index
     */
    parameter(parameterIndex: number): Parameter | undefined {
        return this.parameters_[parameterIndex] || undefined;
    }

    /**
     * Get the pattern components
     * @return {!Array.<!Parameter>} the pattern component list
     */
    get patternComponents(): any[] {
        return mustNotBeUndefined(this.patternComponents_.slice());
    }


    /**
     * Get the pattern
     * @return {string} the LaTeX input pattern
     */
    get pattern() {
        return this.patternComponents_.map(patternComponent => {
            if (isNumber(patternComponent)) {
                return "#" + (patternComponent + 1);
            }
            switch (typeof patternComponent) {
                case "string":
                    return patternComponent;
                default:
                    return " ";
            }
        }).join("");
    }

    /**
     * Compare this symbol with the other one
     * @param {?Symbol} other the symbol to compare with
     * @return {boolean} true if the symbols are equal, false otherwise
     * @override
     */
    equals(other: any): boolean {
        if (!(other instanceof Symbol)) return false; // type test
        if (!super.equals(other)) return false; // superclass test

        if (this.operations_.length !== other.operations_.length) return false;
        // test all the operations

        if (!this.operations_.every((operation, iOperation) =>
                operation.equals(other.operations_[iOperation])))
            return false;

        if (this.parameters_.length !== other.parameters_.length) return false;
        // test all the parameters

        if (!this.parameters_.every((parameter, iParameter) =>
                parameter.equals(other.parameters_[iParameter])))
            return false;
        return this.html === other.html;
    }
}

Object.defineProperties(Symbol.prototype, { // make getters and setters enumerable
    operations: {enumerable: true},
    parameters: {enumerable: true},
    patternComponents: {enumerable: true},
    pattern: {enumerable: true}
});

Object.defineProperties(Symbol.prototype, { // default property values
    operations_: {value: [], enumerable: false, writable: true}, // empty operation list
    parameters_: {value: [], enumerable: false, writable: true}, // empty parameter list
    patternComponents_: {value: [], enumerable: false, writable: true}, // empty pattern
    html: {value: "", enumerable: true, writable: true} // empty HTML pattern
});
