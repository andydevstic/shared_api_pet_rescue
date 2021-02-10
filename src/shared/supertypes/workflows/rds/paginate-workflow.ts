import { injectable } from 'inversify';
import { FindOptions } from 'sequelize';

import { ICriteria, IPaginateResult, IParser, IRdsPaginateWorkflow } from '@src.shared/shared/interfaces';
import { BaseRdsWorkflow } from './base-rds-workflow';

@injectable()
export abstract class RdsPaginateWorkflow<Entity> extends BaseRdsWorkflow<Entity> implements IRdsPaginateWorkflow<Entity> {
  constructor(
    protected sequelizeOptionParser: IParser<FindOptions>,
  ) { super(); }

  public async execute(criteria: ICriteria = {}): Promise<IPaginateResult<Entity>> {
    const { transaction, ...findCriteria } = criteria;

    const parsedCriteria = this.parseSequelizeOptions(findCriteria);
    const findResult = await this.repository.findAndCountAll({
      ...parsedCriteria,
      transaction,
      raw: true,
    });

    return {
      docs: findResult.rows || [],
      totalCount: findResult.count,
      limit: criteria.limit,
      page: criteria.page,
    };
  }

  protected parseSequelizeOptions(rawOptions: any): FindOptions {
    return this.sequelizeOptionParser.parse(rawOptions);
  }
}
