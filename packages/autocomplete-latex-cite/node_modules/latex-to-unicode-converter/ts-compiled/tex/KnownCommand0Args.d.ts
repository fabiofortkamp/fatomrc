import { KnownCommand0OptArgs } from "./KnownCommand";
export interface KnownCommand0Args extends KnownCommand0OptArgs {
    argumentCount: 0;
}
export declare function createKnownCommand(name: string): KnownCommand0Args;
