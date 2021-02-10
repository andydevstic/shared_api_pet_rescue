import { FindOptions } from 'sequelize';
import { ICriteria, IPaginateResult, IParser, IRdsPaginateWorkflow } from '@src.shared/shared/interfaces';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsPaginateWorkflow<Entity> extends BaseRdsWorkflow<Entity> implements IRdsPaginateWorkflow<Entity> {
    protected sequelizeOptionParser: IParser<FindOptions>;
    constructor(sequelizeOptionParser: IParser<FindOptions>);
    execute(criteria?: ICriteria): Promise<IPaginateResult<Entity>>;
    protected parseSequelizeOptions(rawOptions: any): FindOptions;
}
