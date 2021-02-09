import { FILTER_OPERATORS, VALIDATION_SCHEMAS } from '@src.shared/shared/constants';
declare const _default: {
    $id: VALIDATION_SCHEMAS;
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
            enum: FILTER_OPERATORS[];
        };
        value: {
            type: string;
            minItems: number;
            uniqueItems: boolean;
        };
    };
};
export default _default;
