"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
let WinstonLogger = class WinstonLogger {
    constructor() {
        const isProdEnv = process.env.NODE_ENV === constants_1.APP_ENV.PROD;
        if (isProdEnv) {
            this.initializeForProd();
        }
        else {
            this.initializeForDev();
        }
    }
    initializeForDev() {
        this._infoLogger = winston_1.createLogger({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.DailyRotateFile({
                    dirname: 'logs',
                    filename: 'api-log-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ]
        });
        this._errorLogger = winston_1.createLogger({
            level: 'error',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.DailyRotateFile({
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
    initializeForProd() {
        this._infoLogger = winston_1.createLogger({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.DailyRotateFile({
                    dirname: 'logs',
                    filename: 'api-log-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
                new winston_1.transports.Console(),
            ]
        });
        this._errorLogger = winston_1.createLogger({
            level: 'error',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.DailyRotateFile({
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
    info(message) {
        this._infoLogger.info(message);
    }
    error(message) {
        this._errorLogger.error(message);
    }
};
WinstonLogger = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.LOGGER, constants_1.SHARED_PROVIDER_NAMES.WINSTON),
    __metadata("design:paramtypes", [])
], WinstonLogger);
exports.WinstonLogger = WinstonLogger;
