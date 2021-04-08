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
    this._schema.statics.deleteOne = this._schema.statics.deleteOne;
    this._schema.statics.updateById = this._schema.statics.findByIdAndUpdate;
    this._schema.statics.updateOne = this._schema.statics.updateOne;
    this._schema.statics.findOneAndUpdate = this._schema.statics.findOneAndUpdate;
    this._schema.statics.findAndCountAll = async function(...args) {
      const countResult = await this.count(...args);
      const docs = await this.find(...args);

      return {
        docs,
        totalCount: countResult,
      };
    }
  }

  // protected findAndCountAll(options: any): Promise<FindAndCountAllResult> {
  //   const model = this as any;

  //   return new Promise((resolve, reject) => {
  //     model.count(options, (countError: Error, count: number) => {
  //       if (countError) { return reject(countError); }
  
  //       model.find(options, (findError: Error, findData: any[]) => {
  //         if (findError) { return reject(findError); }
  
  //         resolve({
  //           docs: findData,
  //           totalCount: count,
  //         });
  //       });
  //     });
  //   });
  // }
}
