import { injectable } from 'inversify';
import { Validator, IRdsBulkSoftDeleteWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { GatewayTypes, WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';
import { Transaction } from 'sequelize';

@injectable()
export abstract class RdsBulkSoftDeleteWorkflow implements IRdsBulkSoftDeleteWorkflow {
  protected idField = 'id';

  protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
  protected abstract tableGatewayName: TableDataGatewayNames;

  constructor(
    protected workflowValidator: Validator,
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) {  }

  public async execute(identifierIds: any[], transaction?: Transaction): Promise<void> {
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.WRITE);

    await tableDataGateway.update(
      { isDeleted: true },
      {
        transaction,
        where: {
          [this.idField]: {
            $in: identifierIds,
          },
        },
      }
    );
  }
}
