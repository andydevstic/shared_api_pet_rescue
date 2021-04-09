import { injectable } from "inversify";
import { Schema } from "mongoose";

@injectable()
export abstract class MongoModel {
  public isHasIncrementId = true;
  public startIdNumber = 1;

  protected _schema: Schema;

  constructor() {
    this.initSchema();
    this.registerOwnMethods();
  }

  public abstract get modelName(): string;

  public get schema(): Schema {
    return this._schema;
  }

  protected abstract initSchema(): void;

  protected registerOwnMethods(): void {
    this._schema.statics.findById = function(id: any, ...args: any[]) { return this.findOne({ id }, ...args)};
    this._schema.statics.findByObjectId = function(objectId: any, ...args: any[]) { return this.findById(objectId, ...args)};

    this._schema.statics.deleteById = function(id: any, ...args: any[]) { return this.findOneAndDelete({ id }, ...args)};
    this._schema.statics.deleteByObjectId = function(objectId: any, ...args: any[]) { return this.findByIdAndDelete(objectId, ...args)};

    this._schema.statics.updateById = function(id: any, ...args: any[]) { return this.findOneAndUpdate({ id }, ...args)};
    this._schema.statics.updateByObjectId = function(objectId, ...args: any[]) { return this.findByIdAndUpdate(objectId, ...args)};

    this._schema.statics.count = function(...args: any[]) { return this.countDocuments(...args)};
    this._schema.statics.paginate = function(limit: number, offset: number, options?: any, projections?: string[]) {
      return this.find(options, projections).skip(offset || 0).limit(limit);
    }
  }
}
