import { Validator, ValidationResult } from '@src.shared/shared/interfaces';
import { VALIDATION_SCHEMAS } from '@src.shared/shared/constants';
export declare class AjvSchemaValidator implements Validator {
    private _validator;
    constructor();
    validate(schemaName: VALIDATION_SCHEMAS, payload: any): ValidationResult;
}
