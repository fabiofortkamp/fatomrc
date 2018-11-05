import { OneArgsCommandName } from "./index";
import { ArgumentNeeded } from "../../../tex/KnownCommand";
export declare type OneArgsExpander = (name: OneArgsCommandName) => string | ArgumentNeeded | undefined;
