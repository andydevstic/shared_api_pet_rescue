import { FILTER_OPERATORS, VALIDATION_SCHEMAS } from '@src.shared/shared/constants';

export default {
  $id: VALIDATION_SCHEMAS.FILTER,
  type: 'object',
  required: ['code', 'operator', 'value'],
  additionalProperties: false,
  properties: {
    code: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
    },
    operator: {
      type: 'string',
      enum: Object.values(FILTER_OPERATORS),
    },
    value: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
    },
  }
};
