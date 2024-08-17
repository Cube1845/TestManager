import { Injectable } from '@angular/core';
import { ProtectedQuestion } from '../../models/types/protectedQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionSetSingletonService {
  setQuestionSet(questionSet: ProtectedQuestion[] | null): void {
    sessionStorage.setItem('questionSet', JSON.stringify(questionSet));
  }

  getQuestionSet(): ProtectedQuestion[] | null {
    const stringifiedQuestionSet = sessionStorage.getItem('questionSet');

    if (stringifiedQuestionSet == null || stringifiedQuestionSet == '') {
      return null;
    }

    const questionSet: ProtectedQuestion[] = JSON.parse(stringifiedQuestionSet);
    return questionSet;
  }

  getQuestion(index: number): ProtectedQuestion | null {
    const stringifiedQuestionSet = sessionStorage.getItem('questionSet');

    if (stringifiedQuestionSet == null || stringifiedQuestionSet == '') {
      return null;
    }

    const questionSet: ProtectedQuestion[] = JSON.parse(stringifiedQuestionSet);

    if (questionSet.length <= index) {
      return null;
    }

    const question = questionSet[index];
    return question;
  }
}
