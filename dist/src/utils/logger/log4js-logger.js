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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const inversify_1 = require("inversify");
const Log4JS = require("log4js");
let Log4JsLogger = class Log4JsLogger {
    constructor(config) {
        this.loggerMap = new Map();
        Log4JS.configure(config.get('log.log4js') || config.get('log'));
    }
    createInstance(logLevel = constants_1.LOG_LEVELS.INFO, moduleName) {
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
    getLoggerHashKey(level, moduleName) {
        return `${level}:${moduleName || ''}`;
    }
    info(message, ...args) {
        return this.createInstance().info(message, ...args);
    }
    warn(message, ...args) {
        return this.createInstance().warn(message, ...args);
    }
    error(message, ...args) {
        return this.createInstance().error(message, ...args);
    }
};
Log4JsLogger = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.LOGGER, constants_1.SHARED_PROVIDER_NAMES.LOG4JS),
    __param(0, inversify_1.inject(constants_1.SHARED_PLACEHOLDER_TYPES.CONFIG)),
    __metadata("design:paramtypes", [Object])
], Log4JsLogger);
exports.Log4JsLogger = Log4JsLogger;
