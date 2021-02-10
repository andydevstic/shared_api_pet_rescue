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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemmoryGatewayRegistry = void 0;
const inversify_1 = require("inversify");
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const errors_1 = require("@src.shared/shared/errors");
const redis_1 = require("./redis");
let InMemmoryGatewayRegistry = class InMemmoryGatewayRegistry {
    constructor(redisReadAdapter, redisWriteAdapter) {
        const redisReadConn = redisReadAdapter.getConnection();
        const redisWriteConn = redisWriteAdapter.getConnection();
        this.initReadConnections(redisReadConn);
        this.initWriteConnections(redisWriteConn);
    }
    getClass(identifier, type) {
        switch (identifier) {
            case constants_1.InMemmoryGatewayNames.AUTH_TOKEN:
                return type === constants_1.GatewayTypes.WRITE
                    ? this.authTokenWriteConn
                    : this.authTokenReadConn;
            default:
                throw new errors_1.InternalServerError('Inmemmory gateway not found');
        }
    }
    initReadConnections(redisReadConn) {
        this.authTokenReadConn = new redis_1.AuthTokenReadRedisGateway(redisReadConn);
    }
    initWriteConnections(redisWriteConn) {
        this.authTokenWriteConn = new redis_1.AuthTokenWriteRedisGateway(redisWriteConn);
    }
};
InMemmoryGatewayRegistry = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.REGISTRY, constants_1.SHARED_PROVIDER_NAMES.INMEMMORY_GATEWAY),
    __param(0, inversify_1.inject(constants_1.SHARED_PROVIDER_TYPES.ADAPTER)),
    __param(0, inversify_1.named(constants_1.SHARED_PROVIDER_NAMES.REDIS_READ)),
    __param(1, inversify_1.inject(constants_1.SHARED_PROVIDER_TYPES.ADAPTER)),
    __param(1, inversify_1.named(constants_1.SHARED_PROVIDER_NAMES.REDIS_WRITE)),
    __metadata("design:paramtypes", [Object, Object])
], InMemmoryGatewayRegistry);
exports.InMemmoryGatewayRegistry = InMemmoryGatewayRegistry;
