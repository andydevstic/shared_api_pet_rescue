"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const constants_1 = require("../constants");
const base_error_1 = require("./base-error");
class BadRequestError extends base_error_1.BaseError {
    constructor(message, details) {
        super(message, constants_1.CustomErrors.BAD_REQUEST, 400, details);
    }
}
exports.BadRequestError = BadRequestError;
