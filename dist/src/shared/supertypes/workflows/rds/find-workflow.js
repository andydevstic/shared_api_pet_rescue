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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RdsFindWorkflow = void 0;
const inversify_1 = require("inversify");
const base_rds_workflow_1 = require("./base-rds-workflow");
let RdsFindWorkflow = class RdsFindWorkflow extends base_rds_workflow_1.BaseRdsWorkflow {
    constructor(sequelizeOptionParser) {
        super();
        this.sequelizeOptionParser = sequelizeOptionParser;
    }
    execute(criteria = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transaction } = criteria, findCriteria = __rest(criteria, ["transaction"]);
            const parsedCriteria = this.parseSequelizeOptions(findCriteria);
            const entities = yield this.repository.findAll(Object.assign(Object.assign({}, parsedCriteria), { transaction, raw: true }));
            return entities;
        });
    }
    parseSequelizeOptions(rawOptions) {
        return this.sequelizeOptionParser.parse(rawOptions);
    }
};
RdsFindWorkflow = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object])
], RdsFindWorkflow);
exports.RdsFindWorkflow = RdsFindWorkflow;