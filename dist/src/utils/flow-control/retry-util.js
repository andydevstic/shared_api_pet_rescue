"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
let RetryUtil = class RetryUtil {
    constructor() {
        this.taskRegistry = new Map();
    }
    retryIfFail(task, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalRetryCount = config.retryTimes || 3;
            for (let retriedCount = 0; retriedCount < totalRetryCount; retriedCount += 1) {
                try {
                    return task();
                }
                catch (error) {
                    if (retriedCount !== totalRetryCount) {
                        yield this.sleep(config.interval);
                    }
                    throw error;
                }
            }
        });
    }
    retryConstantly(task, interval = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskReturnValue;
            while (!taskReturnValue) {
                try {
                    taskReturnValue = yield task();
                    return taskReturnValue;
                }
                catch (error) {
                    yield this.sleep(interval);
                }
            }
        });
    }
    sleep(timeInMilliseconds = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeInMilliseconds);
        });
    }
};
RetryUtil = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.UTIL, constants_1.SHARED_PROVIDER_NAMES.RETRY)
], RetryUtil);
exports.RetryUtil = RetryUtil;
