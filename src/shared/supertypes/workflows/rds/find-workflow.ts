import { injectable } from 'inversify';
import { FindOptions } from 'sequelize';

import { ICriteria, IParser, IRdsFindWorkflow } from '@src.shared/shared/interfaces';
import { BaseRdsWorkflow } from './base-rds-workflow';

@injectable()
export abstract class RdsFindWorkflow<Entity> extends BaseRdsWorkflow<Entity> implements IRdsFindWorkflow<Entity> {
  constructor(
    protected sequelizeOptionParser: IParser<FindOptions>,
  ) { super(); }

  public async execute(criteria: ICriteria = {}): Promise<Entity[]> {
    const { transaction, ...findCriteria } = criteria;

    const parsedCriteria = this.parseSequelizeOptions(findCriteria);
    const entities = await this.repository.findAll({
      ...parsedCriteria,
      transaction,
      raw: true,
    });

    return entities;
  }

  protected parseSequelizeOptions(rawOptions: any): FindOptions {
    return this.sequelizeOptionParser.parse(rawOptions);
  }
}
