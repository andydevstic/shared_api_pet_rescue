"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbAdapter = void 0;
const mongoose_1 = require("mongoose");
class MongoDbAdapter {
    constructor(config) {
        this.config = config;
        if (!this.config) {
            throw new Error('Missing mongodb config');
        }
        this.connection = new mongoose_1.Mongoose(this.config);
    }
    getConnection() {
        return this.connection;
    }
}
exports.MongoDbAdapter = MongoDbAdapter;
