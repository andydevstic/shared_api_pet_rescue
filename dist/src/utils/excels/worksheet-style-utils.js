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
const worksheet_style_wrapper_1 = require("./worksheet-style-wrapper");
let WorksheetStyleUtil = class WorksheetStyleUtil {
    formatCell() {
        const newStyleWrapper = new worksheet_style_wrapper_1.WorksheetStyleWrapper();
        return newStyleWrapper;
    }
};
WorksheetStyleUtil = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.UTIL, constants_1.SHARED_PROVIDER_NAMES.EXCEL_STYLE)
], WorksheetStyleUtil);
exports.WorksheetStyleUtil = WorksheetStyleUtil;
