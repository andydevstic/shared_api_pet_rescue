export declare class BaseError extends Error {
    readonly isCustomError = true;
    details?: any;
    status: number;
    type: string;
    constructor(message: string, type: string, status?: number, details?: any);
}
