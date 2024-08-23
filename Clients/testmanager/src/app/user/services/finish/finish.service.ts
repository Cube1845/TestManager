import { Injectable } from '@angular/core';
import { FinishApiService } from './finish-api.service';
import { DataSingletonService } from '../singletons/data-singleton.service';
import { SelectedAnswersSingletonService } from '../singletons/selected-answers-singleton.service';
import { FinishTestDTO } from '../../models/DTOs/finishTestDto';
import { Subject } from 'rxjs';
import { Score } from '../../models/types/score';

@Injectable({
  providedIn: 'root',
})
export class FinishService {
  constructor(
    private readonly apiService: FinishApiService,
    private readonly dataSingleton: DataSingletonService,
    private readonly selectedAnswersSingleton: SelectedAnswersSingletonService
  ) {}

  private gotScoreSubject = new Subject<Score>();
  gotScore$ = this.gotScoreSubject.asObservable();

  finishTest(): void {
    const data = this.dataSingleton.getData()!;
    const selectedAnswers = this.selectedAnswersSingleton.getSelectedAnswers()!;

    const dto: FinishTestDTO = {
      testId: data.testId,
      username: data.username,
      selectedAnswers: selectedAnswers,
    };

    this.apiService.finishTest(dto).subscribe((score) => {
      this.gotScoreSubject.next(score);
    });
  }
}
