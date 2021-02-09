import { ILogger } from '@src.shared/shared/interfaces';
import { Connection, Options } from 'amqplib';
export declare class RabbitMqClient {
    protected config: Options.Connect & {
        connectionName: string;
    };
    protected logger: ILogger;
    connection: Connection;
    protected isBlocked: boolean;
    protected maxRetryCount: number;
    protected retryConnectCount: number;
    constructor(config: Options.Connect & {
        connectionName: string;
    }, logger: ILogger);
    tryConnect(): Promise<void>;
    get isConnectionAvaliable(): boolean;
    protected get rabbitMqConfig(): Options.Connect;
    protected handleError(error: any): Promise<void>;
    protected handleBlocked(): void;
    protected handleUnBlocked(): void;
}
