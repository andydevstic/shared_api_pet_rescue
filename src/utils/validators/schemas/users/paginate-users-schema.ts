import { VALIDATION_SCHEMAS } from '@src.shared/shared/constants';
import { paginationSchemaFactory } from '../shared';

export default {
  $id: VALIDATION_SCHEMAS.PAGINATE_USERS,
  type: 'object',
  additionalProperties: false,
  required: [
    ...paginationSchemaFactory.required,
  ],
  properties: {
    ...paginationSchemaFactory.properties,
  },
};
