import { SORT_DIRECTIONS, VALIDATION_SCHEMAS } from '@src.shared/shared/constants';

export default {
  $id: VALIDATION_SCHEMAS.SORT,
  type: 'object',
  required: ['column', 'direction'],
  properties: {
    column: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
    },
    direction: {
      type: 'string',
      enum: Object.values(SORT_DIRECTIONS),
    },
  },
};
