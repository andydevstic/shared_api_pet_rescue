"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeContainer = void 0;
require("reflect-metadata");
const moduleAlias = require("module-alias");
moduleAlias.addAlias('@src.shared', `${__dirname}/src`);
require("module-alias/register");
var container_1 = require("./src/infra/ioc/container");
Object.defineProperty(exports, "mergeContainer", { enumerable: true, get: function () { return container_1.mergeContainer; } });
__exportStar(require("./src/shared/constants"), exports);
__exportStar(require("./src/shared/interfaces"), exports);
__exportStar(require("./src/shared/errors"), exports);
__exportStar(require("./src/shared/supertypes"), exports);
