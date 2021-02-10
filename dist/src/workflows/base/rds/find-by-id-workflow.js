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
exports.RdsFindByIdWorkflow = void 0;
const inversify_1 = require("inversify");
const errors_1 = require("@src.shared/shared/errors");
const constants_1 = require("@src.shared/shared/constants");
let RdsFindByIdWorkflow = class RdsFindByIdWorkflow {
    constructor(sequelizeOptionParser, tableGateWayRegistry) {
        this.sequelizeOptionParser = sequelizeOptionParser;
        this.tableGateWayRegistry = tableGateWayRegistry;
        this.idFieldName = 'id';
    }
    execute(id, criteria = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transaction } = criteria, findCriteria = __rest(criteria, ["transaction"]);
            this.addFilterById(id, findCriteria);
            const parsedCriteria = this.parseSequelizeOptions(findCriteria);
            const tableDataGateway = this.tableGateWayRegistry.getClass(this.tableGatewayName, constants_1.GatewayTypes.READ);
            const entity = yield tableDataGateway.findOne(Object.assign(Object.assign({}, parsedCriteria), { transaction, raw: true }));
            if (!entity) {
                throw new errors_1.BadRequestError('Resource not found');
            }
            return entity;
        });
    }
    addFilterById(entityId, userFindCriteria) {
        const filters = userFindCriteria.filters || [];
        filters.push({
            code: this.idFieldName,
            operator: constants_1.FILTER_OPERATORS.EQUALS,
            value: [entityId],
        });
        userFindCriteria.filters = filters;
        return userFindCriteria;
    }
    parseSequelizeOptions(rawOptions) {
        return this.sequelizeOptionParser.parse(rawOptions);
    }
};
RdsFindByIdWorkflow = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object, Object])
], RdsFindByIdWorkflow);
exports.RdsFindByIdWorkflow = RdsFindByIdWorkflow;
