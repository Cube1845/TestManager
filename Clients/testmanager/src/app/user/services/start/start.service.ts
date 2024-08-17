import { Injectable } from '@angular/core';
import { QuestionSetSingletonService } from '../singletons/question-set-singleton.service';
import { StartApiService } from './start-api.service';

@Injectable({
  providedIn: 'root',
})
export class StartService {
  constructor(
    private readonly apiService: StartApiService,
    private readonly questionSetSingleton: QuestionSetSingletonService
  ) {}

  loadQuestionSet(testCode: string): void {
    this.apiService.getQuestionSet(testCode).subscribe((response) => {
      this.questionSetSingleton.setQuestionSet(response.value);
    });
  }
}
