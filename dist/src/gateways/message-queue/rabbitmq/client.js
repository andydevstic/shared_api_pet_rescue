"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
class RabbitMqClient {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.isBlocked = false;
        this.maxRetryCount = 3;
        this.retryConnectCount = 0;
    }
    tryConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield amqplib_1.connect(this.rabbitMqConfig);
                this.connection.on('error', this.handleError.bind(this));
                this.connection.on('blocked', this.handleBlocked.bind(this));
                this.connection.on('unblocked', this.handleUnBlocked.bind(this));
                this.logger.info(`RabbitMq ${this.config.connectionName} connected!`);
            }
            catch (error) {
                if (this.maxRetryCount === this.retryConnectCount) {
                    throw new Error(`Failed to connect to rabbitmq cluster named ${this.config.connectionName}`);
                }
                this.retryConnectCount += 1;
                this.handleError(error);
            }
        });
    }
    get isConnectionAvaliable() {
        return !this.isBlocked && this.connection && true;
    }
    get rabbitMqConfig() {
        const _a = this.config, { connectionName } = _a, options = __rest(_a, ["connectionName"]);
        return options;
    }
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.error('RabbitMQ connection failed.', error);
            this.connection = null;
            yield new Promise(resolve => setTimeout(resolve, 5000));
            this.tryConnect();
        });
    }
    handleBlocked() {
        this.logger.error('RabbitMQ connection blocked.');
        this.isBlocked = true;
    }
    handleUnBlocked() {
        this.logger.error('RabbitMQ connection unblocked.');
        this.isBlocked = false;
    }
}
exports.RabbitMqClient = RabbitMqClient;
