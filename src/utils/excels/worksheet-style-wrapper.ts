import { EXCEL_FONTS } from "@src.shared/shared/constants";
import { ICellOptions, IWorksheetStyleWrapper } from "@src.shared/shared/interfaces";
import { Alignment, Border, Font } from "exceljs";

export class WorksheetStyleWrapper implements IWorksheetStyleWrapper {
  protected cellStyle: ICellOptions = {};

  protected get style() {
    this.cellStyle.style = this.cellStyle.style || {};

    return this.cellStyle.style;
  }

  protected get border() {
    this.cellStyle.border = this.cellStyle.border || {};

    return this.cellStyle.border;
  }
  

  public setAlignment(alignment: Partial<Alignment>): IWorksheetStyleWrapper {
    this.style.alignment = alignment;

    return this;
  }

  public wrapBorderAroundCell(option?: Partial<Border>): IWorksheetStyleWrapper {
    return this.setBorder(option, option, option, option);
  }

  public setBorder(up?: Partial<Border>, right?: Partial<Border>, down?: Partial<Border>, left?: Partial<Border>): IWorksheetStyleWrapper {
    if (up) { this.border.top = up; }
    if (right) { this.border.right = right; }
    if (down) { this.border.bottom = down; }
    if (left) { this.border.left = left; }

    return this;
  }

  public setCellFont(desiredFont: EXCEL_FONTS, fontOptions?: Partial<Font>): IWorksheetStyleWrapper {
    this.style.font = {
      name: desiredFont,
      ...fontOptions,
    }

    return this;
  }

  public apply(): Partial<ICellOptions> {
    return this.cellStyle;
  }
}