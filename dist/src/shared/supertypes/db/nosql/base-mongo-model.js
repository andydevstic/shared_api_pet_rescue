"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoModel = void 0;
const inversify_1 = require("inversify");
let MongoModel = class MongoModel {
    constructor() {
        this.isHasIncrementId = true;
        this.startIdNumber = 1;
        this.initSchema();
        this.registerOwnMethods();
    }
    get schema() {
        return this._schema;
    }
    registerOwnMethods() {
        this._schema.statics.findById = function (id, ...args) { return this.findOne({ id }, ...args); };
        this._schema.statics.findByObjectId = function (objectId, ...args) { return this.findById(objectId, ...args); };
        this._schema.statics.deleteById = function (id, ...args) { return this.findOneAndDelete({ id }, ...args); };
        this._schema.statics.deleteByObjectId = function (objectId, ...args) { return this.findByIdAndDelete(objectId, ...args); };
        this._schema.statics.updateById = function (id, ...args) { return this.findOneAndUpdate({ id }, ...args); };
        this._schema.statics.updateByObjectId = function (objectId, ...args) { return this.findByIdAndUpdate(objectId, ...args); };
        this._schema.statics.count = function (...args) { return this.countDocuments(...args); };
        this._schema.statics.paginate = function (limit, offset, options, projections) {
            return this.find(options, projections).skip(offset || 0).limit(limit);
        };
    }
};
MongoModel = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], MongoModel);
exports.MongoModel = MongoModel;
