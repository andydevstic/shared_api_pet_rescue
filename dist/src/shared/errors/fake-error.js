"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeError = void 0;
const base_error_1 = require("./base-error");
class FakeError extends base_error_1.BaseError {
    constructor(message) {
        super(message, 'Fake', 200);
    }
}
exports.FakeError = FakeError;
