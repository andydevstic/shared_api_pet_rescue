import { ConnectionAdapter, RdsTransaction, TransactionFactory } from '@src.shared/shared/interfaces';
import { Sequelize } from 'sequelize-typescript';
import { TransactionOptions } from 'sequelize/types';
export declare abstract class SequelizeAdapter implements ConnectionAdapter<Sequelize>, TransactionFactory<RdsTransaction> {
    protected _connection: Sequelize;
    constructor(sequelizeOptions: any);
    createTransaction(options?: TransactionOptions): Promise<RdsTransaction>;
    getConnection(): Sequelize;
}
