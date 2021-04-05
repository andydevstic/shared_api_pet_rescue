import { ConnectionAdapter } from "@src.shared/shared/interfaces";
import { Mongoose, ConnectOptions } from 'mongoose';

export class MongoDbAdapter implements ConnectionAdapter<Mongoose> {
  protected connection: Mongoose;

  constructor(
    protected config: ConnectOptions,
  ) {
    if (!this.config) {
      throw new Error('Missing mongodb config');
    }

    this.connection = new Mongoose(this.config);
  }

  public getConnection(): Mongoose {
    return this.connection;
  }
}