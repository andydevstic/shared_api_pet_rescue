import { ConnectionAdapter, ILogger } from "@src.shared/shared/interfaces";
import { injectable } from "inversify";
import * as mongoose from 'mongoose';
import { Mongoose, Connection, } from 'mongoose';

@injectable()
export abstract class MongoDbAdapter implements ConnectionAdapter<Connection> {
  protected _connection: Connection;
  protected mongoose: Mongoose;
  protected isConnected = false;

  constructor(
    protected config: any,
    protected logger: ILogger,
  ) {}

  public async connect(): Promise<void> {
    if (!this.config) {
      throw new Error('Missing mongodb config');
    }

    const { host, port, username, password, database } = this.config;
    try {
      const uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;
  
      const connection = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      this._connection = connection as any;
      this.isConnected = true;
      this.logger.info(`Connected to mongodb ${host}:${port} successfully!`);
    } catch (error) {
      this.logger.error(`Failed to connect to mongodb ${host}:${port}`, error);
      process.exit(1);
    }
  }

  public getConnection(): Connection {
    if (!this.isConnected) {
      throw new Error('Mongo is not connected. Please connect before using');
    }

    return this._connection;
  }

  public abstract loadModels(): void;
}