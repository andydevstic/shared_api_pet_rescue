import { ILogger } from '@src.shared/shared/interfaces';
import * as Kafka from 'kafka-node';
export declare abstract class KafkaSingleTopicConsumer {
    protected option: Kafka.ConsumerOptions & {
        consumerName: string;
    };
    protected kafkaClient: Kafka.KafkaClient;
    protected logger: ILogger;
    protected consumer: Kafka.Consumer;
    protected consumerName: string;
    protected topicName: string;
    protected partitionNumber: number;
    protected isPaused: boolean;
    constructor(option: Kafka.ConsumerOptions & {
        consumerName: string;
    }, kafkaClient: Kafka.KafkaClient, logger: ILogger);
    pause(): void;
    resume(): void;
    commit(): Promise<void>;
    /**
     * offsetOutOfRange error happends when the offset being used has passed retention period
     */
    protected handleOffsetOutOfRangeError(): void;
    protected abstract handleMessage(message: any): void;
    protected handleConsumerError(error: Error): void;
}
