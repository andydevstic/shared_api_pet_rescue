import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from '@src.shared/shared/constants';
import { Configuration, ILogger, IRegistry } from '@src.shared/shared/interfaces';
import { Options } from 'amqplib';
import { RabbitMQChannel } from './channel';
import { RabbitMqClient } from './client';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.REGISTRY, SHARED_PROVIDER_NAMES.RABBITMQ_CLIENT)
export class RabbitMqClientRegistry implements IRegistry<[string, string], RabbitMQChannel> {
  protected connectionMap: Map<string, RabbitMqClient> = new Map();
  protected channelMap: Map<string, RabbitMQChannel> = new Map();

  constructor(
    protected config: Configuration,
    protected logger: ILogger,
  ) {
    const rabbitMqConfigs = config.get('rabbitmq.connections') as (Options.Connect & { connectionName: string })[];

    Promise
      .all(rabbitMqConfigs.map(rabbitMqConfig => this.initRabbitMqConnection(rabbitMqConfig)))
      .catch((error) => {
        this.logger.error(`Failed to connect to rabbitMq cluster`, error);
      });
  }

  protected async initRabbitMqConnection(rabbitMqConfig: Options.Connect & { connectionName: string }): Promise<void> {
    const { connectionName } = rabbitMqConfig;
    const connection = new RabbitMqClient(rabbitMqConfig, this.logger);

    await connection.tryConnect();

    this.connectionMap.set(connectionName, connection);

    return;
  }

  public getInstance(connectionName: string, channelName: string): RabbitMQChannel {
    const client = this.connectionMap.get(connectionName);

    if (!client) {
      throw new Error(`Connection name ${connectionName} not configured!`);
    }

    const channel = this.channelMap.get(channelName);

    if (channel) {
      return channel;
    }

    const newChannel = new RabbitMQChannel(this.logger, client.connection, channelName);
    this.channelMap.set(channelName, newChannel);

    return newChannel;
  }
}
