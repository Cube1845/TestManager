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
    oldQuestion: Question,
    updatedQuestion: Question
  ): void {
    this.apiService
      .updateQuestionInQuestionBaseAndGetQuestions(
        baseName,
        oldQuestion,
        updatedQuestion
      )
      .subscribe((response) => (this.questions = response));
  }

  removeQuestionFromQuestionBaseAndLoadQuestions(
    baseName: string,
    questionToRemove: Question
  ): void {
    this.apiService
      .removeQuestionFromQuestionBaseAndGetQuestions(baseName, questionToRemove)
      .subscribe((response) => (this.questions = response));
  }

  //Non API

  getQuestions(): Question[] {
    return this.questions;
  }
}
