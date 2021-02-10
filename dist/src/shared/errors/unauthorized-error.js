"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const base_error_1 = require("./base-error");
const constants_1 = require("../constants");
class UnauthorizedError extends base_error_1.BaseError {
    constructor(message, details) {
        super(message, constants_1.CustomErrors.UNAUTHORIZED, 401, details);
    }
}
exports.UnauthorizedError = UnauthorizedError;
