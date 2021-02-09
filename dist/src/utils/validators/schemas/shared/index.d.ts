import * as paginationSchemaFactory from './pagination-schema-factory';
import * as findAllSchemaFactory from './find-all-schema-factory';
import * as findByIdSchemaFactory from './find-by-id-schema-factory';
export { paginationSchemaFactory, findAllSchemaFactory, findByIdSchemaFactory, };
declare const _default: ({
    $id: import("../../../../..").VALIDATION_SCHEMAS;
    type: string;
    required: string[];
    additionalProperties: boolean;
    properties: {
        code: {
            type: string;
            minLength: number;
            maxLength: number;
        };
        operator: {
            type: string;
            enum: import("../../../../..").FILTER_OPERATORS[];
        };
        value: {
            type: string;
            minItems: number;
            uniqueItems: boolean;
        };
    };
} | {
    $id: import("../../../../..").VALIDATION_SCHEMAS;
    type: string;
    required: string[];
    properties: {
        column: {
            type: string;
            minLength: number;
            maxLength: number;
        };
        direction: {
            type: string;
            enum: import("../../../../..").SORT_DIRECTIONS[];
        };
    };
})[];
export default _default;
