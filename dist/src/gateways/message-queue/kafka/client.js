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
exports.KafkaClient = void 0;
const Kafka = require("kafka-node");
class KafkaClient {
    constructor(option, logger) {
        this.logger = logger;
        const { connectionName } = option, kafkaOptions = __rest(option, ["connectionName"]);
        this.connectionName = connectionName;
        this.client = new Kafka.KafkaClient(kafkaOptions);
        this.client.on('ready', this.handleConnReady.bind(this));
        this.client.on('error', this.handleConnError.bind(this));
        this.client.on('reconnect', this.handleConnReconnect.bind(this));
        this.client.on('zkReconnect', this.handleConnZkReconnect.bind(this));
        this.client.on('brokersChanged', this.handleBrokersChanged.bind(this));
    }
    handleConnReady() {
        this.logger.info('Successfully connected to Kafka client', this.connectionName);
    }
    handleConnError(error) {
        this.logger.error(`Error occurred for kafka connection. Client named ${this.connectionName}.`, JSON.stringify(error));
    }
    handleConnReconnect() {
        this.logger.warn(`Attempting to reconnect to kafka connection`, this.connectionName);
    }
    handleConnZkReconnect() {
        this.logger.warn(`Attempting to reconnect to zookeeper connection`, this.connectionName);
    }
    handleBrokersChanged() {
        this.logger.warn('Number of brokers changed for connection', this.connectionName);
    }
}
exports.KafkaClient = KafkaClient;
