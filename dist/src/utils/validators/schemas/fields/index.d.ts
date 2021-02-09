declare const _default: {
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
}[];
export default _default;
