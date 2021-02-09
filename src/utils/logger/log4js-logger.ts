import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { LOG_LEVELS, SHARED_PLACEHOLDER_TYPES, SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { Configuration, IFactory, ILogger, LoggingModuleName } from '@src.shared/shared/interfaces';
import { inject } from 'inversify';
import * as Log4JS from 'log4js';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.LOGGER, SHARED_PROVIDER_NAMES.LOG4JS)
export class Log4JsLogger implements ILogger, IFactory<[LOG_LEVELS, LoggingModuleName], ILogger> {
  protected loggerMap: Map<string, ILogger> = new Map();

  constructor(
    @inject(SHARED_PLACEHOLDER_TYPES.CONFIG)
    config: Configuration,
  ) {
    Log4JS.configure(config.get('log.log4js') || config.get('log'));
  }

  public createInstance(logLevel = LOG_LEVELS.INFO, moduleName?: string): ILogger {
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
    return this.createInstance().info(message, ...args);
  }

  public warn(message?: string, ...args: any[]): void {
    return this.createInstance().warn(message, ...args);
  }

  public error(message?: string, ...args: any[]): void {
    return this.createInstance().error(message, ...args);
  }
}
