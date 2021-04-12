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
exports.JwtUtil = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const inversify_1 = require("inversify");
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
let JwtUtil = class JwtUtil {
    constructor(config) {
        const jwtConfig = config.get('jwt');
        if (!jwtConfig) {
            throw new Error('Missing jwt config');
        }
        this.secret = jwtConfig.secret;
        this.algorithm = jwtConfig.algorithm || 'HS256';
    }
    encode(data, options) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.sign(data, this.secret, Object.assign({ algorithm: this.algorithm }, options), (error, encoded) => {
                if (error) {
                    return reject(error);
                }
                resolve(encoded);
            });
        });
    }
    decode(data) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.verify(data, this.secret, { algorithms: this.algorithm }, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                resolve(decoded);
            });
        });
    }
};
JwtUtil = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.UTIL, constants_1.SHARED_PROVIDER_NAMES.JWT),
    __param(0, inversify_1.inject(constants_1.SHARED_PROVIDER_TYPES.CONFIG)),
    __metadata("design:paramtypes", [Object])
], JwtUtil);
exports.JwtUtil = JwtUtil;
