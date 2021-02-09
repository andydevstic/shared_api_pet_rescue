import { inject, named } from 'inversify';

import { provideSingletonNamed } from '@src.shared/infra/ioc/decorators';
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES, WORKER_EVENT_ENTITY_NAMES } from '@src.shared/shared/constants';
import { ILogger, IWorkerEventService } from '@src.shared/shared/interfaces';

@provideSingletonNamed(SHARED_PROVIDER_TYPES.FAKE, SHARED_PROVIDER_NAMES.WORKER_EVENT_SERVICE)
export class FakeWorkerEventService implements IWorkerEventService {
  constructor(
    @inject(SHARED_PROVIDER_TYPES.LOGGER)
    @named(SHARED_PROVIDER_NAMES.WINSTON)
    private winstonLogger: ILogger,
  ) {}

  public async pushEvent(entityName: WORKER_EVENT_ENTITY_NAMES, eventName: string, objectIds: any[]): Promise<void> {
    this.winstonLogger.info(`Fake event service pushed data: ${JSON.stringify({ entityName, eventName, objectIds })}`);
  }
}
