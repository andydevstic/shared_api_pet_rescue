import { Schema } from "mongoose";
export declare abstract class MongoModel {
    isHasIncrementId: boolean;
    startIdNumber: number;
    protected _schema: Schema;
    constructor();
    abstract get modelName(): string;
    get schema(): Schema;
    protected abstract initSchema(): void;
    protected registerOwnMethods(): void;
}
