import { ConnectionAdapter, ILogger, ITransaction, TransactionFactory } from '@src.shared/shared/interfaces';
import { createConnection, ConnectionOptions, Connection, getManager } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

export abstract class BaseTypeOrmAdapter implements ConnectionAdapter<Connection>, TransactionFactory<ITransaction> {
  protected _connection: Connection;
  protected connectionName: string;

  constructor(
    options: ConnectionOptions,
    protected logger: ILogger,
  ) {
    if (!options.name) {
      throw new Error('Missing database connection name');
    }

    this.connectionName = options.name;

    createConnection(options)
      .then((connection) => {
        this._connection = connection;
        this.logger.info(`Successfully connected to database ${options.name}`);
      })
      .catch((error) => {
        this.logger.error(`Can't connect to database ${options.name}`, error);
      });
  }

  public async createTransactionBox(callback: (tx: any) => Promise<void>, isolationLevel: IsolationLevel = 'READ COMMITTED') {
    return getManager(this.connectionName).transaction(isolationLevel, callback);
  }

  public getConnection(): Connection {
    return this._connection;
  }
}
