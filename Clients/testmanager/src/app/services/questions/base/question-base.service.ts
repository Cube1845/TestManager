import { Injectable } from '@angular/core';
import { QuestionBase } from '../../../models/types/questionBase';

@Injectable({
  providedIn: 'root',
})
export class QuestionBaseService {
  constructor() {}

  private questionBases: string[] | null = null;

  getQuestionBases(): string[] | null {
    return this.questionBases;
  }

  setQuestionBases(questionBases: string[]): void {
    this.questionBases = questionBases;
  }

  addQuestionBase(questionBase: string): void {
    this.questionBases!.push(questionBase);
  }

  removeQuestionBase(index: number): void {
    this.questionBases!.splice(index, 1);
  }
}
