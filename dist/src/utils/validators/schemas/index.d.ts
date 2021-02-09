declare const _default: ({
    $id: import("../../../..").VALIDATION_SCHEMAS;
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
            enum: import("../../../..").FILTER_OPERATORS[];
        };
        value: {
            type: string;
            minItems: number;
            uniqueItems: boolean;
        };
    };
} | {
    $id: import("../../../..").VALIDATION_SCHEMAS;
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
            enum: import("../../../..").SORT_DIRECTIONS[];
        };
    };
} | {
    $id: import("../../../..").VALIDATION_SCHEMAS;
    type: string;
    additionalProperties: boolean;
    properties: {
        select: {
            type: string;
            minLength: number;
        };
        filters: {
            type: string;
            minLength: number;
            uniqueItems: boolean;
            items: {
                $ref: import("../../../..").VALIDATION_SCHEMAS;
            };
        };
        groupBy: {
            type: string;
            minLength: number;
            items: {
                type: string;
            };
        };
        sort: {
            $ref: import("../../../..").VALIDATION_SCHEMAS;
        };
    };
} | {
    $id: import("../../../..").VALIDATION_SCHEMAS;
    type: string;
    additionalProperties: boolean;
    required: string[];
    properties: {
        select: {
            type: string;
            minLength: number;
        };
        filters: {
            type: string;
            minLength: number;
            uniqueItems: boolean;
            items: {
                $ref: import("../../../..").VALIDATION_SCHEMAS;
            };
        };
        limit: {
            type: string;
            minimum: number;
            maximum: number;
        };
        page: {
            type: string;
            minimum: number;
        };
        offset: {
            type: string;
            minimum: number;
        };
    };
})[];
export default _default;
