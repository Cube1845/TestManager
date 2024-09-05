import { Injectable } from '@angular/core';
import { HistoryApiService } from './history-api.service';
import { TestHistory } from '../../../models/types/testHistory';
import { Router } from '@angular/router';
import { SelectedTestNameService } from '../selected-test-name.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(
    private readonly apiService: HistoryApiService,
    private readonly router: Router,
    private readonly selectedTestNameService: SelectedTestNameService
  ) {}

  private testHistory: TestHistory | null = null;

  //API

  loadTestHistory(testName: string): void {
    this.apiService.getTestHistory(testName).subscribe((history) => {
      this.testHistory = history;
      this.selectedTestNameService.setSelectedTestName(testName);
      this.router.navigateByUrl('home/test-history/history');
    });
  }

  //NON API

  getTestHistory(): TestHistory | null {
    return this.testHistory;
  }

  goToTestHistory(testName: string) {
    this.loadTestHistory(testName);
  }
}
