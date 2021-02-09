import { VALIDATION_SCHEMAS } from '@src.shared/shared/constants';

export const required = ['limit'];
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
  limit: {
    type: 'integer',
    minimum: 1,
    maximum: 100,
  },
  page: {
    type: 'integer',
    minimum: 1,
  },
  offset: {
    type: 'integer',
    minimum: 0,
  },
};
