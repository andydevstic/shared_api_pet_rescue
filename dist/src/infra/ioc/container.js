"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeContainer = exports.appContainer = void 0;
const inversify_1 = require("inversify");
const container = new inversify_1.Container();
require("./loader");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
container.load(inversify_binding_decorators_1.buildProviderModule());
exports.appContainer = container;
function mergeContainer(fatherContainer) {
    const childContainer = container.createChild();
    return inversify_1.Container.merge(fatherContainer, childContainer);
}
exports.mergeContainer = mergeContainer;
