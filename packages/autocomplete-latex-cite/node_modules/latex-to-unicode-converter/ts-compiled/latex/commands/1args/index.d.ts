import { SpaceCmds1Arg } from "./space";
import { DiacriticCmd1Arg } from "./diacritic";
export declare type OneArgsCommandName = SpaceCmds1Arg | DiacriticCmd1Arg;
export declare const oneArgsCommands: any;
export declare function is1argsCommand(name: string): name is keyof typeof oneArgsCommands;
