import { Component } from '@angular/core';
import { HistoryService } from '../../../../../services/testhistory/history/history.service';
import { TestHistory } from '../../../../../models/types/testHistory';
import { TestHistoryUnit } from '../../../../../models/types/testHistoryUnit';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  constructor(private readonly historyService: HistoryService) {}

  getTestHistory(): TestHistoryUnit[] {
    const testHistory = this.historyService.getTestHistory();

    if (testHistory == null) {
      return [];
    }

    return testHistory.history;
  }
}
