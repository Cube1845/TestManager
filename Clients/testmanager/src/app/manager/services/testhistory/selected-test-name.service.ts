import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedTestNameService {
  private selectedTestName: string = '';

  getSelectedTestName(): string {
    return this.selectedTestName;
  }

  setSelectedTestName(testName: string): void {
    this.selectedTestName = testName;
  }
}
