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
Object.defineProperty(exports, "__esModule", { value: true });
class RabbitMQChannel {
    constructor(logger, connection, name) {
        this.logger = logger;
        this.connection = connection;
        this.name = name;
        this.queueMap = new Map();
        this.exchangeMap = new Map();
        this.initChannel();
    }
    consumeMessageFromQueue(queueName, callback, options) {
        return this.channel.consume(queueName, callback, options);
    }
    sendMessageToExchange(exchangeName, routingKey, content, options) {
        const publishResult = this.channel.publish(exchangeName, routingKey, content, options);
        if (!publishResult) {
            throw new Error('Message failed to publish.');
        }
    }
    bindQueue(queueName, exchangeName, key) {
        if (!this.isQueueExist(queueName)) {
            throw new Error(`Queue ${queueName} does not exist`);
        }
        if (!this.isExchangeExist(exchangeName)) {
            throw new Error(`Exchange ${exchangeName} does not exist`);
        }
        return this.channel.bindQueue(queueName, exchangeName, key);
    }
    getExchange(exchangeName, type, isDurable) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isExchangeExist(exchangeName)) {
                return this.exchangeMap.get(exchangeName);
            }
            const newExchange = yield this.channel.assertExchange(exchangeName, type, { durable: isDurable || true });
            this.exchangeMap.set(exchangeName, newExchange);
            return newExchange;
        });
    }
    getQueue(queueName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isQueueExist(queueName)) {
                return this.queueMap.get(queueName);
            }
            const newQueue = yield this.channel.assertQueue(queueName, options);
            this.queueMap.set(queueName, newQueue);
            return newQueue;
        });
    }
    isQueueExist(queueName) {
        return this.queueMap.has(queueName);
    }
    isExchangeExist(exchangeName) {
        return this.exchangeMap.has(exchangeName);
    }
    initChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.connection.createChannel();
            channel.on('close', this.handleChannelClosed.bind(this));
            channel.on('error', this.handleError.bind(this));
            channel.on('drain', this.handleDrain.bind(this));
        });
    }
    handleChannelClosed() {
        this.logger.info(`Channel name ${this.name} was closed!`);
    }
    handleError(error) {
        this.logger.info(`Error occurred in channel name ${this.name}`, error);
    }
    handleDrain() {
        this.logger.info(`Channel ${this.name} drained and is ready to process writes`);
    }
}
exports.RabbitMQChannel = RabbitMQChannel;
