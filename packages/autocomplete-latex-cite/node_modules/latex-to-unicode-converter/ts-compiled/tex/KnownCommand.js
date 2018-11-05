"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCommandHandler(name, optionalArguments, argumentCount, apply) {
    return { name: name, optionalArguments: optionalArguments, argumentCount: argumentCount, apply: apply };
}
exports.createCommandHandler = createCommandHandler;
function createKnownCommandWithOptArgs(name, optionalArguments, argumentCount) {
    return { name: name, optionalArguments: optionalArguments, argumentCount: argumentCount };
}
exports.createKnownCommandWithOptArgs = createKnownCommandWithOptArgs;
function createKnownCommandWithArgs(name, argumentCount) {
    return {
        name: name,
        optionalArguments: 0,
        argumentCount: argumentCount
    };
}
exports.createKnownCommandWithArgs = createKnownCommandWithArgs;
//# sourceMappingURL=KnownCommand.js.map