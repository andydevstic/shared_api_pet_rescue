import * as ajv from 'ajv';
import { plugin } from 'ajv-moment';
import * as moment from 'moment';

import schemas from './schemas';
import { Validator, ValidationResult } from '@src.shared/shared/interfaces';
import { VALIDATION_SCHEMAS, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { InternalServerError } from '@src.shared/shared/errors';
import { provideSingleton } from '@src.shared/infra/ioc/decorators';

@provideSingleton(SHARED_PROVIDER_TYPES.SCHEMA_VALIDATOR)
export class AjvSchemaValidator implements Validator {
  private _validator: ajv.Ajv;

  constructor() {
    const ajvInstance = new ajv({ allErrors: true });

    plugin({ moment, ajv: ajvInstance });

    ajvInstance.addSchema(schemas);
    ajvInstance.compile(true);

    this._validator = ajvInstance;
  }

  public validate(schemaName: VALIDATION_SCHEMAS, payload: any): ValidationResult {
    const validator = this._validator.getSchema(schemaName);

    if (!validator) {
      throw new InternalServerError(`Schema name ${schemaName} not supported.`);
    }

    const isValid = validator(payload);

    return {
      valid: isValid as boolean,
      errors: validator.errors,
    };
  }
}
