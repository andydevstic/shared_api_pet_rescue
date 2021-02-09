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
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const channel_1 = require("./channel");
const client_1 = require("./client");
let RabbitMqClientRegistry = class RabbitMqClientRegistry {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.connectionMap = new Map();
        this.channelMap = new Map();
        const rabbitMqConfigs = config.get('rabbitmq.connections');
        Promise
            .all(rabbitMqConfigs.map(rabbitMqConfig => this.initRabbitMqConnection(rabbitMqConfig)))
            .catch((error) => {
            this.logger.error(`Failed to connect to rabbitMq cluster`, error);
        });
    }
    initRabbitMqConnection(rabbitMqConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const { connectionName } = rabbitMqConfig;
            const connection = new client_1.RabbitMqClient(rabbitMqConfig, this.logger);
            yield connection.tryConnect();
            this.connectionMap.set(connectionName, connection);
            return;
        });
    }
    getClass(connectionName, channelName) {
        const client = this.connectionMap.get(connectionName);
        if (!client) {
            throw new Error(`Connection name ${connectionName} not configured!`);
        }
        const channel = this.channelMap.get(channelName);
        if (channel) {
            return channel;
        }
        const newChannel = new channel_1.RabbitMQChannel(this.logger, client.connection, channelName);
        this.channelMap.set(channelName, newChannel);
        return newChannel;
    }
};
RabbitMqClientRegistry = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.REGISTRY, constants_1.SHARED_PROVIDER_NAMES.RABBITMQ_CLIENT),
    __metadata("design:paramtypes", [Object, Object])
], RabbitMqClientRegistry);
exports.RabbitMqClientRegistry = RabbitMqClientRegistry;
