"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const moduleAlias = require("module-alias");
moduleAlias.addAlias('@src.shared', `${__dirname}/src`);
require("module-alias/register");
var container_1 = require("./src/infra/ioc/container");
exports.mergeContainer = container_1.mergeContainer;
__export(require("./src/shared/constants"));
__export(require("./src/shared/errors"));
__export(require("./src/shared/supertypes"));
