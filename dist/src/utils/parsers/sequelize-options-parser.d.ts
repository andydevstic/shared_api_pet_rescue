import { FindOptions } from 'sequelize';
import { ICriteria, IParser } from '@src.shared/shared/interfaces';
export declare class SequelizeOptionsParser implements IParser<FindOptions> {
    protected finalResult: Partial<FindOptions>;
    parse(rawCriteria: ICriteria): FindOptions;
    private parseSelect;
    private parseAggregationColumn;
    private parseSort;
    private parseFilters;
    private parseIncludes;
    private parseInclude;
    private parseSearch;
}
