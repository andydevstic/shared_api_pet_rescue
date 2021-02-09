import { provideSingletonNamed } from "@src.shared/infra/ioc/decorators";
import { SHARED_PROVIDER_NAMES, SHARED_PROVIDER_TYPES } from "@src.shared/shared/constants";
import { IExcelUtil } from "@src.shared/shared/interfaces";
import { AddWorksheetOptions, Workbook, Buffer } from 'exceljs';
import * as stream from 'stream';
import { WorksheetUtil } from "./worksheet-utils";

@provideSingletonNamed(SHARED_PROVIDER_TYPES.UTIL, SHARED_PROVIDER_NAMES.EXCEL)
export class ExcelUtil implements IExcelUtil {
  protected workbook: Workbook;
  protected workSheetMap = new Map() as Map<string, WorksheetUtil>;

  public async loadTemplate(templatePath: string): Promise<IExcelUtil> {
    try {
      if (!templatePath) {
        throw new Error('Missing excel template path');
      }
  
      const newWorkbook = new Workbook();
      this.workbook = await newWorkbook.xlsx.readFile(templatePath);

      return this;
    } catch (error) {
      throw new Error(`Error loading excel template: ${error.message}`);
    }
  }

  public addWorkSheet(workSheetName: string, options?: Partial<AddWorksheetOptions>): WorksheetUtil {
    const newWorksheet = this.workbook.addWorksheet(workSheetName, options);
    const wrappedWorksheet = new WorksheetUtil(newWorksheet);

    this.workSheetMap.set(workSheetName, wrappedWorksheet);

    return wrappedWorksheet;
  }

  public getWorkSheet(workSheetName: string): WorksheetUtil {
    const worksheet = this.workbook.getWorksheet(workSheetName);

    if (worksheet) {
      const newWorkSheetUtil = new WorksheetUtil(worksheet);
      this.workSheetMap.set(workSheetName, newWorkSheetUtil);

      return newWorkSheetUtil;
    }

    return this.addWorkSheet(workSheetName);
  }

  public writeToStream(readStream: stream.Stream): Promise<void> {
    return this.workbook.xlsx.write(readStream);
  }

  public writeToFile(path: string): Promise<void> {
    return this.workbook.xlsx.writeFile(path);
  }

  public write(stream: stream.Stream): Promise<void> {
    return this.writeToStream(stream);
  }

  public writeToBuffer(): Promise<Buffer> {
    return this.workbook.xlsx.writeBuffer();
  }

  public removeWorkSheet(worksheet: WorksheetUtil): void {
    worksheet.markRemoved();
    return this.workbook.removeWorksheet(worksheet.id);
  }

  protected throwIfTemplateNotLoaded(): void {
    if (this.workbook) {
      return;
    }

    throw new Error('Template not loaded. Please load template.');
  }
}