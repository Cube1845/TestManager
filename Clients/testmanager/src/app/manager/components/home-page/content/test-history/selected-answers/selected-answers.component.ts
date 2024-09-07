import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedTestNameSessionService } from '../../../../../services/singletons/selected-test-name-session.service';
import { ContentSelectedAnswers } from '../../../../../models/types/contentSelectedAnswers';
import { map, Observable, switchMap } from 'rxjs';
import { SelectedAnswersApiService } from '../../../../../services/testhistory/selected-answers/selected-answers-api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-selected-answers',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './selected-answers.component.html',
  styleUrl: './selected-answers.component.scss',
})
export class SelectedAnswersComponent {
  selectedAnswers$: Observable<ContentSelectedAnswers>;

  constructor(
    private readonly selectedAnswersApiService: SelectedAnswersApiService,
    private readonly selectedTestNameService: SelectedTestNameSessionService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.selectedAnswers$ = this.route.paramMap.pipe(
      map((params) => params.get('testHistoryId')!),
      switchMap((testHistoryId) =>
        this.selectedAnswersApiService.getSelectedAnswers(Number(testHistoryId))
      )
    );
  }

  goToTestHistory(): void {
    const testName = this.selectedTestNameService.getSelectedTestName();
    this.router.navigateByUrl('home/test-history/history/' + testName);
  }
}
