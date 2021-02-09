import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

import { HasId, Validator, IRdsCreateWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { GatewayTypes, WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';

@injectable()
export abstract class RdsCreateWorkflow<Entity extends HasId> implements IRdsCreateWorkflow<Entity> {
  protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
  protected abstract tableGatewayName: TableDataGatewayNames;

  constructor(
    protected workflowValidator: Validator,
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) {  }

  public async execute(dto: any, transaction?: Transaction): Promise<Entity> {
    const newEntity = await this.createNewEntity(dto, transaction);

    return newEntity;
  }

  protected async createNewEntity(dto: any, transaction?: Transaction): Promise<Entity> {
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.WRITE);
    const newEntity = await tableDataGateway.create(dto, { transaction });

    return newEntity;
  }
}
