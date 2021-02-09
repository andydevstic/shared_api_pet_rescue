"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message, type, status, details) {
        super(message);
        this.isCustomError = true;
        this.type = type;
        this.status = status;
        this.details = details;
    }
}
exports.BaseError = BaseError;
