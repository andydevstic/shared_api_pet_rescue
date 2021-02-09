import * as paginationSchemaFactory from './pagination-schema-factory';
import * as findAllSchemaFactory from './find-all-schema-factory';
import * as findByIdSchemaFactory from './find-by-id-schema-factory';

import filterSchemaRef from './filter-schema-ref';
import sortSchemaRef from './sort-schema-ref';

export {
  paginationSchemaFactory,
  findAllSchemaFactory,
  findByIdSchemaFactory,
};

export default [
  filterSchemaRef,
  sortSchemaRef,
];
