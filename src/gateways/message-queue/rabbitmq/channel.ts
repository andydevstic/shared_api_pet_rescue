import { AMQPExchangeType, IAMQPClientDecorator, ILogger } from '@src.shared/shared/interfaces';
import { Channel, Connection, Options } from 'amqplib';

export class RabbitMQChannel implements IAMQPClientDecorator {
  protected channel: Channel;
  protected queueMap: Map<string, any> = new Map();
  protected exchangeMap: Map<string, any> = new Map();

  constructor(
    protected logger: ILogger,
    protected connection: Connection,
    protected name: string,
  ) {
    this.initChannel();
  }

  public consumeMessageFromQueue(
    queueName: string,
    callback: (msg: any) => void,
    options?: Options.Consume,
  ): Promise<any> {
    return this.channel.consume(queueName, callback, options);
  }

  public sendMessageToExchange(exchangeName: string, routingKey: string, content: Buffer, options?: Options.Publish): void {
    const publishResult = this.channel.publish(exchangeName, routingKey, content, options);
    if (!publishResult) {
      throw new Error('Message failed to publish.');
    }
  }

  public bindQueue(queueName: string, exchangeName: string, key?: string): Promise<any> {
    if (!this.isQueueExist(queueName)) {
      throw new Error(`Queue ${queueName} does not exist`);
    }

    if (!this.isExchangeExist(exchangeName)) {
      throw new Error(`Exchange ${exchangeName} does not exist`);
    }

    return this.channel.bindQueue(queueName, exchangeName, key);
  }

  public async getExchange(exchangeName: string, type: AMQPExchangeType, isDurable?: boolean): Promise<any> {
    if (this.isExchangeExist(exchangeName)) {
      return this.exchangeMap.get(exchangeName);
    }

    const newExchange = await this.channel.assertExchange(exchangeName, type, { durable: isDurable || true });
    this.exchangeMap.set(exchangeName, newExchange);

    return newExchange;
  }

  public async getQueue(queueName: string, options?: Options.AssertQueue): Promise<any> {
    if (this.isQueueExist(queueName)) {
      return this.queueMap.get(queueName);
    }

    const newQueue = await this.channel.assertQueue(queueName, options);
    this.queueMap.set(queueName, newQueue);

    return newQueue;
  }

  protected isQueueExist(queueName: string): boolean {
    return this.queueMap.has(queueName);
  }

  protected isExchangeExist(exchangeName: string): boolean {
    return this.exchangeMap.has(exchangeName);
  }

  protected async initChannel(): Promise<void> {
    const channel = await this.connection.createChannel();

    channel.on('close', this.handleChannelClosed.bind(this));
    channel.on('error', this.handleError.bind(this));
    channel.on('drain', this.handleDrain.bind(this));
  }

  protected handleChannelClosed(): void {
    this.logger.info(`Channel name ${this.name} was closed!`);
  }

  protected handleError(error: any): void {
    this.logger.info(`Error occurred in channel name ${this.name}`, error);
  }

  protected handleDrain(): void {
    this.logger.info(`Channel ${this.name} drained and is ready to process writes`);
  }
}
