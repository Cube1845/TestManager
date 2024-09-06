import { Component } from '@angular/core';
import { SelectedAnswersService } from '../../../../../services/testhistory/selected-answers/selected-answers.service';
import { ContentSelectedAnswer } from '../../../../../models/types/contentSelectedAnswer';
import { SelectedTestNameService } from '../../../../../services/testhistory/selected-test-name.service';
import { Router } from '@angular/router';

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
    private readonly router: Router
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
    this.router.navigateByUrl('home/test-history/history/' + testName);
  }
}
