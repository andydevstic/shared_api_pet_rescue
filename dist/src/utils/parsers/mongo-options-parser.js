"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoOptionsParser = void 0;
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
let MongoOptionsParser = class MongoOptionsParser {
    constructor() {
        this.parsedOptions = {};
    }
    parse(rawOptions = {}) {
        const { filters, sort } = rawOptions;
        this.parseFilters(filters);
        this.parseSort(sort);
        return this.parsedOptions;
    }
    parseFilters(filters) {
        if (!filters || !filters.length) {
            return;
        }
        filters.forEach(this.parseFilter.bind(this));
    }
    parseFilter(filter) {
        const { field, operator, value } = filter;
        switch (operator.toLowerCase()) {
            case constants_1.FILTER_OPERATORS.EQUALS:
                this.parsedOptions[field] = { $eq: value };
                return;
            case constants_1.FILTER_OPERATORS.NOT_EQUALS:
                this.parsedOptions[field] = { $ne: value };
                return;
            case constants_1.FILTER_OPERATORS.IN:
                this.parsedOptions[field] = { $in: value };
                return;
            case constants_1.FILTER_OPERATORS.NOT_IN:
                this.parsedOptions[field] = { $nin: value };
                return;
            default:
                throw new Error(`Filter operator ${operator} not supported!`);
        }
    }
    parseSort(sort) {
        if (!sort) {
            return;
        }
        this.parsedOptions.$sort = {
            [sort.column]: sort.direction === 'ASC' ? 1 : -1,
        };
    }
};
MongoOptionsParser = __decorate([
    decorators_1.provideNamed(constants_1.SHARED_PROVIDER_TYPES.PARSER, constants_1.SHARED_PROVIDER_NAMES.MONGO_OPTIONS)
], MongoOptionsParser);
exports.MongoOptionsParser = MongoOptionsParser;
