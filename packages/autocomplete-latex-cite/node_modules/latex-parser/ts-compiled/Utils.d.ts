export declare type StringMap = {
    [s: string]: string;
};
export declare type TargetObject = any;
export declare type ValuesObject = any;
export declare type OptKeys = StringMap | string[];
export interface OptAttributes {
    writable: boolean;
    enumerable: boolean;
    configurable: boolean;
}
export declare function updateProperties(target: TargetObject, values: ValuesObject, opt_keys?: OptKeys, opt_attributes?: OptAttributes): void;
export declare function testProperties(target: TargetObject, values?: ValuesObject, opt_keys?: OptKeys, opt_skipUndefined?: boolean): boolean;
export declare const mustBeNumber: (a: any, msg?: string | undefined) => number;
export declare function isNumber(x: any): x is number;
export declare function isString(x: any): x is string;
export declare function mustNotBeUndefined<T>(x?: T, msg?: string): T;
export declare function mustBeObject(o: any, msg?: string): any;
export declare function mustBeString(o: any, msg?: string): string;
export declare function mustBeArray(a: any, msg?: string): any[];
export declare function isArray(x: any): x is any[];
export declare const mconcat: <T>(mappend: (x: T, y: T) => T, ...args: T[]) => T;
export declare const snd: <T, U>(pair: [T, U]) => U;
export declare function concatMap<T, U>(arr: T[], f: (t: T) => U[]): U[];
