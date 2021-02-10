import { HasId, IWorkerEventService, IRdsUpdateByIdWorkflow } from '@src.shared/shared/interfaces';
import { injectable } from 'inversify';
import { Transaction } from 'sequelize';
import { BaseRdsWorkflow } from './base-rds-workflow';

@injectable()
export abstract class RdsUpdateByIdWorkflow<Entity extends HasId>
  extends BaseRdsWorkflow<Entity>
  implements IRdsUpdateByIdWorkflow<Entity> {
  protected idField = 'id';

  constructor(
    protected workerEventService: IWorkerEventService,
  ) { super(); }

  public async execute(id: string, data: any, transaction?: Transaction): Promise<Entity> {
    return this.repository.update(data, {
      transaction,
      where: {
        [this.idField]: id,
      }
    });
  }
}
