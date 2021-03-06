"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSingletonNamed = exports.provideNamed = exports.constructorProvideNamed = exports.injectNamed = exports.provideSingleton = exports.provide = void 0;
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const container_1 = require("./container");
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
function constructorProvideNamed(identifier, name) {
    return (constructor) => {
        container_1.appContainer.bind(identifier).toConstantValue(constructor).whenTargetNamed(name);
    };
}
exports.constructorProvideNamed = constructorProvideNamed;
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
