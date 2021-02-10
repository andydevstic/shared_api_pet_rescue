import { ConnectionAdapter, ILogger, ITransaction, TransactionFactory } from '@src.shared/shared/interfaces';
import { ConnectionOptions, Connection } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
export declare class BaseTypeOrmAdapter implements ConnectionAdapter<Connection>, TransactionFactory<ITransaction> {
    protected logger: ILogger;
    protected _connection: Connection;
    protected connectionName: string;
    constructor(options: ConnectionOptions, logger: ILogger);
    createTransactionBox(callback: (tx: any) => Promise<void>, isolationLevel?: IsolationLevel): Promise<void>;
    getConnection(): Connection;
}
