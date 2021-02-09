declare const _default: ({
    $id: import("../../../../..").VALIDATION_SCHEMAS;
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
                $ref: import("../../../../..").VALIDATION_SCHEMAS;
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
            $ref: import("../../../../..").VALIDATION_SCHEMAS;
        };
    };
} | {
    $id: import("../../../../..").VALIDATION_SCHEMAS;
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
                $ref: import("../../../../..").VALIDATION_SCHEMAS;
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
