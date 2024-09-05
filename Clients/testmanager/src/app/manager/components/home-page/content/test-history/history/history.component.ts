import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from '../../../../../services/testhistory/history/history.service';
import { TestHistory } from '../../../../../models/types/testHistory';
import { TestHistoryUnit } from '../../../../../models/types/testHistoryUnit';
import { Router } from '@angular/router';
import { SelectedAnswersService } from '../../../../../services/testhistory/selected-answers/selected-answers.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  constructor(
    private readonly historyService: HistoryService,
    private readonly selectedAnswersService: SelectedAnswersService
  ) {}

  getTestHistory(): TestHistoryUnit[] {
    const testHistory = this.historyService.getTestHistory();

    if (testHistory == null) {
      return [];
    }

    return testHistory.history;
  }

  goToSelectedAnswers(clickedTestHistoryIndex: number): void {
    const testHistoryId =
      this.historyService.getTestHistory()!.history[clickedTestHistoryIndex]
        .testHistoryId;
    this.selectedAnswersService.goToSelectedAnswers(testHistoryId);
  }
}
