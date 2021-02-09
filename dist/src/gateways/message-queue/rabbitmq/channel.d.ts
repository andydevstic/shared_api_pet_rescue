/// <reference types="node" />
import { AMQPExchangeType, IAMQPClientDecorator, ILogger } from '@src.shared/shared/interfaces';
import { Channel, Connection, Options } from 'amqplib';
export declare class RabbitMQChannel implements IAMQPClientDecorator {
    protected logger: ILogger;
    protected connection: Connection;
    protected name: string;
    protected channel: Channel;
    protected queueMap: Map<string, any>;
    protected exchangeMap: Map<string, any>;
    constructor(logger: ILogger, connection: Connection, name: string);
    consumeMessageFromQueue(queueName: string, callback: (msg: any) => void, options?: Options.Consume): Promise<any>;
    sendMessageToExchange(exchangeName: string, routingKey: string, content: Buffer, options?: Options.Publish): void;
    bindQueue(queueName: string, exchangeName: string, key?: string): Promise<any>;
    getExchange(exchangeName: string, type: AMQPExchangeType, isDurable?: boolean): Promise<any>;
    getQueue(queueName: string, options?: Options.AssertQueue): Promise<any>;
    protected isQueueExist(queueName: string): boolean;
    protected isExchangeExist(exchangeName: string): boolean;
    protected initChannel(): Promise<void>;
    protected handleChannelClosed(): void;
    protected handleError(error: any): void;
    protected handleDrain(): void;
}
