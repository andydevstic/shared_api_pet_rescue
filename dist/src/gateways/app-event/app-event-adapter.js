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
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const events_1 = require("events");
const constants_1 = require("@src.shared/shared/constants");
const inversify_1 = require("inversify");
let AppEventProxy = class AppEventProxy {
    constructor(eventTranslator) {
        this.eventTranslator = eventTranslator;
        this.eventEmitter = new events_1.EventEmitter();
    }
    setEventEmitter(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    emitEvent(eventName, payload) {
        const translatedEvents = this.eventTranslator.translate(eventName);
        translatedEvents.forEach((translatedEvent) => {
            const emissionResult = this.eventEmitter.emit(translatedEvent, payload);
            if (!emissionResult) {
                throw new Error(`Failed to emit event ${translatedEvent}`);
            }
        });
    }
    subscribeToEvent(eventName, handler) {
        this.eventEmitter.on(eventName, handler);
        return {
            unsubscribe: () => {
                this.eventEmitter.removeListener(eventName, handler);
            }
        };
    }
};
AppEventProxy = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.PROXY, constants_1.SHARED_PROVIDER_NAMES.APP_EVENT),
    __param(0, inversify_1.inject(constants_1.SHARED_PROVIDER_TYPES.UTIL)),
    __param(0, inversify_1.named(constants_1.SHARED_PROVIDER_NAMES.EVENT_TRANSLATOR)),
    __metadata("design:paramtypes", [Object])
], AppEventProxy);
exports.AppEventProxy = AppEventProxy;
