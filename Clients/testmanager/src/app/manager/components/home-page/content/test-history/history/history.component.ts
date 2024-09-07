import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { TestHistory } from '../../../../../models/types/testHistory';
import { HistoryApiService } from '../../../../../services/testhistory/history/history-api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SelectedAnswersApiService } from '../../../../../services/testhistory/selected-answers/selected-answers-api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  history$: Observable<TestHistory>;

  constructor(
    private readonly historyApiService: HistoryApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.history$ = this.route.paramMap.pipe(
      map((params) => params.get('testName')!),
      switchMap((testName) => this.historyApiService.getTestHistory(testName))
    );
  }

  goToSelectedAnswers(testHistoryId: number): void {
    this.router.navigateByUrl(
      'home/test-history/selectedanswers/' + testHistoryId
    );
  }
}
