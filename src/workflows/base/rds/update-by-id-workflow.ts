import { HasId, IWorkerEventService, IRdsUpdateByIdWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { injectable } from 'inversify';
import { GatewayTypes, WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';
import { Transaction } from 'sequelize';

@injectable()
export abstract class RdsUpdateByIdWorkflow<Entity extends HasId> implements IRdsUpdateByIdWorkflow<Entity> {
  protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
  protected abstract tableGatewayName: TableDataGatewayNames;
  protected idField = 'id';

  constructor(
    protected workerEventService: IWorkerEventService,
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) {  }

  public async execute(id: string, data: any, transaction?: Transaction): Promise<Entity> {
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.WRITE);
    const updatedDoc = await tableDataGateway.update(data, {
      transaction,
      where: {
        [this.idField]: id,
      }
    });

    return updatedDoc;
  }
}
