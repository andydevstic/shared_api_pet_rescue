import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { LOG_LEVELS, SHARED_PLACEHOLDER_TYPES, SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { Configuration, IFactory, ILogger, LoggingModuleName } from '@src.shared/shared/interfaces';
import { inject } from 'inversify';
import * as Log4JS from 'log4js';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.LOGGER, SHARED_PROVIDER_NAMES.LOG4JS)
export class Log4JsLogger implements ILogger, IFactory<[LOG_LEVELS, LoggingModuleName], ILogger> {
  protected loggerMap: Map<string, ILogger> = new Map();
  protected appLogger: ILogger;
  protected logLevel: LOG_LEVELS;

  constructor(
    @inject(SHARED_PLACEHOLDER_TYPES.CONFIG)
    config: Configuration,
  ) {
    Log4JS.configure(config.get('log.log4js') || config.get('log'));
    const envLogLevel = process.env.LOG_LEVEL as LOG_LEVELS;
    if (envLogLevel && !LOG_LEVELS[envLogLevel.toUpperCase()]) {
      throw new Error(`Log level ${envLogLevel} not supported`);
    }

    this.logLevel = envLogLevel || LOG_LEVELS.INFO;
    this.appLogger = this.createInstance(this.logLevel, 'APP');
  }

  public createInstance(logLevel = this.logLevel, moduleName?: string): ILogger {
    const hashKey = this.getLoggerHashKey(logLevel, moduleName);
    const existingLogger = this.loggerMap.get(hashKey);
    if (existingLogger) {
      return existingLogger;
    }

    const logger = Log4JS.getLogger(moduleName);
    logger.level = logLevel;

    this.loggerMap.set(hashKey, logger);

    return logger;
  }

  protected getLoggerHashKey(level: LOG_LEVELS, moduleName: string): string {
    return `${level}:${moduleName || ''}`;
  }

  public info(message?: string, ...args: any[]): void {
    return this.appLogger.info(message, ...args);
  }

  public warn(message?: string, ...args: any[]): void {
    return this.appLogger.warn(message, ...args);
  }

  public debug(message?: string, ...args: any[]): void {
    return this.appLogger.debug(message, ...args);
  }

  public error(message?: string, ...args: any[]): void {
    return this.appLogger.error(message, ...args);
  }
}
