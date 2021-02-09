"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
let NumberParser = class NumberParser {
    tryParseOrZero(rawData) {
        const tryParsed = Number(rawData);
        if (isNaN(tryParsed)) {
            return 0;
        }
        return tryParsed;
    }
    tryParsePercentageOrZero(rawPercentage) {
        const numberPortionOfPercentage = rawPercentage.split('%')[0];
        return this.tryParseOrZero(numberPortionOfPercentage) / 100;
    }
};
NumberParser = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.PARSER, constants_1.SHARED_PROVIDER_NAMES.NUMBER)
], NumberParser);
exports.NumberParser = NumberParser;
