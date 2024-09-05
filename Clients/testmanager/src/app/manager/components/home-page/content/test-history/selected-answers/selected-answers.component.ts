import { Component } from '@angular/core';
import { SelectedAnswersService } from '../../../../../services/testhistory/selected-answers/selected-answers.service';
import { ContentSelectedAnswer } from '../../../../../models/types/contentSelectedAnswer';
import { SelectedTestNameService } from '../../../../../services/testhistory/selected-test-name.service';
import { HistoryService } from '../../../../../services/testhistory/history/history.service';

@Component({
  selector: 'app-selected-answers',
  standalone: true,
  imports: [],
  templateUrl: './selected-answers.component.html',
  styleUrl: './selected-answers.component.scss',
})
export class SelectedAnswersComponent {
  constructor(
    private readonly selectedAnswersService: SelectedAnswersService,
    private readonly selectedTestNameService: SelectedTestNameService,
    private readonly historyService: HistoryService
  ) {}

  getContentSelectedAnswers(): ContentSelectedAnswer[] {
    const selectedAnswers =
      this.selectedAnswersService.getContentSelectedAnswers();

    if (selectedAnswers == null) {
      return [];
    }

    return selectedAnswers.answers;
  }

  goToTestHistory(): void {
    const testName = this.selectedTestNameService.getSelectedTestName();
    this.historyService.goToTestHistory(testName);
  }
}
