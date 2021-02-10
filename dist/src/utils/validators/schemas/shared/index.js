"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdSchemaFactory = exports.findAllSchemaFactory = exports.paginationSchemaFactory = void 0;
const paginationSchemaFactory = require("./pagination-schema-factory");
exports.paginationSchemaFactory = paginationSchemaFactory;
const findAllSchemaFactory = require("./find-all-schema-factory");
exports.findAllSchemaFactory = findAllSchemaFactory;
const findByIdSchemaFactory = require("./find-by-id-schema-factory");
exports.findByIdSchemaFactory = findByIdSchemaFactory;
const filter_schema_ref_1 = require("./filter-schema-ref");
const sort_schema_ref_1 = require("./sort-schema-ref");
exports.default = [
    filter_schema_ref_1.default,
    sort_schema_ref_1.default,
];
