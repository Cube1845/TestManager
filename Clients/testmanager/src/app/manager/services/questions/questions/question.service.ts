import { Injectable } from '@angular/core';
import { Question } from '../../../models/types/question';
import { QuestionApiService } from './question-api.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private readonly apiService: QuestionApiService) {}

  private questions: Question[] = [];

  //API

  loadQuestionsFromUsersQuestionBase(baseName: string): void {
    this.apiService
      .getQuestionsFromQuestionBase(baseName)
      .subscribe((response) => (this.questions = response));
  }

  addQuestionToQuestionBaseAndLoadQuestions(
    baseName: string,
    questionToAdd: Question
  ): void {
    this.apiService
      .addQuestionToQuestionBaseAndGetQuestions(baseName, questionToAdd)
      .subscribe((response) => (this.questions = response));
  }

  updateQuestionInQuestionBaseAndLoadQuestions(
    baseName: string,
    questionIndex: number,
    updatedQuestion: Question
  ): void {
    this.apiService
      .updateQuestionInQuestionBaseAndGetQuestions(
        baseName,
        questionIndex,
        updatedQuestion
      )
      .subscribe((response) => (this.questions = response));
  }

  removeQuestionFromQuestionBaseAndLoadQuestions(
    baseName: string,
    questionToRemoveIndex: number
  ): void {
    this.apiService
      .removeQuestionFromQuestionBaseAndGetQuestions(
        baseName,
        questionToRemoveIndex
      )
      .subscribe((response) => (this.questions = response));
  }

  //Non API

  getQuestions(): Question[] {
    return this.questions;
  }
}
