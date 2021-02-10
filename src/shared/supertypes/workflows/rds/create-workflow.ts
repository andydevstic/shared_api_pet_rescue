import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

import { HasId, Validator, IRdsCreateWorkflow } from '@src.shared/shared/interfaces';
import { BaseRdsWorkflow } from './base-rds-workflow';

@injectable()
export abstract class RdsCreateWorkflow<Entity extends HasId> extends BaseRdsWorkflow<Entity> implements IRdsCreateWorkflow<Entity> {
  constructor(
    protected workflowValidator: Validator,
  ) { super(); }

  public async execute(dto: any, transaction?: Transaction): Promise<Entity> {
    const newEntity = await this.createNewEntity(dto, transaction);

    return newEntity;
  }

  protected async createNewEntity(dto: any, transaction?: Transaction): Promise<Entity> {
    return this.repository.create(dto, { transaction });
  }
}
