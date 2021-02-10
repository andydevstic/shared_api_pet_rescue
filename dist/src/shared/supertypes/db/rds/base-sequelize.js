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
exports.SequelizeAdapter = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const inversify_1 = require("inversify");
const constants_1 = require("@src.shared/shared/constants");
let SequelizeAdapter = class SequelizeAdapter {
    constructor(sequelizeOptions) {
        if (!sequelizeOptions) {
            throw new Error('Missing sequelize options');
        }
        this._connection = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, sequelizeOptions), { operatorsAliases: constants_1.SEQUELIZE_OPERATOR_ALIASES }));
    }
    createTransaction(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelizeTransaction = yield this._connection.transaction(options);
            return sequelizeTransaction;
        });
    }
    getConnection() {
        return this._connection;
    }
};
SequelizeAdapter = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object])
], SequelizeAdapter);
exports.SequelizeAdapter = SequelizeAdapter;
