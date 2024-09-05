import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TestHistory } from '../../../models/types/testHistory';
import { SelectedTestNameService } from '../selected-test-name.service';
import { HistoryApiService } from './history-api.service';

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

  loadTestHistory(testName: string): void {}

  //NON API

  getTestHistory(): TestHistory | null {
    return this.testHistory;
  }

  goToTestHistory(testName: string) {
    this.router.navigateByUrl('home/test-history/history/tutajTestName');
  }
}
