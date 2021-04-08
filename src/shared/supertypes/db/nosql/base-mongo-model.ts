import { injectable } from "inversify";
import { Schema } from "mongoose";

@injectable()
export abstract class MongoModel {
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
    this._schema.statics.deleteById = function(...args: any[]) { return this.findByIdAndDelete(...args)};
    this._schema.statics.updateById = function(...args: any[]) { return this.findByIdAndUpdate(...args)};
    this._schema.statics.count = function(...args: any[]) { return this.countDocuments(...args)};
    this._schema.statics.paginate = function(limit: number, offset: number, options?: any, projections?: string[]) {
      return this.find(options, projections).skip(offset || 0).limit(limit);
    }
  }
}
