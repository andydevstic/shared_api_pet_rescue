"use strict";
// import { Container, interfaces } from 'inversify';
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = void 0;
// const container = new Container();
// import './loader';
// import { buildProviderModule } from 'inversify-binding-decorators';
// container.load(buildProviderModule());
// export const appContainer = container;
// export function mergeContainer(fatherContainer: Container): interfaces.Container {
//   const childContainer = container.createChild();
//   return Container.merge(fatherContainer, childContainer);
// }
const inversify_1 = require("inversify");
exports.appContainer = new inversify_1.Container();
