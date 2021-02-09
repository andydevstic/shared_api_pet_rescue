import { SORT_DIRECTIONS, VALIDATION_SCHEMAS } from '@src.shared/shared/constants';
declare const _default: {
    $id: VALIDATION_SCHEMAS;
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
            enum: SORT_DIRECTIONS[];
        };
    };
};
export default _default;
