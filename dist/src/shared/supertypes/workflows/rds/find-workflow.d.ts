import { FindOptions } from 'sequelize';
import { ICriteria, IParser, IRdsFindWorkflow } from '@src.shared/shared/interfaces';
import { BaseRdsWorkflow } from './base-rds-workflow';
export declare abstract class RdsFindWorkflow<Entity> extends BaseRdsWorkflow<Entity> implements IRdsFindWorkflow<Entity> {
    protected sequelizeOptionParser: IParser<FindOptions>;
    constructor(sequelizeOptionParser: IParser<FindOptions>);
    execute(criteria?: ICriteria): Promise<Entity[]>;
    protected parseSequelizeOptions(rawOptions: any): FindOptions;
}
