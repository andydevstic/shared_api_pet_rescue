import { provideNamed } from "@src.shared/infra/ioc/decorators";
import { FILTER_OPERATORS, SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from "@src.shared/shared/constants";
import { ICriteria, IFilter, IParser, ISort } from "@src.shared/shared/interfaces";

@provideNamed(SHARED_PROVIDER_TYPES.PARSER, SHARED_PROVIDER_NAMES.MONGO_OPTIONS)
export class MongoOptionsParser implements IParser<any> {
  protected parsedOptions: any = {};

  public parse(rawOptions: ICriteria = {}): any {
    const { filters, sort } = rawOptions;

    this.parseFilters(filters);
    this.parseSort(sort);

    return this.parsedOptions;
  }

  protected parseFilters(filters: IFilter[]): void {
    if (!filters || !filters.length) {
      return;
    }

    filters.forEach(this.parseFilter.bind(this));
  }

  protected parseFilter(filter: IFilter): void {
    const { field, operator, value } = filter;

    switch (operator.toLowerCase()) {
      case FILTER_OPERATORS.EQUALS:
        this.parsedOptions[field] = { $eq: value };
        return;
      case FILTER_OPERATORS.NOT_EQUALS:
        this.parsedOptions[field] = { $ne: value };
        return;
      case FILTER_OPERATORS.IN:
        this.parsedOptions[field] = { $in: value };
        return;
      case FILTER_OPERATORS.NOT_IN:
        this.parsedOptions[field] = { $nin: value };
        return;
      default:
        throw new Error(`Filter operator ${operator} not supported!`);
    }
  }

  protected parseSort(sort: ISort): void {
    if (!sort) {
      return;
    }

    this.parsedOptions.$sort = {
      [sort.column]: sort.direction === 'ASC' ? 1 : -1,
    }
  }
}