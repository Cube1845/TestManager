import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedTestNameSessionService {
  getSelectedTestName(): string {
    return sessionStorage.getItem('selectedTestName')!;
  }

  setSelectedTestName(testName: string): void {
    sessionStorage.setItem('selectedTestName', testName);
  }
}
