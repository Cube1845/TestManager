import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToasterService } from '../../../common/services/toaster/toaster.service';
import { DataSingletonService } from '../singletons/data-singleton.service';
import { QuestionSetSingletonService } from '../singletons/question-set-singleton.service';
import { StartDateSingletonService } from '../singletons/start-date-singleton.service';
import { StartApiService } from './start-api.service';

@Injectable({
  providedIn: 'root',
})
export class StartService {
  constructor(
    private readonly apiService: StartApiService,
    private readonly questionSetSingleton: QuestionSetSingletonService,
    private readonly dataSingleton: DataSingletonService,
    private readonly toaster: ToasterService,
    private readonly startDateSingleton: StartDateSingletonService
  ) {}

  private questionSetLoadedSubject = new Subject<any>();
  questionSetLoaded$ = this.questionSetLoadedSubject.asObservable();

  loadQuestionSet(testCode: string): void {
    this.apiService.getQuestionSet(testCode).subscribe((response) => {
      if (response.isSuccess) {
        this.questionSetSingleton.setQuestionSet(response.value.questions);
        this.dataSingleton.setData({
          testId: response.value.testId,
          username: '',
        });

        this.startDateSingleton.setStartDate(new Date().toISOString());

        this.questionSetLoadedSubject.next(true);
      } else {
        this.toaster.displayError(response.message!);
      }
    });
  }
}
