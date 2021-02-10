"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchedulerFactory = void 0;
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const schedulers_1 = require("./schedulers");
let TaskSchedulerFactory = class TaskSchedulerFactory {
    createInstance(schedulerRule) {
        switch (schedulerRule) {
            case constants_1.TASK_SCHEDULER_RULES.MIN_3_MAX_5:
                return new schedulers_1.BottleneckTaskScheduler({
                    tasksPerSecond: 3,
                    maxConcurrent: 5,
                });
            case constants_1.TASK_SCHEDULER_RULES.MIN_5_MAX_10:
                return new schedulers_1.BottleneckTaskScheduler({
                    tasksPerSecond: 5,
                    maxConcurrent: 10,
                });
            default:
                throw new Error(`Task scheduler rule ${schedulerRule} not found.`);
        }
    }
};
TaskSchedulerFactory = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.FACTORY, constants_1.SHARED_PROVIDER_NAMES.TASK_SCHEDULER)
], TaskSchedulerFactory);
exports.TaskSchedulerFactory = TaskSchedulerFactory;
