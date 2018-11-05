/**
 * Group operand for directives
 * @const {string}
 */
export const GROUP = "GROUP";
export type GROUP = "GROUP";
export function isGROUP(x: any): x is GROUP {
    return x === GROUP;
}
