/**
 * LaTeX directive
 * @enum {string}
 */
export const Directive = {
    BEGIN: "BEGIN", // begin something
    END: "END"      // end something
};
export type Directive = keyof typeof Directive;

export function isDirective(x: any): x is Directive {
    return Directive.hasOwnProperty(x);
}