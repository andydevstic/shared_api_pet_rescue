import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

import { IRdsSoftDeleteByIdWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { GatewayTypes, WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';

@injectable()
export abstract class RdsSoftDeleteByIdWorkflow implements IRdsSoftDeleteByIdWorkflow {
  protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
  protected abstract tableGatewayName: TableDataGatewayNames;
  protected idField = 'id';

  constructor(
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) {  }

  public async execute(id: any, transaction?: Transaction): Promise<void> {
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.WRITE);

    await tableDataGateway.update(
      { isDeleted: true },
      {
        transaction,
        where: {
          [this.idField]: id,
        },
      }
    );
  }
}
