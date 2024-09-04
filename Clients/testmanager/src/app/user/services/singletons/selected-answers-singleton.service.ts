import { Injectable } from '@angular/core';
import { SelectedAnswer } from '../../../common/models/types/selectedAnswer';

@Injectable({
  providedIn: 'root',
})
export class SelectedAnswersSingletonService {
  clearSelectedAnswers(): void {
    sessionStorage.removeItem('selectedAnswers');
  }

  selectAnswer(questionId: number, answerId: number): void {
    const stringifiedSelectedAnswers =
      sessionStorage.getItem('selectedAnswers');
    var selectedAnswers: SelectedAnswer[];

    if (
      stringifiedSelectedAnswers == null ||
      stringifiedSelectedAnswers == ''
    ) {
      selectedAnswers = [{ questionId: questionId, answerId: answerId }];

      sessionStorage.setItem(
        'selectedAnswers',
        JSON.stringify(selectedAnswers)
      );
      return;
    }

    selectedAnswers = JSON.parse(stringifiedSelectedAnswers);

    var anyAnswerAlreadySelected = false;

    selectedAnswers.forEach((answer) => {
      if (answer.questionId == questionId) {
        answer.answerId = answerId;

        sessionStorage.setItem(
          'selectedAnswers',
          JSON.stringify(selectedAnswers)
        );

        anyAnswerAlreadySelected = true;
      }
    });

    if (!anyAnswerAlreadySelected) {
      selectedAnswers.push({
        questionId: questionId,
        answerId: answerId,
      });
    }

    sessionStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
  }

  deselectAnswer(questionId: number): void {
    const stringifiedSelectedAnswers =
      sessionStorage.getItem('selectedAnswers')!;
    var selectedAnswers: SelectedAnswer[] = JSON.parse(
      stringifiedSelectedAnswers
    );

    for (let i = 0; i < selectedAnswers.length; i++) {
      if (selectedAnswers[i].questionId == questionId) {
        selectedAnswers.splice(i, 1);
      }
    }

    if (selectedAnswers.length < 1) {
      sessionStorage.removeItem('selectedAnswers');
      return;
    }

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
