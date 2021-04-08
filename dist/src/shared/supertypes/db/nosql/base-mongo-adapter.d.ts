import { ConnectionAdapter, ILogger } from "@src.shared/shared/interfaces";
import { Mongoose, Connection } from 'mongoose';
export declare abstract class MongoDbAdapter implements ConnectionAdapter<Connection> {
    protected config: any;
    protected logger: ILogger;
    protected _connection: Connection;
    protected mongoose: Mongoose;
    protected isConnected: boolean;
    constructor(config: any, logger: ILogger);
    connect(): Promise<void>;
    getConnection(): Connection;
    abstract loadModels(): void;
}
