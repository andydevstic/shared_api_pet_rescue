"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@src.shared/shared/constants");
const shared_1 = require("../shared");
exports.default = {
    $id: constants_1.VALIDATION_SCHEMAS.FIND_USERS,
    type: 'object',
    additionalProperties: false,
    properties: Object.assign({}, shared_1.findAllSchemaFactory.properties),
};
