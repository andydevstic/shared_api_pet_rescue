import { Validator, IRdsBulkSoftDeleteWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';
import { Transaction } from 'sequelize';
export declare abstract class RdsBulkSoftDeleteWorkflow implements IRdsBulkSoftDeleteWorkflow {
    protected workflowValidator: Validator;
    protected tableGateWayRegistry: ITableDataGatewayRegistry;
    protected idField: string;
    protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
    protected abstract tableGatewayName: TableDataGatewayNames;
    constructor(workflowValidator: Validator, tableGateWayRegistry: ITableDataGatewayRegistry);
    execute(identifierIds: any[], transaction?: Transaction): Promise<void>;
}
