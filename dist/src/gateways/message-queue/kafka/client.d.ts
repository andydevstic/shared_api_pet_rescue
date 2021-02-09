import { ILogger } from '@src.shared/shared/interfaces';
import * as Kafka from 'kafka-node';
export declare class KafkaClient {
    protected logger: ILogger;
    client: Kafka.KafkaClient;
    protected connectionName: string;
    constructor(option: Kafka.KafkaClientOptions & {
        connectionName: string;
    }, logger: ILogger);
    protected handleConnReady(): void;
    protected handleConnError(error: Error): void;
    protected handleConnReconnect(): void;
    protected handleConnZkReconnect(): void;
    protected handleBrokersChanged(): void;
}
