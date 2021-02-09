/// <reference types="node" />
import { IExcelUtil } from "@src.shared/shared/interfaces";
import { AddWorksheetOptions, Workbook, Buffer } from 'exceljs';
import * as stream from 'stream';
import { WorksheetUtil } from "./worksheet-utils";
export declare class ExcelUtil implements IExcelUtil {
    protected workbook: Workbook;
    protected workSheetMap: Map<string, WorksheetUtil>;
    loadTemplate(templatePath: string): Promise<IExcelUtil>;
    addWorkSheet(workSheetName: string, options?: Partial<AddWorksheetOptions>): WorksheetUtil;
    getWorkSheet(workSheetName: string): WorksheetUtil;
    writeToStream(readStream: stream.Stream): Promise<void>;
    writeToFile(path: string): Promise<void>;
    write(stream: stream.Stream): Promise<void>;
    writeToBuffer(): Promise<Buffer>;
    removeWorkSheet(worksheet: WorksheetUtil): void;
    protected throwIfTemplateNotLoaded(): void;
}
