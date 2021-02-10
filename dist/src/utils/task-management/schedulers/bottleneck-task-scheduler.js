"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottleneckTaskScheduler = void 0;
// tslint:disable-next-line:import-name
const bottleneck_1 = require("bottleneck");
class BottleneckTaskScheduler {
    constructor(config) {
        this.config = config;
        const { tasksPerSecond, maxConcurrent } = this.config;
        const bottleneck = new bottleneck_1.default({
            maxConcurrent,
            minTime: 1000 / tasksPerSecond,
            clearDatastore: true,
        });
        this.taskScheduler = bottleneck;
    }
    run(taskFn) {
        return this.taskScheduler.schedule(taskFn);
    }
}
exports.BottleneckTaskScheduler = BottleneckTaskScheduler;
