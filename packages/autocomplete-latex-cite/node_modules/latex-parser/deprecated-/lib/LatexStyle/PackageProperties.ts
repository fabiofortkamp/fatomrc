import {SymbolProperties} from "./Item/Symbol/index";
import {CommandProperties} from "./Item/Symbol/Command";
import {EnvironmentProperties} from "./Item/Environment";

/**
 * LaTeX style package properties
 * @interface PackageProperties
 * @property {(!Array.<!SymbolProperties>|undefined)} symbols - The symbols of the package in the priority descending order
 * @property {(!Array.<!CommandProperties>|undefined)} commands - The commands of the package in the priority descending order
 * @property {(!Array.<!EnvironmentProperties>|undefined)} environments - The environments of the package
 */
export interface PackageProperties {
    symbols?: SymbolProperties[];
    commands?: CommandProperties[];
    environments?: EnvironmentProperties[];
}

//noinspection JSUnusedGlobalSymbols
export function mustBePackageProperties(x: any): PackageProperties {
    if (!isPackageProperties(x)) throw new Error("Invalid format for PackageProperties");
    return x;
}

export function isPackageProperties(x: any): x is PackageProperties {
    // TODO all props are optional...
    // symbols?: SymbolProperties[];
    // commands?: CommandProperties[];
    // environments?: EnvironmentProperties[];

    return !Object.keys(x).some(k => {
        switch (k) {
            case "symbols":
            case "commands":
            case "environments":
                return false;
            default:
                return true;
        }
    });
}
