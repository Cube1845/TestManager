import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableColorService {
  private hoveredRow: number;

  constructor() {
    this.hoveredRow = -1;
  }

  setHoveredRow(index: number): void {
    this.hoveredRow = index;
  }

  getHoveredRow(): number {
    return this.hoveredRow;
  }

  isTableRowSelected(index: number, selectedIndex: number) {
    return selectedIndex == index;
  }

  getTableRowSelectedColor(index: number) {
    return '#445B73';
  }

  getTableRowHoveredColor(index: number) {
    return '#344B63';
  }

  getTableRowColor(index: number) {
    return '#243B53';
  }

  getValidColor(index: number, selectedIndex: number) {
    if (this.isTableRowSelected(index, selectedIndex)) {
      return this.getTableRowSelectedColor(index);
    } else {
      if (this.hoveredRow === index) {
        return this.getTableRowHoveredColor(index);
      } else {
        return this.getTableRowColor(index);
      }
    }
  }
}
