"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("./base-error");
const constants_1 = require("../constants");
class NotFoundError extends base_error_1.BaseError {
    constructor(message, details) {
        super(message, constants_1.CustomErrors.NOT_FOUND, 404, details);
    }
}
exports.NotFoundError = NotFoundError;
