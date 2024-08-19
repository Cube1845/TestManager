import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnswerTileColorService {
  private hoveredAnswerTileIndex: number;
  private selectedTileIndex: number;

  constructor() {
    this.hoveredAnswerTileIndex = -1;
    this.selectedTileIndex = -1;
  }

  setHoveredAnswerTile(index: number): void {
    this.hoveredAnswerTileIndex = index;
  }

  setSelectedTile(index: number): void {
    this.selectedTileIndex = index;
  }

  private isAnswerTileSelected(index: number) {
    return this.selectedTileIndex == index;
  }

  private getAnswerTileSelectedColor(index: number) {
    return '#314860';
  }

  private getAnswerTileHoveredColor(index: number) {
    return '#2C435B';
  }

  private getAnswerTileColor(index: number) {
    return '#243B53';
  }

  getValidColor(index: number) {
    if (this.isAnswerTileSelected(index)) {
      return this.getAnswerTileSelectedColor(index);
    } else {
      if (this.hoveredAnswerTileIndex === index) {
        return this.getAnswerTileHoveredColor(index);
      } else {
        return this.getAnswerTileColor(index);
      }
    }
  }
}
