"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.properties = exports.required = void 0;
const constants_1 = require("@src.shared/shared/constants");
exports.required = ['limit'];
exports.properties = {
    select: {
        type: 'string',
        minLength: 1,
    },
    filters: {
        type: 'array',
        minLength: 1,
        uniqueItems: true,
        items: {
            $ref: constants_1.VALIDATION_SCHEMAS.FILTER,
        },
    },
    limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
    },
    page: {
        type: 'integer',
        minimum: 1,
    },
    offset: {
        type: 'integer',
        minimum: 0,
    },
};
