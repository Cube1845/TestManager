import { Injectable } from '@angular/core';
import { QuestionBase } from '../../../models/types/questionBase';

@Injectable({
  providedIn: 'root',
})
export class QuestionBaseService {
  constructor() {}

  private questionBaseNames: string[] | null = null;
  private selectedQuestionBase: string | null = null;

  getQuestionBasesNames(): string[] | null {
    return this.questionBaseNames;
  }

  setQuestionBasesNames(questionBasesNames: string[]): void {
    this.questionBaseNames = questionBasesNames;
  }

  addQuestionBaseName(questionBaseName: string): void {
    this.questionBaseNames!.push(questionBaseName);
  }

  removeQuestionBaseName(index: number): void {
    this.questionBaseNames!.splice(index, 1);
  }

  selectQuestionBase(questionBaseName: string | null): void {
    this.selectedQuestionBase = questionBaseName;
  }

  getSelectedQuestionBase(): string | null {
    return this.selectedQuestionBase;
  }
}
