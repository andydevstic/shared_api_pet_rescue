"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@src.shared/shared/constants");
exports.default = {
    $id: constants_1.VALIDATION_SCHEMAS.SORT,
    type: 'object',
    required: ['column', 'direction'],
    properties: {
        column: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
        },
        direction: {
            type: 'string',
            enum: Object.values(constants_1.SORT_DIRECTIONS),
        },
    },
};
