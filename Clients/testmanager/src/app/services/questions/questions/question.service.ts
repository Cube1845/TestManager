import { Injectable } from '@angular/core';
import { Question } from '../../../models/types/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor() {}

  private questions: Question[] | null = null;

  getQuestions(): Question[] | null {
    return this.questions;
  }

  setQuestions(questions: Question[]): void {
    this.questions = questions;
  }

  addQuestion(question: Question): void {
    this.questions!.push(question);
  }

  removeQuestion(index: number): void {
    this.questions!.splice(index, 1);
  }
}
