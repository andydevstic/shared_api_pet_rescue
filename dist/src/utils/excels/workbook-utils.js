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
const exceljs_1 = require("exceljs");
const worksheet_utils_1 = require("./worksheet-utils");
let ExcelUtil = class ExcelUtil {
    constructor() {
        this.workSheetMap = new Map();
    }
    loadTemplate(templatePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!templatePath) {
                    throw new Error('Missing excel template path');
                }
                const newWorkbook = new exceljs_1.Workbook();
                this.workbook = yield newWorkbook.xlsx.readFile(templatePath);
                return this;
            }
            catch (error) {
                throw new Error(`Error loading excel template: ${error.message}`);
            }
        });
    }
    addWorkSheet(workSheetName, options) {
        const newWorksheet = this.workbook.addWorksheet(workSheetName, options);
        const wrappedWorksheet = new worksheet_utils_1.WorksheetUtil(newWorksheet);
        this.workSheetMap.set(workSheetName, wrappedWorksheet);
        return wrappedWorksheet;
    }
    getWorkSheet(workSheetName) {
        const worksheet = this.workbook.getWorksheet(workSheetName);
        if (worksheet) {
            const newWorkSheetUtil = new worksheet_utils_1.WorksheetUtil(worksheet);
            this.workSheetMap.set(workSheetName, newWorkSheetUtil);
            return newWorkSheetUtil;
        }
        return this.addWorkSheet(workSheetName);
    }
    writeToStream(readStream) {
        return this.workbook.xlsx.write(readStream);
    }
    writeToFile(path) {
        return this.workbook.xlsx.writeFile(path);
    }
    write(stream) {
        return this.writeToStream(stream);
    }
    writeToBuffer() {
        return this.workbook.xlsx.writeBuffer();
    }
    removeWorkSheet(worksheet) {
        worksheet.markRemoved();
        return this.workbook.removeWorksheet(worksheet.id);
    }
    throwIfTemplateNotLoaded() {
        if (this.workbook) {
            return;
        }
        throw new Error('Template not loaded. Please load template.');
    }
};
ExcelUtil = __decorate([
    decorators_1.provideSingletonNamed(constants_1.SHARED_PROVIDER_TYPES.UTIL, constants_1.SHARED_PROVIDER_NAMES.EXCEL)
], ExcelUtil);
exports.ExcelUtil = ExcelUtil;
