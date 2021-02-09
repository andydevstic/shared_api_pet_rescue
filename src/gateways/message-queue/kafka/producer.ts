import { ILogger } from '@src.shared/shared/interfaces';
import * as Kafka from 'kafka-node';

export class KafkaProducer {
  protected producer: Kafka.Producer;
  protected producerName: string;

  constructor(
    option: Kafka.ProducerOptions & { producerName: string },
    kafkaClient: Kafka.KafkaClient,
    protected logger: ILogger,
  ) {
    const { producerName, ...kafkaProducerOption } = option;

    this.producerName = producerName;
    this.producer = new Kafka.Producer(kafkaClient, kafkaProducerOption);

    this.producer.on('ready', () => this.logger.info(`Producer ${this.producerName} connected successfully`));
    this.producer.on('error', this.handleProducerError.bind(this));
  }

  protected handleProducerError(error: Error): void {
    this.logger.error(`Error occurred for producer ${this.producerName}.`, JSON.stringify(error));
  }

  public createKeyedMessage(key: string | Buffer, message: string | Buffer): Kafka.KeyedMessage {
    return new Kafka.KeyedMessage(key, message);
  }

  public sendMessage(payloads: Kafka.ProduceRequest[]): Promise<void> {
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
