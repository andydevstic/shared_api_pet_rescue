import { EXCEL_FONTS } from "@src.shared/shared/constants";
import { ICellOptions, IWorksheetStyleWrapper } from "@src.shared/shared/interfaces";
import { Alignment, Border, Font } from "exceljs";
export declare class WorksheetStyleWrapper implements IWorksheetStyleWrapper {
    protected cellStyle: ICellOptions;
    protected get style(): Partial<import("exceljs").Style>;
    protected get border(): Partial<import("exceljs").Borders>;
    setAlignment(alignment: Partial<Alignment>): IWorksheetStyleWrapper;
    wrapBorderAroundCell(option?: Partial<Border>): IWorksheetStyleWrapper;
    setBorder(up?: Partial<Border>, right?: Partial<Border>, down?: Partial<Border>, left?: Partial<Border>): IWorksheetStyleWrapper;
    setCellFont(desiredFont: EXCEL_FONTS, fontOptions?: Partial<Font>): IWorksheetStyleWrapper;
    apply(): Partial<ICellOptions>;
}
