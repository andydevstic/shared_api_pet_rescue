"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiQueryStringParser = void 0;
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const errors_1 = require("@src.shared/shared/errors");
let ApiQueryStringParser = class ApiQueryStringParser {
    constructor() {
        this.parsedResult = {};
    }
    parse(rawQueryString) {
        return this.parseRawData(rawQueryString);
    }
    parseRawData(rawData) {
        if (!rawData) {
            return;
        }
        try {
            const { select, filters, sort, includes, limit, page, search, offset } = rawData;
            if (select) {
                this.parseSelect(select);
            }
            if (filters) {
                this.parseFilters(filters);
            }
            if (sort) {
                this.parseSort(sort);
            }
            if (search) {
                this.parseSearch(search);
            }
            if (includes) {
                this.parseIncludes(includes);
            }
            if (limit && (page || offset)) {
                this.parsePaging(limit, page, offset);
            }
            return this.parsedResult;
        }
        catch (error) {
            throw new errors_1.BadRequestError('Error parsing raw query string', error);
        }
    }
    parseSelect(rawSelect) {
        this.parsedResult.select = rawSelect;
    }
    parseFilters(rawFilters) {
        try {
            this.parsedResult.filters = JSON.parse(rawFilters);
        }
        catch (error) {
            throw new errors_1.BadRequestError('Invalid JSON for field Filters');
        }
    }
    parseSearch(rawSearch) {
        this.parsedResult.search = rawSearch;
    }
    parseSort(rawSort) {
        try {
            this.parsedResult.sort = JSON.parse(rawSort);
        }
        catch (error) {
            throw new errors_1.BadRequestError('Invalid JSON for field Sort');
        }
    }
    parseIncludes(rawIncludes) {
        try {
            this.parsedResult.includes = JSON.parse(rawIncludes);
        }
        catch (error) {
            throw new errors_1.BadRequestError('Invalid JSON for field Includes');
        }
    }
    parsePaging(limit, page, offset) {
        const parsedLimit = Number(limit);
        const parsedPage = Number(page);
        const parsedOffset = Number(offset);
        if (isNaN(parsedLimit) || (isNaN(parsedPage) && isNaN(parsedOffset))) {
            throw new errors_1.BadRequestError('Invalid number for limit or page or offset');
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
};
ApiQueryStringParser = __decorate([
    decorators_1.provideNamed(constants_1.SHARED_PROVIDER_TYPES.PARSER, constants_1.SHARED_PROVIDER_NAMES.API_QUERY_STRING)
], ApiQueryStringParser);
exports.ApiQueryStringParser = ApiQueryStringParser;
