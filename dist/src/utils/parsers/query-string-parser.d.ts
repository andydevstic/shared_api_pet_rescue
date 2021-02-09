import { ApiQueryString, IParser, RawQueryString } from '@src.shared/shared/interfaces';
export declare class ApiQueryStringParser implements IParser<ApiQueryString> {
    protected parsedResult: Partial<ApiQueryString>;
    parse(rawQueryString: RawQueryString): ApiQueryString;
    parseRawData(rawData: RawQueryString): ApiQueryString;
    private parseSelect;
    private parseFilters;
    private parseSearch;
    private parseSort;
    private parseIncludes;
    private parsePaging;
}
