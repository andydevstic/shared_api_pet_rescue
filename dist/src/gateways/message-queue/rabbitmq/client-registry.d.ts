import { Configuration, ILogger, IRegistry } from '@src.shared/shared/interfaces';
import { Options } from 'amqplib';
import { RabbitMQChannel } from './channel';
import { RabbitMqClient } from './client';
export declare class RabbitMqClientRegistry implements IRegistry<[string, string], RabbitMQChannel> {
    protected config: Configuration;
    protected logger: ILogger;
    protected connectionMap: Map<string, RabbitMqClient>;
    protected channelMap: Map<string, RabbitMQChannel>;
    constructor(config: Configuration, logger: ILogger);
    protected initRabbitMqConnection(rabbitMqConfig: Options.Connect & {
        connectionName: string;
    }): Promise<void>;
    getClass(connectionName: string, channelName: string): RabbitMQChannel;
}
