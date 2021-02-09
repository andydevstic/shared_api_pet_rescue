"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorksheetUtil {
    constructor(worksheet) {
        this.worksheet = worksheet;
        this.isAlive = true;
        this.id = worksheet.id;
    }
    markRemoved() {
        this.isAlive = false;
    }
    rename(newName) {
        this.worksheet.name = newName;
    }
    setRowHeight(rowNumber, height) {
        const row = this.getRow(rowNumber);
        row.height = height;
    }
    setColumnSize(columnName, width) {
        const column = this.getColumn(columnName);
        column.width = width;
    }
    writeCellByAddress(cellAddress, cellData) {
        const targetCell = this.worksheet.getCell(cellAddress);
        this.writeCell(targetCell, cellData);
        return targetCell;
    }
    writeRow(rowNumber, startColumnNumber, writeData) {
        const emptyArrayWithLength = Array(startColumnNumber);
        const rowData = emptyArrayWithLength.concat(writeData);
        const newRow = this.worksheet.insertRow(rowNumber, rowData, 'o');
        newRow.commit();
        return newRow;
    }
    duplicateRow(rowNumber, amount = 1, insert = true) {
        this.worksheet.duplicateRow(rowNumber, amount, insert);
    }
    mergeCells(startCellName, endCellName, ignoreStyle) {
        this.throwIfNotAlive();
        return this.worksheet.mergeCells(`${startCellName}:${endCellName}`);
    }
    getRow(rowNumber1Based) {
        this.throwIfNotAlive();
        return this.worksheet.getRow(rowNumber1Based);
    }
    commit() {
        this.worksheet.commit();
    }
    applyOptionsToCell(cell, options) {
        const { style, border } = options;
        if (style) {
            cell.style = style;
        }
        if (border) {
            cell.border = border;
        }
    }
    writeCell(cell, cellData) {
        const { value, options } = cellData;
        cell.value = value;
        if (options) {
            this.applyOptionsToCell(cell, options);
        }
    }
    getColumn(columnName) {
        this.throwIfNotAlive();
        return this.worksheet.getColumn(columnName);
    }
    throwIfNotAlive() {
        if (this.isAlive) {
            return;
        }
        throw new Error('Worksheet has been destroyed.');
    }
}
exports.WorksheetUtil = WorksheetUtil;
