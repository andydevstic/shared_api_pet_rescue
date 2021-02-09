import { BaseError } from './base-error';
import { AxiosError as OriginalAxiosError } from 'axios';
export declare class AxiosError extends BaseError {
    private static _axiosErrorGeneralMessage;
    static wrapError(error: any): any;
    constructor(axiosError: OriginalAxiosError);
}
