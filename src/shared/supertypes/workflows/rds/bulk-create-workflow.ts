import { injectable } from 'inversify';
import { Validator, HasId, IRdsBulkCreateWorkflow } from '@src.shared/shared/interfaces';
import { Transaction } from 'sequelize';
import { BaseRdsWorkflow } from './base-rds-workflow';

@injectable()
export abstract class RdsBulkCreateWorkflow<Entity extends HasId>
  extends BaseRdsWorkflow<Entity>
  implements IRdsBulkCreateWorkflow<Entity> {
  constructor(
    protected workflowValidator: Validator,
  ) { super(); }

  public async execute(data: any[], transaction?: Transaction): Promise<Entity[]> {
    return this.repository.bulkCreate(data, { transaction });
  }
}
