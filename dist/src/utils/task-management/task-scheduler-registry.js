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
exports.TaskSchedulerRegistry = void 0;
const decorators_1 = require("@src.shared/infra/ioc/decorators");
const constants_1 = require("@src.shared/shared/constants");
const inversify_1 = require("inversify");
let TaskSchedulerRegistry = class TaskSchedulerRegistry {
    constructor(taskSchedulerFactory) {
        this.taskSchedulerFactory = taskSchedulerFactory;
        this._savedScheduledTasks = new Map();
    }
    getInstance(taskName, scheduleRule) {
        const taskHashKey = this.getScheduleTaskHashKey(taskName, scheduleRule);
        const savedScheduledTask = this._savedScheduledTasks.get(taskHashKey);
        if (savedScheduledTask) {
            return savedScheduledTask;
        }
        const taskScheduler = this.taskSchedulerFactory.createInstance(scheduleRule);
        this._savedScheduledTasks.set(taskHashKey, taskScheduler);
        return taskScheduler;
    }
    isTaskExist(taskName, scheduleRule) {
        const taskHashKey = this.getScheduleTaskHashKey(taskName, scheduleRule);
        return !!this._savedScheduledTasks.get(taskHashKey);
    }
    getScheduleTaskHashKey(taskName, scheduleRule) {
        return `${taskName}_${scheduleRule}`;
    }
};
TaskSchedulerRegistry = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.REGISTRY, constants_1.SHARED_PROVIDER_NAMES.SCHEDULED_TASK),
    __param(0, inversify_1.inject(constants_1.SHARED_PROVIDER_TYPES.FACTORY)),
    __param(0, inversify_1.named(constants_1.SHARED_PROVIDER_NAMES.TASK_SCHEDULER)),
    __metadata("design:paramtypes", [Object])
], TaskSchedulerRegistry);
exports.TaskSchedulerRegistry = TaskSchedulerRegistry;
