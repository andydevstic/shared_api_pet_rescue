"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRdsWorkflow = void 0;
class BaseRdsWorkflow {
    setRepository(repository) {
        this.entityRepository = repository;
        return this;
    }
    get repository() {
        if (!this.repository) {
            throw new Error('Repository not set');
        }
        return this.entityRepository.bind(this.entityRepository);
    }
}
exports.BaseRdsWorkflow = BaseRdsWorkflow;
