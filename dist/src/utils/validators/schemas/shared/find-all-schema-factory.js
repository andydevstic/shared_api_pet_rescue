"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.properties = void 0;
const constants_1 = require("@src.shared/shared/constants");
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
    groupBy: {
        type: 'array',
        minLength: 1,
        items: {
            type: 'string',
        }
    },
    sort: {
        $ref: constants_1.VALIDATION_SCHEMAS.SORT,
    }
};
