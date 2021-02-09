import { ILogger } from '@src.shared/shared/interfaces';
import { Connection, connect, Options } from 'amqplib';

export class RabbitMqClient {
  public connection: Connection;
  protected isBlocked = false;
  protected maxRetryCount = 3;
  protected retryConnectCount = 0;

  constructor(
    protected config: Options.Connect & { connectionName: string },
    protected logger: ILogger,
  ) {}

  public async tryConnect(): Promise<void> {
    try {
      this.connection = await connect(this.rabbitMqConfig);

      this.connection.on('error', this.handleError.bind(this));
      this.connection.on('blocked', this.handleBlocked.bind(this));
      this.connection.on('unblocked', this.handleUnBlocked.bind(this));

      this.logger.info(`RabbitMq ${this.config.connectionName} connected!`);
    } catch (error) {
      if (this.maxRetryCount === this.retryConnectCount) {
        throw new Error(`Failed to connect to rabbitmq cluster named ${this.config.connectionName}`);
      }

      this.retryConnectCount += 1;
      this.handleError(error);
    }
  }

  public get isConnectionAvaliable(): boolean {
    return !this.isBlocked && this.connection && true;
  }

  protected get rabbitMqConfig(): Options.Connect {
    const { connectionName, ...options } = this.config;

    return options;
  }

  protected async handleError(error: any): Promise<void> {
    this.logger.error('RabbitMQ connection failed.', error);
    this.connection = null;

    await new Promise(resolve => setTimeout(resolve, 5000));
    this.tryConnect();
  }

  protected handleBlocked(): void {
    this.logger.error('RabbitMQ connection blocked.');
    this.isBlocked = true;
  }

  protected handleUnBlocked(): void {
    this.logger.error('RabbitMQ connection unblocked.');
    this.isBlocked = false;
  }
}
