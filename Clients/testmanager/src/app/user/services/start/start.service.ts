import { Injectable } from '@angular/core';
import { QuestionSetSingletonService } from '../singletons/question-set-singleton.service';
import { StartApiService } from './start-api.service';
import { Subject } from 'rxjs';
import { ToasterService } from '../../../common/services/toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class StartService {
  constructor(
    private readonly apiService: StartApiService,
    private readonly questionSetSingleton: QuestionSetSingletonService,
    private readonly toaster: ToasterService
  ) {}

  private questionSetLoadedSubject = new Subject<any>();
  questionSetLoaded$ = this.questionSetLoadedSubject.asObservable();

  loadQuestionSet(testCode: string): void {
    this.apiService.getQuestionSet(testCode).subscribe((response) => {
      if (response.isSuccess) {
        this.questionSetSingleton.setQuestionSet(response.value);
        this.questionSetLoadedSubject.next(true);
      } else {
        this.toaster.displayError(response.message!);
      }
    });
  }
}
