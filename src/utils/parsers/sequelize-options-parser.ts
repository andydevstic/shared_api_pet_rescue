import { FindOptions, IncludeOptions, WhereOptions, fn, col } from 'sequelize';
import { isArray } from 'lodash';

import { provideNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { BadRequestError } from '@src.shared/shared/errors';
import { ICriteria, IFilter, IInclude, IParser, ISort } from '@src.shared/shared/interfaces';

@provideNamed(SHARED_PROVIDER_TYPES.PARSER, SHARED_PROVIDER_NAMES.SEQUELIZE_OPTIONS)
export class SequelizeOptionsParser implements IParser<FindOptions> {
  protected finalResult: Partial<FindOptions> = {};

  public parse(rawCriteria: ICriteria): FindOptions {
    if (!rawCriteria) {
      return;
    }

    const { select, filters, limit, page, includes, sort, search, groupBy, offset } = rawCriteria;

    if (select && select.length) {
      this.finalResult.attributes = this.parseSelect(select);
    }

    if (groupBy && groupBy.length) {
      this.finalResult.group = groupBy;
    }

    if (filters && filters.length) {
      this.finalResult.where = this.parseFilters(filters);
    }

    if (limit && (page || offset !== undefined)) {
      this.finalResult.limit = limit;
      this.finalResult.offset = page ? (page - 1) * limit : offset;
    }

    if (includes && includes.length) {
      this.finalResult.include = this.parseIncludes(includes);
    }

    if (sort) {
      this.finalResult.order = this.parseSort(sort);
    }

    if (search) {
      this.finalResult.where =
        (this.finalResult.where && Object.assign(this.finalResult.where, this.parseSearch(search))) ||
        this.parseSearch(search);
    }

    return this.finalResult;
  }

  private parseSelect(rawSelect: any): any[] {
    if (isArray(rawSelect)) {
      return rawSelect;
    }

    if (typeof rawSelect === 'string') {
      const selectColumns = rawSelect.split(',').map(i => i.trim());

      const findAttributes = selectColumns.map((column) => {
        const isAggregationColumn = column.includes(':');
        if (isAggregationColumn) {
          return this.parseAggregationColumn(column);
        }

        return column;
      });

      return findAttributes;
    }

    throw new Error('Select must be a string or an array');
  }

  private parseAggregationColumn(aggretionColumn: string): any[] {
    const [aggretionFunction, aggregationColumn, aliasColumn] = aggretionColumn.split(':').map(i => i.trim());

    const aggregationAttribute: any[] = [
      fn(aggretionFunction.toUpperCase(), col(aggregationColumn)),
    ];

    if (aliasColumn) {
      aggregationAttribute.push(aliasColumn);
    }

    return aggregationAttribute;
  }

  private parseSort(sort: ISort): [string, string][] {
    if (!sort || !sort.column) {
      return;
    }

    const columns = sort.column.split('.').map(i => i.trim());

    this.finalResult.order = columns.map(columnName => [columnName, sort.direction]);
  }

  private parseFilters(filters: IFilter[]): WhereOptions {
    const where: WhereOptions = {};

    filters.forEach((filter) => {
      if (!filter.operator || !filter.field) {
        return;
      }

      switch (filter.operator) {
        case 'equals':
          where[filter.field] = filter.value;
          break;
        case 'not_equals':
          where[filter.field] = { $not: filter.value };
          break;
        case 'contains':
          where[filter.field] = { $like: `%${filter.value}%` };
          break;
        case 'does_not_contain':
          where[filter.field] = { $notLike: `%${filter.value}%` };
          break;
        case 'contains_case_insensitive':
          where[filter.field] = { $iLike: `%${filter.value}%` };
          break;
        case 'does_not_contain_case_insensitive':
          where[filter.field] = { $notILike: `%${filter.value}%` };
          break;
        case 'starts_with':
          where[filter.field] = { $like: `${filter.value}%` };
          break;
        case 'ends_with':
          where[filter.field] = { $like: `%${filter.value}` };
          break;
        case 'in':
          where[filter.field] = { $in: filter.value };
          break;
        case 'not_in':
          where[filter.field] = { $notIn: filter.value };
          break;
        case 'is':
          where[filter.field] = { $in: filter.value };
          break;
        case 'is_not':
          where[filter.field] = { $notIn: filter.value };
          break;
        case 'is_greater_than':
          where[filter.field] = { $gt: filter.value };
          break;
        case 'is_smaller_than':
          where[filter.field] = { $lt: filter.value };
          break;
        case 'between':
          where[filter.field] = { $between: filter.value };
          break;
        default:
          throw new BadRequestError(`Operator ${filter.operator} not supported`);
      }
    });

    return where;
  }

  private parseIncludes(rawIncludes: IInclude[]): IncludeOptions[] {
    if (!rawIncludes || !rawIncludes.length) {
      return;
    }

    return rawIncludes.map(include => this.parseInclude(include));
  }

  private parseInclude(rawInclude: IInclude): IncludeOptions {
    if (!rawInclude || !rawInclude.field) {
      return;
    }

    const result: IncludeOptions = {
      association: rawInclude.field,
      attributes: {
        exclude: ['password'],
      },
    };

    if (rawInclude.select) {
      result.attributes = rawInclude.select;
    }

    if (rawInclude.filters) {
      result.where = this.parseFilters(rawInclude.filters);
    }

    if (rawInclude.includes) {
      result.include = rawInclude.includes.map(include => this.parseInclude(include));
    }

    return result;
  }

  private parseSearch(keyword: string): WhereOptions {
    if (/^\d{9}$/.test(keyword)) {
      // case keyword match id format
      return { id: Number(keyword) };
    }

    return { name: { $iLike: `%${keyword}%` } };
  }
}
