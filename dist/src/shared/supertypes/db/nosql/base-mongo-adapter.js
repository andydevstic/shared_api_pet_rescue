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
exports.MongoDbAdapter = void 0;
const inversify_1 = require("inversify");
const mongoose = require("mongoose");
let MongoDbAdapter = class MongoDbAdapter {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.isConnected = false;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config) {
                throw new Error('Missing mongodb config');
            }
            const { host, port, username, password, database } = this.config;
            try {
                const uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;
                const connection = yield mongoose.connect(uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                });
                this._connection = connection;
                this.isConnected = true;
                this.logger.info(`Connected to mongodb ${host}:${port} successfully!`);
            }
            catch (error) {
                this.logger.error(`Failed to connect to mongodb ${host}:${port}`, error);
                process.exit(1);
            }
        });
    }
    getConnection() {
        if (!this.isConnected) {
            throw new Error('Mongo is not connected. Please connect before using');
        }
        return this._connection;
    }
};
MongoDbAdapter = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object, Object])
], MongoDbAdapter);
exports.MongoDbAdapter = MongoDbAdapter;
