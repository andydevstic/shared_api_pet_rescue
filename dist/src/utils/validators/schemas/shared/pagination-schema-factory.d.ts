import { VALIDATION_SCHEMAS } from '@src.shared/shared/constants';
export declare const required: string[];
export declare const properties: {
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
