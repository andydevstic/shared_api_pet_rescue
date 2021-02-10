import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

import { IWorkerEventService, IRdsDeleteByIdWorkflow } from '@src.shared/shared/interfaces';
import { WORKER_EVENT_ENTITY_NAMES } from '@src.shared/shared/constants';
import { BaseRdsWorkflow } from './base-rds-workflow';
@injectable()
export abstract class RdsDeleteByIdWorkflow extends BaseRdsWorkflow implements IRdsDeleteByIdWorkflow {
  protected abstract entityName: WORKER_EVENT_ENTITY_NAMES;
  protected idField = 'id';

  constructor(
    protected workerEventService: IWorkerEventService,
  ) { super(); }

  public async execute(id: string | number, transaction?: Transaction): Promise<void> {
    return this.repository.destroy({
      transaction,
      where: {
        [this.idField]: id,
      }
    });
  }
}
