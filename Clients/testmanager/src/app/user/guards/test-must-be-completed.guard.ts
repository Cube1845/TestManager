import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProtectedQuestion } from '../models/types/protectedQuestion';
import { SelectedAnswer } from '../models/types/selectedAnswer';

export const testMustBeCompletedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const questionSet = sessionStorage.getItem('questionSet');
  const selectedAnswers = sessionStorage.getItem('selectedAnswers');
  const username = sessionStorage.getItem('username');

  if (questionSet == null || selectedAnswers == null || username == null) {
    router.navigateByUrl('test/start');
    return false;
  }

  const parsedQuestionSet: ProtectedQuestion[] = JSON.parse(questionSet);
  const parsedSelectedAnswers: SelectedAnswer[] = JSON.parse(selectedAnswers);

  if (parsedSelectedAnswers.length < parsedQuestionSet.length) {
    router.navigateByUrl('test/start');
    return false;
  }

  return true;
};
