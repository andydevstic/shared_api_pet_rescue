"use strict";
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
const Kafka = require("kafka-node");
class KafkaProducer {
    constructor(option, kafkaClient, logger) {
        this.logger = logger;
        const { producerName } = option, kafkaProducerOption = __rest(option, ["producerName"]);
        this.producerName = producerName;
        this.producer = new Kafka.Producer(kafkaClient, kafkaProducerOption);
        this.producer.on('ready', () => this.logger.info(`Producer ${this.producerName} connected successfully`));
        this.producer.on('error', this.handleProducerError.bind(this));
    }
    handleProducerError(error) {
        this.logger.error(`Error occurred for producer ${this.producerName}.`, JSON.stringify(error));
    }
    createKeyedMessage(key, message) {
        return new Kafka.KeyedMessage(key, message);
    }
    sendMessage(payloads) {
        return new Promise((resolve, reject) => {
            this.producer.send(payloads, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
}
exports.KafkaProducer = KafkaProducer;
