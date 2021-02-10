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
exports.KafkaSingleTopicConsumer = void 0;
const errors_1 = require("@src.shared/shared/errors");
const Kafka = require("kafka-node");
class KafkaSingleTopicConsumer {
    constructor(option, kafkaClient, logger) {
        this.option = option;
        this.kafkaClient = kafkaClient;
        this.logger = logger;
        this.isPaused = false;
        const { consumerName } = option, kafkaConsumerOptions = __rest(option, ["consumerName"]);
        // Should disable autoCommit.
        this.consumerName = consumerName;
        this.consumer = new Kafka.Consumer(kafkaClient, [{ topic: this.topicName, partition: this.partitionNumber, }], kafkaConsumerOptions);
        this.consumer.on('offsetOutOfRange', this.handleOffsetOutOfRangeError.bind(this));
        this.consumer.on('message', this.handleMessage.bind(this));
        this.consumer.on('error', this.handleConsumerError.bind(this));
    }
    pause() {
        if (!this.isPaused) {
            this.consumer.pause();
            this.isPaused = true;
        }
    }
    resume() {
        if (this.isPaused) {
            this.consumer.resume();
            this.isPaused = false;
        }
    }
    commit() {
        return new Promise((resolve, reject) => {
            this.consumer.commit((error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    }
    /**
     * offsetOutOfRange error happends when the offset being used has passed retention period
     */
    handleOffsetOutOfRangeError() {
        const offsetInstance = new Kafka.Offset(this.kafkaClient);
        let latestOffset;
        offsetInstance.fetchLatestOffsets([this.topicName], (error, offsets) => {
            if (error) {
                throw new errors_1.InternalServerError(error.message, error.stack || '');
            }
            latestOffset = offsets[this.topicName][this.partitionNumber];
        });
        this.consumer.setOffset(this.topicName, this.partitionNumber, latestOffset);
    }
    handleConsumerError(error) {
        this.logger.error(`Error occurred for consumer ${this.consumerName}.`, JSON.stringify(error));
    }
}
exports.KafkaSingleTopicConsumer = KafkaSingleTopicConsumer;
