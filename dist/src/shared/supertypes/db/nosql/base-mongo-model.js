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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoModel = void 0;
const inversify_1 = require("inversify");
let MongoModel = class MongoModel {
    constructor() {
        this.initSchema();
        this.registerOwnMethods();
    }
    get schema() {
        return this._schema;
    }
    registerOwnMethods() {
        this._schema.statics.deleteById = this._schema.statics.findByIdAndDelete;
        this._schema.statics.deleteOne = this._schema.statics.deleteOne;
        this._schema.statics.updateById = this._schema.statics.findByIdAndUpdate;
        this._schema.statics.updateOne = this._schema.statics.updateOne;
        this._schema.statics.findOneAndUpdate = this._schema.statics.findOneAndUpdate;
        this._schema.statics.findAndCountAll = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                const countResult = yield this.count(...args);
                const docs = yield this.find(...args);
                return {
                    docs,
                    totalCount: countResult,
                };
            });
        };
    }
};
MongoModel = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], MongoModel);
exports.MongoModel = MongoModel;
