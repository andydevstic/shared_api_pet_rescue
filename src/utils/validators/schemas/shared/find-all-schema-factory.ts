import { VALIDATION_SCHEMAS } from '@src.shared/shared/constants';

export const properties = {
  select: {
    type: 'string',
    minLength: 1,
  },
  filters: {
    type: 'array',
    minLength: 1,
    uniqueItems: true,
    items: {
      $ref: VALIDATION_SCHEMAS.FILTER,
    },
  },
  groupBy: {
    type: 'array',
    minLength: 1,
    items: {
      type: 'string',
    }
  },
  sort: {
    $ref: VALIDATION_SCHEMAS.SORT,
  }
};
