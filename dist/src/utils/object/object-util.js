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
let ObjectUtil = class ObjectUtil {
    groupPropertyValueOfArray(array, propsName) {
        const hashMap = new Map();
        array.forEach((element) => {
            const propertyValue = element[propsName];
            if (propertyValue === undefined) {
                return;
            }
            const isPropExistInHash = hashMap.get(propertyValue);
            if (isPropExistInHash) {
                return;
            }
            hashMap.set(propertyValue, true);
        });
        return Array.from(hashMap.keys());
    }
};
ObjectUtil = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.UTIL, constants_1.SHARED_PROVIDER_NAMES.OBJECT)
], ObjectUtil);
exports.ObjectUtil = ObjectUtil;
