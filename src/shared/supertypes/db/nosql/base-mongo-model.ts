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
    this._schema.statics.deleteById = this._schema.statics.findByIdAndDelete;
    this._schema.statics.updateById = this._schema.statics.findByIdAndUpdate;
    this._schema.statics.countAll = this._schema.statics.countDocuments;
    this._schema.statics.estimatedCount = this._schema.statics.estimatedDocumentCount;
    this._schema.statics.paginate = function(limit: number, offset: number, options?: any) {
      return this.find(options).skip(offset || 0).limit(limit);
    }
  }
}
