"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@src.shared/shared/constants");
exports.default = {
    $id: constants_1.VALIDATION_SCHEMAS.FILTER,
    type: 'object',
    required: ['code', 'operator', 'value'],
    additionalProperties: false,
    properties: {
        code: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
        },
        operator: {
            type: 'string',
            enum: Object.values(constants_1.FILTER_OPERATORS),
        },
        value: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
        },
    }
};
