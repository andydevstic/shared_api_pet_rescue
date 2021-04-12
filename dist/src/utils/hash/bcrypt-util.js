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
exports.BcryptUtil = void 0;
const bcrypt_1 = require("bcrypt");
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const inversify_1 = require("inversify");
let BcryptUtil = class BcryptUtil {
    constructor(config) {
        const bcryptConfig = config.get('bcrypt');
        if (!bcryptConfig) {
            throw new Error('Missing bcrypt hash config');
        }
        this.saltRounds = bcryptConfig && bcryptConfig.saltRounds || 8;
    }
    hash(data) {
        return new Promise((resolve, reject) => {
            bcrypt_1.genSalt(this.saltRounds, (error, salt) => {
                if (error) {
                    return reject(error);
                }
                bcrypt_1.hash(data, salt, (error, encrypted) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(encrypted);
                });
            });
        });
    }
    verify(rawData, encryptedData) {
        return new Promise((resolve, reject) => {
            bcrypt_1.compare(rawData, encryptedData, (error, isMatch) => {
                if (error) {
                    return reject(error);
                }
                resolve(isMatch);
            });
        });
    }
};
BcryptUtil = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.UTIL, constants_1.SHARED_PROVIDER_NAMES.BCRYPT),
    __param(0, inversify_1.inject(constants_1.SHARED_PROVIDER_TYPES.CONFIG)),
    __metadata("design:paramtypes", [Object])
], BcryptUtil);
exports.BcryptUtil = BcryptUtil;
