"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjvSchemaValidator = void 0;
const ajv = require("ajv");
const ajv_moment_1 = require("ajv-moment");
const moment = require("moment");
const schemas_1 = require("./schemas");
const constants_1 = require("@src.shared/shared/constants");
const errors_1 = require("@src.shared/shared/errors");
const decorators_1 = require("@src.shared/infra/ioc/decorators");
let AjvSchemaValidator = class AjvSchemaValidator {
    constructor() {
        const ajvInstance = new ajv({ allErrors: true });
        ajv_moment_1.plugin({ moment, ajv: ajvInstance });
        ajvInstance.addSchema(schemas_1.default);
        ajvInstance.compile(true);
        this._validator = ajvInstance;
    }
    validate(schemaName, payload) {
        const validator = this._validator.getSchema(schemaName);
        if (!validator) {
            throw new errors_1.InternalServerError(`Schema name ${schemaName} not supported.`);
        }
        const isValid = validator(payload);
        return {
            valid: isValid,
            errors: validator.errors,
        };
    }
};
AjvSchemaValidator = __decorate([
    decorators_1.provideSingleton(constants_1.SHARED_PROVIDER_TYPES.SCHEMA_VALIDATOR),
    __metadata("design:paramtypes", [])
], AjvSchemaValidator);
exports.AjvSchemaValidator = AjvSchemaValidator;
