import { Component } from '@angular/core';
import { TestManagerService } from '../../../../../services/tests/manager/test-manager.service';
import { HistoryService } from '../../../../../services/testhistory/history/history.service';

@Component({
  selector: 'app-history-test-display',
  standalone: true,
  imports: [],
  templateUrl: './history-test-display.component.html',
  styleUrl: './history-test-display.component.scss',
})
export class HistoryTestDisplayComponent {
  constructor(
    private readonly testManagerService: TestManagerService,
    private readonly historyService: HistoryService
  ) {}

  getUsersTests(): string[] {
    return this.testManagerService.getUsersTestNames();
  }

  goToTestHistory(testName: string): void {
    this.historyService.goToTestHistory(testName);
  }
}
