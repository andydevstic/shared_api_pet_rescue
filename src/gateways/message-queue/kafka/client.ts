import { ILogger } from '@src.shared/shared/interfaces';
import * as Kafka from 'kafka-node';

export class KafkaClient {
  public client: Kafka.KafkaClient;
  protected connectionName: string;

  constructor(
    option: Kafka.KafkaClientOptions & { connectionName: string },
    protected logger: ILogger,
  ) {
    const { connectionName, ...kafkaOptions } = option;

    this.connectionName = connectionName;
    this.client = new Kafka.KafkaClient(kafkaOptions);

    this.client.on('ready', this.handleConnReady.bind(this));
    this.client.on('error', this.handleConnError.bind(this));
    this.client.on('reconnect', this.handleConnReconnect.bind(this));
    this.client.on('zkReconnect', this.handleConnZkReconnect.bind(this));
    this.client.on('brokersChanged', this.handleBrokersChanged.bind(this));
  }

  protected handleConnReady(): void {
    this.logger.info('Successfully connected to Kafka client', this.connectionName);
  }

  protected handleConnError(error: Error): void {
    this.logger.error(`Error occurred for kafka connection. Client named ${this.connectionName}.`, JSON.stringify(error));
  }

  protected handleConnReconnect(): void {
    this.logger.warn(`Attempting to reconnect to kafka connection`, this.connectionName);
  }

  protected handleConnZkReconnect(): void {
    this.logger.warn(`Attempting to reconnect to zookeeper connection`, this.connectionName);
  }

  protected handleBrokersChanged(): void {
    this.logger.warn('Number of brokers changed for connection', this.connectionName);
  }
}
