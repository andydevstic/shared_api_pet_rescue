"use strict";
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
const typeorm_1 = require("typeorm");
class BaseTypeOrmAdapter {
    constructor(options, logger) {
        this.logger = logger;
        if (!options.name) {
            throw new Error('Missing database connection name');
        }
        this.connectionName = options.name;
        typeorm_1.createConnection(options)
            .then(connection => this._connection = connection)
            .catch((error) => {
            this.logger.error(`Can't connect to database ${options.name}`, error);
        });
    }
    createTransactionBox(callback, isolationLevel = 'READ COMMITTED') {
        return __awaiter(this, void 0, void 0, function* () {
            return typeorm_1.getManager(this.connectionName).transaction(isolationLevel, callback);
        });
    }
    getConnection() {
        return this._connection;
    }
}
exports.BaseTypeOrmAdapter = BaseTypeOrmAdapter;
