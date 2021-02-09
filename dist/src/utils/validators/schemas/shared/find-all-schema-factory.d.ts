import { VALIDATION_SCHEMAS } from '@src.shared/shared/constants';
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
    groupBy: {
        type: string;
        minLength: number;
        items: {
            type: string;
        };
    };
    sort: {
        $ref: VALIDATION_SCHEMAS;
    };
};
