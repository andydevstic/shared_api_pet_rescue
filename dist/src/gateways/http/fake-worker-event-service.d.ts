import { WORKER_EVENT_ENTITY_NAMES } from '@src.shared/shared/constants';
import { ILogger, IWorkerEventService } from '@src.shared/shared/interfaces';
export declare class FakeWorkerEventService implements IWorkerEventService {
    private winstonLogger;
    constructor(winstonLogger: ILogger);
    pushEvent(entityName: WORKER_EVENT_ENTITY_NAMES, eventName: string, objectIds: any[]): Promise<void>;
}
