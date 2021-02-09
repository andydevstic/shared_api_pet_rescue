"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorksheetStyleWrapper {
    constructor() {
        this.cellStyle = {};
    }
    get style() {
        this.cellStyle.style = this.cellStyle.style || {};
        return this.cellStyle.style;
    }
    get border() {
        this.cellStyle.border = this.cellStyle.border || {};
        return this.cellStyle.border;
    }
    setAlignment(alignment) {
        this.style.alignment = alignment;
        return this;
    }
    wrapBorderAroundCell(option) {
        return this.setBorder(option, option, option, option);
    }
    setBorder(up, right, down, left) {
        if (up) {
            this.border.top = up;
        }
        if (right) {
            this.border.right = right;
        }
        if (down) {
            this.border.bottom = down;
        }
        if (left) {
            this.border.left = left;
        }
        return this;
    }
    setCellFont(desiredFont, fontOptions) {
        this.style.font = Object.assign({ name: desiredFont }, fontOptions);
        return this;
    }
    apply() {
        return this.cellStyle;
    }
}
exports.WorksheetStyleWrapper = WorksheetStyleWrapper;
