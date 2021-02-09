import { VALIDATION_SCHEMAS } from '@src.shared/shared/constants';
import { findAllSchemaFactory } from '../shared';

export default {
  $id: VALIDATION_SCHEMAS.FIND_FIELDS,
  type: 'object',
  additionalProperties: false,
  properties: {
    ...findAllSchemaFactory.properties,
  },
};
