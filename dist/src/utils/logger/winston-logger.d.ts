import 'winston-daily-rotate-file';
import { ILogger } from '@src.shared/shared/interfaces';
export declare class WinstonLogger implements ILogger {
    private _infoLogger;
    private _errorLogger;
    constructor();
    private initializeForDev;
    private initializeForProd;
    info(message: string): void;
    error(message: string): void;
}
