import { Injectable } from '@angular/core';
import { SelectedAnswer } from '../../models/types/selectedAnswer';

@Injectable({
  providedIn: 'root',
})
export class SelectedAnswersSingletonService {
  clearSelectedAnswers(): void {
    sessionStorage.removeItem('selectedAnswers');
  }

  selectAnswer(questionIndex: number, answerIndex: number): void {
    const stringifiedSelectedAnswers =
      sessionStorage.getItem('selectedAnswers');
    var selectedAnswers: SelectedAnswer[];

    if (
      stringifiedSelectedAnswers == null ||
      stringifiedSelectedAnswers == ''
    ) {
      selectedAnswers = [
        { questionIndex: questionIndex, answerIndex: answerIndex },
      ];

      sessionStorage.setItem(
        'selectedAnswers',
        JSON.stringify(selectedAnswers)
      );
      return;
    }

    selectedAnswers = JSON.parse(stringifiedSelectedAnswers);
    selectedAnswers.push({
      questionIndex: questionIndex,
      answerIndex: answerIndex,
    });

    sessionStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
  }

  getSelectedAnswers(): SelectedAnswer[] | null {
    const stringifiedSelectedAnswers =
      sessionStorage.getItem('selectedAnswers');

    if (
      stringifiedSelectedAnswers == null ||
      stringifiedSelectedAnswers == ''
    ) {
      return null;
    }

    var selectedAnswers: SelectedAnswer[] = JSON.parse(
      stringifiedSelectedAnswers
    );
    return selectedAnswers;
  }
}
