import { Injectable } from '@angular/core';
import { HistoryApiService } from './history-api.service';
import { TestHistory } from '../../../models/types/testHistory';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(
    private readonly apiService: HistoryApiService,
    private readonly router: Router
  ) {}

  private testHistory!: TestHistory;

  //API

  loadTestHistory(testName: string): void {
    this.apiService.getTestHistory(testName).subscribe((history) => {
      this.testHistory = history;
      this.router.navigateByUrl('home/test-history/history');
    });
  }

  //NON API

  getTestHistory(): TestHistory {
    return this.testHistory;
  }

  goToTestHistory(testName: string) {
    this.loadTestHistory(testName);
  }
}
