"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
function provide(identifier) {
    return inversify_binding_decorators_1.fluentProvide(identifier).done();
}
exports.provide = provide;
function provideSingleton(identifier) {
    return inversify_binding_decorators_1.fluentProvide(identifier).inSingletonScope().done();
}
exports.provideSingleton = provideSingleton;
function injectNamed(identifier, name) {
    return (target, propertyKey, index) => {
        inversify_1.inject(identifier)(target, propertyKey, index);
        inversify_1.named(name)(target, propertyKey, index);
    };
}
exports.injectNamed = injectNamed;
function provideNamed(identifier, name) {
    return inversify_binding_decorators_1.fluentProvide(identifier)
        .whenTargetNamed(name)
        .done();
}
exports.provideNamed = provideNamed;
function provideSingletonNamed(identifier, name) {
    return inversify_binding_decorators_1.fluentProvide(identifier)
        .inSingletonScope()
        .whenTargetNamed(name)
        .done();
}
exports.provideSingletonNamed = provideSingletonNamed;
