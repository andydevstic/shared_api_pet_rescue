import { Validator, HasId, IRdsBulkCreateWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { TableDataGatewayNames, WORKER_EVENT_ENTITY_NAMES } from '@src.shared/shared/constants';
import { Transaction } from 'sequelize';
export declare abstract class RdsBulkCreateWorkflow<Entity extends HasId> implements IRdsBulkCreateWorkflow<Entity> {
    protected workflowValidator: Validator;
    protected tableGateWayRegistry: ITableDataGatewayRegistry;
    protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
    protected abstract tableGatewayName: TableDataGatewayNames;
    constructor(workflowValidator: Validator, tableGateWayRegistry: ITableDataGatewayRegistry);
    execute(data: any[], transaction?: Transaction): Promise<Entity[]>;
}
