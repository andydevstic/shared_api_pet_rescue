import { ICriteria, IFilter, IParser, ISort } from "@src.shared/shared/interfaces";
export declare class MongoOptionsParser implements IParser<any> {
    protected parsedOptions: any;
    parse(rawOptions?: ICriteria): any;
    protected parseFilters(filters: IFilter[]): void;
    protected parseFilter(filter: IFilter): void;
    protected parseSort(sort: ISort): void;
}
