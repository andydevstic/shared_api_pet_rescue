import { ICellData, ICellOptions, IWorksheetUtil } from "@src.shared/shared/interfaces";
import { Worksheet, Row, Cell, Column } from 'exceljs';
export declare class WorksheetUtil implements IWorksheetUtil {
    protected worksheet: Worksheet;
    protected isAlive: boolean;
    id: number;
    constructor(worksheet: Worksheet);
    markRemoved(): void;
    rename(newName: string): void;
    setRowHeight(rowNumber: number, height: number): void;
    setColumnSize(columnName: string, width: number): void;
    writeCellByAddress(cellAddress: string, cellData: Partial<ICellData>): Cell;
    writeRow(rowNumber: number, startColumnNumber: number, writeData: any[]): Row;
    duplicateRow(rowNumber: number, amount?: number, insert?: boolean): void;
    mergeCells(startCellName: string, endCellName: string, ignoreStyle?: boolean): void;
    getRow(rowNumber1Based: number): Row;
    commit(): void;
    protected applyOptionsToCell(cell: Cell, options?: ICellOptions): void;
    protected writeCell(cell: Cell, cellData: Partial<ICellData>): void;
    protected getColumn(columnName: string): Partial<Column>;
    protected throwIfNotAlive(): void;
}
