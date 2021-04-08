"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeOptionsParser = void 0;
const sequelize_1 = require("sequelize");
const lodash_1 = require("lodash");
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const errors_1 = require("@src.shared/shared/errors");
let SequelizeOptionsParser = class SequelizeOptionsParser {
    constructor() {
        this.finalResult = {};
    }
    parse(rawCriteria) {
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
    parseSelect(rawSelect) {
        if (lodash_1.isArray(rawSelect)) {
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
    parseAggregationColumn(aggretionColumn) {
        const [aggretionFunction, aggregationColumn, aliasColumn] = aggretionColumn.split(':').map(i => i.trim());
        const aggregationAttribute = [
            sequelize_1.fn(aggretionFunction.toUpperCase(), sequelize_1.col(aggregationColumn)),
        ];
        if (aliasColumn) {
            aggregationAttribute.push(aliasColumn);
        }
        return aggregationAttribute;
    }
    parseSort(sort) {
        if (!sort || !sort.column) {
            return;
        }
        const columns = sort.column.split('.').map(i => i.trim());
        this.finalResult.order = columns.map(columnName => [columnName, sort.direction]);
    }
    parseFilters(filters) {
        const where = {};
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
                    throw new errors_1.BadRequestError(`Operator ${filter.operator} not supported`);
            }
        });
        return where;
    }
    parseIncludes(rawIncludes) {
        if (!rawIncludes || !rawIncludes.length) {
            return;
        }
        return rawIncludes.map(include => this.parseInclude(include));
    }
    parseInclude(rawInclude) {
        if (!rawInclude || !rawInclude.field) {
            return;
        }
        const result = {
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
    parseSearch(keyword) {
        if (/^\d{9}$/.test(keyword)) {
            // case keyword match id format
            return { id: Number(keyword) };
        }
        return { name: { $iLike: `%${keyword}%` } };
    }
};
SequelizeOptionsParser = __decorate([
    decorators_1.provideNamed(constants_1.SHARED_PROVIDER_TYPES.PARSER, constants_1.SHARED_PROVIDER_NAMES.SEQUELIZE_OPTIONS)
], SequelizeOptionsParser);
exports.SequelizeOptionsParser = SequelizeOptionsParser;
