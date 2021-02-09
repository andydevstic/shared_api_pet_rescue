import { HasId, IWorkerEventService, IRdsUpdateByIdWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';
import { Transaction } from 'sequelize';
export declare abstract class RdsUpdateByIdWorkflow<Entity extends HasId> implements IRdsUpdateByIdWorkflow<Entity> {
    protected workerEventService: IWorkerEventService;
    protected tableGateWayRegistry: ITableDataGatewayRegistry;
    protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
    protected abstract tableGatewayName: TableDataGatewayNames;
    protected idField: string;
    constructor(workerEventService: IWorkerEventService, tableGateWayRegistry: ITableDataGatewayRegistry);
    execute(id: string, data: any, transaction?: Transaction): Promise<Entity>;
}
