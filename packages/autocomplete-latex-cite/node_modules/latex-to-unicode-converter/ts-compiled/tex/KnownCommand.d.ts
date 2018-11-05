import { TeXArg } from "latex-parser";
export declare type CommandCallback = (res: string, err: Error) => any;
export interface KnownCommand {
    name: string;
    optionalArguments: number;
    argumentCount: number;
}
export interface KnownCommand0OptArgs extends KnownCommand {
    optionalArguments: 0;
}
export interface ArgumentNeeded extends KnownCommand {
    apply: (cb: CommandCallback, args: TeXArg[]) => string;
}
export declare function createCommandHandler(name: string, optionalArguments: number, argumentCount: number, apply: (cb: CommandCallback, args: TeXArg[]) => string): {
    name: string;
    optionalArguments: number;
    argumentCount: number;
    apply: (cb: CommandCallback, args: TeXArg[]) => string;
};
export declare function createKnownCommandWithOptArgs(name: string, optionalArguments: number, argumentCount: number): KnownCommand;
export declare function createKnownCommandWithArgs(name: string, argumentCount: number): KnownCommand0OptArgs;
