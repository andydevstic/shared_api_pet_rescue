"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("./base-error");
const constants_1 = require("../constants");
class InternalServerError extends base_error_1.BaseError {
    constructor(message, details) {
        super(message, constants_1.CustomErrors.INTERNAL, 500, details);
    }
}
exports.InternalServerError = InternalServerError;
