import { provideNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { BadRequestError } from '@src.shared/shared/errors';
import { ApiQueryString, IParser, RawQueryString } from '@src.shared/shared/interfaces';

@provideNamed(SHARED_PROVIDER_TYPES.PARSER, SHARED_PROVIDER_NAMES.API_QUERY_STRING)
export class ApiQueryStringParser implements IParser<ApiQueryString> {
  protected parsedResult: Partial<ApiQueryString> = {};

  public parse(rawQueryString: RawQueryString): ApiQueryString {
    return this.parseRawData(rawQueryString);
  }

  public parseRawData(rawData: RawQueryString): ApiQueryString {
    if (!rawData) {
      return;
    }

    try {
      const { select, filters, sort, includes, limit, page, search, offset } = rawData;

      if (select) { this.parseSelect(select); }
      if (filters) { this.parseFilters(filters); }
      if (sort) { this.parseSort(sort); }
      if (search) { this.parseSearch(search); }
      if (includes) { this.parseIncludes(includes); }
      if (limit && (page || offset)) { this.parsePaging(limit, page, offset); }

      return this.parsedResult as ApiQueryString;
    } catch (error) {
      throw new BadRequestError('Error parsing raw query string', error);
    }
  }

  private parseSelect(rawSelect: string): void {
    this.parsedResult.select = rawSelect;
  }

  private parseFilters(rawFilters: string): void {
    try {
      this.parsedResult.filters = JSON.parse(rawFilters);
    } catch (error) {
      throw new BadRequestError('Invalid JSON for field Filters');
    }
  }

  private parseSearch(rawSearch: string): void {
    this.parsedResult.search = rawSearch;
  }

  private parseSort(rawSort: string): void {
    try {
      this.parsedResult.sort = JSON.parse(rawSort);
    } catch (error) {
      throw new BadRequestError('Invalid JSON for field Sort');
    }
  }

  private parseIncludes(rawIncludes: string): void {
    try {
      this.parsedResult.includes = JSON.parse(rawIncludes);
    } catch (error) {
      throw new BadRequestError('Invalid JSON for field Includes');
    }
  }

  private parsePaging(limit: string, page: string, offset: string): void {
    const parsedLimit = Number(limit);
    const parsedPage = Number(page);
    const parsedOffset = Number(offset);

    if (isNaN(parsedLimit) || (isNaN(parsedPage) && isNaN(parsedOffset))) {
      throw new BadRequestError('Invalid number for limit or page or offset');
    }

    this.parsedResult.limit = parsedLimit;

    if (page) {
      this.parsedResult.page = parsedPage;

      return;
    }
    if (offset) {
      this.parsedResult.offset = parsedOffset;

      return;
    }
  }
}
