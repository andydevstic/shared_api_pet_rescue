"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("./base-error");
class AxiosError extends base_error_1.BaseError {
    constructor(axiosError) {
        const axiosErrorResponse = axiosError.response || {
            statusText: axiosError.message,
            status: axiosError.code,
            data: null,
        };
        super(AxiosError._axiosErrorGeneralMessage, axiosErrorResponse.statusText, axiosErrorResponse.status, axiosErrorResponse.data);
    }
    static wrapError(error) {
        if (error.isCustomError) {
            return error;
        }
        return new AxiosError(error);
    }
}
exports.AxiosError = AxiosError;
AxiosError._axiosErrorGeneralMessage = 'Error sending HTTP request';
