import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { TestHistory } from '../../../../../models/types/testHistory';
import { HistoryApiService } from '../../../../../services/testhistory/history/history-api.service';
import { SelectedAnswersService } from '../../../../../services/testhistory/selected-answers/selected-answers.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  history$: Observable<TestHistory>;

  constructor(
    private readonly selectedAnswersService: SelectedAnswersService,
    private readonly historyApiService: HistoryApiService,
    private readonly route: ActivatedRoute
  ) {
    this.history$ = this.route.paramMap.pipe(
      map((params) => params.get('testName')!),
      switchMap((testName) => this.historyApiService.getTestHistory(testName))
    );
  }

  goToSelectedAnswers(testHistoryId: number): void {
    this.selectedAnswersService.goToSelectedAnswers(testHistoryId);
  }
}
