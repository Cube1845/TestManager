import { Injectable } from '@angular/core';
import { QuestionBaseApiService } from './question-base-api.service';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionBaseService {
  constructor(private readonly apiService: QuestionBaseApiService) {}

  private questionBaseNames: string[] = [];
  private selectedQuestionBase: string | null = null;

  //API

  createNewQuestionBaseAndLoadBasesNames(baseName: string): void {
    this.apiService
      .createQuestionBaseAndGetAllUsersBases(baseName)
      .subscribe((response) => {
        this.questionBaseNames = response;
      });
  }

  loadQuestionBasesNames(): void {
    this.apiService.getUsersQuestionBases().subscribe((response) => {
      this.questionBaseNames = response;
    });
  }

  updateQuestionBaseNameAndLoadBasesNames(
    oldBaseName: string,
    newBaseName: string
  ): void {
    this.apiService
      .updateQuestionBaseNameAndGetAllUsersBases(oldBaseName, newBaseName)
      .subscribe((response) => {
        this.questionBaseNames = response;
      });
  }

  removeQuestionBaseAndLoadBasesNames(index: number) {
    var baseName = this.getQuestionBasesNames()[index];

    this.apiService
      .removeQuestionBaseAndGetAllUsersBases(baseName)
      .subscribe((response) => {
        this.questionBaseNames = response;
      });
  }

  //Non API

  getQuestionBasesNames(): string[] {
    return this.questionBaseNames;
  }

  selectQuestionBase(questionBaseName: string | null): void {
    this.selectedQuestionBase = questionBaseName;
  }

  getSelectedQuestionBase(): string | null {
    return this.selectedQuestionBase;
  }
}
