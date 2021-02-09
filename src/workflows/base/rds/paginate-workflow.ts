import { injectable } from 'inversify';
import { FindOptions } from 'sequelize';

import { ICriteria, IPaginateResult, IParser, IRdsPaginateWorkflow, ITableDataGatewayRegistry } from '@src.shared/shared/interfaces';
import { GatewayTypes, TableDataGatewayNames } from '@src.shared/shared/constants';

@injectable()
export abstract class RdsPaginateWorkflow<Entity> implements IRdsPaginateWorkflow<Entity> {
  protected abstract tableGatewayName: TableDataGatewayNames;

  constructor(
    protected sequelizeOptionParser: IParser<FindOptions>,
    protected tableGateWayRegistry: ITableDataGatewayRegistry,
  ) {  }

  public async execute(criteria: ICriteria = {}): Promise<IPaginateResult<Entity>> {
    const { transaction, ...findCriteria } = criteria;

    const parsedCriteria = this.parseSequelizeOptions(findCriteria);
    const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, GatewayTypes.READ);
    const findResult = await tableDataGateway.findAndCountAll({
      ...parsedCriteria,
      transaction,
      raw: true,
    });

    return {
      docs: findResult.rows || [],
      total: findResult.count,
      limit: criteria.limit,
      page: criteria.page,
    };
  }

  protected parseSequelizeOptions(rawOptions: any): FindOptions {
    return this.sequelizeOptionParser.parse(rawOptions);
  }
}
