import { Transaction } from 'sequelize';
import { IWorkerEventService, IRdsDeleteByIdWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { WORKER_EVENT_ENTITY_NAMES, TableDataGatewayNames } from '@src.shared/shared/constants';
export declare abstract class RdsDeleteByIdWorkflow implements IRdsDeleteByIdWorkflow {
    protected workerEventService: IWorkerEventService;
    protected tableGateWayRegistry: ITableDataGatewayRegistry;
    protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
    protected abstract tableGatewayName: TableDataGatewayNames;
    protected idField: string;
    constructor(workerEventService: IWorkerEventService, tableGateWayRegistry: ITableDataGatewayRegistry);
    execute(id: string | number, transaction?: Transaction): Promise<void>;
}
