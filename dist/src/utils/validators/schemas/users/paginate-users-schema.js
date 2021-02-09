"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@src.shared/shared/constants");
const shared_1 = require("../shared");
exports.default = {
    $id: constants_1.VALIDATION_SCHEMAS.PAGINATE_USERS,
    type: 'object',
    additionalProperties: false,
    required: [
        ...shared_1.paginationSchemaFactory.required,
    ],
    properties: Object.assign({}, shared_1.paginationSchemaFactory.properties),
};
