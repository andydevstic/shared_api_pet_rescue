import { Logger, format, createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';
import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_TYPES, SHARED_PROVIDER_NAMES, APP_ENV } from '@src.shared/shared/constants';
import { ILogger } from '@src.shared/shared/interfaces';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.LOGGER, SHARED_PROVIDER_NAMES.WINSTON)
export class WinstonLogger implements Partial<ILogger> {
  private _infoLogger: Logger;
  private _errorLogger: Logger;

  constructor() {
    const isProdEnv = process.env.NODE_ENV === APP_ENV.PROD;

    if (isProdEnv) {
      this.initializeForProd();
    } else {
      this.initializeForDev();
    }
  }

  private initializeForDev() {
    this._infoLogger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'api-log-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ]
    });

    this._errorLogger = createLogger({
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'api-error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ]
    });
  }

  private initializeForProd() {
    this._infoLogger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      transports: [
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'api-log-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new transports.Console(),
      ]
    });

    this._errorLogger = createLogger({
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      transports: [
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'api-error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ]
    });
  }

  public info(message: string): void {
    this._infoLogger.info(message);
  }

  public error(message: string): void {
    this._errorLogger.error(message);
  }
}
