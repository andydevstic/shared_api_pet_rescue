/// <reference types="node" />
import { ILogger } from '@src.shared/shared/interfaces';
import * as Kafka from 'kafka-node';
export declare class KafkaProducer {
    protected logger: ILogger;
    protected producer: Kafka.Producer;
    protected producerName: string;
    constructor(option: Kafka.ProducerOptions & {
        producerName: string;
    }, kafkaClient: Kafka.KafkaClient, logger: ILogger);
    protected handleProducerError(error: Error): void;
    createKeyedMessage(key: string | Buffer, message: string | Buffer): Kafka.KeyedMessage;
    sendMessage(payloads: Kafka.ProduceRequest[]): Promise<void>;
}
