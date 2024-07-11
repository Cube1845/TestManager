import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedTestSingletonService {
  getSelectedTestName(): string | null {
    return sessionStorage.getItem('selectedTestName');
  }

  setSelectedTestName(testName: string | null): void {
    if (testName == null) {
      sessionStorage.removeItem('selectedTestName');
      return;
    }

    sessionStorage.setItem('selectedTestName', testName);
  }

  isAnyTestSelected(): boolean {
    return sessionStorage.getItem('selectedTestName') != null;
  }
}
