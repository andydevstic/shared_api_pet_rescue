import { VALIDATION_SCHEMAS } from '@src.shared/shared/constants';
declare const _default: {
    $id: VALIDATION_SCHEMAS;
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
                $ref: VALIDATION_SCHEMAS;
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
};
export default _default;
