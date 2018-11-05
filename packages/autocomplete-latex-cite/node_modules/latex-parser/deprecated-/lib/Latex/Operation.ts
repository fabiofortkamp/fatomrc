
import {Directive, isDirective} from "./Directive/index";
import {GROUP, isGROUP} from "./Directive/GROUP";
import {isKirillMode, KirillMode, modes} from "./Mode";

/**
 * LaTeX operation properties
 * @interface OperationProperties
 * @property {Directive} directive - The directive or undefined if there is no a directive
 * @property {KirillMode|GROUP} operand - The operand or undefined if there is no an operand
 */
export interface OperationProperties {
    directive: Directive;
    operand: KirillMode | GROUP;
}

export function isOperationProperties(x: any): x is OperationProperties {
    return x
        && x.hasOwnProperty("directive")
        && isDirective(x.directive)
        && x.hasOwnProperty("operand")
        && (isKirillMode(x.operand) || isGROUP(x.operand))
        ;
}

//noinspection JSUnusedGlobalSymbols
export function mustBeOperationProperties(x: any): OperationProperties {
    if (!isOperationProperties(x)) throw new Error();
    return x;
}

/**
 * LaTeX operation encapsulation
 * @class
 * @property {Directive} directive - The directive or undefined if there is no a directive
 * @property {KirillMode|GROUP} operand - The operand or undefined if there is no an operand
 */
export class Operation {
    directive: Directive;
    operand: KirillMode | GROUP;


    /**
     * Constructor
     * @param {!OperationProperties=} opt_initialProperties the initial property values
     */
    constructor(opt_initialProperties?: OperationProperties) {
        // do nothing if the initial properties aren't defined
        if (opt_initialProperties === undefined) return;
        if (!(opt_initialProperties instanceof Object))
            throw new TypeError(`"initialProperties" isn't an Object instance`);
        const directive = Directive[opt_initialProperties.directive]; // validate the directive
        if (!directive)
            throw new TypeError(`"initialProperties.directive" isn't an Latex.Directive option`);
        Object.defineProperty(this, "directive", {value: directive, enumerable: true});
        switch (opt_initialProperties.operand) {
            case GROUP: // if operand is a group
                // store the operand
                Object.defineProperty(this, "operand", {value: GROUP, enumerable: true});
                break;
            default:
                const mode = modes[opt_initialProperties.operand]; // validate the operand as a mode
                if (!mode) throw new TypeError('"initialProperties.operand" isn\'t an Latex.KirillMode option');
                // store the operand
                Object.defineProperty(this, "operand", {value: mode, enumerable: true});
        }
    }


    /**
     * Compare this operation with the other
     * @param {!Operation} other the operation to compare with
     * @return {boolean} True if the operations are equal false otherwise
     */
    equals(other: any) {
        if (!(other instanceof Operation)) return false; // type test
        return this.directive === other.directive && this.operand === other.operand;
    }
}
