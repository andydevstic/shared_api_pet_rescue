import { ConnectionAdapter, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { TableDataGatewayNames, GatewayTypes } from '@src.shared/shared/constants';
import { Sequelize } from 'sequelize-typescript';
import { UsersTableReadGateway } from './users';
export declare class TableDataGatewayRegistry implements ITableDataGatewayRegistry {
    private _readConn;
    private _writeConn;
    constructor(sequelizeReadAdapter: ConnectionAdapter<Sequelize>, sequelizeWriteAdapter: ConnectionAdapter<Sequelize>);
    getClass(identifier: TableDataGatewayNames, type: GatewayTypes): typeof UsersTableReadGateway;
    private loadModelsToReadConn;
    private loadModelsToWriteConn;
}
