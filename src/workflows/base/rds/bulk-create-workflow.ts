import { injectable } from 'inversify';
import { Validator, HasId, IRdsBulkCreateWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { GatewayTypes, TableDataGatewayNames, WORKER_EVENT_ENTITY_NAMES } from '@src.shared/shared/constants';
import { Transaction } from 'sequelize';

@injectable()
export abstract class RdsBulkCreateWorkflow<Entity extends HasId> implements IRdsBulkCreateWorkflow<Entity> {
  protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
  protected abstract tableGatewayName: TableDataGatewayNames;

  constructor(
    protected workflowValidator: Validator,
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) { }

  public async execute(data: any[], transaction?: Transaction): Promise<Entity[]> {
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.WRITE);

    const createdEntities: Entity[] = await tableDataGateway.bulkCreate(data, { transaction });

    return createdEntities;
  }
}
