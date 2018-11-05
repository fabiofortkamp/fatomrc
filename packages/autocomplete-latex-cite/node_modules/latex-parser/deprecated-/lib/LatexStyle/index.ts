import {Command, CommandAndPackage} from "./Item/Symbol/Command";
import {Environment, EnvironmentAndPackage} from "./Item/Environment";
import {Symbol, SymbolAndPackage} from "./Item/Symbol/index";
import {mustBeArray} from "../../../src/Utils";
import {State} from "../Latex/State";
import {PackageProperties} from "./PackageProperties";


/**
 * LaTeX style collection
 * @class
 */
export class LatexStyle {
    private environments_: { [name: string]: EnvironmentAndPackage[] };
    private commands_: { [name: string]: CommandAndPackage[] };
    private symbols_: { [name: string]: SymbolAndPackage[] };


    /**
     * Constructor
     */
    constructor() {
        /**
         * The symbols by the first symbol of the pattern in the priority increasing order
         * @private {!Object.<string,!Array.<!Symbol>>}
         * @name symbols_
         */
        this.symbols_ = {};
        /**
         * The commands by the name in the priority increasing order
         * @private {!Object.<string,!Array.<!Command>>}
         * @name commands_
         */
        this.commands_ = {};
        /**
         * The environments by the name in the priority increasing order
         * @private {!Object.<string,!Array.<!Environment>>}
         * @name environments_
         */
        this.environments_ = {};
    }


    /**
     * Load a package with style definitions
     * @param {string} packageName the name of the style package
     * @param {PackageProperties} stylePackage the style package
     */
    loadPackage(packageName: string, stylePackage: PackageProperties) {
        if (stylePackage.symbols !== undefined) { // if the symbol descriptions are defined
            if (!(stylePackage.symbols instanceof Array))
                throw new TypeError('"stylePackage.symbols" isn\'t an Array');
            // for all the symbol descriptions
            for (let iSymbol = stylePackage.symbols.length - 1; iSymbol >= 0; --iSymbol) {
                const symbol: Symbol = new Symbol(stylePackage.symbols[iSymbol]); // the symbol description
                if (symbol.pattern) { // if the symbol has a pattern
                    const symbolPatternFirstChar = symbol.pattern[0]; // the first char of the pattern
                    // the symbols with the same pattern first char
                    if (!this.symbols_.hasOwnProperty(symbolPatternFirstChar))
                        this.symbols_[symbolPatternFirstChar] = [];
                    //noinspection JSMismatchedCollectionQueryUpdate // TODO what to do?
                    const symbols: SymbolAndPackage[] = this.symbols_[symbolPatternFirstChar];

                    symbols.push({symbol, packageName}); // store the symbol and the package name
                }
            }
        }
        if (stylePackage.commands !== undefined) { // if the command descriptions are defined
            if (!(stylePackage.commands instanceof Array))
                throw new TypeError('"stylePackage.commands" isn\'t an Array');
            // for all the command descriptions
            for (let iCommand = stylePackage.commands.length - 1; iCommand >= 0; --iCommand) {
                const command = new Command(stylePackage.commands[iCommand]); // the command description
                if (command.name) { // if the command has a name
                    // the commands with the same name
                    (this.commands_[command.name] || (this.commands_[command.name] = []))
                        .push({command, packageName}); // store the command and the package name
                }
            }
        }
        if (stylePackage.environments !== undefined) { // if the environment descriptions are defined
            if (!(stylePackage.environments instanceof Array))
                throw new TypeError(`"stylePackage.environments" isn't an Array`);
            // for all the environment descriptions
            for (let iEnvironment = stylePackage.environments.length - 1; iEnvironment >= 0;
                 --iEnvironment) {
                // the environment description
                const environment: Environment = new Environment(stylePackage.environments[iEnvironment]);
                const envName: string = environment.name;
                if (envName) { // if the environment has a name
                    // the environments with the same name
                    let storedEnv = this.environments_[envName];
                    if (storedEnv === undefined) {
                        storedEnv = [];
                        this.environments_[envName] = storedEnv;
                    }
                    storedEnv.push({environment, packageName}); // store the environment and the package name
                }
            }
        }
    }

    /**
     * Unload a package with style definitions
     * @param {string} packageName the name of the style package
     */
    unloadPackage(packageName: string) {
        // for all the symbol pattern first chars
        for (const symbolPatternFirstChar in this.symbols_)
            if (this.symbols_.hasOwnProperty(symbolPatternFirstChar)) {
                // the filtered symbols with the same pattern first char
                const filteredSymbols = mustBeArray(this.symbols_[symbolPatternFirstChar])
                    .filter(styleItem => {
                        return styleItem.packageName !== packageName;
                    });
                // if there are still some symbols with the same pattern first char
                if (filteredSymbols.length) {
                    // store the filtered symbol descriptions
                    this.symbols_[symbolPatternFirstChar] = filteredSymbols;
                } else { // if there are no the symbols with the same pattern first char
                    delete this.symbols_[symbolPatternFirstChar]; // delete the key-value pair
                }
            }
        // for all the command names
        for (const commandName in this.commands_) if (this.commands_.hasOwnProperty(commandName)) {
            // the filtered commands with the same name
            const filteredCommands = mustBeArray(this.commands_[commandName]).filter(styleItem => {
                return styleItem.packageName !== packageName;
            });
            if (filteredCommands.length) { // if there are still some commands with the same name
                this.commands_[commandName] = filteredCommands; // store the filtered command descriptions
            } else { // if there are no the commands with the same name
                delete this.commands_[commandName]; // delete the key-value pair
            }
        }
        // for all the environment names
        for (const environmentName in this.environments_)
            if (this.environments_.hasOwnProperty(environmentName)) {
                // the filtered environments with the same name
                const filteredEnvironments = mustBeArray(this.environments_[environmentName]).filter(styleItem => {
                    return styleItem.packageName !== packageName;
                });
                // if there are still some environments with the same name
                if (filteredEnvironments.length) {
                    // store the filtered environment descriptions
                    this.environments_[environmentName] = filteredEnvironments;
                } else { // if there are no the environments with the same name
                    delete this.environments_[environmentName]; // delete the key-value pair
                }
            }
    }


    /**
     * Get symbols
     * @param {!State} state the state that the symbols must match to
     * @param {string} patternFirstChar the first char of the symbol parameter pattern
     * @return {!Array.<!Symbol>} the list of symbols in the priority descending order
     */
    symbols(state: State, patternFirstChar: string) {
        if (!(state instanceof State))
            throw new SyntaxError('"state" isn\'t a State instance');
        // all the symbols with the defined first pattern char
        const symbols = this.symbols_[patternFirstChar];
        if (symbols === undefined) return []; // return empty list if there are no such symbols
        const filteredSymbols = []; // the list of the symbols matching to the state
        for (let iSymbol = mustBeArray(symbols).length - 1; iSymbol >= 0; --iSymbol) { // for all the symbols
            const symbol = symbols[iSymbol].symbol; // the symbol
            // store the symbol if it matches to the state
            //noinspection JSUnresolvedFunction
            if (state.test(symbol.modes)) filteredSymbols.push(symbol);
        }
        return filteredSymbols;
    }


    /**
     * Get commands
     * @param {!State} state the state that the commands must match to
     * @param {!string} name the name of the command
     * @return {Array.<Command>} the list of commands in the priority descending order
     */
    commands(state: State, name: string): Command[] {
        if (!(state instanceof State))
            throw new SyntaxError('"state" isn\'t a State instance');
        const commands = this.commands_[name]; // all the commands with the defined name
        if (!commands) return []; // return empty list if there are no such commands
        const filteredCommands = []; // the list of the commands matching to the state
        for (let iCommand = mustBeArray(commands).length - 1; iCommand >= 0; --iCommand) { // for all the commands
            const command = commands[iCommand].command; // the command
            // store the command if it matches to the state
            //noinspection JSUnresolvedFunction
            if (state.test(command.modes)) filteredCommands.push(command);
        }
        return filteredCommands;
    }


    /**
     * Get environments
     * @param {!State} state the state that the environments must match to
     * @param {!string} name the name of the environment
     * @return {Array.<Environment>} the list of environments in the priority descending order
     */
    environments(state: State, name: string): EnvironmentAndPackage[] {
        if (!(state instanceof State)) throw new SyntaxError("state isn't State instance");
        const environments: EnvironmentAndPackage[] = this.environments_[name]; // all the environments with the defined name
        if (!environments) return []; // return empty list if there are no such environments

        // store the environment if it matches to the state
        return mustBeArray(environments)
            .filter(env => state.test(env.modes));
    }
}


// export default LatexStyle;