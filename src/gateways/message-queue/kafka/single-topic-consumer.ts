import { InternalServerError } from '@src.shared/shared/errors';
import { ILogger } from '@src.shared/shared/interfaces';
import * as Kafka from 'kafka-node';

export abstract class KafkaSingleTopicConsumer {
  protected consumer: Kafka.Consumer;
  protected consumerName: string;
  protected topicName: string;
  protected partitionNumber: number;
  protected isPaused = false;

  constructor(
    protected option: Kafka.ConsumerOptions & { consumerName: string; },
    protected kafkaClient: Kafka.KafkaClient,
    protected logger: ILogger,
  ) {
    const { consumerName, ...kafkaConsumerOptions } = option;

    // Should disable autoCommit.

    this.consumerName = consumerName;
    this.consumer = new Kafka.Consumer(kafkaClient, [{ topic: this.topicName, partition: this.partitionNumber, }], kafkaConsumerOptions);

    this.consumer.on('offsetOutOfRange', this.handleOffsetOutOfRangeError.bind(this));
    this.consumer.on('message', this.handleMessage.bind(this));
    this.consumer.on('error', this.handleConsumerError.bind(this));
  }

  public pause(): void {
    if (!this.isPaused) {
      this.consumer.pause();
      this.isPaused = true;
    }
  }

  public resume(): void {
    if (this.isPaused) {
      this.consumer.resume();
      this.isPaused = false;
    }
  }

  public commit(): Promise<void> {
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
  protected handleOffsetOutOfRangeError(): void {
    const offsetInstance = new Kafka.Offset(this.kafkaClient);
    let latestOffset: number;

    offsetInstance.fetchLatestOffsets([this.topicName], (error, offsets) => {
      if (error) {
        throw new InternalServerError(error.message, error.stack || '');
      }

      latestOffset = offsets[this.topicName][this.partitionNumber];
    });

    this.consumer.setOffset(this.topicName, this.partitionNumber, latestOffset);
  }

  protected abstract handleMessage(message: any): void;

  protected handleConsumerError(error: Error): void {
    this.logger.error(`Error occurred for consumer ${this.consumerName}.`, JSON.stringify(error));
  }
}
