"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateProperties(target, values, opt_keys, opt_attributes) {
    if (opt_attributes === void 0) { opt_attributes = {
        writable: true,
        enumerable: true,
        configurable: true
    }; }
    if (!(target instanceof Object))
        throw new TypeError('"target" isn\'t an Object instance');
    if (values === undefined)
        return;
    if (!(values instanceof Object))
        throw new TypeError('"properties" isn\'t an Object instance');
    if (opt_attributes === undefined) {
        opt_attributes = { writable: true, enumerable: true, configurable: true };
    }
    else if (!(opt_attributes instanceof Object)) {
        throw new TypeError('"attributes" isn\'t an Object instance');
    }
    if (opt_keys === undefined) {
        for (var key in values) {
            if (values[key] !== undefined) {
                Object.defineProperty(target, key, Object.create(opt_attributes, { value: { value: values[key] } }));
            }
        }
    }
    else if (opt_keys instanceof Array) {
        opt_keys.forEach(function (key) {
            if (values[key] !== undefined) {
                Object.defineProperty(target, key, Object.create(opt_attributes, { value: { value: values[key] } }));
            }
        });
    }
    else if (opt_keys instanceof Object) {
        for (var targetKey in opt_keys) {
            var key = opt_keys[targetKey];
            if (values[key] !== undefined)
                Object.defineProperty(target, targetKey, Object.create(opt_attributes, { value: { value: values[key] } }));
        }
    }
    else {
        throw new TypeError('"keys" isn\'t an Object instance');
    }
}
exports.updateProperties = updateProperties;
function testProperties(target, values, opt_keys, opt_skipUndefined) {
    if (opt_skipUndefined === void 0) { opt_skipUndefined = true; }
    if (!(target instanceof Object))
        throw new TypeError('"target" isn\'t an Object instance');
    if (values === undefined)
        return true;
    if (!(values instanceof Object))
        throw new TypeError('"properties" isn\'t an Object instance');
    if (opt_skipUndefined === undefined)
        opt_skipUndefined = true;
    if (opt_keys === undefined) {
        for (var key in values) {
            if (target[key] !== values[key]
                && !(values[key] === undefined && opt_skipUndefined))
                return false;
        }
    }
    else if (opt_keys instanceof Array) {
        return opt_keys.every(function (key) {
            return target[key] === values[key] || (values[key] === undefined && opt_skipUndefined);
        });
    }
    else if (opt_keys instanceof Object) {
        for (var targetKey in opt_keys) {
            var key = opt_keys[targetKey];
            if (target[targetKey] !== values[key] && !(values[key] === undefined && opt_skipUndefined))
                return false;
        }
    }
    else {
        throw new TypeError('"keys" isn\'t an Object instance');
    }
    return true;
}
exports.testProperties = testProperties;
exports.mustBeNumber = function (a, msg) {
    if (!(isNumber(a)))
        throw new TypeError(msg ? msg : "Expected number");
    return a;
};
function isNumber(x) {
    return typeof x === "number";
}
exports.isNumber = isNumber;
function isString(x) {
    return typeof x === "string";
}
exports.isString = isString;
function mustNotBeUndefined(x, msg) {
    if (!x)
        throw new Error(msg);
    return x;
}
exports.mustNotBeUndefined = mustNotBeUndefined;
function mustBeObject(o, msg) {
    if (!(o instanceof Object))
        throw new TypeError(msg ? msg : "Expected Object");
    return o;
}
exports.mustBeObject = mustBeObject;
function mustBeString(o, msg) {
    if (typeof o !== "string")
        throw new TypeError(msg ? msg : "Expected string");
    return o;
}
exports.mustBeString = mustBeString;
function mustBeArray(a, msg) {
    if (!(isArray(a)))
        throw new TypeError(msg ? msg : "Expected Array");
    return a;
}
exports.mustBeArray = mustBeArray;
function isArray(x) {
    return !!x && x.constructor === Array;
}
exports.isArray = isArray;
exports.mconcat = function (mappend) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return args.reduceRight(mappend);
};
exports.snd = function (pair) { return pair[1]; };
function concatMap(arr, f) {
    return [].concat.apply([], arr.map(f));
}
exports.concatMap = concatMap;
//# sourceMappingURL=Utils.js.map