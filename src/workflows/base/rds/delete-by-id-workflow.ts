import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

import { IWorkerEventService, IRdsDeleteByIdWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { GatewayTypes, WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';
@injectable()
export abstract class RdsDeleteByIdWorkflow implements IRdsDeleteByIdWorkflow {
  protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
  protected abstract tableGatewayName: TableDataGatewayNames;
  protected idField = 'id';

  constructor(
    protected workerEventService: IWorkerEventService,
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) {  }

  public async execute(id: string | number, transaction?: Transaction): Promise<void> {
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.WRITE);

    await tableDataGateway.destroy({
      transaction,
      where: {
        [this.idField]: id,
      }
    });
  }
}
