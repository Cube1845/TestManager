import { Injectable } from '@angular/core';
import { QuestionBaseApiService } from './question-base-api.service';
import { catchError, of } from 'rxjs';
import { SelectedQuesitonBaseSingletonService } from '../../singletons/selected-quesiton-base-singleton.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionBaseService {
  constructor(
    private readonly apiService: QuestionBaseApiService,
    private readonly singleton: SelectedQuesitonBaseSingletonService
  ) {}

  private questionBaseNames: string[] = [];

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
    this.singleton.setSelectedQuestionBaseName(questionBaseName);
  }

  getSelectedQuestionBase(): string | null {
    return this.singleton.getSelectedQuestionBaseName();
  }
}
