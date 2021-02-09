import { LOG_LEVELS } from '@src.shared/shared/constants';
import { Configuration, IFactory, ILogger, LoggingModuleName } from '@src.shared/shared/interfaces';
export declare class Log4JsLogger implements ILogger, IFactory<[LOG_LEVELS, LoggingModuleName], ILogger> {
    protected loggerMap: Map<string, ILogger>;
    constructor(config: Configuration);
    createInstance(logLevel?: LOG_LEVELS, moduleName?: string): ILogger;
    protected getLoggerHashKey(level: LOG_LEVELS, moduleName: string): string;
    info(message?: string, ...args: any[]): void;
    warn(message?: string, ...args: any[]): void;
    error(message?: string, ...args: any[]): void;
}
