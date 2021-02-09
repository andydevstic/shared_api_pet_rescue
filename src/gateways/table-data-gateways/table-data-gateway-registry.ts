import { ConnectionAdapter, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { TableDataGatewayNames, GatewayTypes, SHARED_PROVIDER_TYPES, SHARED_PROVIDER_NAMES } from '@src.shared/shared/constants';
import { InternalServerError } from '@src.shared/shared/errors';
import { inject, named } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { UsersTableReadGateway, UsersTableWriteGateway } from './users';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.REGISTRY, SHARED_PROVIDER_NAMES.TABLE_DATA_GATEWAY)
export class TableDataGatewayRegistry implements ITableDataGatewayRegistry {
  private _readConn: Sequelize;
  private _writeConn: Sequelize;

  constructor(
    @inject(SHARED_PROVIDER_TYPES.ADAPTER)
    @named(SHARED_PROVIDER_NAMES.SEQUELIZE_READ)
    sequelizeReadAdapter: ConnectionAdapter<Sequelize>,

    @inject(SHARED_PROVIDER_TYPES.ADAPTER)
    @named(SHARED_PROVIDER_NAMES.SEQUELIZE_WRITE)
    sequelizeWriteAdapter: ConnectionAdapter<Sequelize>,
  ) {
    this._readConn = sequelizeReadAdapter.getConnection();
    this._writeConn = sequelizeWriteAdapter.getConnection();

    this.loadModelsToReadConn();
    this.loadModelsToWriteConn();
  }

  public getClass(identifier: TableDataGatewayNames, type: GatewayTypes) {
    switch (identifier) {
      case TableDataGatewayNames.USER:
        return type === GatewayTypes.WRITE
        ? UsersTableWriteGateway
        : UsersTableReadGateway;

      default:
        throw new InternalServerError('Table data gateway not found');
    }
  }

  private loadModelsToReadConn(): void {
    this._readConn.addModels([
      UsersTableReadGateway,
    ]);
  }

  private loadModelsToWriteConn() {
    this._writeConn.addModels([
      UsersTableWriteGateway,
    ]);
  }
}
