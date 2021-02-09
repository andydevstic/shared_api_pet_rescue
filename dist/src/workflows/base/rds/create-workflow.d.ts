import { Transaction } from 'sequelize';
import { HasId, Validator, IRdsCreateWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';
export declare abstract class RdsCreateWorkflow<Entity extends HasId> implements IRdsCreateWorkflow<Entity> {
    protected workflowValidator: Validator;
    protected tableGateWayRegistry: ITableDataGatewayRegistry;
    protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
    protected abstract tableGatewayName: TableDataGatewayNames;
    constructor(workflowValidator: Validator, tableGateWayRegistry: ITableDataGatewayRegistry);
    execute(dto: any, transaction?: Transaction): Promise<Entity>;
    protected createNewEntity(dto: any, transaction?: Transaction): Promise<Entity>;
}
