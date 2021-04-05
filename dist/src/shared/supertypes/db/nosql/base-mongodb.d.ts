import { ConnectionAdapter } from "@src.shared/shared/interfaces";
import { Mongoose, ConnectOptions } from 'mongoose';
export declare class MongoDbAdapter implements ConnectionAdapter<Mongoose> {
    protected config: ConnectOptions;
    protected connection: Mongoose;
    constructor(config: ConnectOptions);
    getConnection(): Mongoose;
}
