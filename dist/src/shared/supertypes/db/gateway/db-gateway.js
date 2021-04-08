"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseGateway = void 0;
const constants_1 = require("@src.shared/shared/constants");
const inversify_1 = require("inversify");
let DatabaseGateway = class DatabaseGateway {
    constructor() {
        this.connectionMap = new Map();
    }
    getConnection(dbName, connectionType) {
        let hashKey;
        const readHashKey = this.getConnectionHashKey(dbName, constants_1.DB_CONNECTION_TYPES.READ);
        if (this.connectionMap.has(readHashKey)) {
            hashKey = readHashKey;
        }
        const writeHashKey = this.getConnectionHashKey(dbName, constants_1.DB_CONNECTION_TYPES.WRITE);
        if (this.connectionMap.has(writeHashKey)) {
            hashKey = writeHashKey;
        }
        const defaultHashKey = this.getConnectionHashKey(dbName, connectionType);
        if (this.connectionMap.has(defaultHashKey)) {
            hashKey = defaultHashKey;
        }
        if (hashKey) {
            const dbConnection = this.connectionMap.get(hashKey);
            return dbConnection;
        }
        throw new Error(`Connection for hash key ${hashKey} not exist`);
    }
    registerConnection(dbName, connection, connectionType) {
        const connectionHashKey = this.getConnectionHashKey(dbName, connectionType);
        this.connectionMap.set(connectionHashKey, connection);
    }
    getConnectionHashKey(dbName, connectionType) {
        return `${dbName}_${connectionType || 'default'}`;
    }
};
DatabaseGateway = __decorate([
    inversify_1.injectable()
], DatabaseGateway);
exports.DatabaseGateway = DatabaseGateway;
